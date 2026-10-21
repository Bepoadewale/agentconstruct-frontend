import { Link } from 'react-router-dom';

function EmptyIllustration() {
  return (
    <svg className="empty-illustration" viewBox="0 0 96 72" aria-hidden="true">
      <rect x="12" y="13" width="72" height="46" rx="12" />
      <path d="M28 31h40M28 41h25" />
      <circle cx="68" cy="41" r="8" />
    </svg>
  );
}

export function EmptyState({
  title,
  message,
  action,
}: {
  title: string;
  message: string;
  action?: { label: string; to: string };
}) {
  return (
    <div className="empty-state">
      <EmptyIllustration />
      <div>
        <strong>{title}</strong>
        <p>{message}</p>
        {action ? <Link to={action.to}>{action.label}</Link> : null}
      </div>
    </div>
  );
}
