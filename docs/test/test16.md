# test16

Date: 2026-10-18
Execution type: Clean local static-frontend validation
Commit: 0577266

## Clean test cycle

```text
npm ci
npm run verify
```

## Observed result

- Formatting, ESLint, and TypeScript checks passed.
- All 22 deterministic Vitest tests passed across 7 files.
- All 35 frontend API operations matched the davdeploy OpenAPI contract.
- The production Vite build completed with 27 static files.
- The largest asset was 225,355 bytes, below the Cloudflare Pages per-file limit.
- Static checks found no Functions directory, Worker runtime, top-level `404.html`, or secret patterns.
- Nested SPA refresh returned the application shell.
- `npm audit --audit-level=moderate` reported zero vulnerabilities.

## Execution boundary

The tests used deterministic browser mocks and local static serving. They did not call AWS, live identity providers, customer clouds, or the production API.

## Known limitations

Live API and OIDC configuration values remain unavailable until the production backend is deployed. Cloudflare deployment is validated separately after repository and Pages project renaming.
