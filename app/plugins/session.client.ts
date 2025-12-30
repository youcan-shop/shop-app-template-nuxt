export default defineNuxtPlugin(async () => {
  try {
    await $fetch('/auth/session');
  }
  catch (e) {
  }
});
