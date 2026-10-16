import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <main className="auth-page">
      <section className="auth-card">
        <p className="eyebrow">404</p>
        <h1>That page does not exist.</h1>
        <p>The route may have moved, or you may not have access to it.</p>
        <Link className="button button-primary" to="/">
          Return home
        </Link>
      </section>
    </main>
  );
}
