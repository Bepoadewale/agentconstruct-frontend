# Test 29: Reviewed cloud lifecycle controls

Date: 2026-10-23

## Commands

- `npm run typecheck`
- `npm run lint`
- `npm test -- --coverage.enabled=false`
- `npm run build`

## Expected evidence

The dashboard exposes only backend-governed operations. The API must independently verify the connection, approved digest, preflight, plan artifact, role, confirmation, and policy before it can queue work.

## Boundary

No cloud connection, plan, deployment, or teardown is triggered by frontend tests.
