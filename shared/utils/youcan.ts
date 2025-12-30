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

export async function exchangeSessionToken(session: string) {
  const config = useRuntimeConfig();

  const query = new URLSearchParams({
    session_token: session,
    grant_type: 'token_exchange',
    client_id: config.youcanApiKey,
    client_secret: config.youcanApiSecret,
  });

  const res = await fetch(`${config.youcanApiUrl}/oauth/token`, {
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    method: 'POST',
    body: query,
  });

  return (await res.json()) as TokenExchangeResponse;
}
