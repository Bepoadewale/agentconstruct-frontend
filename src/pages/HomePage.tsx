import { Link } from 'react-router-dom';
import BrandMark from '../components/BrandMark';

export default function HomePage() {
  return (
    <main className="public-page">
      <header className="public-header">
        <Link className="brand" to="/">
          <BrandMark />
          <span>AgentConstruct</span>
        </Link>
        <nav aria-label="Public navigation">
          <a className="header-workflow-link" href="#how-it-works">
            How it works
          </a>
          <Link className="header-sign-in" to="/login">
            Sign in
          </Link>
        </nav>
      </header>
      <section className="public-hero">
        <div className="hero-copy">
          <p className="eyebrow">Governed infrastructure planning</p>
          <h1>The simplest AWS architecture for your actual requirements.</h1>
          <p>
            Turn application intent into a reviewable plan with clear resource choices, cost
            assumptions, security controls, and policy evidence.
          </p>
          <div className="hero-actions">
            <Link className="button button-primary" to="/login">
              Open workspace
            </Link>
            <a className="button button-secondary" href="#how-it-works">
              See how it works
            </a>
          </div>
        </div>
        <aside className="plan-preview" aria-label="Example infrastructure plan">
          <div className="plan-preview-header">
            <span>Example plan</span>
            <span className="preview-badge">Reviewable</span>
          </div>
          <div className="plan-preview-title">
            <span className="preview-icon">API</span>
            <div>
              <strong>Customer support API</strong>
              <small>Staging and production</small>
            </div>
          </div>
          <dl>
            <div>
              <dt>Selected shape</dt>
              <dd>Right-sized managed compute</dd>
            </div>
            <div>
              <dt>Cost view</dt>
              <dd>Assumptions and trade-offs visible</dd>
            </div>
            <div>
              <dt>Governance</dt>
              <dd>Policy evidence attached</dd>
            </div>
          </dl>
          <div className="preview-flow" aria-label="Intent becomes evidence, then a plan">
            <span>Intent</span>
            <i aria-hidden="true">→</i>
            <span>Evidence</span>
            <i aria-hidden="true">→</i>
            <span>Plan</span>
          </div>
        </aside>
      </section>
      <section id="how-it-works" className="public-steps" aria-labelledby="how-heading">
        <div>
          <p className="eyebrow">How it works</p>
          <h2 id="how-heading">Evidence before infrastructure.</h2>
        </div>
        <ol>
          <li>
            <span>01</span>
            <h3>Connect</h3>
            <p>Authorize a repository and a scoped, backend-controlled AWS connection.</p>
          </li>
          <li>
            <span>02</span>
            <h3>Plan</h3>
            <p>
              Describe the outcome; review the selected resources, costs, unknowns, and
              alternatives.
            </p>
          </li>
          <li>
            <span>03</span>
            <h3>Govern</h3>
            <p>
              Submit the immutable digest for policy-backed approval with a durable audit trail.
            </p>
          </li>
          <li>
            <span>04</span>
            <h3>Observe</h3>
            <p>
              Track execution only where enabled and compare the plan with independently observed
              state.
            </p>
          </li>
        </ol>
      </section>
      <footer className="public-footer">
        <span>AgentConstruct</span>
        <span>Plan clearly. Govern safely.</span>
      </footer>
    </main>
  );
}
