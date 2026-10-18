import { Link } from 'react-router-dom';
import BrandMark from '../components/BrandMark';

const outcomes = [
  {
    tone: 'orange',
    label: 'Architecture',
    title: 'The smallest viable stack',
    text: 'Every service earns its place against the workload, budget, and operating model.',
  },
  {
    tone: 'green',
    label: 'Governance',
    title: 'A decision you can defend',
    text: 'Evidence, policy results, assumptions, and approvals stay attached to the plan.',
  },
  {
    tone: 'blue',
    label: 'Cost',
    title: 'Tradeoffs made visible',
    text: 'Review estimated spend, complexity, and rejected alternatives before execution.',
  },
];

const workflow = [
  ['01', 'Connect', 'Authorize your repository and cloud environment.'],
  ['02', 'Describe', 'Set the outcome, limits, and operating constraints.'],
  ['03', 'Review', 'Inspect the architecture, evidence, costs, and risks.'],
  ['04', 'Approve', 'Authorize the exact plan before any governed action.'],
];

function ArrowIcon() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true" focusable="false">
      <path d="M4 10h11M11 6l4 4-4 4" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true" focusable="false">
      <path d="m5 10 3 3 7-7" />
    </svg>
  );
}

export default function HomePage() {
  return (
    <main className="ac3-page">
      <header className="ac3-header">
        <Link className="ac3-brand" to="/" aria-label="AgentConstruct home">
          <BrandMark />
          <span>AgentConstruct</span>
        </Link>
        <nav aria-label="Public navigation">
          <a href="#product">Product</a>
          <a href="#workflow">How it works</a>
          <a href="#security">Governance</a>
        </nav>
        <Link className="ac3-header-action" to="/login">
          Sign in <ArrowIcon />
        </Link>
      </header>

      <section className="ac3-hero" aria-labelledby="hero-heading">
        <div className="ac3-hero-copy">
          <p className="ac3-kicker">
            <span /> AI infrastructure planning for cloud workloads
          </p>
          <h1 id="hero-heading">Cloud decisions, built on evidence.</h1>
          <p className="ac3-hero-summary">
            Turn your application requirements into a cost-conscious cloud plan your team can
            review, approve, and trust.
          </p>
          <div className="ac3-actions">
            <Link className="ac3-button ac3-button-primary" to="/login">
              Open workspace <ArrowIcon />
            </Link>
            <a className="ac3-button ac3-button-secondary" href="#product">
              See the product
            </a>
          </div>
          <ul className="ac3-proof-list" aria-label="Product principles">
            <li>
              <CheckIcon /> Repository-aware
            </li>
            <li>
              <CheckIcon /> Cost-conscious
            </li>
            <li>
              <CheckIcon /> Human-approved
            </li>
          </ul>
        </div>

        <figure
          className="ac3-hero-product"
          aria-label="Illustrative AgentConstruct decision brief"
        >
          <div className="ac3-product-topbar">
            <span>
              <i /> Decision brief
            </span>
            <small>Evidence linked</small>
          </div>
          <div className="ac3-product-canvas">
            <img
              src="/images/architecture-convergence.webp"
              width="1944"
              height="817"
              alt=""
              fetchPriority="high"
            />
            <div className="ac3-plan-card">
              <p>Recommended approach</p>
              <h2>Managed compute. Private data. No cluster.</h2>
              <div className="ac3-plan-route" aria-label="Illustrative architecture">
                <span>Managed edge</span>
                <i />
                <span>Autoscaled API</span>
                <i />
                <span>Private store</span>
              </div>
            </div>
            <div className="ac3-status-card">
              <span>
                <CheckIcon />
              </span>
              <div>
                <small>Policy result</small>
                <strong>Ready for review</strong>
              </div>
            </div>
          </div>
        </figure>
      </section>

      <section className="ac3-trust" aria-label="AgentConstruct product boundaries">
        <div>
          <strong>Cloud-ready</strong>
          <span>Built for real workloads</span>
        </div>
        <div>
          <strong>Evidence-led</strong>
          <span>Reasoning stays reviewable</span>
        </div>
        <div>
          <strong>Governed</strong>
          <span>Humans approve exact plans</span>
        </div>
        <div>
          <strong>Cost-aware</strong>
          <span>Complexity must earn its place</span>
        </div>
      </section>

      <section id="product" className="ac3-product" aria-labelledby="product-heading">
        <div className="ac3-section-heading">
          <p className="ac3-eyebrow">One clear decision record</p>
          <h2 id="product-heading">From requirements to a reviewable plan.</h2>
          <p>Understand what to build, why it fits, and what it should cost before execution.</p>
        </div>
        <div className="ac3-outcomes">
          {outcomes.map((outcome) => (
            <article key={outcome.label} className={`ac3-outcome ac3-outcome-${outcome.tone}`}>
              <span>{outcome.label}</span>
              <h3>{outcome.title}</h3>
              <p>{outcome.text}</p>
            </article>
          ))}
        </div>
        <div id="security" className="ac3-evidence-panel">
          <div>
            <p className="ac3-eyebrow">Built-in restraint</p>
            <h3>Complex infrastructure is a decision, not a default.</h3>
          </div>
          <ul>
            <li>
              <span>Selected</span>
              <strong>Managed services matched to the workload</strong>
            </li>
            <li>
              <span>Rejected</span>
              <strong>Cluster overhead without a proven need</strong>
            </li>
            <li>
              <span>Recorded</span>
              <strong>Cost, risk, policy, and human approval</strong>
            </li>
          </ul>
        </div>
      </section>

      <section id="workflow" className="ac3-workflow" aria-labelledby="workflow-heading">
        <div className="ac3-workflow-heading">
          <p className="ac3-eyebrow">How it works</p>
          <h2 id="workflow-heading">Four steps from intent to accountable action.</h2>
        </div>
        <ol>
          {workflow.map(([number, title, text]) => (
            <li key={number}>
              <span>{number}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="ac3-cta" aria-labelledby="cta-heading">
        <div>
          <p className="ac3-eyebrow">Start with the workload</p>
          <h2 id="cta-heading">Make your next cloud decision easier to trust.</h2>
        </div>
        <Link className="ac3-button ac3-button-light" to="/login">
          Enter AgentConstruct <ArrowIcon />
        </Link>
      </section>

      <footer className="ac3-footer">
        <Link className="ac3-brand" to="/">
          <BrandMark />
          <span>AgentConstruct</span>
        </Link>
        <p>Plan the simplest viable cloud. Prove why.</p>
        <Link to="/login">Workspace sign in</Link>
      </footer>
    </main>
  );
}
