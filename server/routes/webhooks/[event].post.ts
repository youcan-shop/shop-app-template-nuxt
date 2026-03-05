import { Buffer } from 'node:buffer';
import crypto from 'node:crypto';

export default defineEventHandler(async (event) => {
  const eventName = event.context.params?.event;

  if (!eventName) {
    throw createError({ statusCode: 400, statusMessage: 'Missing event name' });
  }

  const signature = getHeader(event, 'x-youcan-signature');
  if (!signature) {
    throw createError({ statusCode: 401, statusMessage: 'Missing signature header' });
  }

  const rawBody = await readRawBody(event);
  if (!rawBody) {
    throw createError({ statusCode: 400, statusMessage: 'Missing payload' });
  }

  const config = useRuntimeConfig();
  const expectedSignature = crypto
    .createHmac('sha256', config.youcanApiSecret)
    .update(rawBody)
    .digest('hex');

  const signatureBuffer = Buffer.from(signature);
  const expectedBuffer = Buffer.from(expectedSignature);

  if (
    signatureBuffer.length !== expectedBuffer.length
    || !crypto.timingSafeEqual(signatureBuffer, expectedBuffer)
  ) {
    throw createError({ statusCode: 401, statusMessage: 'Invalid signature' });
  }

  const payload = JSON.parse(rawBody);
  await dispatchWebhook(eventName, payload, event);

  return { ok: true };
});
