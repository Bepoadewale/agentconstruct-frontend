# ticket17: Show only configured hosted sign-in methods

PR: #17
Branch: `fix/truthful-google-signin`

## Goal

Keep production email OTP available while preventing the Google button from appearing operational
until the Google identity provider is actually configured in Cognito.

## Current state

The login page enables Google whenever the common Cognito issuer and client ID exist, even when
the backend has intentionally left Google federation disabled.

## References

- `src/config.ts`
- `src/pages/LoginPage.tsx`
- `docs/AUTH_AND_SECURITY.md`
- Backend `GOOGLE_IDENTITY_PROVIDER_ENABLED` production setting

## Planned work

- Add a public boolean configuration value for Google sign-in availability.
- Render the Google action only when both Cognito OIDC and Google federation are configured.
- Preserve direct Cognito email OTP sign-up and sign-in.
- Add regression tests and update environment documentation.

## Acceptance criteria

- Email OTP remains available with production Cognito identifiers.
- Google is not presented as usable while federation is disabled.
- Enabling Google later requires only configuration and no component rewrite.
- One clean `npm run verify` cycle passes.

## Acceptance status

Pending implementation and validation.

## Validation

Pending.

## Evidence

- `docs/test/test17.md`

## Boundaries

This frontend change does not create Google OAuth credentials, modify Cognito, or authorize users.

## Follow-up

Set the public flag to true only after the Google identity provider is configured and live-tested.
