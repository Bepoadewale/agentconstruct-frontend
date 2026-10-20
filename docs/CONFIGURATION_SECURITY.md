# Configuration security

This is a public repository and a static browser application. Its configuration has three distinct
security classes.

## Public browser configuration

Every `VITE_*` value used by application code is compiled into downloadable JavaScript. API base
URLs, Cognito issuer URLs, regions, public user-pool client IDs, callback URLs, and feature flags
are therefore public by design. Putting them in a GitHub Secret would hide the value only during
the build, not from a person downloading the resulting bundle.

The repository currently has no GitHub Actions variables or secrets. Cloudflare Pages holds only
the non-secret `VITE_*` values required by the deployed browser application.

## Confidential configuration

OAuth client secrets, cloud credentials, API tokens, webhook secrets, private keys, passwords,
customer data, and long-lived bearer tokens must never use a `VITE_*` name or enter this
repository. They belong in the backend's secret boundary or a provider secret manager.

Repository or deployment automation that later needs a confidential value must use GitHub Secrets,
not Actions variables. Fork pull-request workflows must continue to operate without receiving
deployment secrets.

## Enforcement

`npm run check:public-env` inventories tracked `VITE_*` names and rejects secret-like names. The
production static-build check separately scans generated assets for credential patterns. Gitleaks
scans repository history in CI.

If a real credential is ever committed, logged, pasted into a public issue, or placed in a browser
bundle, revoke or rotate it. Moving the same value into a secret store does not undo exposure.
