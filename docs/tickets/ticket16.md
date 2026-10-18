# ticket16

PR: #16
Branch: feat/davdeploy-rebrand

## Problem / goal

Rename the static frontend and its repository-facing configuration from davdeploy to davdeploy, while preserving Cloudflare Pages Free compatibility and the secure backend boundary.

## Current repo state

The UI, package metadata, browser storage keys, API headers, documentation, and Cloudflare handoff material use the former davdeploy name. The repository is on a focused branch with draft PR #16.

## Research / references used

- Repository `AGENTS.md`.
- Existing static Vite architecture and Cloudflare Pages documentation.
- Current backend OpenAPI contract and frontend contract tests.
- Current Cloudflare Pages project configuration.

## Work planned for the PR

- Rename current UI copy, package metadata, browser identifiers, API headers, tests, and documentation to davdeploy.
- Synchronize the frontend API contract with the renamed backend contract.
- Keep the application fully static and free of browser secrets.
- Prepare repository and Cloudflare project rename steps.
- Run a clean dependency installation and one complete `npm run verify` cycle.

## Acceptance criteria

- All current customer-facing product copy uses davdeploy.
- A fresh clone builds without the backend repository.
- No backend authority or confidential value moves into the browser.
- Static Cloudflare Pages Free constraints remain satisfied.
- Clean install and `npm run verify` pass once.

## Acceptance status

- Met for the repository change. External GitHub and Cloudflare project renames are performed after merge.

## Tests / validation performed

- A clean `npm ci` followed by one complete `npm run verify` cycle passed on 2026-10-18.

## Evidence files produced

- `docs/test/test16.md`

## Boundaries

- Historical tickets and test evidence remain immutable records of the former product name.
- No secret value is placed in a `VITE_` variable or generated browser bundle.
- Live backend endpoints and authentication outputs cannot be configured until they exist.

## Follow-up work

- Rename the GitHub repository and Cloudflare Pages project after the PR is merged.
