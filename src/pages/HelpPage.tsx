import { Link } from 'react-router-dom';

export default function HelpPage() {
  return (
    <div className="page">
      <div className="page-heading">
        <div>
          <p className="eyebrow">Help & updates</p>
          <h1>Know what the product can and cannot do.</h1>
          <p>Clear boundaries for planning, approval, execution, and evidence.</p>
        </div>
      </div>
      <div className="help-grid">
        <article className="panel">
          <span className="feature-icon">01</span>
          <h2>Planning</h2>
          <p>
            Connect authorized evidence, describe the outcome, and inspect the minimum-necessary
            cloud recommendation.
          </p>
          <Link to="/plans/new">Create a plan</Link>
        </article>
        <article className="panel">
          <span className="feature-icon">02</span>
          <h2>Governance</h2>
          <p>
            Submitted revisions are immutable. The server validates role, tenant, policy, state, and
            exact digest.
          </p>
          <Link to="/history">Review history</Link>
        </article>
        <article className="panel">
          <span className="feature-icon">03</span>
          <h2>Execution</h2>
          <p>
            Approval does not mean deployment. Only backend-observed runs can claim infrastructure
            changed.
          </p>
          <Link to="/activity">Inspect activity</Link>
        </article>
      </div>
      <section className="panel changelog">
        <p className="eyebrow">Current release</p>
        <h2>Frontend separation</h2>
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
