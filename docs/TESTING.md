# Testing

Required GitHub CI is the merge gate. On a fresh runner, it installs the lockfile and runs
`npm run verify`: formatting, lint, strict types, Vitest with coverage,
backend OpenAPI operation compatibility, production build, static-output inspection, nested SPA
refresh, and npm vulnerability audit.

The deterministic suite covers:

- bearer headers, JSON contracts, correlation IDs, missing auth/configuration, permission failures;
- safe-read retry and mutation non-retry behavior;
- unauthenticated route guarding and server-supplied administrator review state;
- developer inability to reveal approval controls;
- exact draft submission contract;
- public product truthfulness and automated WCAG 2.2 A/AA rules;
- responsive, reduced-motion, forced-color, dark-mode, and static security-header contracts;
- bundle file count/size, absence of Functions/Workers/server code/404, and credential patterns;
- direct refresh of a nested `/plans/...` route against the built static application.

Mocked tests prove browser behavior, not live Google/Cognito authentication, GitHub delivery, cloud
role assumption, provider deployment, or infrastructure correctness. Those require the separate
backend integration environment and are reported explicitly as live-environment validation.

Every runnable PR records focused local validation in its PR-numbered evidence. Releases and
changes affecting dependencies, build/bootstrap behavior, authentication/session handling, API
contracts, routing, static hosting, or runtime security controls also record one clean local
`npm ci` and `npm run verify` cycle. CI runs the complete suite from a fresh GitHub runner on every
PR.
