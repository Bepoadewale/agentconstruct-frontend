# Ticket 8: Polish the public product experience

## Scope

Refine the production homepage and login experience based on screenshots of the deployed Pages
site. Improve composition, spacing, contrast, authentication clarity, brand finish, copy, and
responsive behavior without adding runtime dependencies or unsupported product claims.

## Acceptance criteria

- The homepage hero uses the available desktop width without decorative bloat.
- The workflow anchor lands cleanly and excessive vertical whitespace is removed.
- Secondary text and unavailable-authentication states remain legible in dark and light schemes.
- The login screen communicates both product context and the exact unavailable state.
- Authentication uses Google Workspace wording only when configured.
- The public experience uses a finished, code-native brand mark.
- Primary actions and public copy are concise and consistent.
- Desktop and mobile rendering, accessibility checks, tests, and static Pages constraints pass.

## Boundaries

The example plan is explicitly labelled and makes no cost or deployment claim. Authentication,
authorization, planning, pricing, and execution remain backend responsibilities. No Cloudflare
Function, Worker, paid service, secret, or new production integration is introduced.

## Validation

- Two consecutive `npm run verify` cycles passed.
- Formatting, linting, type checking, 18 tests, axe WCAG checks, API-contract validation,
  production build, static Pages checks, SPA refresh checks, secret-pattern checks, and dependency
  audit passed.
- Dark-mode homepage and login renders were inspected at 1600 × 1000 and 390 × 844.
- At 390px, both routes reported a 390px document width with no horizontal overflow.
- Largest production asset remains 221,750 bytes; the build contains no Function, Worker, top-level
  `404.html`, or detected secret pattern.
- GitHub CI and the Cloudflare preview deployment remain pending until the branch is pushed.

## Outcome

The public experience now has a balanced example-plan hero, tighter workflow transition, stronger
contrast, concise customer-facing copy, a topology brand mark, and an explicit fail-closed Google
Workspace sign-in state. Desktop and mobile verification is complete; merge awaits remote checks.
