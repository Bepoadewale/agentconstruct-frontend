export type AuthMode = 'local-fixture' | 'oidc';

const trimSlash = (value: string) => value.replace(/\/+$/, '');

const configuredApiBaseUrl = trimSlash(import.meta.env.VITE_API_BASE_URL?.trim() ?? '');

export const config = Object.freeze({
  apiBaseUrl: configuredApiBaseUrl || (import.meta.env.DEV ? 'http://127.0.0.1:8080' : ''),
  apiConfigured: Boolean(configuredApiBaseUrl || import.meta.env.DEV),
  authMode: (import.meta.env.VITE_AUTH_MODE ?? 'oidc') as AuthMode,
  localLoginEnabled:
    import.meta.env.DEV && import.meta.env.VITE_ENABLE_LOCAL_LOGIN?.toLowerCase() === 'true',
  oidc: {
    authority: trimSlash(import.meta.env.VITE_OIDC_AUTHORITY?.trim() ?? ''),
    clientId: import.meta.env.VITE_OIDC_CLIENT_ID?.trim() ?? '',
    redirectUri:
      import.meta.env.VITE_OIDC_REDIRECT_URI?.trim() || `${window.location.origin}/auth/callback`,
    postLogoutRedirectUri:
      import.meta.env.VITE_OIDC_POST_LOGOUT_REDIRECT_URI?.trim() || window.location.origin,
  },
  cognito: {
    region: import.meta.env.VITE_COGNITO_REGION?.trim() ?? '',
    clientId:
      import.meta.env.VITE_COGNITO_USER_POOL_CLIENT_ID?.trim() ??
      import.meta.env.VITE_OIDC_CLIENT_ID?.trim() ??
      '',
  },
});

export const oidcConfigured = Boolean(config.oidc.authority && config.oidc.clientId);
export const emailOtpConfigured = Boolean(config.cognito.region && config.cognito.clientId);

export function publicConfigurationIssues(): string[] {
  const issues: string[] = [];
  if (!config.apiConfigured) issues.push('VITE_API_BASE_URL is not configured.');
  if (config.authMode === 'oidc' && !oidcConfigured) {
    issues.push('OIDC authority and client ID are not configured.');
  }
  if (config.authMode === 'oidc' && !emailOtpConfigured) {
    issues.push('Cognito region and user-pool client ID are not configured.');
  }
  if (config.authMode === 'local-fixture' && !config.localLoginEnabled) {
    issues.push('Local fixture login is disabled outside an explicit development environment.');
  }
  return issues;
}
