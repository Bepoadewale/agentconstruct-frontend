# ticket15: Clarify the full customer-cloud lifecycle

PR: #15

Branch: `fix/full-lifecycle-product-copy`

## Problem / goal

Some public and authenticated copy presents AgentConstruct mainly as a planning product. Correct the
positioning so customers understand that the product plans, governs, deploys, observes, and tears
down infrastructure in their cloud while every screen remains truthful about the current state.

## Current repo state

The landing page is polished and evidence-led, but its hero, workflow, product section, dashboard,
and sign-in narrative stop mostly at review and approval. The plan detail screen correctly labels
local fixtures and unexecuted changes, which must remain intact.

## Research / references used

- Existing backend API and OpenAPI contracts.
- Existing product requirements and customer-cloud ownership boundary.
- Current landing, sign-in, overview, connection, planning, plan detail, activity, and help routes.
- Existing design system and Cloudflare Pages static-hosting constraints.

## Work planned for the PR

- Audit customer-facing lifecycle language across public and authenticated routes.
- Present planning, approval, deployment, observation, and teardown as one governed lifecycle.
- Preserve precise state labels so approval is never presented as deployment.
- Keep unsupported live execution controls disabled or absent.
- Update copy-focused regression tests and documentation where needed.

## Acceptance criteria

- The landing page clearly describes deployment into the customer's cloud.
- The workflow continues through governed deployment and observed operation.
- Developer and administrator dashboard copy reflects lifecycle ownership beyond planning.
- Sign-in and help copy match the same product promise.
- Plan detail states remain truthful about actual backend-observed execution.
- No unsupported cloud provider or deployment capability is presented as currently executed.
- One clean frontend verification cycle passes.

## Acceptance status

Pending implementation and validation.

## Tests / validation performed

Pending implementation.

## Evidence files produced

- `docs/test/test15.md`

## Boundaries

- This PR changes frontend copy and related tests only.
- It does not deploy customer infrastructure or enable a backend capability.
- Backend policy, approval, identity, tenant, execution, observation, and teardown remain
  authoritative.

## Follow-up work

Run live lifecycle validation after the serverless backend and customer-cloud execution roles are
deployed and configured.
