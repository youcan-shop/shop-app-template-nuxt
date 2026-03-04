import { client } from '~~/lib/youcan';
import { getRegisteredWebhookEvents } from './webhook-handlers';

export async function registerWebhooks(accessToken: string): Promise<void> {
  const config = useRuntimeConfig();
  const webhookEvents = getRegisteredWebhookEvents();

  if (webhookEvents.length === 0) {
    return;
  }

  const appUrl = config.appUrl as string;
  const youcanClient = client({ token: accessToken, baseUrl: config.youcanApiUrl as string });

  let existing: { event: string }[] = [];
  try {
    existing = await youcanClient.store.webhooks.list();
  }
  catch {
  }

  const subscribedEvents = new Set(existing.map(s => s.event));

  await Promise.all(
    webhookEvents
      .filter((event: string) => !subscribedEvents.has(event))
      .map((event: string) =>
        youcanClient.store.webhooks.subscribe({
          event: event as any,
          target_url: `${appUrl}/webhooks/${event}`,
        }),
      ),
  );
}
