# Test 26: Invitation controls and sign-in contrast

## Commands executed

- `npm format`
- `npm ci`
- `npm run verify`

## Result

Passed one clean cycle on 2026-10-21:

- Prettier, ESLint, and TypeScript checks passed.
- 27 Vitest tests passed across 7 files.
- All 35 frontend API operations matched the committed OpenAPI contract.
- The production build emitted 28 static files. It contained no Functions, Worker runtime,
  top-level `404.html`, or detected secret pattern.
- Nested SPA refresh validation passed.
- `npm audit --audit-level=moderate` reported 0 vulnerabilities.

The workflow regression test verifies administrator invitation listing, resend, cancellation, and
the resulting status changes. Authentication styling now explicitly sets a dark input foreground,
visible placeholder, and contrasting caret on the light field background.

## Execution boundary

Frontend tests use deterministic API responses and do not send email, mutate live tenants, or
create customer cloud infrastructure.

## Known limitations

Live external delivery depends on a verified Amazon SES sender and production sending access in the
backend account.
