# Ticket 22: Explicit account creation

## Problem / goal

The email sign-in path silently registered unknown users. Give returning users and new customers
separate, truthful actions while preserving backend-authoritative onboarding and permissions.

## Current repo state

The login page exposes Google and email access. The email adapter previously converted a Cognito
`UserNotFoundException` into a sign-up request without an explicit user choice.

## Research / references used

- Existing Cognito email OTP adapter and authentication context.
- Existing backend `/api/v1/me` and `/api/v1/onboarding` contracts.
- Existing Cloudflare Pages static-hosting boundary.

## Work planned for the PR

- Separate Cognito email sign-in and sign-up functions.
- Add accessible Sign in and Create account controls.
- Preserve email-code verification and backend workspace onboarding.
- Add adapter, interaction, accessibility, and build regression coverage.
- Validate the live registration and planning journey without customer infrastructure execution.

## Acceptance criteria

- Sign in does not create an unknown account.
- Create account explicitly registers a new email identity.
- Existing and missing accounts receive actionable messages.
- The authentication UI remains responsive and keyboard accessible.
- A verified customer can select an authorized repository and create a plan.
- No customer infrastructure is deployed.

## Acceptance status

Implementation is complete. Local validation passed. Live validation is recorded in the paired test
evidence.

## Tests / validation performed

See `docs/test/test22.md`.

## Evidence files produced

- `docs/test/test22.md`

## Boundaries

The frontend initiates Cognito operations and consumes backend membership data. Cognito verifies
the identity, and the backend remains authoritative for onboarding, tenancy, roles, planning, and
repository access.

## Follow-up work

None for the explicit account-choice interface.
