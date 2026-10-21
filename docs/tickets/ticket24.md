# Ticket 24: Public repository selection

## Problem / goal

Customers could only choose repositories returned by the configured GitHub App adapter. Add a
truthful, read-only option for selecting public GitHub repositories by URL.

## Current repo state

The new-plan form lists connected repositories and branches. Production currently has no live
GitHub App installation, so the requested public customer repository is not selectable.

## Research / references used

- Existing new-plan repository and branch workflow.
- Backend public repository inspection contract introduced by backend PR 107.
- Existing API client retry and authentication rules.

## Work planned for the PR

- Add connected and public repository modes.
- Verify public URLs through the authenticated backend.
- Load verified branches and use the selected URL in planning.
- Preserve the existing GitHub App path for private repositories.

## Acceptance criteria

- A customer can enter and verify a canonical public GitHub URL.
- The verified default branch is selected.
- Project creation and intent generation receive the verified repository.
- Responsive, keyboard, contract, and workflow tests pass.
- No customer infrastructure is executed.

## Acceptance status

Implemented and covered by a clean frontend verification cycle. Production customer evidence is
intentionally deferred until backend PR 107 is merged and deployed.

## Tests / validation performed

See `docs/test/test24.md`.

## Evidence files produced

- `docs/test/test24.md`

## Boundaries

The browser never calls GitHub directly. The backend validates the URL, confirms public visibility,
and performs bounded read-only evidence collection.

## Follow-up work

Configure the GitHub App when private repository support is required in production.
