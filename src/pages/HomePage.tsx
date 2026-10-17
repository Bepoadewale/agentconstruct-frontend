import { Link } from 'react-router-dom';
import BrandMark from '../components/BrandMark';

const outcomes = [
  {
    number: '01',
    title: 'A right-sized architecture',
    text: 'A clear recommendation shaped by the workload—not by a default service stack.',
  },
  {
    number: '02',
    title: 'The reasoning behind it',
    text: 'Evidence, assumptions, unknowns, and rejected alternatives stay visible.',
  },
  {
    number: '03',
    title: 'A decision ready for review',
    text: 'Cost, security, policy, and approval context travel with the plan.',
  },
];

const workflow = [
  {
    number: '01',
    title: 'Connect the evidence',
    text: 'Authorize a repository and, when needed, a scoped backend-controlled AWS connection.',
  },
  {
    number: '02',
    title: 'Describe the outcome',
    text: 'State the workload, budget, data, reliability, region, and operating constraints.',
  },
  {
    number: '03',
    title: 'Review the decision',
    text: 'Inspect the selected resources, costs, trade-offs, unknowns, and policy evidence.',
  },
  {
    number: '04',
    title: 'Approve, then observe',
    text: 'Govern enabled execution and compare the approved plan with independently observed state.',
  },
];

export default function HomePage() {
  return (
    <main className="public-page">
      <header className="public-header">
        <Link className="brand" to="/" aria-label="AgentConstruct home">
          <BrandMark />
          <span>AgentConstruct</span>
        </Link>
        <nav aria-label="Public navigation">
          <a className="header-value-link" href="#why-agentconstruct">
            Why AgentConstruct
          </a>
          <a className="header-workflow-link" href="#how-it-works">
            How it works
          </a>
          <Link className="header-sign-in" to="/login">
            Sign in <span aria-hidden="true">↗</span>
          </Link>
        </nav>
      </header>

      <section className="public-hero" aria-labelledby="hero-heading">
        <div className="hero-copy">
          <p className="eyebrow">AWS infrastructure decision system</p>
          <h1 id="hero-heading">
            From application intent to an AWS architecture <em>you can defend.</em>
          </h1>
          <p className="hero-summary">
            AgentConstruct recommends the simplest viable architecture, explains the cost and risk,
            and puts every consequential action behind evidence, policy, and human approval.
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href="#how-it-works">
              See the decision flow <span aria-hidden="true">↓</span>
            </a>
            <Link className="button button-secondary" to="/login">
              Workspace sign in
            </Link>
          </div>
          <ul className="hero-principles" aria-label="Product principles">
            <li>AWS-first</li>
            <li>Minimum necessary</li>
            <li>Human approved</li>
          </ul>
        </div>

        <aside className="decision-preview" aria-label="Illustrative infrastructure decision">
          <div className="decision-topline">
            <span>Illustrative decision brief</span>
            <span className="decision-state">
              <i aria-hidden="true" /> Ready to review
            </span>
          </div>
          <div className="decision-heading">
            <div>
              <small>Workload</small>
              <strong>Customer support AI API</strong>
            </div>
            <span>Staging + production</span>
          </div>

          <div
            className="decision-path"
            aria-label="Repository evidence informs managed compute and private data"
          >
            <div>
              <span className="node-symbol" aria-hidden="true">
                ⌘
              </span>
              <small>Evidence</small>
              <strong>Repository</strong>
            </div>
            <i aria-hidden="true">→</i>
            <div className="decision-path-selected">
              <span className="node-symbol" aria-hidden="true">
                ◇
              </span>
              <small>Compute</small>
              <strong>Managed</strong>
            </div>
            <i aria-hidden="true">→</i>
            <div>
              <span className="node-symbol" aria-hidden="true">
                ▱
              </span>
              <small>Data</small>
              <strong>Private</strong>
            </div>
          </div>

          <dl className="decision-details">
            <div>
              <dt>Why this shape</dt>
              <dd>Variable API traffic without cluster operations</dd>
            </div>
            <div>
              <dt>Cost boundary</dt>
              <dd>Assumptions visible before approval</dd>
            </div>
            <div>
              <dt>Governance</dt>
              <dd>Policy result and plan digest attached</dd>
            </div>
          </dl>
          <div className="decision-footer">
            <span>Recommendation</span>
            <strong>Use the least complex viable shape</strong>
          </div>
        </aside>
      </section>

      <section className="principle-strip" aria-label="AgentConstruct capabilities">
        <p>
          <span>01</span> Code-aware planning
        </p>
        <p>
          <span>02</span> Cost and complexity together
        </p>
        <p>
          <span>03</span> Policy-backed review
        </p>
        <p>
          <span>04</span> Independently observed outcomes
        </p>
      </section>

      <section id="why-agentconstruct" className="public-thesis" aria-labelledby="thesis-heading">
        <div className="section-intro">
          <p className="eyebrow">The missing layer</p>
          <h2 id="thesis-heading">
            Infrastructure tools build. AgentConstruct helps decide what is worth building.
          </h2>
        </div>
        <div className="thesis-copy">
          <p>
            Cloud decisions are often buried in tickets, chat threads, and generated code. The
            reasoning disappears while the operational burden remains.
          </p>
          <p>
            AgentConstruct starts one step earlier: what does this workload actually need, which
            architecture satisfies it with the least complexity, and what evidence supports that
            decision?
          </p>
        </div>
      </section>

      <section className="outcome-section" aria-labelledby="outcome-heading">
        <div className="outcome-lead">
          <p className="eyebrow">One durable decision record</p>
          <h2 id="outcome-heading">More than generated infrastructure.</h2>
          <p>
            Every recommendation is designed to remain understandable before approval and
            accountable after execution.
          </p>
        </div>
        <ol className="outcome-grid">
          {outcomes.map((outcome) => (
            <li key={outcome.number}>
              <span>{outcome.number}</span>
              <h3>{outcome.title}</h3>
              <p>{outcome.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section id="how-it-works" className="public-steps" aria-labelledby="how-heading">
        <div className="steps-heading">
          <div>
            <p className="eyebrow">How it works</p>
            <h2 id="how-heading">Evidence before infrastructure.</h2>
          </div>
          <p>One governed path from a workload requirement to an observable outcome.</p>
        </div>
        <ol>
          {workflow.map((step) => (
            <li key={step.number}>
              <span>{step.number}</span>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="public-cta" aria-labelledby="cta-heading">
        <div>
          <p className="eyebrow">A better cloud decision starts here</p>
          <h2 id="cta-heading">Bring the workload. Leave with a decision your team can defend.</h2>
        </div>
        <div>
          <Link className="button button-primary" to="/login">
            Enter the workspace <span aria-hidden="true">→</span>
          </Link>
          <p>Repository evidence in. Reviewable AWS plan out.</p>
        </div>
      </section>

      <footer className="public-footer">
        <Link className="brand footer-brand" to="/">
          <BrandMark />
          <span>AgentConstruct</span>
        </Link>
        <p>Plan the simplest viable cloud. Prove why.</p>
        <Link to="/login">Workspace sign in</Link>
      </footer>
    </main>
  );
}
