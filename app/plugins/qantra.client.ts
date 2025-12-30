import * as qantra from '@youcan/qantra';

export default defineNuxtPlugin(async () => {
  return {
    provide: {
      qantra,
    },
  };
});
