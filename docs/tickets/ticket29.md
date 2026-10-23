# ticket29: Surface the reviewed cloud lifecycle

PR: #29
Branch: feat/live-cloud-lifecycle-controls

## Problem / goal

Expose the existing governed backend workflow in the customer dashboard: complete connection verification, inspect the real plan, queue only a reviewed exact apply, and use the equivalent reviewed teardown path.

## Current repo state

The static client exposes safe local review actions and a provider-setup link. The backend already owns all cloud authorization and execution decisions.

## Research / references used

- Existing versioned cloud-connection and cloud-execution API contracts.
- Existing Plan and Connections page interaction patterns.

## Work planned for the PR

- Add a connection verification action after customer-controlled provider setup.
- Add explicit, truthful real-plan, reviewed-deployment, and reviewed-teardown controls to approved-plan pages.
- Keep exact confirmation prompts and all authorization decisions on the API.

## Acceptance criteria

- [x] The browser never receives cloud credentials or an execution command.
- [x] Real plan/apply/destroy buttons call only the documented API.
- [x] Teardown remains unavailable until a trusted apply result exists.
- [x] A failed backend response is shown as a visible UI error.

## Acceptance status

Implemented and locally validated; deployment follows the reviewed merge.

## Tests / validation performed

See `docs/test/test29.md`.

## Evidence files produced

- `docs/tickets/ticket29.md`
- `docs/test/test29.md`

## Boundaries

This static-client change does not alter tenant authorization, cloud roles, pricing, policy, or the execution runner.

## Follow-up work

- Deploy the corresponding reviewed backend contract.
- Run the explicit live customer lifecycle pilot after both PRs merge.
