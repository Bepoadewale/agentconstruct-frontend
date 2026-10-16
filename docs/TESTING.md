# Testing

`npm run verify` is the review gate. It runs formatting, lint, strict types, Vitest with coverage,
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

Mocked tests prove browser behavior, not live Google/Cognito authentication, GitHub delivery, AWS
role assumption, cloud deployment, or infrastructure correctness. Those require the separate
backend integration environment and are reported explicitly as live-environment validation.

Each runnable PR records two clean `node_modules`/`dist` removal, `npm ci`, and `npm run verify`
cycles in its PR-numbered ticket. CI repeats the same checks from a clean GitHub runner.
