import { client, type YouCanClient } from '~~/lib/storeadmin-api';

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

      event.context._youcanClient = client({
        token,
        baseUrl: config.youcanApiUrl,
      });
    }

    return (event.context._youcanClient as Record<string, unknown>)[prop];
  },
};

export const youcan = new Proxy({}, youcanProxy) as YouCanClient;
