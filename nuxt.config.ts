// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  app: {
    head: {
      meta: [
        { name: "youcan-api-key", content: process.env.YOUCAN_API_KEY },
      ],
    },
  },
});
