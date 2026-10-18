import axe from 'axe-core';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';
import LoginPage from './LoginPage';

vi.mock('../auth/AuthContext', () => ({
  useAuth: () => ({
    profile: null,
    loading: false,
    error: null,
    signIn: vi.fn(),
    localSignIn: vi.fn(),
  }),
}));

describe('hosted workspace sign-in', () => {
  it('fails closed with a clear configuration state', () => {
    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>,
    );

    expect(screen.getByRole('heading', { name: /sign in to your workspace/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Sign-in unavailable' })).toBeDisabled();
    expect(screen.getByText('Workspace access is not configured')).toBeInTheDocument();
    expect(screen.getByText(/Google Workspace sign-in is connected/i)).toBeInTheDocument();
  });

  it('has no automatically detectable WCAG 2.2 A/AA violations', async () => {
    const { container } = render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>,
    );
    const result = await axe.run(container, {
      runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'] },
    });
    expect(result.violations).toEqual([]);
  });
});
