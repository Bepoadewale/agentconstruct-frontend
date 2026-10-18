# Ticket 12: Align sign-in and cloud-neutral positioning

## Goal

Carry the refined public design into workspace sign-in and make product-facing language cloud-neutral.

## Scope

- Rebuild sign-in with the public site's warm neutral, orange, green, and ink palette.
- Improve sign-in hierarchy, responsive behavior, and configuration messaging.
- Replace provider-specific product copy with cloud-neutral language across the client.
- Keep provider-specific API paths and schema values internal where required by the backend contract.

## Boundaries

- Authentication, membership, and roles remain backend-authoritative.
- No unsupported provider is presented as connected or operational.
- No provider credentials enter the browser.
- No Cloudflare runtime or paid service is introduced.

## Acceptance criteria

- Sign-in feels visually continuous with the public landing page.
- Public and authenticated interface copy describes a cloud platform, not a single-provider product.
- Disabled authentication remains truthful when OIDC is not configured.
- Desktop and mobile renders are accessible and visually coherent.
- Two complete validation cycles pass.

## Validation

- Latest five production screenshots inspected, including the public home and previous sign-in experience.
- Sign-in renders inspected at 1440 by 1100 and 500 by 1700.
- `npm ci` completed with zero reported vulnerabilities.
- `npm run verify` passed twice.
- 18 tests passed, including automated WCAG 2.2 A and AA checks for sign-in and the public page.
- 34 frontend operations matched the backend API contract.
- Static output contains 25 files, no secret patterns, no Functions, no Worker runtime, and no top-level 404 file.
- Nested route refresh returned the static application shell.
- Visible interface and current documentation contain no provider-specific product positioning.

## Outcome

Sign-in now shares the public site's warm canvas, ink panel, orange detail, green trust states, typography, and spacing. Public and authenticated copy is cloud-neutral. The existing provider-specific endpoint path and generated contract identifiers remain internal to preserve compatibility with the current backend API.
