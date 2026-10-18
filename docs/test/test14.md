# test14: Cognito authentication and serverless API connection

Date: 2026-10-18

Execution type: Local clean frontend verification with deterministic mocked APIs.

## Commands executed

```text
npm ci
npm run verify
```

## Result

Passed. Seven test files and 22 tests passed. The API contract check validated 35 operations. The
production build generated 27 static files; the largest asset was 225,380 bytes. Static checks found
no Functions, Worker runtime, top-level `404.html`, or secret pattern. Nested SPA refresh passed and
the dependency audit reported zero vulnerabilities.

## Execution boundary

The cycle validates the static React application, browser authentication state handling, API
contract snapshot, component tests, bundle checks, nested-route refresh behavior, and dependency
audit. It does not contact AWS, Cognito, Google, SES, or Cloudflare.

## Known limitations

Live Google federation, email OTP delivery, Cognito callbacks, and API authorization require the
deployed backend identifiers and final public URLs.
