import type { CreateWebhookSubscriptionRequest, WebhookSubscription } from '../types';

export class WebhookResource {
  constructor(private request: <T>(endpoint: string, options?: any) => Promise<T>) {}

  /**
   * Subscribe to a YouCan event. The `target_url` must be a publicly accessible URL.
   * Required scope: `edit-rest-hooks`
   */
  public async subscribe(data: CreateWebhookSubscriptionRequest): Promise<{ id: string }> {
    return this.request<{ id: string }>('/resthooks/subscribe', {
      method: 'POST',
      body: data,
    });
  }

  /**
   * List all webhook subscriptions for the authenticated store.
   * Required scope: `read-rest-hooks`
   */
  public async list(): Promise<WebhookSubscription[]> {
    return this.request<WebhookSubscription[]>('/resthooks');
  }

  /**
   * Unsubscribe from a webhook by subscription ID.
   * Required scope: `delete-rest-hooks`
   */
  public async unsubscribe(id: string): Promise<void> {
    return this.request<void>(`/resthooks/${id}`, {
      method: 'DELETE',
    });
  }
}
