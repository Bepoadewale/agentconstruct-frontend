type VisualKind =
  | 'overview'
  | 'plan'
  | 'history'
  | 'activity'
  | 'connections'
  | 'settings'
  | 'help'
  | 'architecture'
  | 'governance'
  | 'cost';

const labels: Record<VisualKind, string> = {
  overview: 'Workspace pulse',
  plan: 'Evidence flowing into an approved deployment',
  history: 'Stacked plan revisions',
  activity: 'Audit event timeline',
  connections: 'Repository and cloud connections',
  settings: 'Workspace members and controls',
  help: 'Plan, approve, and deploy lifecycle',
  architecture: 'Simple cloud architecture',
  governance: 'Policy and approval checkpoint',
  cost: 'Cost and complexity comparison',
};

function Nodes({ kind }: { kind: VisualKind }) {
  if (kind === 'history') {
    return (
      <>
        <rect className="pv-muted" x="51" y="29" width="116" height="58" rx="12" />
        <rect className="pv-mid" x="39" y="42" width="116" height="58" rx="12" />
        <rect className="pv-card" x="27" y="55" width="116" height="58" rx="12" />
        <path className="pv-line" d="M45 76h53M45 89h77" />
        <circle className="pv-accent" cx="128" cy="76" r="7" />
      </>
    );
  }
  if (kind === 'activity') {
    return (
      <>
        <path className="pv-line" d="M48 29v86" />
        <path className="pv-line pv-soft" d="M73 43h79M73 72h58M73 101h70" />
        <circle className="pv-accent" cx="48" cy="43" r="8" />
        <circle className="pv-green" cx="48" cy="72" r="8" />
        <circle className="pv-blue" cx="48" cy="101" r="8" />
      </>
    );
  }
  if (kind === 'settings') {
    return (
      <>
        <circle className="pv-card" cx="60" cy="53" r="18" />
        <circle className="pv-mid" cx="60" cy="49" r="6" />
        <path className="pv-line" d="M49 65c3-8 19-8 22 0" />
        <path
          className="pv-shield"
          d="M113 34l29 11v23c0 22-12 35-29 43-17-8-29-21-29-43V45l29-11Z"
        />
        <path className="pv-check" d="m101 71 9 9 17-19" />
      </>
    );
  }
  if (kind === 'cost') {
    return (
      <>
        <path className="pv-axis" d="M30 111h134M30 111V30" />
        <rect className="pv-muted" x="47" y="71" width="20" height="40" rx="5" />
        <rect className="pv-blue" x="87" y="50" width="20" height="61" rx="5" />
        <rect className="pv-accent" x="127" y="84" width="20" height="27" rx="5" />
        <path className="pv-line" d="m45 51 39 13 62-32" />
      </>
    );
  }
  if (kind === 'governance') {
    return (
      <>
        <path
          className="pv-shield"
          d="M96 23l43 16v34c0 31-18 47-43 59-25-12-43-28-43-59V39l43-16Z"
        />
        <path className="pv-check" d="m75 73 14 14 29-34" />
        <circle className="pv-accent" cx="149" cy="40" r="8" />
      </>
    );
  }
  if (kind === 'connections') {
    return (
      <>
        <rect className="pv-card" x="22" y="47" width="47" height="47" rx="14" />
        <path className="pv-line" d="M35 62h21M35 70h15M35 78h18" />
        <path className="pv-route" d="M70 70h50" />
        <circle className="pv-accent" cx="95" cy="70" r="7" />
        <path
          className="pv-cloud"
          d="M130 88h30c14 0 18-18 6-24 0-18-27-23-34-7-14-2-20 9-16 19 2 7 7 12 14 12Z"
        />
      </>
    );
  }
  if (kind === 'architecture' || kind === 'plan') {
    return (
      <>
        <rect className="pv-card" x="17" y="52" width="43" height="36" rx="10" />
        <rect className="pv-card" x="77" y="42" width="43" height="56" rx="10" />
        <rect className="pv-card" x="137" y="52" width="43" height="36" rx="10" />
        <path className="pv-route" d="M61 70h15M121 70h15" />
        <circle className="pv-accent" cx="98" cy="59" r="7" />
        <path className="pv-line" d="M88 76h20M88 84h14" />
      </>
    );
  }
  if (kind === 'help') {
    return (
      <>
        <circle className="pv-card" cx="40" cy="73" r="20" />
        <circle className="pv-card" cx="98" cy="44" r="20" />
        <circle className="pv-card" cx="156" cy="73" r="20" />
        <path className="pv-route" d="M59 64 79 54M117 54l20 10" />
        <path className="pv-check" d="m31 73 7 7 12-15M89 44l7 7 12-15M147 73l7 7 12-15" />
      </>
    );
  }
  return (
    <>
      <rect className="pv-card" x="25" y="34" width="146" height="76" rx="15" />
      <path className="pv-line" d="M43 54h54M43 67h80" />
      <circle className="pv-accent" cx="145" cy="56" r="9" />
      <path className="pv-route" d="M44 90h32l12-12 17 16 17-24 28 20" />
    </>
  );
}

export function ProductVisual({ kind, compact = false }: { kind: VisualKind; compact?: boolean }) {
  return (
    <figure className={`product-visual product-visual-${kind}${compact ? ' is-compact' : ''}`}>
      <svg viewBox="0 0 196 144" role="img" aria-label={labels[kind]}>
        <rect className="pv-surface" x="1" y="1" width="194" height="142" rx="22" />
        <circle className="pv-orbit" cx="170" cy="24" r="33" />
        <circle className="pv-orbit pv-orbit-small" cx="23" cy="124" r="22" />
        <Nodes kind={kind} />
      </svg>
    </figure>
  );
}
