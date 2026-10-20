# ticket18: Classify public configuration and right-size validation

PR: #18
Branch: `chore/config-security-validation-policy`

## Problem / goal

Audit GitHub Actions and browser configuration after the repository became public, document the
security boundary, prevent secret-like browser variables, and replace mandatory clean dependency
validation on every runnable PR with risk-based local validation plus required CI.

## Current repo state

The repository has no GitHub Actions variables or secrets. Vite configuration is embedded in the
public browser bundle by design. The contributor guide currently requires a clean install and full
verification cycle for every runnable PR regardless of risk.

## Research / references used

- GitHub Actions variables and secrets documentation.
- Vite public environment-variable behavior.
- Current CI, `.env.example`, configuration loader, and frontend security documentation.

## Work planned for the PR

- Document the difference between Actions secrets, Actions variables, and public `VITE_*` values.
- Add a static guard against secret-like `VITE_*` names.
- Make clean local verification risk-based while keeping targeted tests and required CI.
- Update contributor and testing guidance consistently.

## Acceptance criteria

- The repository contains no configured Actions values requiring migration.
- Public browser configuration is never described as secret.
- Secret-like `VITE_*` configuration fails validation.
- Required CI remains the merge gate for every PR.
- Clean local verification remains required for releases and high-risk changes.

## Acceptance status

In progress.

## Tests / validation performed

Pending.

## Evidence files produced

No runtime evidence file is required because this PR changes documentation and static validation
only.

## Boundaries

This PR does not change live Cloudflare configuration, authentication behavior, or backend APIs.

## Follow-up work

Pending implementation and CI.
