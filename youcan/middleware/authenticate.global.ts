import { isbot } from 'isbot';
import { hmac } from '../server/utils/crypto';
import { prisma } from '../server/utils/database';

const whitelist = ['/auth/bounce', '/__nuxt_error'];

export default defineNuxtRouteMiddleware(async (to) => {
  if (import.meta.client) {
    return;
  }

  for (const path of whitelist) {
    if (to.path.startsWith(path)) {
      return true;
    }
  }

  const url = useRequestURL();
  const event = useRequestEvent()!;

  if (event.context.session) {
    return;
  }

  if (isbot(event.headers.get('user-agent'))) {
    return abortNavigation({ statusCode: 410, statusMessage: 'Gone' });
  }

  if (event.method === 'OPTIONS') {
    const origin = event.headers.get('origin');
    if (origin && origin !== url.hostname) {
      appendHeaders(event, {
        'access-control-max-age': 7200,
        'access-control-allow-origin': '*',
        'access-control-allow-headers': 'Authorization, Content-Type',
      });
    }

    return abortNavigation({ statusCode: 204 });
  }

  const payload = await getPayload(url);

  if (!payload) {
    const to = encodeURIComponent(url.href);

    return navigateTo(`/auth/bounce?to=${to}`);
  }

  let session = await prisma.session.findFirst({
    where: { id: payload.session },
  });

  if (!session) {
    session = await prisma.session.create({
      data: {
        id: payload.session,
        storeId: payload.store,
      },
    });
  }

  event.context.session = session;
});

async function getPayload(url: URL): Promise<{ store: string; session: string; code?: string } | null> {
  const signature = url.searchParams.get('hmac');
  if (!signature) {
    return null;
  }

  url.searchParams.delete('hmac');
  if (hmac(url.searchParams.toString()) !== signature) {
    return null;
  }

  return {
    store: url.searchParams.get('store')!,
    session: url.searchParams.get('session')!,
  };
}
