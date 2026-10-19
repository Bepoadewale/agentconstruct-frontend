import { useState, type FormEvent } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import type { EmailOtpChallenge } from '../auth/cognitoEmail';
import BrandMark from '../components/BrandMark';
import { config, emailOtpConfigured, googleSignInConfigured } from '../config';

function CheckIcon() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true" focusable="false">
      <path d="m5 10 3 3 7-7" />
    </svg>
  );
}

export default function LoginPage() {
  const {
    profile,
    loading,
    error,
    signInWithGoogle,
    startEmailSignIn,
    verifyEmailCode,
    localSignIn,
  } = useAuth();
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [challenge, setChallenge] = useState<EmailOtpChallenge | null>(null);
  const [emailStatus, setEmailStatus] = useState<string | null>(null);
  if (profile) return <Navigate to="/overview" replace />;

  async function submitEmail(event: FormEvent) {
    event.preventDefault();
    setEmailStatus(null);
    const result = challenge
      ? await verifyEmailCode(challenge, code)
      : await startEmailSignIn(email);
    if (result?.status === 'CHALLENGE') {
      setChallenge(result.challenge);
      setCode('');
      setEmailStatus(result.message);
    }
  }

  return (
    <main className="auth-page auth-page-v2">
      <header className="auth-header-v2">
        <a className="auth-brand-v2" href="/" aria-label="davdeploy home">
          <BrandMark />
          <span>davdeploy</span>
        </a>
        <a href="/">Back to product</a>
      </header>

      <div className="auth-layout auth-layout-v2">
        <section className="auth-context auth-context-v2" aria-labelledby="auth-context-heading">
          <div>
            <p className="auth-eyebrow-v2">Governed customer-cloud infrastructure</p>
            <h1 id="auth-context-heading">Plan with evidence. Deploy with control.</h1>
            <p>
              Bring architecture, cost, policy, approval, deployment, and observed state into one
              accountable workspace.
            </p>
          </div>

          <div className="auth-decision-v2" aria-label="Workspace decision record">
            <div className="auth-decision-heading-v2">
              <span>Decision record</span>
              <small>Ready for review</small>
            </div>
            <div className="auth-decision-flow-v2">
              <span>Intent</span>
              <i />
              <span>Approval</span>
              <i />
              <span>Customer cloud</span>
            </div>
            <p>Every change keeps its assumptions, tradeoffs, approval, and observed outcome.</p>
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
            <div className="hosted-auth-options">
              {googleSignInConfigured ? (
                <>
                  <button
                    className="button button-secondary button-wide auth-button-v2 google-button"
                    type="button"
                    disabled={loading}
                    onClick={() => void signInWithGoogle()}
                  >
                    <span className="google-mark" aria-hidden="true">
                      G
                    </span>
                    {loading ? 'Connecting…' : 'Continue with Google'}
                  </button>

                  <div className="auth-divider" aria-hidden="true">
                    <span>or</span>
                  </div>
                </>
              ) : null}

              <form className="email-auth-form" onSubmit={(event) => void submitEmail(event)}>
                {challenge ? (
                  <>
                    <label htmlFor="email-code">Email verification code</label>
                    <input
                      id="email-code"
                      name="code"
                      autoComplete="one-time-code"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      minLength={6}
                      maxLength={8}
                      required
                      value={code}
                      onChange={(event) => setCode(event.target.value)}
                    />
                    <small>Code sent to {challenge.email}</small>
                  </>
                ) : (
                  <>
                    <label htmlFor="email">Work email</label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      placeholder="you@company.com"
                    />
                  </>
                )}
                <button
                  className="button button-primary button-wide auth-button-v2"
                  type="submit"
                  disabled={loading || !emailOtpConfigured}
                >
                  {loading
                    ? 'Checking…'
                    : challenge
                      ? 'Verify and continue'
                      : 'Continue with email'}
                </button>
                {challenge ? (
                  <button
                    className="auth-text-button"
                    type="button"
                    disabled={loading}
                    onClick={() => {
                      setChallenge(null);
                      setCode('');
                      setEmailStatus(null);
                    }}
                  >
                    Use a different email
                  </button>
                ) : null}
              </form>
              {emailStatus ? (
                <p className="auth-email-status" role="status">
                  {emailStatus}
                </p>
              ) : null}
            </div>
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

          {!googleSignInConfigured && !emailOtpConfigured && !config.localLoginEnabled ? (
            <div id="sign-in-status" className="notice auth-status auth-status-v2" role="status">
              <span className="auth-status-mark-v2" aria-hidden="true">
                i
              </span>
              <span>
                <strong>Workspace access is not configured</strong>
                <small>
                  The public site is online. Access will open after Cognito is connected.
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
