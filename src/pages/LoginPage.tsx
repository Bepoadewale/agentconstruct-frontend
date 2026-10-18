import { Navigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import BrandMark from '../components/BrandMark';
import { config, oidcConfigured } from '../config';

function CheckIcon() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true" focusable="false">
      <path d="m5 10 3 3 7-7" />
    </svg>
  );
}

export default function LoginPage() {
  const { profile, loading, error, signIn, localSignIn } = useAuth();
  if (profile) return <Navigate to="/overview" replace />;

  return (
    <main className="auth-page auth-page-v2">
      <header className="auth-header-v2">
        <a className="auth-brand-v2" href="/" aria-label="AgentConstruct home">
          <BrandMark />
          <span>AgentConstruct</span>
        </a>
        <a href="/">Back to product</a>
      </header>

      <div className="auth-layout auth-layout-v2">
        <section className="auth-context auth-context-v2" aria-labelledby="auth-context-heading">
          <div>
            <p className="auth-eyebrow-v2">Governed cloud decisions</p>
            <h1 id="auth-context-heading">Plan with evidence. Move with confidence.</h1>
            <p>Bring architecture, cost, policy, and approval into one accountable workspace.</p>
          </div>

          <div className="auth-decision-v2" aria-label="Workspace decision record">
            <div className="auth-decision-heading-v2">
              <span>Decision record</span>
              <small>Ready for review</small>
            </div>
            <div className="auth-decision-flow-v2">
              <span>Intent</span>
              <i />
              <span>Evidence</span>
              <i />
              <span>Plan</span>
            </div>
            <p>Every recommendation keeps its assumptions, tradeoffs, and approval history.</p>
          </div>

          <ul className="auth-principles auth-principles-v2" aria-label="Workspace safeguards">
            <li>
              <CheckIcon /> Backend-verified membership
            </li>
            <li>
              <CheckIcon /> Immutable approval history
            </li>
            <li>
              <CheckIcon /> No cloud credentials in the browser
            </li>
          </ul>
        </section>

        <section className="auth-card auth-card-v2" aria-labelledby="login-heading">
          <p className="auth-eyebrow-v2">Secure workspace access</p>
          <h1 id="login-heading">Sign in to your workspace.</h1>
          <p>Your identity is verified before membership and permissions are resolved.</p>

          {error ? (
            <div className="notice notice-error" role="alert">
              {error}
            </div>
          ) : null}

          {config.authMode === 'oidc' ? (
            <button
              className="button button-primary button-wide auth-button-v2"
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
            <div className="fixture-login fixture-login-v2">
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
            <div id="sign-in-status" className="notice auth-status auth-status-v2" role="status">
              <span className="auth-status-mark-v2" aria-hidden="true">
                i
              </span>
              <span>
                <strong>Workspace access is not configured</strong>
                <small>
                  The public site is online. Access will open after Google Workspace sign-in is
                  connected.
                </small>
              </span>
            </div>
          ) : null}

          <div className="auth-assurance-v2">
            <CheckIcon />
            <small>No cloud credentials are accepted on this screen.</small>
          </div>
        </section>
      </div>
    </main>
  );
}
