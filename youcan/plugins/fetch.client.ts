export default defineNuxtPlugin(() => {
  const { sessionToken } = useQantra();

  const fetch = $fetch.create({
    async onRequest({ request, options }) {
      const token = await sessionToken();

      const isExternal = typeof request === 'string'
        ? request.startsWith('http://') || request.startsWith('https://')
        : request instanceof URL;

      isExternal || options.headers.set('Authorization', `Bearer ${token}`);
    },
  });

  window.$fetch = fetch;
  window.fetch = fetch;

  return {
    provide: {
      fetch,
    },
  };
});
