import process from 'node:process';

export default defineNuxtConfig({
  modules: [
    '@unocss/nuxt',
  ],
  css: [
    '@youcan/celeste-tokens/tokens.css',
    '@youcan/celeste-vue/dist/index.css',
  ],
  runtimeConfig: {
    port: process.env.PROT,
    appUrl: process.env.APP_URL,
    youcanApiKey: process.env.YOUCAN_API_KEY,
    youcanApiScopes: process.env.YOUCAN_API_SCOPES,
    youcanApiSecret: process.env.YOUCAN_API_SECRET,
  },
  unocss: {
    nuxtLayers: true,
  },
  routeRules: {
    '/**': {
      headers: {
        'Access-Control-Allow-Headers': 'Authorization, Content-Type',
        'Content-Security-Policy': 'frame-ancestors https://seller-area.youcan.shop http://seller-area.dotshop.com https://seller-area.ycan.vip https://seller-area.testyoucan.shop',
      },
    },
    '/auth/bounce': {
      ssr: false,
    },
  },
  vue: {
    compilerOptions: {
      isCustomElement: n => ['ui-nav-menu'].includes(n),
    },
  },
});
