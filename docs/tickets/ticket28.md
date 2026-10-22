# ticket28

PR: #28
Branch: `fix/27-planning-auth-responsiveness`

## Problem / goal

The live plan form can submit without the material traffic values required by the planner, while hiding most constraints behind an advanced disclosure. New-account verification performs an avoidable failed profile lookup, the first dashboard loads administrator data sequentially, and browser autofill can render the sign-in email text without usable contrast.

## Current repo state

Authentication, onboarding, public repository inspection, Nova interpretation, planning, and dashboard APIs are live. A manual customer attempt reached intent validation but stopped with missing `average_rps` and `peak_rps`.

## Research / references used

- Live customer-reported planning and authentication behavior.
- `NewPlanPage`, `AuthContext`, `LoginPage`, `OverviewPage`, and the centralized API client.
- Existing WCAG 2.2 AA, static Cloudflare Pages, API-boundary, and frontend performance rules.

## Work planned for the PR

- Replace hidden free-form material constraints with visible required customer-friendly choices.
- Translate traffic tiers and peak patterns into explicit numeric intent evidence.
- Skip the expected `/me` failure for newly confirmed accounts.
- Preload the authenticated overview while a verification code is submitted.
- Fetch independent overview data concurrently.
- Enforce readable email and OTP input text, including WebKit autofill.
- Add focused regression coverage and run the required clean verification cycle.

## Acceptance criteria

- A normal form submission always supplies average and peak request rates.
- Customers choose understandable traffic, workload, environment, availability, and budget options without knowing infrastructure terminology.
- New-account confirmation calls onboarding directly.
- The overview route is prefetched and its independent requests run concurrently.
- Typed and autofilled authentication values have explicit high-contrast colors.
- Existing API security and static-hosting boundaries remain unchanged.

## Acceptance status

Implemented and covered by one clean frontend verification cycle.

## Tests / validation performed

See `docs/test/test28.md`.

## Evidence files produced

- `docs/test/test28.md`

## Boundaries

This PR changes browser presentation and request sequencing only. It does not change backend authorization, model policy, cloud infrastructure, Cognito configuration, or customer resources.

## Follow-up work

Measure authenticated production latency after deployment and use the recorded API timings before considering paid warm-capacity changes.
