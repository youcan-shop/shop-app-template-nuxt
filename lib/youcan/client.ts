import type { Store } from './types';
import { ofetch } from 'ofetch';

import { OrderResource } from './resources/order';
import { ProductResource } from './resources/product';

export interface YouCanClientOptions {
  token: string;
  baseUrl: string;
}

export class StoreContext {
  public products: ProductResource;
  public orders: OrderResource;

  constructor(private request: <T>(endpoint: string, options?: any) => Promise<T>) {
    this.products = new ProductResource(request);
    this.orders = new OrderResource(request);
  }

  public async info(): Promise<Store> {
    return this.request<Store>('/me');
  }
}

export interface YouCanClient {
  store: StoreContext;
}

export function client(optionsOrRequest: YouCanClientOptions | (<T>(endpoint: string, options?: any) => Promise<T>)): YouCanClient {
  let request: <T>(endpoint: string, options?: any) => Promise<T>;

  if (typeof optionsOrRequest === 'function') {
    request = optionsOrRequest;
  }
  else {
    const { token, baseUrl } = optionsOrRequest;
    request = async <T>(endpoint: string, options?: any): Promise<T> => {
      return ofetch<T>(`${baseUrl}${endpoint}`, {
        ...options,
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          ...options?.headers,
        },
      });
    };
  }

  return {
    store: new StoreContext(request),
  };
}
