import { useMemo, useState } from 'react';
import { useAuth } from '../auth/AuthContext';
import type { AuditEvent } from '../api/contracts';
import { AsyncRegion } from '../components/AsyncRegion';
import { EmptyState } from '../components/EmptyState';
import { RawData } from '../components/ReadableData';
import { ProductVisual } from '../components/ProductVisual';
import { useAsync } from '../hooks/useAsync';

export default function ActivityPage() {
  const { api } = useAuth();
  const state = useAsync(
    (signal) => api.request<AuditEvent[]>('/api/v1/audit-evidence', { signal }),
    [api],
  );
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState<AuditEvent | null>(null);
  const events = useMemo(
    () =>
      (state.data ?? []).filter((event) =>
        JSON.stringify(event).toLowerCase().includes(query.toLowerCase()),
      ),
    [query, state.data],
  );
  const grouped = events.reduce<Record<string, AuditEvent[]>>((result, event) => {
    const day = event.at
      ? new Date(event.at).toLocaleDateString(undefined, { dateStyle: 'long' })
      : 'Date unavailable';
    (result[day] ??= []).push(event);
    return result;
  }, {});
  return (
    <div className="page">
      <div className="page-heading visual-page-heading">
        <div>
          <p className="eyebrow">Audit activity</p>
          <h1>Every action leaves a trail.</h1>
          <p>Actors, decisions, and execution in time.</p>
        </div>
        <ProductVisual kind="activity" />
        <button className="button button-secondary" type="button" onClick={state.reload}>
          Refresh
        </button>
      </div>
      <div className="filter-bar single">
        <label>
          Search activity
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Action, actor, or entity"
          />
        </label>
      </div>
      <AsyncRegion
        loading={state.loading}
        error={state.error}
        onRetry={state.reload}
        label="audit activity"
      >
        {events.length ? (
          <div className="activity-groups">
            {Object.entries(grouped).map(([date, items]) => (
              <section key={date}>
                <div className="group-heading">
                  <b>{date}</b>
                  <small>{items.length} events</small>
                </div>
                <div className="timeline">
                  {items.map((event, index) => (
                    <button
                      type="button"
                      key={event.id ?? index}
                      onClick={() => setSelected(event)}
                    >
                      <span className="timeline-dot" />
                      <span>
                        <b>{event.action.replaceAll('_', ' ')}</b>
                        <small>
                          {event.actor_subject ?? 'system'} · {event.entity_type ?? 'event'} ·{' '}
                          {event.at ? new Date(event.at).toLocaleTimeString() : 'time unavailable'}
                        </small>
                      </span>
                      <span aria-hidden="true">›</span>
                    </button>
                  ))}
                </div>
              </section>
            ))}
          </div>
        ) : (
          <EmptyState
            title="No matching activity"
            message="New governed actions will appear here."
          />
        )}
      </AsyncRegion>
      {selected ? (
        <div className="drawer-backdrop" role="presentation" onMouseDown={() => setSelected(null)}>
          <aside
            className="drawer"
            role="dialog"
            aria-modal="true"
            aria-labelledby="event-title"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <div className="section-heading">
              <div>
                <p className="eyebrow">Audit event</p>
                <h2 id="event-title">{selected.action.replaceAll('_', ' ')}</h2>
              </div>
              <button
                className="button button-secondary"
                type="button"
                onClick={() => setSelected(null)}
              >
                Close
              </button>
            </div>
            <RawData value={selected} label="Event evidence" />
          </aside>
        </div>
      ) : null}
    </div>
  );
}
