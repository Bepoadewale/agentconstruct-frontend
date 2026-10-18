# Frontend extraction migration audit

Date: 2026-10-16. Source: private `Bepoadewale/AgentConstruct` at
`7dc5c3324a4a8b3dc4a347a3d1cc06fa9d2a2dc9`.

## Existing architecture

The source is a Python 3.12 FastAPI modular monolith with SQLAlchemy/PostgreSQL, a durable worker,
OPA, Prometheus, Grafana, Tempo, provider adapters, Terraform contracts, CLI, and MCP clients. Its
browser UI is plain HTML/CSS/JavaScript mounted by FastAPI. There is no JavaScript package manager,
frontend compiler, CORS middleware, generated API client, SSR, or server component framework.

The browser uses versioned `/api/v1` JSON endpoints and short-lived bearer tokens. Local fixture
login is disabled in hosted mode. Hosted identities are verified against configured JWKS issuer and
audience values, then bound to server-side membership. The UI role controls visibility only; API
services enforce organization, role, exact digest, policy, approval, and execution boundaries.

## Migration inventory

| Classification         | Source                                                                                               | Disposition                                                                          |
| ---------------------- | ---------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| Frontend-only          | `apps/web/index.html`, `app.js`, `styles.css`                                                        | Rebuild in React/TypeScript, test independently, then remove from backend            |
| Frontend-only rules    | `docs/product/UI_DESIGN_SYSTEM.md`, browser portions of `docs/identity-browser-boundary.md`, ADR-009 | Move/adapt into frontend `AGENTS.md` and docs; supersede ADR-009 in backend          |
| Frontend tests         | `scripts/frontend-*-contract.sh`, browser portion of `scripts/browser-contract.sh`                   | Replace with component, accessibility, API-mock, and static-output tests             |
| Backend-only           | `apps/api`, `services`, `integrations`, database models/migrations, workers, CLI/MCP                 | Retain in `AgentConstruct`                                                           |
| Backend-authoritative  | tenant/RBAC, policy, approvals, planning, cost, execution, secrets, audit                            | Retain and test in backend; never duplicate as client authority                      |
| Backend infrastructure | Docker, Compose backend services, Terraform/Kubernetes/GitOps, provider adapters, observability      | Retain; remove only web-copy packaging after migration validation                    |
| Shared contract        | FastAPI `/api/v1` routes and Pydantic request/response shapes                                        | Publish a versioned OpenAPI snapshot; commit frontend types/client; add drift checks |
| Cross-cutting          | CI, README, environment examples, security docs                                                      | Split into repository-specific workflows and documentation                           |
| Frontend assets        | No runtime image/icon imports in the old UI                                                          | Do not copy backend architecture diagrams or provider documentation assets           |
| Obsolete after cutover | FastAPI static mount, `AGENTCONSTRUCT_WEB_ROOT`, old UI cache rules                                  | Remove only in the second-stage backend PR                                           |
| Unclear/empty          | `packages/*`, `services/*` placeholder directories                                                   | Leave in backend; they contain no frontend runtime dependency                        |

## Implemented browser flows found

- Developer and administrator local fixture sign-in, current profile, logout, and role-aware nav.
- Workspace dashboard, administrator review queue, recent projects/activity, history filtering,
  revision comparison, immutable plan detail, and audit evidence.
- GitHub App installation/repository/branch discovery and project repository disconnect.
- Cloud connection metadata, reviewed setup handoff, verification-job polling, inventory status, and
  disconnect. No credentials are handled by the browser.
- Project creation, repository discovery, natural-language intent, interpreted workload,
  architecture generation, customer review creation, submission, approval, rejection, revision,
  constraint regeneration, and review export.
- Approved-plan local dry-run, desired-state publication/check state, Terraform plan-contract,
  readiness preflight, plan-only review, guarded cloud-run request, observed environments, and
  governed local destroy.
- Workspace members/invitations, usage/subscription, API credential, support, data lifecycle,
  comments, status, help, and changelog API surfaces exist; the old UI covered only part of these.

## Coupling and security findings

1. FastAPI mounted the UI at `/`, so frontend deployment and backend image release were coupled.
2. Relative API paths prevented an independent Pages origin.
3. The backend lacked explicit credential-safe CORS configuration.
4. The local UI kept its bearer token in memory, which is safe from persistence but signs out on
   refresh. The extracted OIDC client retains this property and stores only transient PKCE state in
   session storage.
5. The old UI cached stable GET responses and local-only analytics in localStorage. The new UI does
   not persist API data or security-sensitive state; telemetry is a replaceable no-op/local adapter.
6. Rendering via `innerHTML` required repeated escaping discipline. React rendering removes that
   injection-prone pattern for API values.
7. The existing security headers were emitted by FastAPI for both API and UI. Static hosting needs
   a checked-in `_headers` policy, while API headers remain backend-owned.
8. Production identity, live OAuth callback configuration, deployed API URL, and exact Pages origin
   are not available yet; live integration validation is therefore explicitly pending.

## Migration approach

The frontend is extracted first with a clean Git history and no backend source. It uses a
centralized HTTPS API client and static route bundles. Only after independent verification will a
backend PR add exact allowed-origin configuration, publish the contract, stop packaging the old UI,
and remove the static mount. This keeps the original application recoverable throughout cutover.
