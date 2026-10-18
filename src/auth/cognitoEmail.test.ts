import { beforeEach, describe, expect, it, vi } from 'vitest';

const mocks = vi.hoisted(() => ({ send: vi.fn() }));

vi.mock('@aws-sdk/client-cognito-identity-provider', async (importOriginal) => {
  const original =
    await importOriginal<typeof import('@aws-sdk/client-cognito-identity-provider')>();
  return {
    ...original,
    CognitoIdentityProviderClient: class {
      send = mocks.send;
    },
  };
});

import { startEmailAuthentication, verifyEmailChallenge } from './cognitoEmail';

describe('Cognito email OTP adapter', () => {
  beforeEach(() => mocks.send.mockReset());

  it('starts the expected passwordless challenge for an existing user', async () => {
    mocks.send.mockResolvedValueOnce({ ChallengeName: 'EMAIL_OTP', Session: 'session-1' });
    const result = await startEmailAuthentication('us-east-1', 'client', ' Person@Example.com ');
    expect(result).toEqual({
      status: 'CHALLENGE',
      challenge: { email: 'person@example.com', kind: 'SIGN_IN', session: 'session-1' },
      message: 'Enter the code sent to your email.',
    });
  });

  it('starts sign-up without creating or storing a password', async () => {
    const missing = new Error('missing');
    missing.name = 'UserNotFoundException';
    mocks.send.mockRejectedValueOnce(missing).mockResolvedValueOnce({});
    const result = await startEmailAuthentication('us-east-1', 'client', 'new@example.com');
    expect(result.status).toBe('CHALLENGE');
    if (result.status === 'CHALLENGE') expect(result.challenge.kind).toBe('SIGN_UP');
  });

  it('returns the access token only after the email code succeeds', async () => {
    mocks.send.mockResolvedValueOnce({ AuthenticationResult: { IdToken: 'identity-token' } });
    const result = await verifyEmailChallenge(
      'us-east-1',
      'client',
      { email: 'person@example.com', kind: 'SIGN_IN', session: 'session-1' },
      '123456',
    );
    expect(result).toEqual({ status: 'AUTHENTICATED', identityToken: 'identity-token' });
  });
});
