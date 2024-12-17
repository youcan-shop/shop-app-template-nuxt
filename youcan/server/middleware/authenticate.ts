import jwt from "jsonwebtoken";
import { useAuth } from "~/youcan/composables/auth";

export default defineEventHandler(async (event) => {
  if (!event.headers.get("Authorization")) {
    return;
  }

  const { youcanApiSecret } = useAuth();
  const auth = useAuth();

  const token = event.headers.get("Authorization")?.split(" ")[1]!;
  const payload = jwt.verify(
    token,
    youcanApiSecret,
  ) as SessionTokenPayload;

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

  if (!session.accessToken || new Date(session.accessToken) <= new Date()) {
    const authorizationUrl = auth.buildAuthorizationUrl(encrypt(session.id));

    return await sendRedirect(
      event,
      `/auth/escape?redirect_uri=${authorizationUrl}`,
      302
    );
  }

  event.context.session = session;
});
