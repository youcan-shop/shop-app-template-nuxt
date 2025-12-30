export const useApi: typeof useFetch = (url, options) => {
  return useFetch(url, {
    ...options,
    $fetch: useNuxtApp().$api as typeof $fetch,
  });
};
