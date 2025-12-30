import type { Store } from './types';
import { ofetch } from 'ofetch';

export interface YouCanClientOptions {
  token: string;
  baseUrl: string;
}

class StoreContext {
  constructor(private request: <T>(endpoint: string) => Promise<T>) {}

  info(): Promise<Store> {
    return this.request<Store>('/me');
  }
}

export interface YouCanClient {
  store: StoreContext;
}

export function client(options: YouCanClientOptions): YouCanClient {
  const { token, baseUrl } = options;

  const request = async <T>(endpoint: string): Promise<T> => {
    return ofetch<T>(`${baseUrl}${endpoint}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    });
  };

  return {
    store: new StoreContext(request),
  };
}
