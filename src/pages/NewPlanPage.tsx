import { useEffect, useMemo, useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import { newIdempotencyKey } from '../api/client';
import type {
  CloudConnection,
  CustomerPlanRevision,
  GitHubConnection,
  GitHubRepository,
  PlanGenerationResult,
  ProjectSummary,
} from '../api/contracts';
import { AsyncRegion } from '../components/AsyncRegion';
import { StatusBadge } from '../components/StatusBadge';
import { useAsync } from '../hooks/useAsync';

interface FormState {
  repository: string;
  branch: string;
  cloudConnectionId: string;
  region: string;
  dataClassification: string;
  budget: string;
  environment: string;
  availability: string;
  workload: string;
  prompt: string;
}

const initialForm: FormState = {
  repository: '',
  branch: '',
  cloudConnectionId: '',
  region: 'us-east-1',
  dataClassification: 'restricted',
  budget: '1500',
  environment: 'staging,production',
  availability: '99.9%',
  workload: 'AI API',
  prompt:
    'Deploy this AI API in the cloud. Keep customer data private. Support 20 requests per second and peak at 100 requests per second. Create staging and production. Enable monitoring and Slack alerts.',
};

function slug(): string {
  return `project-${Date.now().toString().slice(-8)}`;
}

export default function NewPlanPage() {
  const { api } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState(initialForm);
  const [repositories, setRepositories] = useState<GitHubRepository[]>([]);
  const [branches, setBranches] = useState<string[]>([]);
  const [busy, setBusy] = useState(false);
  const [progress, setProgress] = useState('');
  const [error, setError] = useState<string | null>(null);
  const state = useAsync(
    async (signal) => ({
      github: await api.request<GitHubConnection>('/api/v1/github/connection', { signal }),
      cloud: await api.request<CloudConnection[]>('/api/v1/cloud-connections', { signal }),
    }),
    [api],
  );
  const installation = state.data?.github.installations[0];

  useEffect(() => {
    if (!installation) return;
    const controller = new AbortController();
    api
      .request<GitHubRepository[]>(
        `/api/v1/github/installations/${encodeURIComponent(installation.id)}/repositories`,
        { signal: controller.signal },
      )
      .then((items) => {
        setRepositories(items);
        if (items[0])
          setForm((current) => ({
            ...current,
            repository: current.repository || items[0].html_url,
            branch: current.branch || items[0].default_branch,
          }));
      })
      .catch((reason: unknown) =>
        setError(reason instanceof Error ? reason.message : 'Repository discovery failed.'),
      );
    return () => controller.abort();
  }, [api, installation]);

  const repository = useMemo(
    () => repositories.find((item) => item.html_url === form.repository),
    [form.repository, repositories],
  );
  useEffect(() => {
    if (!installation || !repository) return;
    const controller = new AbortController();
    const encoded = repository.full_name.split('/').map(encodeURIComponent).join('/');
    api
      .request<{ branches: string[] }>(
        `/api/v1/github/installations/${encodeURIComponent(installation.id)}/repositories/${encoded}/branches`,
        { signal: controller.signal },
      )
      .then((result) => {
        setBranches(result.branches);
        setForm((current) => ({
          ...current,
          branch: result.branches.includes(current.branch)
            ? current.branch
            : repository.default_branch || result.branches[0] || '',
        }));
      })
      .catch((reason: unknown) =>
        setError(reason instanceof Error ? reason.message : 'Branch discovery failed.'),
      );
    return () => controller.abort();
  }, [api, installation, repository]);

  const update = (field: keyof FormState, value: string) =>
    setForm((current) => ({ ...current, [field]: value }));

  async function submit(event: FormEvent) {
    event.preventDefault();
    setBusy(true);
    setError(null);
    try {
      if (!form.repository || !form.branch)
        throw new Error('Choose an authorized repository and branch.');
      if (form.prompt.trim().length < 20)
        throw new Error('Describe the intended outcome in at least 20 characters.');
      setProgress('Creating tenant-scoped project…');
      const project = await api.request<ProjectSummary>('/api/v1/projects', {
        method: 'POST',
        retrySafe: false,
        body: { name: slug(), repository_url: form.repository, repository_branch: form.branch },
      });
      setProgress('Collecting repository evidence…');
      await api.request(`/api/v1/projects/${project.id}/repository-discovery`);
      setProgress('Interpreting constraints…');
      const constraints = `\n\nExplicit constraints: region=${form.region}; data=${form.dataClassification}; monthly budget USD=${form.budget}; environments=${form.environment}; availability=${form.availability}; workload=${form.workload}.`;
      const intent = await api.request<{ id: string }>('/api/v1/intents', {
        method: 'POST',
        retrySafe: false,
        idempotencyKey: newIdempotencyKey(),
        body: {
          project_id: project.id,
          prompt: `${form.prompt.trim()}${constraints}`,
          source_repository: form.repository,
          cloud_connection_id: form.cloudConnectionId || null,
          idempotency_key: newIdempotencyKey(),
        },
      });
      setProgress('Comparing minimum-necessary architectures…');
      const plan = await api.request<PlanGenerationResult>(`/api/v1/intents/${intent.id}/plans`, {
        method: 'POST',
        retrySafe: false,
      });
      setProgress('Creating immutable customer review…');
      const review = await api.request<CustomerPlanRevision>(
        `/api/v1/deployment-plans/${plan.id}/customer-review`,
        { method: 'POST', retrySafe: false },
      );
      navigate(`/plans/${review.id}`);
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : 'Plan generation failed.');
    } finally {
      setBusy(false);
      setProgress('');
    }
  }

  return (
    <div className="page narrow-page">
      <div className="page-heading">
        <div>
          <p className="eyebrow">New infrastructure plan</p>
          <h1>Start with the outcome.</h1>
          <p>
            AgentConstruct turns intent and explicit constraints into a reviewable cloud
            architecture. This step does not deploy. An approved plan can proceed to governed
            deployment in the connected customer cloud.
          </p>
        </div>
        <span className="mode-pill">
          <i /> Plan before change
        </span>
      </div>
      <AsyncRegion
        loading={state.loading}
        error={state.error}
        onRetry={state.reload}
        label="planning connections"
      >
        {state.data ? (
          <form className="planning-form" onSubmit={(event) => void submit(event)}>
            <section className="panel">
              <div className="section-heading">
                <div>
                  <p className="eyebrow">01 · Evidence</p>
                  <h2>Source and target</h2>
                </div>
                {state.data.github.execution ? (
                  <StatusBadge state={state.data.github.execution} />
                ) : null}
              </div>
              <div className="form-grid two">
                <label>
                  GitHub repository
                  <select
                    value={form.repository}
                    onChange={(event) => update('repository', event.target.value)}
                    required
                  >
                    <option value="">Choose repository</option>
                    {repositories.map((item) => (
                      <option value={item.html_url} key={item.full_name}>
                        {item.full_name}
                      </option>
                    ))}
                  </select>
                </label>
                <label>
                  Branch
                  <select
                    value={form.branch}
                    onChange={(event) => update('branch', event.target.value)}
                    required
                  >
                    <option value="">Choose branch</option>
                    {branches.map((branch) => (
                      <option key={branch}>{branch}</option>
                    ))}
                  </select>
                </label>
                <label className="span-two">
                  Cloud target
                  <select
                    value={form.cloudConnectionId}
                    onChange={(event) => update('cloudConnectionId', event.target.value)}
                  >
                    <option value="">Local planning only · no cloud account</option>
                    {state.data.cloud.map((item) => (
                      <option value={item.id} key={item.id}>
                        {item.display_name} · {item.setup_state}
                      </option>
                    ))}
                  </select>
                  <small>
                    A connected account is optional. Credentials never enter the browser.
                  </small>
                </label>
              </div>
            </section>
            <section className="panel">
              <div className="section-heading">
                <div>
                  <p className="eyebrow">02 · Customer intent</p>
                  <h2>What should AgentConstruct build?</h2>
                </div>
              </div>
              <label>
                Desired outcome
                <textarea
                  rows={7}
                  value={form.prompt}
                  onChange={(event) => update('prompt', event.target.value)}
                  required
                />
              </label>
              <details className="advanced">
                <summary>Planning constraints</summary>
                <div className="form-grid three">
                  <label>
                    Region
                    <select
                      value={form.region}
                      onChange={(event) => update('region', event.target.value)}
                    >
                      <option>us-east-1</option>
                      <option>eu-west-1</option>
                    </select>
                  </label>
                  <label>
                    Data
                    <select
                      value={form.dataClassification}
                      onChange={(event) => update('dataClassification', event.target.value)}
                    >
                      <option value="restricted">Restricted</option>
                      <option value="internal">Internal</option>
                      <option value="public">Public</option>
                    </select>
                  </label>
                  <label>
                    Monthly budget (USD)
                    <input
                      type="number"
                      min="1"
                      value={form.budget}
                      onChange={(event) => update('budget', event.target.value)}
                    />
                  </label>
                  <label>
                    Environments
                    <input
                      value={form.environment}
                      onChange={(event) => update('environment', event.target.value)}
                    />
                  </label>
                  <label>
                    Availability
                    <select
                      value={form.availability}
                      onChange={(event) => update('availability', event.target.value)}
                    >
                      <option>99.9%</option>
                      <option>99.99%</option>
                    </select>
                  </label>
                  <label>
                    Workload
                    <input
                      value={form.workload}
                      onChange={(event) => update('workload', event.target.value)}
                    />
                  </label>
                </div>
              </details>
            </section>
            {error ? (
              <div className="notice notice-error" role="alert">
                {error}
              </div>
            ) : null}
            {progress ? (
              <div className="notice" role="status">
                <span className="spinner" />
                {progress}
              </div>
            ) : null}
            <div className="form-actions">
              <button className="button button-primary" type="submit" disabled={busy}>
                {busy ? 'Building review…' : 'Analyze and create plan'}
              </button>
              <span>Creates a draft review record. No cloud resources are created.</span>
            </div>
          </form>
        ) : null}
      </AsyncRegion>
    </div>
  );
}
