# test17: Truthful hosted sign-in availability

Date: 2026-10-19
Execution type: Clean local frontend verification with deterministic mocked services

## Commands executed

- `npm ci`
- `npm run verify`

## Result

Passed. `npm ci` completed with zero vulnerabilities and the full `npm run verify` gate passed:
formatting, lint, TypeScript, 22 tests, contract validation, production build, static hosting checks,
nested SPA refresh, and the moderate-severity audit.

## Execution boundary

The tests validate static browser behavior and configuration. They do not configure or contact
Google, Cognito, Cloudflare, or the production API.

## Known limitations

Google sign-in remains intentionally unavailable until OAuth credentials and the Cognito Google
identity provider are configured and live-tested.
