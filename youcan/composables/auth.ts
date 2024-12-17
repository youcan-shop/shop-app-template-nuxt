type AccessTokenResponseType = {
  access_token: string
  refresh_token: string
  token_type: string
  expires_in: number
}

export const useAuth = () => {
  const SELLER_AREA_BASE_URL = 'https://seller-area.youcan.shop';  
  const config = useRuntimeConfig();
  
  if (
    !config.appUrl
    || !config.youcanApiKey
    || !config.youcanApiSecret
    || !config.youcanApiScopes
  ) {  
    throw new Error('Missing required environment variables: APP_URL, YOUCAN_API_KEY, YOUCAN_API_SECRET, YOUCAN_API_SCOPES.');
  }
  
  const redirectUri = new URL(config.appUrl);
  redirectUri.pathname = '/auth/callback';

  const buildAuthorizationUrl = (state: string) => {
    const query = new URLSearchParams(
      {
        prompt: "none",
        response_type: "code",
        state: state,
        client_id: config.youcanApiKey,
        "scope[]": config.youcanApiScopes,
        redirect_uri: redirectUri.toString(),
    }
  );

    return `${SELLER_AREA_BASE_URL}/admin/oauth/authorize?${query.toString()}`;
  }

  const fetchAccessToken = async function (code: string) {
    const query = new URLSearchParams({
      code,
      client_id: config.youcanApiKey,
      grant_type: "authorization_code",
      client_secret: config.youcanApiSecret,
      redirect_uri: redirectUri.toString(),
    });

    const res = await fetch(`https://api.youcan.shop/oauth/token`, {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      method: "POST",
      body: query,
    });
    return await res.json() as AccessTokenResponseType;
  }
  
  return {
    fetchAccessToken,
    buildAuthorizationUrl,
    youcanApiKey: config.youcanApiKey,
    youcanApiSecret: config.youcanApiSecret,
    youcanApiScopes: config.youcanApiScopes,
  }
}
