export function StatusBadge({ state }: { state: string }) {
  const normalized = state.toLowerCase().replaceAll('_', '-');
  return <span className={`status status-${normalized}`}>{state.replaceAll('_', ' ')}</span>;
}
