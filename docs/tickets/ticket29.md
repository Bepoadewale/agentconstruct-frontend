# ticket29: Surface the reviewed cloud lifecycle

PR: #29
Branch: feat/live-cloud-lifecycle-controls

## Goal

Expose the existing governed backend workflow in the customer dashboard: complete connection verification, inspect the real plan, queue only a reviewed exact apply, and use the equivalent reviewed teardown path.

## Work

- Add a connection verification action after customer-controlled provider setup.
- Add explicit, truthful real-plan, reviewed-deployment, and reviewed-teardown controls to approved-plan pages.
- Keep exact confirmation prompts and all authorization decisions on the API.

## Acceptance criteria

- [x] The browser never receives cloud credentials or an execution command.
- [x] Real plan/apply/destroy buttons call only the documented API.
- [x] Teardown remains unavailable until a trusted apply result exists.
- [x] A failed backend response is shown as a visible UI error.

## Validation

See `docs/test/test29.md`.

## Boundary

This static-client change does not alter tenant authorization, cloud roles, pricing, policy, or the execution runner.
