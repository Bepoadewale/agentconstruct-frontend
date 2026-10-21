# Test 24: Public repository selection

## Commands executed

- `npm ci && npm run verify`

## Result

Passed one clean cycle on 2026-10-21:

- Prettier, ESLint, and TypeScript checks passed.
- 26 Vitest tests passed across 7 files.
- All 35 frontend API operations matched the committed OpenAPI contract.
- The production build emitted 28 static files with no Functions, Worker runtime, top-level
  `404.html`, or detected secret pattern.
- Nested SPA refresh validation passed.
- `npm audit --audit-level=moderate` reported 0 vulnerabilities.

The workflow regression test verifies public URL entry, backend inspection, branch selection,
project creation, intent creation, and navigation to the generated review. Production customer
evidence requires backend PR 107 to be merged and deployed first and will be recorded separately.

## Execution boundary

Local frontend tests use deterministic API responses. The live run may create control-plane
project, evidence, intent, architecture-plan, and draft-review records. It does not call approval,
execution, deployment, or teardown endpoints.

## Known limitations

Public GitHub API rate limits apply. Private repositories still require an authorized GitHub App
installation.
