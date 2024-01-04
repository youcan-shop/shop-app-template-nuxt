import { createLogger } from "vite";

// temp workaround for youcan-ui css warnings

const logger = createLogger();
const warn = logger.warn;

logger.warn = (msg, options) => {
  if (msg.includes("vite:css")) return;
  warn(msg, options);
};

export default defineNuxtConfig({
  css: ["@youcan/ui-core/tokens", "@youcan/ui-vue3/style"],
  hooks: {
    "vite:extendConfig"(config) {
      config.customLogger = logger;
    },
  },
  runtimeConfig: {
    youcanApiScopes: '*',
    youcanApiKey: undefined,
    youcanApiSecret: undefined,
    youcanApiRedirect: 'http://localhost:3000/auth/callback',
  }
});
