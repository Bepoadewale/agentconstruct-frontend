import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import type { DashboardResponse, PlanSummary } from '../api/contracts';
import { AsyncRegion } from '../components/AsyncRegion';
import { EmptyState } from '../components/EmptyState';
import { StatusBadge } from '../components/StatusBadge';
import { useAsync } from '../hooks/useAsync';

export default function HistoryPage() {
  const { api } = useAuth();
  const state = useAsync(
    (signal) => api.request<DashboardResponse>('/api/v1/dashboard', { signal }),
    [api],
  );
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('ALL');
  const [left, setLeft] = useState('');
  const [right, setRight] = useState('');
  const plans = useMemo(() => state.data?.plans ?? [], [state.data?.plans]);
  const filtered = useMemo(
    () =>
      plans.filter((plan) => {
        const matchesState = filter === 'ALL' || plan.state === filter;
        const value = `${plan.title} ${plan.state} ${plan.creator_subject ?? ''}`.toLowerCase();
        return matchesState && value.includes(query.trim().toLowerCase());
      }),
    [filter, plans, query],
  );
  const selected = (id: string) => plans.find((plan) => plan.id === id);
  const compared = left && right ? ([selected(left), selected(right)] as const) : null;
  const groups = filtered.reduce<Record<string, PlanSummary[]>>((result, plan) => {
    const key = plan.project_id ?? plan.project_name ?? 'Plans';
    (result[key] ??= []).push(plan);
    return result;
  }, {});

  return (
    <div className="page">
      <div className="page-heading">
        <div>
          <p className="eyebrow">Plan history</p>
          <h1>Every draft, decision, and revision.</h1>
          <p>Immutable records grouped by stable backend project identifiers.</p>
        </div>
        <Link className="button button-primary" to="/plans/new">
          Create plan
        </Link>
      </div>
      <div className="filter-bar">
        <label>
          Search
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Title, state, or creator"
          />
        </label>
        <label>
          Status
          <select value={filter} onChange={(event) => setFilter(event.target.value)}>
            <option>ALL</option>
            <option>DRAFT</option>
            <option>SUBMITTED</option>
            <option>APPROVED</option>
            <option>REJECTED</option>
          </select>
        </label>
      </div>
      <section className="panel comparison">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Revision comparison</p>
            <h2>Compare immutable metadata</h2>
          </div>
        </div>
        <div className="compare-controls">
          <label>
            Earlier revision
            <select value={left} onChange={(event) => setLeft(event.target.value)}>
              <option value="">Choose revision</option>
              {plans.map((plan) => (
                <option value={plan.id} key={plan.id}>
                  {plan.title} · r{plan.revision}
                </option>
              ))}
            </select>
          </label>
          <label>
            Later revision
            <select value={right} onChange={(event) => setRight(event.target.value)}>
              <option value="">Choose revision</option>
              {plans.map((plan) => (
                <option value={plan.id} key={plan.id}>
                  {plan.title} · r{plan.revision}
                </option>
              ))}
            </select>
          </label>
        </div>
        {compared?.[0] && compared[1] ? (
          <div className="compare-grid">
            {(['revision', 'state', 'creator_subject', 'created_at'] as const).map((field) => (
              <div key={field}>
                <small>{field.replaceAll('_', ' ')}</small>
                <b>{String(compared[0]?.[field] ?? 'Not available')}</b>
                <b>{String(compared[1]?.[field] ?? 'Not available')}</b>
              </div>
            ))}
          </div>
        ) : (
          <p className="muted">
            Choose two records to compare. Open either plan for full architecture evidence.
          </p>
        )}
      </section>
      <AsyncRegion
        loading={state.loading}
        error={state.error}
        onRetry={state.reload}
        label="plan history"
      >
        {filtered.length ? (
          <div className="history-groups">
            {Object.entries(groups).map(([key, items]) => (
              <section key={key}>
                <div className="group-heading">
                  <b>{items[0].project_name ?? items[0].title}</b>
                  <small>
                    {items.length} revision{items.length === 1 ? '' : 's'}
                  </small>
                </div>
                <div className="row-list">
                  {items.map((plan) => (
                    <Link className="row-link" to={`/plans/${plan.id}`} key={plan.id}>
                      <span>
                        <b>{plan.title}</b>
                        <small>
                          Revision {plan.revision} · {new Date(plan.created_at).toLocaleString()}
                        </small>
                      </span>
                      <StatusBadge state={plan.state} />
                      <span aria-hidden="true">›</span>
                    </Link>
                  ))}
                </div>
              </section>
            ))}
          </div>
        ) : (
          <EmptyState
            title={plans.length ? 'No matching plans' : 'No plans yet'}
            message={
              plans.length
                ? 'Try a different search or status.'
                : 'Create a plan to start workspace history.'
            }
            action={plans.length ? undefined : { label: 'Create a plan', to: '/plans/new' }}
          />
        )}
      </AsyncRegion>
    </div>
  );
}
