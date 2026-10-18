# Ticket 14: Connect the static frontend to Cognito and the serverless API

## Goal

Add browser-safe Cognito authentication for Google and passwordless email OTP, then connect the static Cloudflare Pages application to the serverless AWS API without introducing Cloudflare compute.

## Current repo state

The frontend is a static React and Vite application with a centralized typed API client, a generic OIDC redirect flow, local fixture authentication, and Cloudflare Pages Free deployment checks.

## Work planned

- Configure Cognito as the production OIDC authority.
- Add a clear Google sign-in action through Cognito federation.
- Add direct email OTP registration and sign-in using Cognito's public client APIs.
- Keep tokens in memory or session storage rather than durable local storage.
- Connect authenticated requests to the configurable serverless API endpoint.
- Add callback, challenge, expiry, authorization failure, and unavailable-configuration states.
- Extend tests, security checks, and deployment documentation.

## Acceptance criteria

- [ ] Google authentication starts through Cognito with the Google identity provider selected.
- [ ] New and returning users can complete the supported email OTP flow.
- [ ] The frontend does not contain confidential OAuth, Cognito, AWS, or API credentials.
- [ ] API requests carry the access token and handle backend authorization failures safely.
- [ ] Local fixture mode remains explicitly local.
- [ ] The production build remains fully static and compatible with Cloudflare Pages Free.
- [ ] Two clean frontend verification cycles pass.

## Validation

Pending implementation.

## Boundaries

- The backend remains authoritative for membership, tenant, role, approval, policy, and execution decisions.
- This PR does not create or configure live Cognito, Google, SES, AWS, or Cloudflare resources.
- Live identity callbacks require the final deployed URLs and provider credentials.

## Follow-up work

Add the deployed Cognito and API public identifiers to Cloudflare Pages and run live browser authentication smoke tests after the AWS stack exists.
