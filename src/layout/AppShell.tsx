import { useState } from 'react';
import { Link, NavLink, Outlet } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import { publicConfigurationIssues } from '../config';

const primary = [
  { to: '/overview', label: 'Overview', icon: '◈' },
  { to: '/plans/new', label: 'New plan', icon: '+' },
  { to: '/history', label: 'Plan history', icon: '◇' },
  { to: '/activity', label: 'Activity', icon: '≡' },
  { to: '/connections', label: 'Connections', icon: '↗' },
];

export function AppShell() {
  const { profile, signOut } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const issues = publicConfigurationIssues();
  return (
    <div className="app-shell">
      <a className="skip-link" href="#main-content">
        Skip to main content
      </a>
      <header className="topbar">
        <Link className="brand" to="/overview" aria-label="AgentConstruct overview">
          <span className="brand-mark">A</span>
          <span>AgentConstruct</span>
        </Link>
        <span className="environment-pill">
          <i /> Governed control plane
        </span>
        <button
          className="menu-toggle button button-secondary"
          type="button"
          aria-controls="sidebar"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((value) => !value)}
        >
          Menu
        </button>
      </header>
      <aside id="sidebar" className={`sidebar ${menuOpen ? 'sidebar-open' : ''}`}>
        <div className="workspace-card">
          <span className="workspace-avatar">{profile?.workspace.name.slice(0, 1) ?? 'A'}</span>
          <span>
            <b>{profile?.workspace.name ?? 'Workspace'}</b>
            <small>{profile?.user.role ?? 'member'}</small>
          </span>
        </div>
        <nav aria-label="Workspace navigation">
          <p className="nav-label">Workspace</p>
          {primary.map((item) => (
            <NavLink key={item.to} to={item.to} onClick={() => setMenuOpen(false)}>
              <span aria-hidden="true">{item.icon}</span>
              {item.label}
            </NavLink>
          ))}
          <p className="nav-label">Account</p>
          <NavLink to="/settings" onClick={() => setMenuOpen(false)}>
            <span aria-hidden="true">⚙</span>Settings
          </NavLink>
          <NavLink to="/help" onClick={() => setMenuOpen(false)}>
            <span aria-hidden="true">?</span>Help & updates
          </NavLink>
        </nav>
        <div className="sidebar-footer">
          <div>
            <span className="online-dot" />
            <span>
              <b>Authenticated</b>
              <small>API-enforced access</small>
            </span>
          </div>
          <button type="button" className="button button-quiet" onClick={() => void signOut()}>
            Sign out
          </button>
        </div>
      </aside>
      <main id="main-content" className="main-content">
        {issues.length ? (
          <div className="configuration-banner" role="status">
            <strong>Integration setup required</strong>
            <span>{issues.join(' ')}</span>
          </div>
        ) : null}
        <Outlet />
      </main>
    </div>
  );
}
