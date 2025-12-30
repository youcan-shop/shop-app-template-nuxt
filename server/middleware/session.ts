import type { SessionTokenPayload } from '~~/shared/types/youcan';
import { useRuntimeConfig } from '#imports';
import jwt from 'jsonwebtoken';

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();

  const authHeader = event.headers.get('Authorization');

  if (authHeader) {
    const token = authHeader.replace('Bearer ', '');
    const payload = jwt.verify(token, config.youcanApiSecret) as SessionTokenPayload;

    let session = await prisma.session.findFirst({
      where: { id: payload.sid },
    });

    if (!session) {
      session = await prisma.session.create({
        data: {
          id: payload.sid,
          storeId: payload.str,
        },
      });
    }

    if (!session.accessToken) {
      const { access_token } = await exchangeSessionToken(token);

      session = await prisma.session.update({
        where: { id: session.id },
        data: { accessToken: access_token },
      });
    }

    event.context.session = session;
    return;
  }

  const sessionId = getQuery(event).session as string | undefined;
  if (sessionId) {
    const session = await prisma.session.findFirst({
      where: { id: sessionId },
    });

    if (session?.accessToken) {
      event.context.session = session;
    }
  }
});
