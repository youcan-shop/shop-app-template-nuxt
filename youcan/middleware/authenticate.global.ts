import type { Session } from '@prisma/client';
import { isbot } from 'isbot';
import { hmac } from '../server/utils/crypto';

const whitelist = ['/auth/bounce', '/__nuxt_error'];

export default defineNuxtRouteMiddleware((to) => {
  if (import.meta.client) {
    return;
  }

  const url = useRequestURL();
  const event = useRequestEvent()!;

  for (const path of whitelist) {
    if (to.path.startsWith(path) || url.pathname.startsWith(path)) {
      return;
    }
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

  if (event.context.session) {
    return;
  }

  const header = event.headers.get('authorization');

  if (header != null) {
    $fetch<Session>('/auth/session')
      .then(s => event.context.session = s);

    return;
  }

  const payload = getSessionFromSearch(url);

  if (!payload) {
    return navigateTo({
      path: '/auth/bounce',
      query: { 'youcan-reload': encodeURIComponent(url.href) },
    });
  }

  $fetch<Session>(
    '/auth/session',
    { body: payload, method: 'post' },
  ).then(s => event.context.session = s);
});

function getSessionFromSearch(url: URL): { store: string; session: string; code?: string } | null {
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
