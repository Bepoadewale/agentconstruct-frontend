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

- [ ] Add the static Vite/React/TypeScript application and route-based code splitting.
- [ ] Add a typed API client with timeouts, cancellation, safe retries, bearer auth, and request IDs.
- [ ] Preserve developer/admin, planning, connection, review, execution-status, history, activity,
      settings, support, and truthful unavailable states.
- [ ] Add OIDC/PKCE and explicitly gated local-fixture auth modes without persistent token storage.
- [ ] Add unit/component/contract/accessibility/static-hosting tests and least-privilege CI.
- [ ] Add all required architecture, security, route, testing, local development, deployment,
      free-cost, and migration documents.
- [ ] Validate two clean install/test/build/static cycles and a fresh clone.

## Acceptance criteria

- [ ] Clean `npm ci` and all quality commands pass twice.
- [ ] Production output is static, contains no secret, Worker, Function, server bundle, or 404 page,
      and stays below Cloudflare Pages Free file/asset limits.
- [ ] A nested route refresh resolves through an SPA-capable static server.
- [ ] Mocked tests prove auth guarding, server role authority, planning, review decisions, errors,
      timeouts, and key accessibility expectations.
- [ ] The frontend builds without the backend repository.
- [ ] Docs identify every unexecuted live integration and exact founder handoff step.

## Validation

Pending implementation.

## Boundaries

No AWS or Cloudflare resource will be created. Mocked browser tests do not prove live OAuth,
GitHub, AWS, infrastructure execution, or deployment. The backend remains authoritative.

## Follow-up

After this frontend is independently verified, a separate backend PR will add explicit CORS and
frontend-origin configuration, publish the API contract, remove `apps/web`, and update backend
packaging and documentation.
