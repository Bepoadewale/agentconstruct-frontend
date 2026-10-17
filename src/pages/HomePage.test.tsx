import axe from 'axe-core';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import HomePage from './HomePage';

describe('public product overview', () => {
  it('states the product outcome and labels the example plan truthfully', () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>,
    );
    expect(
      screen.getByRole('heading', {
        name: /simplest AWS architecture for your actual requirements/i,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('complementary', { name: /example infrastructure plan/i }),
    ).toBeInTheDocument();
    expect(screen.getByText('Example plan')).toBeInTheDocument();
    expect(screen.queryByText(/plans remain plans/i)).not.toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Open workspace' })).toHaveAttribute('href', '/login');
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
