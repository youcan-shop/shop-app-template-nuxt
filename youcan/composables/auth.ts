export const useAuth = () => {
  const config = useRuntimeConfig();
  const sellerAreaBaseUrl = 'https://seller-area.youcan.shop';

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

    return `${sellerAreaBaseUrl}/admin/oauth/authorize?${query.toString()}`;
  }

  const getAccessToken = async function (code: string) {
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

    return await res.json();
  }

  return {
    getAccessToken,
    buildAuthorizationUrl,
  }
}
