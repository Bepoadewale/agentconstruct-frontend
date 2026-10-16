import { Link } from 'react-router-dom';

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
      <span className="empty-mark" aria-hidden="true">
        ◇
      </span>
      <div>
        <strong>{title}</strong>
        <p>{message}</p>
        {action ? <Link to={action.to}>{action.label}</Link> : null}
      </div>
    </div>
  );
}
