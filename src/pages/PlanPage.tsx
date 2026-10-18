import { useState, type FormEvent } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import type { CustomerPlanRevision } from '../api/contracts';
import { AsyncRegion } from '../components/AsyncRegion';
import { ReadableData, RawData } from '../components/ReadableData';
import { StatusBadge } from '../components/StatusBadge';
import { useAsync } from '../hooks/useAsync';

type MutationBody = Record<string, unknown> | undefined;

export default function PlanPage() {
  const { revisionId = '' } = useParams();
  const { api, profile } = useAuth();
  const state = useAsync(
    (signal) =>
      api.request<CustomerPlanRevision>(
        `/api/v1/customer-plan-revisions/${encodeURIComponent(revisionId)}`,
        { signal },
      ),
    [api, revisionId],
  );
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [reason, setReason] = useState('');
  const [comment, setComment] = useState('');
  const review = state.data;
  const admin = profile?.user.role === 'administrator';

  async function mutate(path: string, body?: MutationBody, success = 'Action recorded.') {
    setBusy(true);
    setError(null);
    setMessage(null);
    try {
      await api.request(path, { method: 'POST', body, retrySafe: false });
      setMessage(success);
      state.reload();
    } catch (mutationError) {
      setError(mutationError instanceof Error ? mutationError.message : 'Action failed.');
    } finally {
      setBusy(false);
    }
  }

  function exportSummary() {
    if (!review) return;
    const blob = new Blob(
      [JSON.stringify({ exported_at: new Date().toISOString(), revision: review }, null, 2)],
      { type: 'application/json' },
    );
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `davdeploy-plan-${review.id}.json`;
    link.click();
    URL.revokeObjectURL(url);
  }

  async function addComment(event: FormEvent) {
    event.preventDefault();
    if (!comment.trim()) return;
    await mutate(
      `/api/v1/customer-plans/revisions/${revisionId}/comments`,
      { body: comment.trim() },
      'Comment recorded.',
    );
    setComment('');
  }

  const latest = <T,>(items?: T[]) => items?.[0] as T | undefined;
  return (
    <div className="page">
      <AsyncRegion
        loading={state.loading}
        error={state.error}
        onRetry={state.reload}
        label="plan review"
      >
        {review ? (
          <>
            <div className="page-heading">
              <div>
                <p className="eyebrow">Infrastructure plan · revision {review.revision}</p>
                <h1>{review.title ?? review.content.summary.selected_profile}</h1>
                <p>{review.content.summary.why}</p>
              </div>
              <div className="heading-actions">
                <StatusBadge state={review.state} />
                <button className="button button-secondary" type="button" onClick={exportSummary}>
                  Export review
                </button>
              </div>
            </div>
            <div className="digest">
              <span>Immutable digest</span>
              <code>{review.content_digest}</code>
              <button
                className="button button-quiet"
                type="button"
                onClick={() => void navigator.clipboard.writeText(review.content_digest)}
              >
                Copy
              </button>
            </div>
            <div className="truth-banner">
              <strong>
                {review.state === 'APPROVED'
                  ? 'Approved, not deployed.'
                  : 'This is a review record, not a deployment.'}
              </strong>
              <span>
                Infrastructure exists only when the backend reports independently observed
                execution.
              </span>
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
            <section className="plan-overview panel">
              <div>
                <p className="eyebrow">Selected architecture</p>
                <h2>{review.content.summary.selected_profile}</h2>
              </div>
              <div className="architecture-flow">
                <div>
                  <b>Repository</b>
                  <small>Source evidence</small>
                </div>
                {review.content.resource_breakdown.map((resource) => (
                  <div key={`${resource.service}-${resource.name}`}>
                    <b>{resource.service}</b>
                    <small>{resource.purpose}</small>
                  </div>
                ))}
                <div className="monitoring">
                  <b>Prometheus + Grafana</b>
                  <small>Metrics and dashboards</small>
                </div>
              </div>
            </section>
            <div className="review-grid">
              <section className="panel">
                <p className="eyebrow">Application evidence</p>
                <h2>Interpreted requirements</h2>
                <ReadableData value={review.content.application_analysis} />
                <RawData value={review.content.application_analysis} />
              </section>
              <section className="panel">
                <p className="eyebrow">Cost</p>
                <h2>Estimated range and assumptions</h2>
                <ReadableData value={review.content.cost_estimate} />
                <RawData value={review.content.cost_estimate} />
              </section>
              <section className="panel">
                <p className="eyebrow">Security</p>
                <h2>Controls in the plan</h2>
                <ReadableData value={review.content.security} />
              </section>
              <section className="panel">
                <p className="eyebrow">Observability</p>
                <h2>Prometheus and Grafana</h2>
                <ReadableData value={review.content.observability} />
              </section>
              <section className="panel">
                <p className="eyebrow">Deployment strategy</p>
                <h2>Governed path</h2>
                <ReadableData value={review.content.deployment_strategy} />
              </section>
              <section className="panel">
                <p className="eyebrow">Risk and uncertainty</p>
                <h2>Known limits and policy</h2>
                <ReadableData
                  value={{
                    risks: review.content.risks_and_limitations,
                    policy_findings: review.content.policy_findings,
                  }}
                />
              </section>
            </div>
            <section className="panel governance-panel">
              <div className="section-heading">
                <div>
                  <p className="eyebrow">Governance</p>
                  <h2>Available next action</h2>
                </div>
              </div>
              <div className="action-stack">
                {review.state === 'DRAFT' ? (
                  <button
                    className="button button-primary"
                    type="button"
                    disabled={busy}
                    onClick={() =>
                      void mutate(
                        `/api/v1/customer-plan-revisions/${review.id}/submit`,
                        undefined,
                        'Submitted for administrator review. It has not been deployed.',
                      )
                    }
                  >
                    Submit for approval
                  </button>
                ) : null}
                {review.state === 'SUBMITTED' && admin ? (
                  <>
                    <button
                      className="button button-primary"
                      type="button"
                      disabled={busy}
                      onClick={() =>
                        void mutate(
                          `/api/v1/customer-plan-revisions/${review.id}/decisions`,
                          { decision: 'APPROVED', content_digest: review.content_digest },
                          'Approval persisted. It has not been deployed.',
                        )
                      }
                    >
                      Approve exact digest
                    </button>
                    <label>
                      Rejection reason
                      <textarea
                        value={reason}
                        onChange={(event) => setReason(event.target.value)}
                      />
                      <button
                        className="button button-danger"
                        type="button"
                        disabled={busy || !reason.trim()}
                        onClick={() =>
                          void mutate(
                            `/api/v1/customer-plan-revisions/${review.id}/decisions`,
                            { decision: 'REJECTED', content_digest: review.content_digest, reason },
                            'Rejection persisted; the creator can revise.',
                          )
                        }
                      >
                        Reject plan
                      </button>
                    </label>
                  </>
                ) : null}
                {review.state === 'SUBMITTED' && !admin ? (
                  <p className="muted">
                    Waiting for an authorized workspace administrator. The backend enforces this
                    decision.
                  </p>
                ) : null}
                {review.state === 'REJECTED' ? (
                  <button
                    className="button button-primary"
                    type="button"
                    disabled={busy}
                    onClick={() =>
                      void mutate(
                        `/api/v1/customer-plans/${review.plan_id}/revisions`,
                        { content: review.content },
                        'New immutable draft revision created.',
                      )
                    }
                  >
                    Create revised draft
                  </button>
                ) : null}
                {review.state === 'APPROVED' || review.state === 'SELF_APPROVED' ? (
                  <ApprovedActions
                    review={review}
                    admin={admin}
                    busy={busy}
                    mutate={mutate}
                    latest={latest}
                  />
                ) : null}
              </div>
            </section>
            <section className="panel">
              <div className="section-heading">
                <div>
                  <p className="eyebrow">Collaboration</p>
                  <h2>Review comments</h2>
                </div>
              </div>
              <form className="comment-form" onSubmit={(event) => void addComment(event)}>
                <label htmlFor="comment">Add context for reviewers</label>
                <textarea
                  id="comment"
                  value={comment}
                  onChange={(event) => setComment(event.target.value)}
                />
                <button
                  className="button button-secondary"
                  disabled={busy || !comment.trim()}
                  type="submit"
                >
                  Add comment
                </button>
              </form>
            </section>
            <section className="panel">
              <p className="eyebrow">Evidence inventory</p>
              <h2>Generated and observed records</h2>
              <ReadableData
                value={{
                  desired_state_publications: review.desired_state_publications ?? [],
                  terraform_plan_renders: review.terraform_plan_renders ?? [],
                  cloud_readiness_preflights: review.cloud_readiness_preflights ?? [],
                  terraform_plan_reviews: review.terraform_plan_reviews ?? [],
                  cloud_execution_runs: review.cloud_execution_runs ?? [],
                  local_executions: review.local_executions ?? [],
                }}
              />
            </section>
          </>
        ) : null}
      </AsyncRegion>
    </div>
  );
}

