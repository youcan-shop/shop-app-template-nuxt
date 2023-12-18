import YouCanUi from "@youcan/ui-vue3";

export default defineNuxtPlugin((nuxt) => {
  // @ts-expect-error temp workaround
  YouCanUi.install(nuxt.vueApp);
});
