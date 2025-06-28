interface TokenExchangeResponse {
  access_token: string;
  expires_in: number;
}

const API_BASE_URL = 'https://api.youcan.shop';

export function useAuth() {
  const config = useRuntimeConfig();

  if (!config.appUrl || !config.youcanApiKey || !config.youcanApiSecret || !config.youcanApiScopes) {
    throw new Error('Missing required environment variables: APP_URL, YOUCAN_API_KEY, YOUCAN_API_SECRET, YOUCAN_API_SCOPES.');
  }

  async function exchangeSessionToken(session: string) {
    const query = new URLSearchParams({
      session_token: session,
      grant_type: 'token_exchange',
      client_id: config.youcanApiKey,
      client_secret: config.youcanApiSecret,
    });

    const res = await fetch(`${API_BASE_URL}/oauth/token`, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      method: 'POST',
      body: query,
    });

    return (await res.json()) as TokenExchangeResponse;
  }

  return {
    exchangeSessionToken,
    youcanApiKey: config.youcanApiKey,
    youcanApiSecret: config.youcanApiSecret,
    youcanApiScopes: config.youcanApiScopes,
  };
}
