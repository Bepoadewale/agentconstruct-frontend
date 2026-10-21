import { Link } from 'react-router-dom';
import { ProductVisual } from '../components/ProductVisual';

export default function HelpPage() {
  return (
    <div className="page">
      <div className="page-heading visual-page-heading">
        <div>
          <p className="eyebrow">Help & updates</p>
          <h1>Plan. Approve. Deploy.</h1>
          <p>The product lifecycle at a glance.</p>
        </div>
        <ProductVisual kind="help" />
      </div>
      <div className="help-grid">
        <article className="panel">
          <span className="feature-icon">01</span>
          <h2>Planning</h2>
          <p>Connect evidence and get the minimum viable architecture.</p>
          <Link to="/plans/new">Create a plan</Link>
        </article>
        <article className="panel">
          <span className="feature-icon">02</span>
          <h2>Governance</h2>
          <p>Review an immutable plan with server-enforced policy.</p>
          <Link to="/history">Review history</Link>
        </article>
        <article className="panel">
          <span className="feature-icon">03</span>
          <h2>Execution</h2>
          <p>Run the approved change and verify the observed result.</p>
          <Link to="/activity">Inspect activity</Link>
        </article>
      </div>
      <section className="panel changelog">
        <p className="eyebrow">Current release</p>
        <h2>Governed cloud lifecycle</h2>
        <ul>
          <li>Static React application prepared for Cloudflare Pages Free.</li>
          <li>The versioned cloud backend remains the authority for protected operations.</li>
          <li>OIDC/PKCE seam supports future Google Workspace and Cognito configuration.</li>
          <li>Cloudflare compute, storage, and paid add-ons are not required.</li>
        </ul>
      </section>
    </div>
  );
}
