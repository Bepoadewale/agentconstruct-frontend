import { Link } from 'react-router-dom';
import { ProductVisual } from '../components/ProductVisual';

export default function NotFoundPage() {
  return (
    <main className="auth-page">
      <section className="auth-card">
        <ProductVisual kind="history" compact />
        <p className="eyebrow">404</p>
        <h1>That page does not exist.</h1>
        <p>This route moved or is outside your access.</p>
        <Link className="button button-primary" to="/">
          Return home
        </Link>
      </section>
    </main>
  );
}
