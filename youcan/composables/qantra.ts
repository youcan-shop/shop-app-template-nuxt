import * as qantra from '@youcan/qantra'

export const useQantra = () => {
  const fetch: typeof useFetch = (request, opts?) => {
    return useFetch(request, {
      ...opts,
      server: false,
      redirect: "follow",
      async onRequest({ options }) {
        const token = await qantra.sessionToken();

        options.headers = {
          ...options.headers,
          Authorization: `Bearer ${token}`,
        };
      },
      async onResponse({ response }) {
        // very unfortunate doublenav

        if (response.redirected) {
          return await navigateTo(response.url, { external: true });
        }
      },
    });
  };

  return {
    fetch,
    ...qantra,
  };
};
