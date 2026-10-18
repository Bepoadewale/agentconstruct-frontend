# AgentConstruct frontend guide

## Scope

This repository owns the static React browser client for AgentConstruct. The private
`Bepoadewale/AgentConstruct` repository owns the API, identity verification, tenant
authorization, planning, pricing, policy, approvals, audit integrity, cloud integrations,
and execution.

## Non-negotiable boundaries

- Build a static application suitable for Cloudflare Pages Free. Do not add Pages Functions,
  Workers, KV, D1, R2, Durable Objects, Workers AI, or another paid Cloudflare dependency.
- The browser may present and validate input, but it never authorizes tenant access, roles,
  approvals, pricing, infrastructure choices, secret access, or execution.
- Never place OAuth client secrets, cloud provider credentials, GitHub App credentials, model keys,
  private tokens, customer data, or long-lived secrets in source, public environment values,
  logs, localStorage, or a bundle.
- Call only the documented versioned backend API through `src/api/client.ts`.
- Do not add authoritative infrastructure selection or cost calculations to the client.
- Label simulated, local, planned, approved, and observed states truthfully. Approval is not
  deployment.
- Present only provider capabilities returned by the backend as operational. Keep general product
  positioning provider-neutral.
- Retain Prometheus and Grafana as the intended product monitoring experience.

## Product and design rules

- Prefer the clearest and simplest workflow that communicates evidence, costs, assumptions,
  unknowns, trade-offs, and the next governed action.
- Meet WCAG 2.2 AA expectations for core routes: semantic landmarks, visible focus, keyboard
  access, labelled controls, status announcements, and sufficient contrast.
- Every asynchronous surface needs loading, empty, permission-denied, failure, and retry states.
- Avoid decorative motion, gradients, fabricated metrics, fake deployment states, and buttons
  that appear operational when the API cannot support them.
- Keep route bundles small; lazy-load authenticated pages and expensive visualizations.

## Development workflow

- Do not push directly to `main`. Every change, including documentation, uses a focused branch
  and a GitHub pull request.
- Open a draft PR before substantive implementation. Each PR must have
  `docs/tickets/ticket<PR_NUMBER>.md` with scope, criteria, validation, boundaries, and outcome.
- Before review, run `npm ci`, `npm run format:check`, `npm run lint`, `npm run typecheck`,
  `npm test`, `npm run build`, and `npm run check:static`.
- Runnable changes require two clean validation cycles recorded in the PR ticket. Merge only
  after required checks pass and review feedback is resolved; delete merged branches.
