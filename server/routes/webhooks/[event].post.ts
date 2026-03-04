export default defineEventHandler(async (event) => {
  const eventName = event.context.params?.event;

  if (!eventName) {
    throw createError({ statusCode: 400, statusMessage: 'Missing event name' });
  }

  const payload = await readBody(event);

  await dispatchWebhook(eventName, payload, event);

  return { ok: true };
});
