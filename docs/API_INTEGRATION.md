# API integration

## Base contract

Set `VITE_API_BASE_URL` to the HTTPS origin of the deployed AgentConstruct API, with no trailing
slash. Production intentionally has no localhost default. `src/api/client.ts` owns URL joining,
bearer headers, JSON handling, timeouts, cancellation, safe retries, error normalization, and
request/correlation ID capture.

Only GET/HEAD/OPTIONS are retried automatically. Planning, approval, connection, credential,
deletion, publication, and execution requests are never automatically retried. The client accepts an
explicit idempotency key, but the backend remains responsible for idempotent semantics.

## Endpoints consumed

The client uses existing backend routes:

- identity: `POST /api/v1/auth/local-login` (development only), `GET /api/v1/me`, and
  `POST /api/v1/onboarding` for a provider-verified identity without an existing membership;
- workspace: dashboard, members, invitations, usage, subscription, API credentials, support, and
  data lifecycle under `/api/v1`;
- GitHub: connection, installations, repositories, and branches;
- cloud providers: connection onboarding, verification metadata, and disconnect;
- planning: projects, repository discovery, intents, deployment plans, and customer reviews;
- governance: submit, exact-digest decisions, revisions, comments, desired-state publications,
  readiness preflights, Terraform plan-only evidence, guarded run requests, and local dry-runs;
- observation: environments, audit evidence, and persisted plan execution records.

The endpoint inventory is deliberately versioned. `contracts/openapi-v1.json` is the backend OpenAPI
snapshot used for this extraction, and `npm run check:contract` verifies every operation required by
the frontend. Response types in `src/api/contracts.ts` include
only fields the UI consumes and preserve unknown backend evidence rather than interpreting it as
authority.

## Error behavior

- `401`: sign-in is required or expired; the UI returns to the identity flow.
- `403`: a server permission decision; the UI explains denial and never offers a bypass.
- `409`: stale digest/state or conflicting workflow transition; refresh the immutable record.
- `429`: respect backend throttling; safe reads may retry once.
- `5xx`/network/timeout: show a bounded retry for safe reads; mutations require explicit user action.

Backend responses may include `X-Request-ID` or `X-Correlation-ID`. The normalized `ApiError`
retains it for support diagnostics without logging tokens or request bodies.

## Backend requirements

The cloud API must allow only the exact production and preview origins chosen by the operator, permit
`Authorization` and `Content-Type`, answer OPTIONS, and expose request ID/version headers as needed.
Do not configure wildcard credentialed CORS. Preview origins should not receive production tenant
data unless explicitly allowlisted and protected by the same identity policy.
