# Test 22: Explicit account creation

## Commands executed

- `npm ci`
- `npm run verify`
- Live Cloudflare Pages and production API customer journey, recorded after merge

## Result

The clean install completed with zero known package vulnerabilities. The full verification suite
passed formatting, lint, TypeScript, 25 tests, contract checks, public-environment checks, static
production build, Cloudflare static-hosting checks, nested-route fallback, and package audit. The
deterministic authentication adapter tests prove that sign-in does not invoke sign-up for an
unknown user and that explicit registration handles new and existing accounts correctly. The page
tests cover the two account paths and automated accessibility checks. Live results are recorded
before merge completion.

## Execution boundary

Frontend validation uses mocked Cognito responses. The separate live journey creates control-plane
identity, workspace, repository-analysis, and plan records only. It does not request execution or
deploy customer infrastructure.

## Known limitations

Live email account creation requires access to the one-time code sent by Cognito. Repository
selection is limited to repositories authorized for the configured GitHub App installation.
