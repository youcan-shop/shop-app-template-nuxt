import process from 'node:process';
import { defineNuxtConfig } from 'nuxt/config';

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  modules: ['@unocss/nuxt', '@prisma/nuxt', '@nuxt/eslint'],

  css: [
    '@youcan/celeste-tokens/tokens.css',
    '@youcan/celeste/assets/celeste.css',
  ],

  runtimeConfig: {
    port: process.env.PROT,
    appUrl: process.env.APP_URL,
    youcanApiKey: process.env.YOUCAN_API_KEY,
    youcanApiUrl: process.env.YOUCAN_API_URL || 'https://api.youcan.shop',
    youcanApiScopes: process.env.YOUCAN_API_SCOPES,
    youcanApiSecret: process.env.YOUCAN_API_SECRET,
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

  vite: {
    server: {
      allowedHosts: true,
    },
    preview: {
      allowedHosts: true,
    },
    build: {
      rollupOptions: {
        external: [/\.prisma/],
      },
    },
  },

  nitro: {
    experimental: {
      asyncContext: true,
    },
  },
});
