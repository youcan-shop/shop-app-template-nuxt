import type { Session } from '@prisma/client';
import { isbot } from 'isbot';

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

  if (!verifyLaunch(url.searchParams)) {
    return navigateTo({
      path: '/auth/bounce',
      query: { 'youcan-reload': encodeURIComponent(url.href) },
    });
  }

  const host = url.searchParams.get('host');
  const handle = useRuntimeConfig().youcanAppHandle;

  if (host && handle && event.headers.get('sec-fetch-dest') === 'document') {
    return navigateTo(`https://${atob(host)}/apps/${handle}/app`, { external: true });
  }

  $fetch<Session>(
    '/auth/session',
    { method: 'post', query: Object.fromEntries(url.searchParams) },
  ).then(s => event.context.session = s);
});
