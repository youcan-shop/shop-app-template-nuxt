import type { CollectionResponse, Order, OrderGetOptions, OrderListOptions } from '../types';

export class OrderResource {
  constructor(private request: <T>(endpoint: string, options?: any) => Promise<T>) {}

  public async list(options?: OrderListOptions): Promise<CollectionResponse<Order>> {
    const query: Record<string, any> = { ...options };
    if (query.include && Array.isArray(query.include)) {
      query.include = query.include.join(',');
    }

    return this.request<CollectionResponse<Order>>('/orders', { query });
  }

  public async get(id: string, options?: OrderGetOptions): Promise<Order> {
    const query: Record<string, any> = {};
    if (options?.include && Array.isArray(options.include)) {
      query.include = options.include.join(',');
    }

    return this.request<Order>(`/orders/${id}`, { query });
  }

  public async create(data: Partial<Order>): Promise<Order> {
    return this.request<Order>('/orders', {
      method: 'POST',
      body: data,
    });
  }

  public async fulfill(id: string): Promise<void> {
    return this.request<void>(`/orders/${id}/fulfill`, {
      method: 'PUT',
    });
  }

  public async pay(id: string): Promise<void> {
    return this.request<void>(`/orders/${id}/pay`, {
      method: 'PUT',
    });
  }

  public async close(id: string): Promise<void> {
    return this.request<void>(`/orders/${id}/close`, {
      method: 'PUT',
    });
  }
}
