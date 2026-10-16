import { Navigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import { config, oidcConfigured } from '../config';

export default function LoginPage() {
  const { profile, loading, error, signIn, localSignIn } = useAuth();
  if (profile) return <Navigate to="/overview" replace />;
  return (
    <main className="auth-page">
      <section className="auth-card" aria-labelledby="login-heading">
        <a className="brand" href="/">
          <span className="brand-mark">A</span>
          <span>AgentConstruct</span>
        </a>
        <p className="eyebrow">Secure workspace access</p>
        <h1 id="login-heading">Sign in to your control plane.</h1>
        <p>
          Identity proves who you are. The backend still resolves workspace membership and role for
          every request.
        </p>
        {error ? (
          <div className="notice notice-error" role="alert">
            {error}
          </div>
        ) : null}
        {config.authMode === 'oidc' ? (
          <button
            className="button button-primary button-wide"
            type="button"
            disabled={loading || !oidcConfigured}
            onClick={() => void signIn()}
          >
            {loading ? 'Redirecting…' : 'Continue with identity provider'}
          </button>
        ) : null}
        {config.localLoginEnabled ? (
          <div className="fixture-login">
            <span>Local development fixture</span>
            <button
              className="button button-primary"
              type="button"
              disabled={loading}
              onClick={() => void localSignIn('founder')}
            >
              Developer
            </button>
            <button
              className="button button-secondary"
              type="button"
              disabled={loading}
              onClick={() => void localSignIn('administrator')}
            >
              Administrator
            </button>
          </div>
        ) : null}
        {!oidcConfigured && !config.localLoginEnabled ? (
          <div className="notice" role="status">
            This static frontend is ready, but a deployed identity provider has not been configured.
          </div>
        ) : null}
        <small>
          No AWS keys, GitHub secrets, or cloud credentials are accepted by this screen.
        </small>
      </section>
    </main>
  );
}
