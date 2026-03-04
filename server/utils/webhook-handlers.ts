import type { H3Event } from 'h3';
import type { WebhookEvent } from '~~/lib/youcan';

export type WebhookHandler<T = unknown> = (payload: T, event: H3Event) => Promise<void> | void;

const registry = new Map<string, WebhookHandler[]>();

export function defineWebhookHandler<T = unknown>(event: WebhookEvent, handler: WebhookHandler<T>): void {
  const handlers = registry.get(event) ?? [];
  handlers.push(handler as WebhookHandler);
  registry.set(event, handlers);
}

export function getRegisteredWebhookEvents(): WebhookEvent[] {
  return Array.from(registry.keys()) as WebhookEvent[];
}

export async function dispatchWebhook(eventName: string, payload: unknown, h3Event: H3Event): Promise<void> {
  const handlers = registry.get(eventName) ?? [];

  await Promise.all(handlers.map(handler => handler(payload, h3Event)));
}
