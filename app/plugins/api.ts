export default defineNuxtPlugin(() => {
  const api = $fetch.create({
    onRequest({ options }) {
      if (import.meta.server) {
        try {
          const url = useRequestURL();
          const sessionId = url.searchParams.get('session');

          if (sessionId) {
            options.query = options.query || {};
            (options.query as Record<string, unknown>).session = sessionId;
          }
        }
        catch {
        }
      }
    },
  });

  return {
    provide: {
      api,
    },
  };
});
