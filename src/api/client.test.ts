import { afterEach, describe, expect, it, vi } from 'vitest';
import { ApiClient, ApiError } from './client';

describe('ApiClient', () => {
  afterEach(() => vi.restoreAllMocks());

  it('adds bearer identity, serializes JSON, and returns typed responses', async () => {
    const fetchMock = vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      new Response(JSON.stringify({ id: 'plan-1' }), {
        status: 200,
        headers: { 'Content-Type': 'application/json', 'X-Request-ID': 'request-1' },
      }),
    );
    const client = new ApiClient(() => 'signed-token', 'https://api.example.test');
    await expect(
      client.request<{ id: string }>('/api/v1/intents', {
        method: 'POST',
        body: { prompt: 'safe' },
      }),
    ).resolves.toEqual({ id: 'plan-1' });
    expect(fetchMock).toHaveBeenCalledTimes(1);
    const [, options] = fetchMock.mock.calls[0];
    expect(new Headers(options?.headers).get('Authorization')).toBe('Bearer signed-token');
    expect(options?.body).toBe(JSON.stringify({ prompt: 'safe' }));
  });

  it('retries safe reads but never retries mutations by default', async () => {
    const fetchMock = vi
      .spyOn(globalThis, 'fetch')
      .mockResolvedValueOnce(new Response(JSON.stringify({ detail: 'busy' }), { status: 503 }))
      .mockResolvedValueOnce(new Response(JSON.stringify({ ok: true }), { status: 200 }));
    const client = new ApiClient(() => 'token', 'https://api.example.test');
    await expect(client.request('/api/v1/dashboard')).resolves.toEqual({ ok: true });
    expect(fetchMock).toHaveBeenCalledTimes(2);

    fetchMock
      .mockReset()
      .mockResolvedValue(new Response(JSON.stringify({ detail: 'busy' }), { status: 503 }));
    await expect(
      client.request('/api/v1/customer-plan-revisions/r1/decisions', { method: 'POST', body: {} }),
    ).rejects.toBeInstanceOf(ApiError);
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it('fails closed when authenticated identity or API configuration is absent', async () => {
    await expect(
      new ApiClient(() => null, 'https://api.example.test').request('/api/v1/me'),
    ).rejects.toMatchObject({ code: 'authentication_required' });
    await expect(new ApiClient(() => 'token', '').request('/api/v1/me')).rejects.toMatchObject({
      code: 'api_not_configured',
    });
  });

  it('surfaces server permission failures and correlation IDs', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      new Response(JSON.stringify({ detail: 'administrator required' }), {
        status: 403,
        headers: { 'X-Correlation-ID': 'corr-7' },
      }),
    );
    const client = new ApiClient(() => 'token', 'https://api.example.test');
    await expect(client.request('/api/v1/admin/customer-plan-revisions')).rejects.toMatchObject({
      status: 403,
      code: 'permission_denied',
      requestId: 'corr-7',
      message: 'administrator required',
    });
  });
});
