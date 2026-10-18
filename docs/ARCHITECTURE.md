# Frontend architecture

## Ownership

`agentconstruct-frontend` is a static React/TypeScript application. `AgentConstruct` is the cloud
backend and authoritative control plane. They release independently and communicate through
authenticated HTTPS `/api/v1` requests.

```text
Browser on pages.dev or app.<future-domain>
  -> static HTML/CSS/route-split JavaScript from Cloudflare Pages Free
  -> bearer-authenticated HTTPS requests
AWS API Gateway and Lambda AgentConstruct API
  -> trusted identity verification and server membership
  -> tenant/RBAC/policy/planning/cost/approval/audit
  -> governed source-control and cloud integrations
  -> isolated jobs, execution, observation, and persistence
```

The browser cannot approve itself, select an authoritative architecture, calculate an authoritative
price, receive provider credentials, execute infrastructure, or rewrite audit evidence. Route and
button guards improve usability only; the API repeats every security-relevant decision.

## Application structure

- `src/api`: typed browser contract and the only HTTP client.
- `src/auth`: memory-only Cognito ID-token session, Google authorization-code/PKCE adapter, and
  lazy-loaded email OTP adapter.
- `src/layout`: authenticated shell and navigation.
- `src/pages`: lazy route bundles for public, planning, review, connections, activity, and settings.
- `src/components`: accessible shared presentation primitives.
- `public/_headers`: static browser security policy; it contains no backend logic.
- `scripts`: static-output and nested-route checks.

No frontend build imports the backend repository. Portable response types are committed in
`src/api/contracts.ts`; the backend's FastAPI OpenAPI document is the authoritative machine-readable
contract. Contract compatibility is validated in the backend migration PR and should become a
generated-client gate when the API stabilizes beyond private beta.

## Hosting and configuration

Vite emits `dist`. There is no SSR, Node server, Pages Function, Worker, KV, D1, R2, Durable Object,
or Cloudflare AI dependency. Without production configuration the public shell still renders, while
sign-in clearly reports that integration setup is required.

Public browser configuration uses `VITE_*` values. These are never secret. The API base URL and
OIDC issuer/client/redirect and Cognito region values differ by environment; the future custom domain requires only
configuration and allowlist changes, not an architecture change.

## Provider evolution

The UI renders backend plan records rather than embedding provider selection logic. Operational
providers and capabilities come from the backend. New provider adapters can add server capabilities
and typed contract fields without moving authority into this client. REST, CLI, and MCP remain peer
clients of the same backend.
