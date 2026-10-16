# AgentConstruct frontend

Private static React client for [AgentConstruct](https://github.com/Bepoadewale/AgentConstruct),
the governed AWS infrastructure planning control plane.

This repository owns presentation, browser-safe input validation, route state, API consumption,
and accessibility. The backend owns identity verification, memberships, tenant isolation, planning,
pricing, policy, approvals, audit integrity, integrations, secrets, execution, and observed state.

## Local development

Requirements: Node.js 22+, npm 10+, and an AgentConstruct API on `http://127.0.0.1:8000`.

```bash
cp .env.example .env.local
npm ci
npm run dev
```

The example enables the backend's explicit local fixture login for development only. Hosted builds
should use `VITE_AUTH_MODE=oidc` and the OIDC values documented in
[Auth and security](docs/AUTH_AND_SECURITY.md).

## Verification

```bash
npm run verify
```

The production command is `npm run build`; output is `dist`. It is static and requires no
Cloudflare Worker, Function, storage, database, or paid plan.

## Documentation

- [Architecture](docs/ARCHITECTURE.md)
- [API integration](docs/API_INTEGRATION.md)
- [Routes](docs/FRONTEND_ROUTES.md)
- [Authentication and security](docs/AUTH_AND_SECURITY.md)
- [Local development](docs/LOCAL_DEVELOPMENT.md)
- [Testing](docs/TESTING.md)
- [Cloudflare deployment handoff](docs/CLOUDFLARE_DEPLOY_HANDOFF.md)
- [Cloudflare Free guardrails](docs/CLOUDFLARE_FREE_COST_GUARDRAILS.md)
- [Migration audit](docs/MIGRATION_AUDIT.md)
