import Celeste from '@youcan/celeste-vue';

export default defineNuxtPlugin((nuxt) => {
  Celeste.install(nuxt.vueApp);
});
