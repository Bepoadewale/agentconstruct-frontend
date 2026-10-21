# Test evidence for PR 20

## Scope

Visual storytelling and copy-density improvements across public and authenticated frontend routes.

## Commands executed

- `npm run verify`
- Headless Chrome screenshots at 1440 x 1000, 500 x 900, and 390 x 844 for `/`
- Headless Chrome screenshot at 1440 x 1000 for `/login`

## Result

Passed on 2026-10-21:

- Prettier check passed.
- ESLint passed with zero warnings.
- TypeScript passed.
- 22 tests passed across 7 files, including WCAG 2.2 A/AA axe checks.
- All 35 documented frontend API operations matched the versioned contract.
- Public environment configuration check passed.
- Production build passed with 28 static files, no Functions, no Worker runtime, and no detected
  secret patterns.
- Nested SPA route refresh passed.
- `npm audit --audit-level=moderate` found zero vulnerabilities.
- Desktop and compact screenshots showed the intended hierarchy, added visual system, shorter copy,
  and responsive stacking.

## Execution boundary

Frontend tests use deterministic mocked APIs. They do not prove live identity, email delivery,
provider authorization, cloud deployment, or backend execution.

## Known limitations

Authenticated screenshots were not exercised against a live backend tenant. Authenticated route
behavior remains covered with deterministic mocked API tests, while the shared responsive visual
system was reviewed on public and sign-in routes.
