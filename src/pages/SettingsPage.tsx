import { useState, type FormEvent } from 'react';
import { useAuth } from '../auth/AuthContext';
import type { Subscription, UsageSummary, WorkspaceMember } from '../api/contracts';
import { AsyncRegion } from '../components/AsyncRegion';
import { ReadableData } from '../components/ReadableData';
import { StatusBadge } from '../components/StatusBadge';
import { useAsync } from '../hooks/useAsync';

export default function SettingsPage() {
  const { api, profile } = useAuth();
  const state = useAsync(
    async (signal) => ({
      members: await api.request<WorkspaceMember[]>('/api/v1/workspace/members', { signal }),
      usage: await api.request<UsageSummary>('/api/v1/usage', { signal }),
      subscription: await api.request<Subscription>('/api/v1/billing/subscription', { signal }),
    }),
    [api],
  );
  const [email, setEmail] = useState('');
  const [supportSubject, setSupportSubject] = useState('');
  const [supportBody, setSupportBody] = useState('');
  const [credential, setCredential] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const admin = profile?.user.role === 'administrator';

  async function action(task: () => Promise<unknown>, success: string) {
    setBusy(true);
    setError(null);
    setMessage(null);
    try {
      await task();
      setMessage(success);
      state.reload();
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : 'Request failed.');
    } finally {
      setBusy(false);
    }
  }

  async function invite(event: FormEvent) {
    event.preventDefault();
    await action(
      () =>
        api.request('/api/v1/workspace/invitations', {
          method: 'POST',
          retrySafe: false,
          body: { email, role: 'developer' },
        }),
      'Invitation recorded. Delivery depends on the configured backend email provider.',
    );
    setEmail('');
  }

  async function createCredential() {
    setBusy(true);
    setError(null);
    try {
      const result = await api.request<{ secret?: string; token?: string; value?: string }>(
        '/api/v1/api-credentials',
        {
          method: 'POST',
          retrySafe: false,
          body: { name: `browser-${new Date().toISOString().slice(0, 10)}`, scopes: ['read'] },
        },
      );
      setCredential(
        result.secret ??
          result.token ??
          result.value ??
          'Credential created; secret format was not returned by this backend.',
      );
      setMessage('Credential created. Copy it now; this view will not persist it.');
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : 'Credential creation failed.');
    } finally {
      setBusy(false);
    }
  }

  async function support(event: FormEvent) {
    event.preventDefault();
    await action(
      () =>
        api.request('/api/v1/support/tickets', {
          method: 'POST',
          retrySafe: false,
          body: { subject: supportSubject, body: supportBody },
        }),
      'Support request recorded by the backend.',
    );
    setSupportSubject('');
    setSupportBody('');
  }

  return (
    <div className="page">
      <div className="page-heading">
        <div>
          <p className="eyebrow">Workspace settings</p>
          <h1>Access, usage, and customer controls.</h1>
          <p>Frontend controls request changes; the backend authorizes and audits them.</p>
        </div>
      </div>
      {message ? (
        <div className="notice notice-success" role="status">
          {message}
        </div>
      ) : null}
      {error ? (
        <div className="notice notice-error" role="alert">
          {error}
        </div>
      ) : null}
      <AsyncRegion
        loading={state.loading}
        error={state.error}
        onRetry={state.reload}
        label="workspace settings"
      >
        {state.data ? (
          <div className="settings-grid">
            <section className="panel">
              <div className="section-heading">
                <div>
                  <p className="eyebrow">Members</p>
                  <h2>Server-resolved access</h2>
                </div>
              </div>
              <div className="member-list">
                {state.data.members.map((member) => (
                  <div key={member.subject}>
                    <span>
                      <b>{member.email ?? member.subject}</b>
                      <small>{member.subject}</small>
                    </span>
                    <StatusBadge state={member.role} />
                  </div>
                ))}
              </div>
              {admin ? (
                <form className="inline-form" onSubmit={(event) => void invite(event)}>
                  <label>
                    Invite developer
                    <input
                      type="email"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      required
                    />
                  </label>
                  <button className="button button-secondary" disabled={busy} type="submit">
                    Create invitation
                  </button>
                </form>
              ) : (
                <p className="muted">Only administrators can change workspace membership.</p>
              )}
            </section>
            <section className="panel">
              <p className="eyebrow">Subscription</p>
              <h2>Billing-ready controls</h2>
              <ReadableData value={state.data.subscription} />
              <p className="muted">
                The private-beta backend uses manual entitlements. This UI does not collect payment
                details.
              </p>
            </section>
            <section className="panel">
              <p className="eyebrow">Usage</p>
              <h2>Metered product activity</h2>
              <ReadableData value={state.data.usage} />
            </section>
            <section className="panel">
              <p className="eyebrow">Developer access</p>
              <h2>Scoped API credential</h2>
              <p className="muted">
                Create a read-only credential. The secret is shown once and never saved by this
                browser.
              </p>
              <button
                className="button button-secondary"
                disabled={busy}
                type="button"
                onClick={() => void createCredential()}
              >
                Create read-only credential
              </button>
              {credential ? (
                <div className="one-time-secret">
                  <strong>Copy now</strong>
                  <code>{credential}</code>
                  <button
                    className="button button-quiet"
                    type="button"
                    onClick={() => {
                      void navigator.clipboard.writeText(credential);
                      setCredential(null);
                    }}
                  >
                    Copy and dismiss
                  </button>
                </div>
              ) : null}
            </section>
            <section className="panel">
              <p className="eyebrow">Privacy</p>
              <h2>Data lifecycle requests</h2>
              <p className="muted">
                Export and deletion are controlled workflows, not immediate browser-side operations.
              </p>
              <div className="button-row">
                <button
                  className="button button-secondary"
                  disabled={busy}
                  type="button"
                  onClick={() =>
                    void action(
                      () =>
                        api.request('/api/v1/data-lifecycle', {
                          method: 'POST',
                          retrySafe: false,
                          body: { request_type: 'EXPORT' },
                        }),
                      'Export request queued for operator review.',
                    )
                  }
                >
                  Request export
                </button>
                <button
                  className="button button-danger"
                  disabled={busy || !admin}
                  type="button"
                  onClick={() => {
                    if (
                      window.confirm(
                        'Request workspace data deletion? The backend still controls approval and retention.',
                      )
                    )
                      void action(
                        () =>
                          api.request('/api/v1/data-lifecycle', {
                            method: 'POST',
                            retrySafe: false,
                            body: { request_type: 'DELETE' },
                          }),
                        'Deletion request queued for operator review.',
                      );
                  }}
                >
                  Request deletion
                </button>
              </div>
            </section>
            <section className="panel">
              <p className="eyebrow">Support</p>
              <h2>Contact the product team</h2>
              <form onSubmit={(event) => void support(event)}>
                <label>
                  Subject
                  <input
                    value={supportSubject}
                    onChange={(event) => setSupportSubject(event.target.value)}
                    required
                    minLength={3}
                  />
                </label>
                <label>
                  Details
                  <textarea
                    value={supportBody}
                    onChange={(event) => setSupportBody(event.target.value)}
                    required
                  />
                </label>
                <button className="button button-primary" disabled={busy} type="submit">
                  Send request
                </button>
              </form>
            </section>
          </div>
        ) : null}
      </AsyncRegion>
    </div>
  );
}
