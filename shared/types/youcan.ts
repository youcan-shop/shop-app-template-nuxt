export interface TokenExchangeResponse {
  access_token: string;
  expires_in: number;
  associated_user_scope?: string;
  associated_user?: {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    locale: string | null;
    account_owner: boolean;
  };
}

export interface SessionTokenPayload {
  iss: string;
  dest: string;
  aud: string;
  sub: string;
  str: string;
  jti: string;
  sid: string;
  iat: number;
  nbf: number;
  exp: number;
  sig: string;
}
