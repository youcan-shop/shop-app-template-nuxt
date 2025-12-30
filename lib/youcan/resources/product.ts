import type { CollectionResponse, Product, ProductGetOptions, ProductListOptions } from '../types';

export class ProductResource {
  constructor(private request: <T>(endpoint: string, options?: any) => Promise<T>) {}

  public async list(options?: ProductListOptions): Promise<CollectionResponse<Product>> {
    const query: Record<string, any> = { ...options };
    if (query.include && Array.isArray(query.include)) {
      query.include = query.include.join(',');
    }

    return this.request<CollectionResponse<Product>>('/products', { query });
  }

  public async get(prop: { id: string } | { sku: string }, options?: ProductGetOptions): Promise<Product> {
    const query: Record<string, any> = {};
    if (options?.include) {
      query.include = options.include.join(',');
    }

    if ('id' in prop) {
      return this.request<Product>(`/products/${prop.id}`, { query });
    }

    return this.request<Product>(`/products/sku/${prop.sku}`, { query });
  }

  public async create(data: Partial<Product>): Promise<Product> {
    return this.request<Product>('/products', {
      method: 'POST',
      body: data,
    });
  }

  public async update(id: string, data: Partial<Product>): Promise<Product> {
    return this.request<Product>(`/products/update/${id}`, {
      method: 'POST',
      body: data,
    });
  }

  public async delete(id: string): Promise<void> {
    return this.request<void>(`/products/${id}`, {
      method: 'DELETE',
    });
  }
}