function ApprovedActions({
  review,
  admin,
  busy,
  mutate,
  latest,
}: {
  review: CustomerPlanRevision;
  admin: boolean;
  busy: boolean;
  mutate: (path: string, body?: MutationBody, success?: string) => Promise<void>;
  latest: <T>(items?: T[]) => T | undefined;
}) {
  const render = latest<Record<string, unknown>>(review.terraform_plan_renders);
  const preflight = latest<Record<string, unknown>>(review.cloud_readiness_preflights);
  const planReview = latest<Record<string, unknown>>(review.terraform_plan_reviews);
  return (
    <div className="approved-actions">
      <div className="notice">
        <strong>Bounded local actions</strong>
        <span>These create evidence or fixture runs. They do not imply a cloud deployment.</span>
      </div>
      <button
        className="button button-secondary"
        disabled={busy}
        type="button"
        onClick={() =>
          void mutate(
            `/api/v1/customer-plan-revisions/${review.id}/execute-dry-run`,
            undefined,
            'Local dry-run queued. Refresh to inspect observed state.',
          )
        }
      >
        Queue local dry-run
      </button>
      <button
        className="button button-secondary"
        disabled={busy}
        type="button"
        onClick={() =>
          void mutate(
            `/api/v1/customer-plan-revisions/${review.id}/desired-state-publications`,
            { content_digest: review.content_digest },
            'Desired-state publication recorded; human review remains required.',
          )
        }
      >
        Create desired-state review
      </button>
      <button
        className="button button-secondary"
        disabled={busy}
        type="button"
        onClick={() =>
          void mutate(
            `/api/v1/customer-plan-revisions/${review.id}/terraform-plan-renders`,
            { content_digest: review.content_digest },
            'Plan-only Terraform contract recorded. Nothing was applied.',
          )
        }
      >
        Generate Terraform contract
      </button>
      {admin ? (
        <>
          <button
            className="button button-secondary"
            disabled={busy}
            type="button"
            onClick={() =>
              void mutate(
                `/api/v1/customer-plan-revisions/${review.id}/cloud-readiness-preflights`,
                {
                  content_digest: review.content_digest,
                  allowed_regions: ['us-east-1'],
                  required_tags: {},
                  execution_mode: 'DRY_RUN_ONLY',
                  require_reviewed_pr: false,
                  runtime_identity_configured: false,
                },
                'Readiness preflight recorded. No provider call occurred.',
              )
            }
          >
            Run readiness preflight
          </button>
          <button
            className="button button-secondary"
            disabled={busy || !preflight}
            type="button"
            onClick={() =>
              void mutate(
                `/api/v1/customer-plan-revisions/${review.id}/terraform-plan-reviews`,
                {
                  content_digest: review.content_digest,
                  preflight_id: preflight?.id ?? null,
                  expected_region: 'us-east-1',
                  mode: 'LOCAL_CONTRACT_ONLY',
                  allow_cloud_plan: false,
                },
                'Plan-only review recorded. Apply remains unavailable.',
              )
            }
          >
            Record plan-only review
          </button>
          <button
            className="button button-secondary"
            disabled={busy || !render || !preflight || !planReview}
            type="button"
            onClick={() =>
              void mutate(
                `/api/v1/customer-plan-revisions/${review.id}/cloud-execution-runs`,
                {
                  content_digest: review.content_digest,
                  terraform_render_id: render?.id ?? null,
                  preflight_id: preflight?.id ?? null,
                  terraform_plan_review_id: planReview?.id ?? null,
                  expected_region: 'us-east-1',
                  mode: 'GUARDED_CLOUD_EXECUTION',
                  confirmation: null,
                },
                'Guarded run request recorded. The backend did not execute cloud changes.',
              )
            }
          >
            Request guarded run record
          </button>
        </>
      ) : null}
    </div>
  );
}
