import {
  InMemoryWebStorage,
  UserManager,
  WebStorageStateStore,
  type UserManagerSettings,
} from 'oidc-client-ts';
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
  type PropsWithChildren,
} from 'react';
import { ApiClient } from '../api/client';
import type { WorkspaceProfile } from '../api/contracts';
import { config, oidcConfigured } from '../config';

interface AuthState {
  profile: WorkspaceProfile | null;
  token: string | null;
  loading: boolean;
  error: string | null;
  api: ApiClient;
  signIn: () => Promise<void>;
  localSignIn: (username: 'founder' | 'administrator') => Promise<void>;
  completeCallback: () => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthState | null>(null);

function createUserManager(): UserManager | null {
  if (!oidcConfigured) return null;
  const settings: UserManagerSettings = {
    authority: config.oidc.authority,
    client_id: config.oidc.clientId,
    redirect_uri: config.oidc.redirectUri,
    post_logout_redirect_uri: config.oidc.postLogoutRedirectUri,
    response_type: 'code',
    scope: 'openid profile email',
    stateStore: new WebStorageStateStore({ store: window.sessionStorage }),
    userStore: new WebStorageStateStore({ store: new InMemoryWebStorage() }),
    automaticSilentRenew: false,
  };
  return new UserManager(settings);
}

export function AuthProvider({ children }: PropsWithChildren) {
  const [profile, setProfile] = useState<WorkspaceProfile | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const tokenRef = useRef<string | null>(null);
  const manager = useMemo(createUserManager, []);
  const api = useMemo(() => new ApiClient(() => tokenRef.current), []);

  const adoptToken = useCallback(
    async (accessToken: string) => {
      tokenRef.current = accessToken;
      setToken(accessToken);
      try {
        const nextProfile = await api.request<WorkspaceProfile>('/api/v1/me');
        setProfile(nextProfile);
      } catch (requestError) {
        tokenRef.current = null;
        setToken(null);
        throw requestError;
      }
    },
    [api],
  );

  const signIn = useCallback(async () => {
    setError(null);
    if (!manager) {
      setError('Hosted sign-in is not configured for this deployment.');
      return;
    }
    await manager.signinRedirect();
  }, [manager]);

  const localSignIn = useCallback(
    async (username: 'founder' | 'administrator') => {
      setLoading(true);
      setError(null);
      try {
        if (!config.localLoginEnabled) throw new Error('Local fixture sign-in is disabled.');
        const response = await api.request<{ access_token: string }>('/api/v1/auth/local-login', {
          method: 'POST',
          body: { username },
          authenticated: false,
          retrySafe: false,
        });
        await adoptToken(response.access_token);
      } catch (requestError) {
        setError(requestError instanceof Error ? requestError.message : 'Sign-in failed.');
      } finally {
        setLoading(false);
      }
    },
    [adoptToken, api],
  );

  const completeCallback = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      if (!manager) throw new Error('Hosted sign-in is not configured.');
      const user = await manager.signinRedirectCallback();
      await adoptToken(user.access_token);
    } catch (callbackError) {
      setError(callbackError instanceof Error ? callbackError.message : 'Sign-in callback failed.');
      throw callbackError;
    } finally {
      setLoading(false);
    }
  }, [adoptToken, manager]);

  const signOut = useCallback(async () => {
    tokenRef.current = null;
    setToken(null);
    setProfile(null);
    setError(null);
    if (manager) await manager.clearStaleState();
  }, [manager]);

  const value = useMemo<AuthState>(
    () => ({ profile, token, loading, error, api, signIn, localSignIn, completeCallback, signOut }),
    [api, completeCallback, error, loading, localSignIn, profile, signIn, signOut, token],
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Context hooks intentionally live beside their provider so the auth boundary stays cohesive.
// eslint-disable-next-line react-refresh/only-export-components
export function useAuth(): AuthState {
  const value = useContext(AuthContext);
  if (!value) throw new Error('useAuth must be used inside AuthProvider.');
  return value;
}
