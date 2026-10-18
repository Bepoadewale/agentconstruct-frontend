# ticket14: Connect Cognito authentication and the serverless API

PR: #14

Branch: `feat/cognito-authentication`

## Problem / goal

Add browser-safe Cognito authentication for Google and passwordless email OTP, then connect the
static Cloudflare Pages application to the serverless AWS API without adding Cloudflare compute.
Also enforce the same PR, ticket, test, and cleanup discipline used by the backend repository.

## Current repo state

The frontend is a static React and Vite application with a centralized typed API client, generic
OIDC redirect support, local fixture authentication, and Cloudflare Pages Free deployment checks.
The existing CI verifies the application but does not reject missing PR-numbered evidence.

## Research / references used

- Cognito managed login supports Google federation through an OIDC authorization-code flow.
- Cognito choice-based authentication supports email OTP with a public application client.
- Browser bundles may contain public pool and client identifiers, but never provider secrets or
  cloud credentials.
- Tenant membership and role authorization remain backend decisions after identity verification.

## Work planned for the PR

- Configure Cognito as the production OIDC authority.
- Add Google sign-in through Cognito federation.
- Add direct email OTP registration and sign-in through Cognito public APIs.
- Keep tokens in memory and avoid durable browser secret storage.
- Connect authenticated requests and first-use onboarding to the serverless API.
- Add callback, challenge, expiry, authorization failure, and configuration error states.
- Add PR-numbered test evidence and CI enforcement.
- Extend tests, security checks, and deployment documentation.

## Acceptance criteria

- Google authentication starts through Cognito with Google selected.
- New and returning users can complete the supported email OTP flow.
- The browser bundle contains no confidential OAuth, Cognito, AWS, or API credentials.
- API requests carry the Cognito ID token and handle backend authorization failures safely.
- Local fixture mode remains explicitly local.
- The production build remains fully static and compatible with Cloudflare Pages Free.
- CI rejects a pull request without its matching ticket and test evidence.
- One clean frontend verification cycle passes.

## Acceptance status

All local acceptance criteria are met. Live provider behavior remains explicitly deferred until the
backend and identity resources are deployed. GitHub checks must still pass before merge.

## Tests / validation performed

One clean `npm ci` and `npm run verify` cycle passed. Seven test files and 22 tests passed, the API
contract check validated 35 operations, the production build produced 27 static files, nested SPA
refresh passed, static hosting checks found no server runtime or secret pattern, and `npm audit`
reported zero vulnerabilities. The PR evidence checker passed for PR #14.

## Evidence files produced

- `docs/test/test14.md`

## Boundaries

- The backend remains authoritative for membership, tenant, role, approval, policy, and execution.
- This PR does not create or configure live Cognito, Google, SES, AWS, or Cloudflare resources.
- Live identity callbacks require final deployed URLs and provider credentials.

## Follow-up work

Add deployed Cognito and API public identifiers to Cloudflare Pages and run live browser
authentication smoke tests after the AWS stack exists.
