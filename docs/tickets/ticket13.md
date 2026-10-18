# Ticket 13: Polish authenticated dashboards

## Goal

Bring the developer and administrator workspaces into the same premium visual system as the public site while making each role's next action immediately clear.

## Scope

- Redesign the authenticated application shell, navigation, workspace context, and account controls.
- Create role-aware overview experiences for developers and administrators.
- Improve the hierarchy of review work, plans, connections, projects, and recent evidence.
- Refine responsive and keyboard-accessible behavior across desktop, tablet, and mobile.
- Preserve truthful empty, loading, error, and permission states.

## Boundaries

- The backend remains authoritative for identity, role, tenant access, approvals, and execution.
- Dashboard metrics are derived only from backend responses.
- No unsupported provider, deployment, or customer claim is introduced.
- No Cloudflare runtime or paid service is added.

## Acceptance criteria

- The signed-in shell visibly belongs to the same product as the landing and sign-in pages.
- Developer and administrator overviews prioritize distinct, role-appropriate work.
- Existing routes remain available and understandable on desktop and mobile.
- The overview has useful empty and error states without fabricated data.
- Two complete validation cycles pass.

## Validation

- Reviewed the five latest product screenshots from October 18, 2026.
- Reviewed current dashboard information architecture from Cloudflare and Vercel official product documentation.
- Inspected developer and administrator dashboards at 1440 by 1100.
- Inspected the administrator dashboard at 390 by 844.
- Verified the dashboard remains legible when the operating system prefers dark mode.
- Clean dependency installation completed with zero reported vulnerabilities.
- Two consecutive `npm run verify` cycles passed.
- 19 tests passed, including automated WCAG 2.2 A and AA checks for the administrator dashboard.
- 34 frontend operations matched the backend API contract.
- Static output contains 25 files, no secret patterns, no Functions, no Worker runtime, and no top-level 404 file.
- Nested route refresh returned the static application shell.

## Outcome

The authenticated product now shares the public site's warm canvas, ink-green navigation, orange action color, green trust signals, restrained blue details, editorial type scale, and compact surfaces. Developers receive a plan-continuity view, while administrators receive a decision-first review queue. Workspace readiness is explicit, metrics are backend-derived, and the shell remains usable from mobile through wide desktop layouts.
