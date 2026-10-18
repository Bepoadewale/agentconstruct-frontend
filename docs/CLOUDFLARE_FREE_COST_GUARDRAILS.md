# Cloudflare Pages Free cost guardrails

davdeploy uses Cloudflare only as a static asset host. The build requires no Functions,
Workers, Workers AI, KV, D1, R2, Durable Objects, paid analytics, paid security feature, or paid
network product.

The repository validates these supplied Free-plan constraints:

- no more than 500 Pages builds per month;
- fewer than 20,000 static files per site;
- no static asset above 25 MiB;
- build completes well below 20 minutes;
- no mandatory Pages Function or Worker invocation;
- no requirement for a Workers Paid subscription.

`npm run check:static` fails on a top-level `404.html`, function/worker/server artifacts, Free-limit
file/asset violations, common credential patterns, or Node server runtime markers. Route bundles and
hashed assets are cacheable; `index.html` is not.

The zero-dollar expectation applies only to eligible static Cloudflare Pages hosting within the
Free-plan limits. It does not cover cloud resources, model/API tokens, Google Workspace, GitHub usage
beyond its allocation, Stripe fees, observability services, email delivery, support tooling, custom
domain registration, taxes, or future Cloudflare products. Do not activate a paid Cloudflare feature
without a separately reviewed commercial decision.
