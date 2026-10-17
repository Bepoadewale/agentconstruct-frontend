# Ticket 11: Refine the public site for enterprise clarity

## Goal

Make the public landing page feel concise, mature, and credible for an infrastructure engineering product.

## Scope

- Reduce repeated claims, oversized typography, and excessive page length.
- Replace the blue and purple dominated palette with warm neutrals, orange, green, amber, and restrained blue.
- Keep one truthful product visual as supporting evidence.
- Improve responsive behavior, accessibility, and visual hierarchy.
- Remove em dashes from public copy and metadata.

## Boundaries

- No backend logic or security decisions in the browser.
- No invented customer claims, deployment claims, or metrics.
- No paid Cloudflare runtime or server-side dependency.

## Acceptance criteria

- The page presents the product clearly within the first viewport.
- The page contains fewer, denser sections with deliberate color use.
- Navigation, calls to action, and core content work on desktop and mobile.
- Automated accessibility, static hosting, contract, and build checks pass twice.

## Validation

- Desktop render inspected at 1440 by 1100 and as a full-page capture.
- Tablet render inspected at 768 by 1024.
- Mobile render inspected at 500 by 1000 and as a full-page capture.
- `npm ci` passed with zero reported vulnerabilities.
- `npm run verify` passed twice from a clean dependency installation.
- 18 tests passed, including automated WCAG 2.2 A and AA coverage for the public page.
- 34 frontend operations matched the versioned API contract.
- Static build contained 25 files, no secret patterns, no Functions, no Worker runtime, and no top-level 404 file.
- Nested route refresh returned the static application shell.

## Outcome

The public page now uses a shorter enterprise narrative, a warm neutral foundation, and restrained orange, green, and blue accents. Repeated claims and oversized sections were removed. The existing architecture image is retained as supporting product evidence. Public copy and visible application strings no longer use em dashes.
