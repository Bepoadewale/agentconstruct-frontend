# Ticket 26: Invitation delivery controls and sign-in contrast

## Problem / goal

The sign-in email value could become unreadable against the light input background. Administrators
also had no customer-facing way to inspect, resend, or cancel workspace invitations after sending
one.

## Current repo state

The authentication page already supports sign-in and account creation. Workspace settings can list
members and create invitations through the backend.

## Research / references used

- Existing DavDeploy authentication design tokens and Cognito email flow.
- Backend invitation lifecycle endpoints introduced by backend PR 109.
- Existing administrator workspace settings and API client conventions.

## Work planned for the PR

- Set explicit high-contrast text, caret, and placeholder colors for authentication email fields.
- Load tenant-scoped invitation status for administrators.
- Add resend and cancel controls for pending invitations.
- Use truthful delivery feedback that never exposes invitation tokens in hosted mode.
- Synchronize and validate the backend OpenAPI contract.

## Acceptance criteria

- Typed email addresses remain readable in sign-in and account-creation modes.
- Administrators can inspect delivery state, expiry, and send count.
- Resend and cancel invoke the documented backend operations.
- Non-administrators do not receive administrative invitation controls.
- Full frontend verification passes with no paid Cloudflare runtime.

## Acceptance status

Implemented and covered by one clean frontend verification cycle.

## Tests / validation performed

See `docs/test/test26.md`.

## Evidence files produced

- `docs/test/test26.md`

## Boundaries

The backend remains authoritative for tenant scope, administrator role, delivery, token rotation,
expiry, and cancellation. The browser never sends email directly or receives provider credentials.

## Follow-up work

Live external delivery requires the backend's verified Amazon SES sender and production sending
access.
