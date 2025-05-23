import type { H3Event } from "h3";
import { isbot } from "isbot";
import { hmac, encrypt } from "../server/utils/crypto";
import { prisma } from "../server/utils/database";

const whitelist = ["/auth/escape", "/auth/bounce", "/__nuxt_error"];

export default defineNuxtRouteMiddleware(async (to, from) => {
  
  if (import.meta.client) {
    return;
  }

  const url = useRequestURL();
  const event = useRequestEvent()!;

  if (event.context.session) {
    return;
  }

  if (isbot(event.headers.get("user-agent"))) {
    return abortNavigation({ statusCode: 410, statusMessage: "Gone" });
  }

  if (event.method === "OPTIONS") {
    const origin = event.headers.get("origin");
    if (origin && origin !== url.hostname) {
      appendHeaders(event, {
        "access-control-max-age": 7200,
        "access-control-allow-origin": "*",
        "access-control-allow-headers": "Authorization, Content-Type",
      });
    }

    return abortNavigation({ statusCode: 204 });
  }

  if (whitelist.includes(to.path)) {
    return;
  }

  const payload = await getPayload(event, url);
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
  
  const { buildAuthorizationUrl } = useAuth();
  
  if (!session.accessToken || !session.expires || session.expires <= new Date()) {
    const authorizationUri = buildAuthorizationUrl(encrypt(session.id));

    return navigateTo(`/auth/escape?redirect_uri=${encodeURIComponent(authorizationUri)}`, {
      replace: true,
    });
  }

  event.context.session = session;
});

async function getPayload(
  event: H3Event,
  url: URL
): Promise<{ store: string; session: string } | null> {
  const signature = url.searchParams.get("hmac");
  if (!signature) {
    return null;
  }

  url.searchParams.delete("hmac");
  if (hmac(url.searchParams.toString()) !== signature) {
    return null;
  }

  return {
    store: url.searchParams.get("store")!,
    session: url.searchParams.get("session")!,
  };
}
