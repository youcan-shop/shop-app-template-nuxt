import type { TokenExchangeResponse } from '~~/shared/types/youcan';
import crypto from 'node:crypto';
import { useRuntimeConfig } from '#imports';

export function hmac(subject: string, alg: string = 'sha256'): string {
  const { youcanApiSecret } = useRuntimeConfig();
  const hmac = crypto.createHmac(alg, youcanApiSecret);
  return hmac.update(subject).digest('hex');
}

export function verifyLaunch(search: URLSearchParams): { store: string; session: string } | null {
  const signature = search.get('hmac');
  const store = search.get('store');
  const session = search.get('session');

  if (!signature || !store || !session || Math.abs(Date.now() / 1000 - Number(search.get('timestamp'))) > 90) {
    return null;
  }

  const signed = new URLSearchParams(search);
  signed.delete('hmac');

  const expected = new TextEncoder().encode(hmac(signed.toString()));
  const received = new TextEncoder().encode(signature);

  return expected.length === received.length && crypto.timingSafeEqual(expected, received) ? { store, session } : null;
}

export async function exchangeSessionToken(session: string, type: 'offline' | 'online' = 'offline') {
  const config = useRuntimeConfig();

  const query = new URLSearchParams({
    grant_type: 'urn:ietf:params:oauth:grant-type:token-exchange',
    subject_token: session,
    subject_token_type: 'urn:ietf:params:oauth:token-type:id_token',
    requested_token_type: `urn:youcan:params:oauth:token-type:${type}-access-token`,
    client_id: config.youcanApiKey,
    client_secret: config.youcanApiSecret,
  });

  return $fetch<TokenExchangeResponse>(`${config.youcanApiUrl}/oauth/token`, {
    method: 'POST',
    body: query,
  });
}
