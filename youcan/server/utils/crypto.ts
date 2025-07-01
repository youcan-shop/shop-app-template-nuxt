import type { Buffer } from 'node:buffer';
import crypto from 'node:crypto';
import { useAuth } from '~/youcan/composables/use-auth';

const ALG = 'aes-256-ecb';

export function encrypt(subject: string) {
  const { youcanApiSecret } = useAuth();

  const cipher = crypto.createCipheriv(ALG, sha256(youcanApiSecret), null);

  let encrypted = cipher.update(subject, 'utf8', 'hex');
  encrypted += cipher.final('hex');

  return encrypted;
}

export function decrypt(crypt: string) {
  const { youcanApiSecret } = useAuth();

  const decipher = crypto.createDecipheriv(ALG, sha256(youcanApiSecret), null);

  let decrypted = decipher.update(crypt, 'hex', 'utf8');
  decrypted += decipher.final('utf8');

  return decrypted;
}

export function sha256(subject: string): Buffer {
  return crypto.createHash('sha256').update(subject).digest();
}

export function hmac(subject: string, alg: string = 'sha256'): string {
  const { youcanApiSecret } = useAuth();
  const hmac = crypto.createHmac(alg, youcanApiSecret);
  return hmac.update(subject).digest('hex');
}
