# Ticket 20: visual storytelling and copy-density reduction

## Problem / goal

Make every public and authenticated route easier to scan by replacing repetitive explanation with
product-native visuals and shorter copy while preserving operational truth, accessibility, and
essential context.

## Current repo state

The landing page has one strong product image, but most other routes rely on headings, paragraphs,
and lists. Authenticated pages communicate accurately but feel denser than mature infrastructure
products.

## Research / references used

- GitHub issue #19
- GitHub pull request #20
- Cloudflare Developer Platform product presentation
- Stripe Checkout product presentation

## Work planned for the PR

- Add a reusable, lightweight SVG visual system.
- Give every route a meaningful visual cue.
- Replace the empty-state glyph with an illustration.
- Shorten public, authentication, dashboard, planning, history, activity, connections, settings,
  and help copy.
- Keep detailed plan evidence and protected-operation explanations available where decisions depend
  on them.
- Verify responsive layouts, accessibility, tests, and the static production build.

## Acceptance criteria

- [x] All primary routes have a relevant visual.
- [x] Copy is shorter without removing decision-critical information.
- [x] Visuals are static SVG/CSS and add no package or hosted-image dependency.
- [x] Visuals have accessible labels or are correctly hidden when decorative.
- [x] Full frontend verification passes.
- [x] Desktop and compact-width route screenshots are reviewed.

## Acceptance status

Complete locally. Every primary route now has a relevant visual, copy density is reduced, and the
full frontend verification suite passes.

## Tests / validation performed

`npm run verify` passed on 2026-10-21. Headless Chrome screenshots were reviewed at 1440 x
1000, 500 x 900, and 390 x 844. The 500-pixel compact layout verified the actual responsive
breakpoint because the installed headless Chrome keeps a minimum internal layout viewport near 500
pixels even when the captured image is narrower.

## Evidence files produced

See `docs/test/test20.md`.

## Boundaries

No backend behavior, authorization, plan calculations, deployment semantics, API contracts, paid
Cloudflare capability, or fabricated customer evidence is introduced.

## Follow-up work

Consider adding backend-seeded visual regression coverage when a stable hosted test tenant exists.
