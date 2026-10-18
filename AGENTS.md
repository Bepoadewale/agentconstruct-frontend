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

- Do not push directly to `main`; use a focused branch and reviewable PR.
- Every repository change, including documentation, configuration, tests, and cleanup, must be
  made on a focused branch and merged through a GitHub pull request. `main` changes only through
  a reviewed PR whose required checks pass.
- Open a draft PR before substantive implementation whenever GitHub permits it. If an initial
  commit is required, use the smallest possible bootstrap commit, open the draft PR, then add the
  PR-numbered ticket before further substantive work.
- Every PR must include `docs/tickets/ticket<PR_NUMBER>.md` with the goal, current state,
  references, planned work, acceptance criteria and status, validation, evidence, boundaries,
  and follow-up work. CI must reject a PR without its matching ticket.
- Every runnable PR must include `docs/test/test<PR_NUMBER>.md` with the exact clean test cycle,
  result, execution boundary, and known limitations. Documentation-only PRs must state why no
  runtime evidence file is required in their ticket.
- Before review, start from a clean dependency install and run one complete `npm run verify`
  cycle. Record it in both the ticket and runtime evidence file.
- Treat a direct commit or push to `main` as a process incident. Stop, disclose it in the PR
  record, and do not rewrite shared history unless the repository owner explicitly directs it.
- Merge only after the ticket and evidence are current, required checks pass, review feedback is
  resolved, and the merge is clean. Delete the merged branch unless a documented reason requires
  retaining it.
