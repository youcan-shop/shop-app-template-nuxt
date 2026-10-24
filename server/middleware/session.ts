import type { SessionTokenPayload } from '~~/shared/types/youcan';
import { useRuntimeConfig } from '#imports';
import jwt from 'jsonwebtoken';

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();

  const authHeader = event.headers.get('Authorization');

  if (authHeader) {
    const token = authHeader.replace('Bearer ', '');
    const retry = () => {
      setResponseHeader(event, 'x-youcan-retry-invalid-session-request', '1');
      return createError({ statusCode: 401, statusMessage: 'Invalid session token' });
    };

    let payload: SessionTokenPayload;

    try {
      payload = jwt.verify(token, config.youcanApiSecret, { audience: config.youcanApiKey }) as SessionTokenPayload;
    }
    catch {
      throw retry();
    }

    if (payload.iss !== `${payload.dest}/admin`) {
      throw retry();
    }

    let session = await prisma.session.findFirst({
      where: { id: payload.sid },
    });

    if (!session) {
      session = await prisma.session.create({
        data: {
          id: payload.sid,
          store: payload.str,
        },
      });
    }

    if (!session.accessToken) {
      const { access_token } = await exchangeSessionToken(token).catch(() => {
        throw retry();
      });

      session = await prisma.session.update({
        where: { id: session.id },
        data: { accessToken: access_token },
      });
    }

    event.context.session = session;
    return;
  }

  const launch = verifyLaunch(new URLSearchParams(event.headers.get('x-youcan-launch') ?? getRequestURL(event).search));

  if (launch) {
    const session = await prisma.session.findFirst({
      where: { id: launch.session },
    });

    if (session?.accessToken && session.store === launch.store) {
      event.context.session = session;
    }
  }
});
