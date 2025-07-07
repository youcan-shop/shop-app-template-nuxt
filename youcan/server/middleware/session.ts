import type { SessionTokenPayload } from '~/youcan/types/session';
import jwt from 'jsonwebtoken';
import { useAuth } from '~/youcan/composables/use-auth';

export default defineEventHandler(async (event) => {
  if (!event.headers.get('Authorization')) {
    return;
  }

  const { youcanApiSecret, exchangeSessionToken } = useAuth();
  const token = event.headers.get('Authorization')!.replace('Bearer ', '');

  const payload = jwt.verify(token, youcanApiSecret) as SessionTokenPayload;

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

  if (!session.accessToken || session.expires! <= new Date()) {
    const { access_token, expires_in } = await exchangeSessionToken(token);

    session = await prisma.session.update({
      where: { id: session.id },
      data: {
        accessToken: access_token,
        expires: new Date(Date.now() + expires_in * 1_000),
      },
    });
  }

  event.context.session = session;
});
