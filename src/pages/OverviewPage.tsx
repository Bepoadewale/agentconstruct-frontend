import { Link } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import type { CustomerPlanRevision, DashboardResponse } from '../api/contracts';
import { AsyncRegion } from '../components/AsyncRegion';
import { EmptyState } from '../components/EmptyState';
import { StatusBadge } from '../components/StatusBadge';
import { useAsync } from '../hooks/useAsync';

function formatDate(value?: string) {
  return value
    ? new Intl.DateTimeFormat(undefined, { dateStyle: 'medium', timeStyle: 'short' }).format(
        new Date(value),
      )
    : 'Date unavailable';
}

export default function OverviewPage() {
  const { api, profile } = useAuth();
  const state = useAsync(
    async (signal) => {
      const dashboard = await api.request<DashboardResponse>('/api/v1/dashboard', { signal });
      const queue =
        profile?.user.role === 'administrator'
          ? await api.request<CustomerPlanRevision[]>(
              '/api/v1/admin/customer-plan-revisions?state=SUBMITTED',
              { signal },
            )
          : [];
      return { dashboard, queue };
    },
    [api, profile?.user.role],
  );

  return (
    <div className="page">
      <div className="page-heading">
        <div>
          <p className="eyebrow">Workspace overview</p>
          <h1>Good decisions, clearly governed.</h1>
          <p>Plans, connections, and review work in one evidence-led view.</p>
        </div>
        <Link className="button button-primary" to="/plans/new">
          Create plan
        </Link>
      </div>
      <AsyncRegion
        loading={state.loading}
        error={state.error}
        onRetry={state.reload}
        label="workspace overview"
      >
        {state.data ? (
          <>
            <section className="metrics" aria-label="Workspace totals">
              <article>
                <span>Projects</span>
                <strong>{state.data.dashboard.projects.length}</strong>
                <small>In this workspace</small>
              </article>
              <article>
                <span>Cloud connections</span>
                <strong>{state.data.dashboard.cloud_connections.length}</strong>
                <small>Scoped metadata links</small>
              </article>
              <article>
                <span>Plan revisions</span>
                <strong>{state.data.dashboard.plans.length}</strong>
                <small>Immutable review records</small>
              </article>
              <article>
                <span>Pending review</span>
                <strong>{state.data.queue.length}</strong>
                <small>Administrator decisions</small>
              </article>
            </section>
            {profile?.user.role === 'administrator' && state.data.queue.length ? (
              <section className="panel accent-panel">
                <div className="section-heading">
                  <div>
                    <p className="eyebrow">Review queue</p>
                    <h2>Plans requiring a decision</h2>
                  </div>
                  <Link to="/history">Open all plans</Link>
                </div>
                <div className="row-list">
                  {state.data.queue.slice(0, 5).map((plan) => (
                    <Link className="row-link" to={`/plans/${plan.id}`} key={plan.id}>
                      <span>
                        <b>{plan.title ?? `Infrastructure plan · revision ${plan.revision}`}</b>
                        <small>{plan.creator_subject}</small>
                      </span>
                      <StatusBadge state={plan.state} />
                      <span aria-hidden="true">›</span>
                    </Link>
                  ))}
                </div>
              </section>
            ) : null}
            <div className="two-column">
              <section className="panel">
                <div className="section-heading">
                  <div>
                    <p className="eyebrow">Recent projects</p>
                    <h2>Work in progress</h2>
                  </div>
                  <Link to="/history">History</Link>
                </div>
                {state.data.dashboard.projects.length ? (
                  <div className="compact-list">
                    {state.data.dashboard.projects.slice(0, 5).map((project) => (
                      <div key={project.id}>
                        <span className="compact-mark">⌘</span>
                        <span>
                          <b>{project.name}</b>
                          <small>{project.repository_url || 'Repository not connected'}</small>
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <EmptyState
                    title="No projects yet"
                    message="Start with an outcome and repository to create your first governed plan."
                    action={{ label: 'Create a plan', to: '/plans/new' }}
                  />
                )}
              </section>
              <section className="panel">
                <div className="section-heading">
                  <div>
                    <p className="eyebrow">Recent activity</p>
                    <h2>Latest evidence</h2>
                  </div>
                  <Link to="/activity">Activity</Link>
                </div>
                {state.data.dashboard.recent_activity?.length ? (
                  <div className="compact-list">
                    {state.data.dashboard.recent_activity.slice(0, 5).map((event, index) => (
                      <div key={event.id ?? index}>
                        <span className="compact-mark">•</span>
                        <span>
                          <b>{event.action.replaceAll('_', ' ')}</b>
                          <small>{formatDate(event.at)}</small>
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <EmptyState
                    title="No activity recorded"
                    message="Governed actions will appear here with actor and entity evidence."
                  />
                )}
              </section>
            </div>
            <section className="onboarding panel">
              <div>
                <p className="eyebrow">Getting started</p>
                <h2>From repository to reviewable architecture</h2>
                <p>
                  Connect only what is needed, state the constraints, then inspect the evidence
                  before approval.
                </p>
              </div>
              <ol>
                <li>
                  <span>1</span>
                  <b>Connect code</b>
                  <small>Choose an authorized repository</small>
                </li>
                <li>
                  <span>2</span>
                  <b>Set constraints</b>
                  <small>Budget, region, data, availability</small>
                </li>
                <li>
                  <span>3</span>
                  <b>Review evidence</b>
                  <small>Cost, security, unknowns, trade-offs</small>
                </li>
              </ol>
            </section>
          </>
        ) : null}
      </AsyncRegion>
    </div>
  );
}
