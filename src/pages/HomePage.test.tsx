import axe from 'axe-core';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import HomePage from './HomePage';

describe('public product overview', () => {
  it('states the product outcome and labels the illustrative decision truthfully', () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>,
    );
    expect(
      screen.getByRole('heading', {
        name: /from application intent to an AWS architecture you can defend/i,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('complementary', { name: /illustrative infrastructure decision/i }),
    ).toBeInTheDocument();
    expect(screen.getByText('Illustrative decision brief')).toBeInTheDocument();
    expect(screen.getByText(/infrastructure tools build/i)).toBeInTheDocument();
    expect(screen.queryByText(/customers trust/i)).not.toBeInTheDocument();
    for (const link of screen.getAllByRole('link', { name: /workspace sign in/i })) {
      expect(link).toHaveAttribute('href', '/login');
    }
    expect(screen.getByRole('link', { name: /see the decision flow/i })).toHaveAttribute(
      'href',
      '#how-it-works',
    );
  });

  it('has no automatically detectable WCAG 2.2 A/AA violations', async () => {
    const { container } = render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>,
    );
    const result = await axe.run(container, {
      runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'] },
    });
    expect(result.violations).toEqual([]);
  });
});
