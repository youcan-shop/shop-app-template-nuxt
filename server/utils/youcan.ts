import { client, type YouCanClient } from '~~/lib/youcan';

const youcanProxy = {
  get(_target: unknown, prop: string) {
    const event = useEvent();
    const config = useRuntimeConfig();

    if (!event.context._youcanClient) {
      const token = event.context.session?.accessToken;

      if (!token) {
        throw createError({
          statusCode: 401,
          statusMessage: 'Unauthorized: No access token found in session',
        });
      }

      const request = async <T>(endpoint: string, options?: any): Promise<T> => {
        try {
          return await $fetch<T>(`${config.youcanApiUrl}${endpoint}`, {
            ...options,
            headers: {
              'Authorization': `Bearer ${token}`,
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              ...options?.headers,
            },
          });
        }
        catch (error: any) {
          if (error.response?.status === 401 && event.context.session?.id) {
            await prisma.session.update({
              where: { id: event.context.session.id },
              data: { accessToken: null, registeredWebhooks: null },
            });
            event.context.session.accessToken = null;
          }
          throw error;
        }
      };

      event.context._youcanClient = client(request);
    }

    return (event.context._youcanClient as Record<string, unknown>)[prop];
  },
};

export const youcan = new Proxy({}, youcanProxy) as YouCanClient;
