import { Link } from 'react-router-dom';
import BrandMark from '../components/BrandMark';

const decisions = [
  {
    number: '01',
    label: 'Understand',
    title: 'Read the workload, not a template',
    text: 'Repository evidence and operating constraints shape the recommendation from the start.',
  },
  {
    number: '02',
    label: 'Decide',
    title: 'Choose the minimum viable shape',
    text: 'Cost, risk, reliability, and complexity are considered together—not in separate spreadsheets.',
  },
  {
    number: '03',
    label: 'Govern',
    title: 'Make every action accountable',
    text: 'The exact plan digest, policy evidence, and human decision travel as one durable record.',
  },
];

const workflow = [
  ['Connect', 'Authorize a repository and a scoped, backend-controlled AWS connection.'],
  ['Describe', 'State the outcome, budget, data, reliability, and operating constraints.'],
  ['Review', 'Interrogate the architecture, costs, assumptions, unknowns, and alternatives.'],
  ['Approve', 'Authorize the exact plan digest, then compare execution with observed state.'],
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
    <main className="public-page">
      <header className="public-header">
        <Link className="brand" to="/" aria-label="AgentConstruct home">
          <BrandMark />
          <span>AgentConstruct</span>
        </Link>
        <nav aria-label="Public navigation">
          <a href="#product">Product</a>
          <a className="header-workflow-link" href="#how-it-works">
            How it works
          </a>
          <a className="header-value-link" href="#principles">
            Principles
          </a>
        </nav>
        <Link className="header-sign-in" to="/login">
          Open workspace <ArrowIcon />
        </Link>
      </header>

      <section className="public-hero" aria-labelledby="hero-heading">
        <div className="hero-aura" aria-hidden="true" />
        <div className="hero-copy">
          <p className="hero-kicker">
            <span aria-hidden="true" /> AI infrastructure decisions, governed end to end
          </p>
          <h1 id="hero-heading">
            Build the cloud you need. <em>Not the cloud you were sold.</em>
          </h1>
          <p className="hero-summary">
            AgentConstruct turns application intent into the simplest viable AWS architecture—with
            the cost, reasoning, security, and approval trail built in.
          </p>
          <div className="hero-actions">
            <Link className="button button-primary" to="/login">
              Open workspace <ArrowIcon />
            </Link>
            <a className="button button-secondary" href="#product">
              Watch the decision unfold
            </a>
          </div>
          <ul className="hero-principles" aria-label="Product principles">
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
          className="hero-visual"
          aria-label="Illustration of complexity becoming a governed architecture"
        >
          <img
            src="/images/architecture-convergence.webp"
            width="1944"
            height="817"
            alt=""
            fetchPriority="high"
          />
          <figcaption className="visual-caption">
            <span>Signal in</span>
            <span>Decision intelligence</span>
            <span>Governed plan out</span>
          </figcaption>
          <div className="intent-card floating-card">
            <span className="card-overline">Application intent</span>
            <strong>Private support API</strong>
            <p>20 req/s · Restricted data · $1,500 ceiling</p>
            <div className="intent-tags" aria-label="Intent constraints">
              <span>99.9%</span>
              <span>2 environments</span>
            </div>
          </div>
          <div className="approval-card floating-card">
            <span className="approval-glow" aria-hidden="true" />
            <div>
              <span className="card-overline">Policy result</span>
              <strong>Ready for review</strong>
            </div>
            <CheckIcon />
          </div>
          <div className="signal-line signal-line-one" aria-hidden="true" />
          <div className="signal-line signal-line-two" aria-hidden="true" />
        </figure>
      </section>

      <section className="public-proof-strip" aria-label="AgentConstruct product boundary">
        <p>One decision record</p>
        <div aria-hidden="true" />
        <p>Intent → evidence → architecture → approval → observed outcome</p>
        <div aria-hidden="true" />
        <p>AWS-first</p>
      </section>

      <section id="product" className="decision-story" aria-labelledby="story-heading">
        <div className="story-heading" data-reveal>
          <p className="eyebrow">Decision intelligence for infrastructure</p>
          <h2 id="story-heading">
            Complexity enters.
            <br />
            <span>Clarity leaves.</span>
          </h2>
          <p>
            Most tools start after the architecture decision. AgentConstruct starts where the costly
            mistakes begin: deciding what the workload actually needs.
          </p>
        </div>

        <div className="decision-console" data-reveal>
          <div className="console-bar">
            <div className="console-dots" aria-hidden="true">
              <i />
              <i />
              <i />
            </div>
            <span>agentconstruct / decision-brief</span>
            <span className="console-live">
              <i aria-hidden="true" /> Evidence linked
            </span>
          </div>
          <div className="console-body">
            <aside className="console-rail" aria-label="Decision progress">
              <span className="complete">01</span>
              <i aria-hidden="true" />
              <span className="active">02</span>
              <i aria-hidden="true" />
              <span>03</span>
              <i aria-hidden="true" />
              <span>04</span>
            </aside>
            <div className="console-main">
              <div className="console-title">
                <div>
                  <span className="card-overline">Recommended architecture</span>
                  <h3>Managed compute. Private data. No cluster.</h3>
                </div>
                <span className="review-pill">Reviewable</span>
              </div>
              <div className="architecture-flow" aria-label="Illustrative architecture flow">
                <div>
                  <span className="architecture-icon">01</span>
                  <small>Traffic</small>
                  <strong>Managed edge</strong>
                </div>
                <span className="flow-beam" aria-hidden="true">
                  <i />
                </span>
                <div>
                  <span className="architecture-icon">02</span>
                  <small>Compute</small>
                  <strong>Autoscaled API</strong>
                </div>
                <span className="flow-beam" aria-hidden="true">
                  <i />
                </span>
                <div>
                  <span className="architecture-icon">03</span>
                  <small>Data</small>
                  <strong>Private store</strong>
                </div>
              </div>
              <div className="console-insights">
                <article>
                  <span className="card-overline">Why this shape</span>
                  <strong>Variable traffic without cluster operations</strong>
                  <p>Rejects orchestration overhead the workload does not justify.</p>
                </article>
                <article>
                  <span className="card-overline">Decision dimensions</span>
                  <ul>
                    <li>
                      <span>Cost</span>
                      <b>Within boundary</b>
                    </li>
                    <li>
                      <span>Complexity</span>
                      <b>Low</b>
                    </li>
                    <li>
                      <span>Reliability</span>
                      <b>Target met</b>
                    </li>
                  </ul>
                </article>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="principles" className="decision-principles" aria-labelledby="principles-heading">
        <div className="principles-intro" data-reveal>
          <p className="eyebrow">The AgentConstruct difference</p>
          <h2 id="principles-heading">A better answer is not always a bigger stack.</h2>
          <p>
            The system is designed to make restraint legible—to show what was selected, what was
            rejected, and why the simpler path still meets the requirement.
          </p>
        </div>
        <ol>
          {decisions.map((decision) => (
            <li key={decision.number} data-reveal>
              <div>
                <span>{decision.number}</span>
                <small>{decision.label}</small>
              </div>
              <h3>{decision.title}</h3>
              <p>{decision.text}</p>
              <i aria-hidden="true">
                <ArrowIcon />
              </i>
            </li>
          ))}
        </ol>
      </section>

      <section id="how-it-works" className="public-steps" aria-labelledby="how-heading">
        <div className="steps-orbit" aria-hidden="true">
          <i />
          <i />
          <i />
        </div>
        <div className="steps-heading" data-reveal>
          <div>
            <p className="eyebrow">From intent to accountable action</p>
            <h2 id="how-heading">The shortest path to a decision you can defend.</h2>
          </div>
          <p>
            No black-box recommendation. No invisible handoff. No deployment claim before evidence.
          </p>
        </div>
        <ol>
          {workflow.map(([title, text], index) => (
            <li key={title} data-reveal>
              <div>
                <span>0{index + 1}</span>
                {index < workflow.length - 1 && <i aria-hidden="true" />}
              </div>
              <h3>{title}</h3>
              <p>{text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="public-cta" aria-labelledby="cta-heading">
        <div className="cta-glow" aria-hidden="true" />
        <div data-reveal>
          <p className="eyebrow">Start with the workload</p>
          <h2 id="cta-heading">
            Your next cloud decision deserves more than a generated template.
          </h2>
        </div>
        <div data-reveal>
          <Link className="button button-primary" to="/login">
            Enter AgentConstruct <ArrowIcon />
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
