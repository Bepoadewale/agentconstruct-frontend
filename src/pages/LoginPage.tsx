import { Navigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import BrandMark from '../components/BrandMark';
import { config, oidcConfigured } from '../config';

export default function LoginPage() {
  const { profile, loading, error, signIn, localSignIn } = useAuth();
  if (profile) return <Navigate to="/overview" replace />;
  return (
    <main className="auth-page">
      <div className="auth-layout">
        <section className="auth-context" aria-labelledby="auth-context-heading">
          <a className="brand" href="/">
            <BrandMark />
            <span>AgentConstruct</span>
          </a>
          <div>
            <p className="eyebrow">Governed by default</p>
            <h1 id="auth-context-heading">Plan with evidence. Act with approval.</h1>
            <p>
              One workspace for architecture decisions, cost assumptions, policy review, and
              independently observed outcomes.
            </p>
          </div>
          <ul className="auth-principles" aria-label="Workspace safeguards">
            <li>Backend-verified membership</li>
            <li>Immutable approval history</li>
            <li>No cloud credentials in the browser</li>
          </ul>
        </section>
        <section className="auth-card" aria-labelledby="login-heading">
          <a className="brand" href="/">
            <BrandMark />
            <span>AgentConstruct</span>
          </a>
          <p className="eyebrow">Secure workspace access</p>
          <h1 id="login-heading">Sign in to your workspace.</h1>
          <p>
            Your identity is verified before the backend resolves workspace membership and role.
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
              aria-describedby={!oidcConfigured ? 'sign-in-status' : undefined}
              onClick={() => void signIn()}
            >
              {loading
                ? 'Redirecting…'
                : oidcConfigured
                  ? 'Continue with Google Workspace'
                  : 'Sign-in unavailable'}
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
            <div id="sign-in-status" className="notice auth-status" role="status">
              <strong>Workspace sign-in is not configured</strong>
              <span>
                The public site is online. Access will open after Google Workspace sign-in is
                connected.
              </span>
            </div>
          ) : null}
          <small>No cloud credentials are accepted on this screen.</small>
        </section>
      </div>
    </main>
  );
}
