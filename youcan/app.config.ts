export default defineAppConfig({
  youcan_api_key: process.env.YOUCAN_API_KEY!,
  youcan_api_secret: process.env.YOUCAN_API_SECRET!,
  youcan_api_redirect: process.env.YOUCAN_API_REDIRECT!,
  youcan_api_scopes: process.env.YOUCAN_API_SCOPES! || "*",
});
