import type { ReactNode } from 'react';

interface AsyncRegionProps {
  loading: boolean;
  error: Error | null;
  onRetry: () => void;
  children: ReactNode;
  label?: string;
}

export function AsyncRegion({
  loading,
  error,
  onRetry,
  children,
  label = 'content',
}: AsyncRegionProps) {
  if (loading) {
    return (
      <div className="skeleton" aria-label={`Loading ${label}`} role="status">
        <span />
        <span />
        <span />
      </div>
    );
  }
  if (error) {
    return (
      <div className="notice notice-error" role="alert">
        <div>
          <strong>We could not load {label}.</strong>
          <p>{error.message}</p>
        </div>
        <button className="button button-secondary" type="button" onClick={onRetry}>
          Try again
        </button>
      </div>
    );
  }
  return children;
}
