export default defineNitroPlugin((app) => {
  const config = useAppConfig();

  app.hooks.hook("render:html", (html) => {
    html.head.push(
      `<meta name="youcan-api-key" content="${config.youcan_api_key}" />`
    );
  });
});
