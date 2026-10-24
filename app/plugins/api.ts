export default defineNuxtPlugin(() => {
  const api = $fetch.create({
    onRequest({ options }) {
      if (import.meta.server) {
        try {
          const headers = new Headers(options.headers);
          headers.set('x-youcan-launch', useRequestURL().search);
          options.headers = headers;
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
