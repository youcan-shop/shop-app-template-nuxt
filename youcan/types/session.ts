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
