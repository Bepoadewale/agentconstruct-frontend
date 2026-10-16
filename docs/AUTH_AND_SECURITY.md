# Authentication and browser security

## Hosted identity

Hosted mode uses an external OIDC provider with authorization code and PKCE through `oidc-client-ts`.
Configure an exact authority, public client ID, callback URL, and logout URL. No client secret belongs
in a browser application.

Only transient authorization state is stored in `sessionStorage`; the returned access token is held
in memory. A refresh signs the browser out unless the identity provider can establish a new session.
This reduces token persistence and XSS impact at the cost of session convenience. Never move a
long-lived token to localStorage.

After sign-in, `/api/v1/me` resolves the server-owned workspace membership and role. Identity-token
organization, email, or role claims are not treated as authorization. The backend must verify issuer,
audience, signature, expiry, server membership, tenant scope, and operation-specific policy.

Google Workspace may be the internal identity issuer and Cognito the customer issuer as documented
by the backend. Live providers are not configured or proven by this repository.

## Local fixture

`VITE_AUTH_MODE=local-fixture` and `VITE_ENABLE_LOCAL_LOGIN=true` work only in Vite development mode.
The backend also disables `/auth/local-login` when hosted mode is enabled. Static production builds
cannot turn this development control into an authorization bypass.

## Browser threat model

- The browser can be malicious; every tenant/role/digest/policy check is server-side.
- React escapes API-rendered text, replacing the old `innerHTML` pattern.
- `_headers` denies framing, objects, sensitive device APIs, mixed content, and third-party scripts.
- The bundle contains public configuration only; secrets and provider credentials remain backend
  secret-manager values.
- AWS and GitHub connection screens exchange metadata and reviewed URLs, never provider credentials.
- Mutations are not automatically retried. Destructive lifecycle requests require confirmation and
  remain backend-controlled workflows.
- Bearer authentication avoids cookie-based CSRF. If a future deployment moves to cookies, it must
  add SameSite/secure cookie and CSRF defenses before release.

The CSP currently allows HTTPS API/identity connections. Once the final API and identity origins are
known, tighten `connect-src` to those exact hosts and validate sign-in at both `pages.dev` and the
future custom domain.
