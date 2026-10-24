import type { Buffer } from 'node:buffer';
import type { TokenExchangeResponse } from '~~/shared/types/youcan';
import crypto from 'node:crypto';
import { useRuntimeConfig } from '#imports';

const ALG = 'aes-256-ecb';

export function encrypt(subject: string) {
  const { youcanApiSecret } = useRuntimeConfig();

  const cipher = crypto.createCipheriv(ALG, sha256(youcanApiSecret), null);

  let encrypted = cipher.update(subject, 'utf8', 'hex');
  encrypted += cipher.final('hex');

  return encrypted;
}

export function decrypt(crypt: string) {
  const { youcanApiSecret } = useRuntimeConfig();

  const decipher = crypto.createDecipheriv(ALG, sha256(youcanApiSecret), null);

  let decrypted = decipher.update(crypt, 'hex', 'utf8');
  decrypted += decipher.final('utf8');

  return decrypted;
}

export function sha256(subject: string): Buffer {
  return crypto.createHash('sha256').update(subject).digest();
}

export function hmac(subject: string, alg: string = 'sha256'): string {
  const { youcanApiSecret } = useRuntimeConfig();
  const hmac = crypto.createHmac(alg, youcanApiSecret);
  return hmac.update(subject).digest('hex');
}

export function verifyLaunch(search: URLSearchParams): { store: string; session: string } | null {
  const signature = search.get('hmac');
  const store = search.get('store');
  const session = search.get('session');

  if (!signature || !store || !session) {
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
