import type { SessionTokenPayload } from '~~/shared/types/youcan';
import { useRuntimeConfig } from '#imports';
import jwt from 'jsonwebtoken';

export default defineEventHandler(async (event) => {
  if (!event.headers.get('Authorization')) {
    return;
  }

  const { youcanApiSecret } = useRuntimeConfig();

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

  if (!session.accessToken) {
    const { access_token } = await exchangeSessionToken(token);

    session = await prisma.session.update({
      where: { id: session.id },
      data: { accessToken: access_token },
    });
  }

  event.context.session = session;
});
