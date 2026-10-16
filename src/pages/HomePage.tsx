import { Link } from 'react-router-dom';

export default function HomePage() {
  return (
    <main className="public-page">
      <header className="public-header">
        <Link className="brand" to="/">
          <span className="brand-mark">A</span>
          <span>AgentConstruct</span>
        </Link>
        <nav aria-label="Public navigation">
          <a href="#how-it-works">How it works</a>
          <Link className="button button-primary" to="/login">
            Open workspace
          </Link>
        </nav>
      </header>
      <section className="public-hero">
        <p className="eyebrow">Governed infrastructure planning</p>
        <h1>The simplest AWS architecture that meets the real requirement.</h1>
        <p>
          Turn application intent into a reviewable plan with resource choices, cost assumptions,
          security controls, trade-offs, policy evidence, and a bounded path to execution.
        </p>
        <div className="hero-actions">
          <Link className="button button-primary" to="/login">
            Start planning
          </Link>
          <a className="button button-secondary" href="#how-it-works">
            See the workflow
          </a>
        </div>
        <p className="truth-note">
          Plans remain plans until the governed backend confirms approval and execution.
        </p>
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
        <span>AWS-first · provider-neutral contracts</span>
      </footer>
    </main>
  );
}
