import { useEffect, useRef } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';

export default function AuthCallbackPage() {
  const { profile, error, completeCallback } = useAuth();
  const started = useRef(false);
  useEffect(() => {
    if (!started.current) {
      started.current = true;
      void completeCallback();
    }
  }, [completeCallback]);
  if (profile) return <Navigate to="/overview" replace />;
  return (
    <main className="auth-page">
      <section className="auth-card" role="status">
        <p className="eyebrow">Identity callback</p>
        <h1>{error ? 'Sign-in could not be completed.' : 'Completing secure sign-in…'}</h1>
        <p>
          {error ?? 'The backend will verify identity and resolve server-side membership next.'}
        </p>
        {error ? (
          <a className="button button-secondary" href="/login">
            Return to sign in
          </a>
        ) : null}
      </section>
    </main>
  );
}
