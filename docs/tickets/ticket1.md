# PR #1: Extract the AgentConstruct frontend

## Goal

Create an independently buildable, private React/TypeScript frontend that preserves the
implemented product flows, communicates only with the governed backend API, and is compatible
with static Cloudflare Pages Free hosting.

## Starting state

- The browser product was 1,428 lines of server-served HTML, CSS, and JavaScript in
  `AgentConstruct/apps/web`.
- FastAPI mounted those assets at `/`; the UI used relative `/api/v1` requests.
- Browser and backend source shared a deployable image and repository but no runtime package.
- Local fixture bearer login existed; hosted mode required an external JWKS/OIDC issuer.
- Tenant, role, policy, approval, pricing, cloud, and execution authority were server-side.
- No CORS middleware or independently deployable frontend existed.

## References

- Source `AGENTS.md`, ADR-009, API routes, identity/browser boundary, product flow, and UI design
  system.
- Cloudflare Pages static SPA requirements supplied in the migration assignment.

## Work

- [x] Add the static Vite/React/TypeScript application and route-based code splitting.
- [x] Add a typed API client with timeouts, cancellation, safe retries, bearer auth, and request IDs.
- [x] Preserve developer/admin, planning, connection, review, execution-status, history, activity,
      settings, support, and truthful unavailable states.
- [x] Add OIDC/PKCE and explicitly gated local-fixture auth modes without persistent token storage.
- [x] Add unit/component/contract/accessibility/static-hosting tests and least-privilege CI.
- [x] Add all required architecture, security, route, testing, local development, deployment,
      free-cost, and migration documents.
- [x] Validate two clean install/test/build/static cycles and a fresh clone.

## Acceptance criteria

- [x] Clean `npm ci` and all quality commands pass twice.
- [x] Production output is static, contains no secret, Worker, Function, server bundle, or 404 page,
      and stays below Cloudflare Pages Free file/asset limits.
- [x] A nested route refresh resolves through an SPA-capable static server.
- [x] Mocked tests prove auth guarding, server role authority, planning, review decisions, errors,
      timeouts, and key accessibility expectations.
- [x] The frontend builds without the backend repository.
- [x] Docs identify every unexecuted live integration and exact founder handoff step.

## Validation

Two clean cycles moved `node_modules`, `dist`, coverage, and TypeScript metadata out of the working
tree, then ran `npm ci --ignore-scripts` and `npm run verify`. Both passed on 2026-10-16:

- Prettier, ESLint, strict TypeScript: pass.
- Vitest: 5 files and 16 tests pass; 49.62% statements, 53.14% branches, 38.09% functions,
  50.31% lines.
- Backend OpenAPI snapshot: 34 required operations pass.
- Production Vite build: pass in under one second locally.
- Static inspection: 23 files; largest 221,714 bytes; no Function, Worker, server runtime,
  top-level 404, or detected credential pattern.
- Nested `/plans/refresh-contract` static refresh: pass.
- `npm audit --audit-level=moderate`: zero vulnerabilities.

A third `npm run verify` passed from a fresh private GitHub clone in
`/tmp/agentconstruct-frontend-clone.5bFDa3/repo`, without the backend checkout. GitHub Actions jobs
`verify` and `secrets` also passed on the draft PR.

After backend PR #83 established the final boundary, the frontend snapshot was synchronized with
its generated OpenAPI v1 contract, the development API default was corrected to port 8080, and the
complete `npm run verify` gate passed again with the same 16 tests and zero audit findings.

Visual QA used Chrome headless screenshots at desktop and narrow widths after the normal browser
connector failed to initialize. The public page rendered its full content; responsive behavior also
has CSS contract coverage. Live sign-in and authenticated API screens remain environment validation.

## Boundaries

No AWS or Cloudflare resource will be created. Mocked browser tests do not prove live OAuth,
GitHub, AWS, infrastructure execution, or deployment. The backend remains authoritative.

## Follow-up

Backend PR #83 adds exact-origin CORS and frontend-origin configuration, publishes the API contract,
removes `apps/web`, and updates backend packaging and documentation. Its live hosted configuration
still depends on the future `pages.dev` hostname and production identity values.
