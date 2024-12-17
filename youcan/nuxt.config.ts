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
    youcanApiKey: process.env.YOUCAN_API_KEY,
    youcanApiSecret: process.env.YOUCAN_API_SECRET,
    youcanApiScopes: process.env.YOUCAN_API_SCOPES,
    appUrl: process.env.APP_URL,
    port: process.env.PROT,
  }
});
