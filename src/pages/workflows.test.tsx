import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';

const auth = vi.hoisted(() => ({
  profile: {
    user: { subject: 'developer', role: 'developer' as 'developer' | 'administrator' },
    workspace: { id: 'workspace-1', name: 'Founder workspace' },
  },
  api: { request: vi.fn() },
}));
vi.mock('../auth/AuthContext', () => ({ useAuth: () => auth }));

import ActivityPage from './ActivityPage';
import NewPlanPage from './NewPlanPage';
import PlanPage from './PlanPage';
import SettingsPage from './SettingsPage';

const review = {
  id: 'revision-1',
  plan_id: 'customer-plan-1',
  revision: 1,
  state: 'SUBMITTED',
  creator_subject: 'developer',
  content_digest: 'a'.repeat(64),
  content: {
    summary: { selected_profile: 'App Runner', why: 'Lowest-complexity viable profile' },
    resource_breakdown: [
      { name: 'Application', service: 'AWS App Runner', purpose: 'Managed compute' },
    ],
    security: ['Private customer data'],
    cost_estimate: { monthly_low: 20, monthly_high: 50, assumptions: ['Fixture estimate'] },
    observability: { prometheus: true, grafana: true },
    risks_and_limitations: ['Live deployment is not enabled'],
  },
};

describe('customer workflows', () => {
  it('completes the supported repository-to-review planning contract', async () => {
    auth.profile.user.role = 'developer';
    auth.api.request.mockImplementation((path: string) => {
      if (path === '/api/v1/github/connection')
        return Promise.resolve({
          execution: 'SIMULATED',
          installations: [{ id: 'install-1', account_login: 'demo', account_type: 'Organization' }],
        });
      if (path === '/api/v1/cloud-connections') return Promise.resolve([]);
      if (path.endsWith('/repositories'))
        return Promise.resolve([
          {
            full_name: 'example/support-api',
            html_url: 'https://github.com/example/support-api',
            default_branch: 'main',
          },
        ]);
      if (path.endsWith('/branches')) return Promise.resolve({ branches: ['main'] });
      if (path === '/api/v1/projects')
        return Promise.resolve({ id: 'project-1', name: 'project-1' });
      if (path.endsWith('/repository-discovery')) return Promise.resolve({ evidence: [] });
      if (path === '/api/v1/intents') return Promise.resolve({ id: 'intent-1' });
      if (path === '/api/v1/intents/intent-1/plans')
        return Promise.resolve({
          id: 'deployment-1',
          selected_architecture: { profile: 'App Runner', components: [] },
        });
      if (path === '/api/v1/deployment-plans/deployment-1/customer-review')
        return Promise.resolve({ ...review, state: 'DRAFT' });
      return Promise.reject(new Error(`Unexpected ${path}`));
    });
    const user = userEvent.setup();
    render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="/" element={<NewPlanPage />} />
          <Route path="/plans/:revisionId" element={<div>Review opened</div>} />
        </Routes>
      </MemoryRouter>,
    );
    expect(await screen.findByRole('option', { name: 'example/support-api' })).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: /analyze and create plan/i }));
    expect(await screen.findByText('Review opened')).toBeInTheDocument();
    expect(auth.api.request).toHaveBeenCalledWith(
      '/api/v1/intents',
      expect.objectContaining({
        method: 'POST',
        retrySafe: false,
        body: expect.objectContaining({
          project_id: 'project-1',
          source_repository: 'https://github.com/example/support-api',
        }),
      }),
    );
  });

  it('submits an exact-digest administrator approval and reports backend success', async () => {
    auth.profile.user.role = 'administrator';
    auth.api.request.mockImplementation((path: string, options?: { method?: string }) => {
      if (options?.method === 'POST') return Promise.resolve({ ...review, state: 'APPROVED' });
      return Promise.resolve(review);
    });
    const user = userEvent.setup();
    render(
      <MemoryRouter initialEntries={['/plans/revision-1']}>
        <Routes>
          <Route path="/plans/:revisionId" element={<PlanPage />} />
        </Routes>
      </MemoryRouter>,
    );
    await user.click(await screen.findByRole('button', { name: /approve exact digest/i }));
    await waitFor(() =>
      expect(auth.api.request).toHaveBeenCalledWith(
        '/api/v1/customer-plan-revisions/revision-1/decisions',
        expect.objectContaining({
          method: 'POST',
          body: { decision: 'APPROVED', content_digest: 'a'.repeat(64) },
        }),
      ),
    );
    expect(await screen.findByText(/approval persisted/i)).toBeInTheDocument();
  });

  it('groups audit evidence and exposes inspectable event detail', async () => {
    auth.api.request.mockResolvedValue([
      {
        id: 'event-1',
        action: 'plan_submitted',
        at: '2026-10-16T12:00:00Z',
        actor_subject: 'developer',
        entity_type: 'plan',
        metadata: { digest: 'abc' },
      },
    ]);
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <ActivityPage />
      </MemoryRouter>,
    );
    await user.click(await screen.findByRole('button', { name: /plan submitted/i }));
    const dialog = screen.getByRole('dialog');
    expect(within(dialog).getByRole('heading', { name: /plan submitted/i })).toBeInTheDocument();
    expect(within(dialog).getByText(/event evidence/i)).toBeInTheDocument();
  });

  it('keeps payment collection out of billing-ready settings', async () => {
    auth.profile.user.role = 'developer';
    auth.api.request.mockImplementation((path: string) => {
      if (path.endsWith('/members'))
        return Promise.resolve([{ subject: 'developer', role: 'developer' }]);
      if (path.endsWith('/usage')) return Promise.resolve({ plans_created: 2 });
      if (path.endsWith('/subscription'))
        return Promise.resolve({
          plan_name: 'private-beta',
          state: 'ACTIVE',
          limits: { plans: 20 },
        });
      return Promise.resolve({});
    });
    render(
      <MemoryRouter>
        <SettingsPage />
      </MemoryRouter>,
    );
    expect(await screen.findByText(/does not collect payment details/i)).toBeInTheDocument();
    expect(screen.queryByLabelText(/card number/i)).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: /request deletion/i })).toBeDisabled();
  });
});
