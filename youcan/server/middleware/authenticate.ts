import jwt from "jsonwebtoken";

export default defineEventHandler(async (event) => {
  if (!event.headers.get("Authorization")) {
    return;
  }

  const config = useRuntimeConfig();

  const token = event.headers.get("Authorization")?.split(" ")[1]!;
  const payload = jwt.verify(
    token,
    config.youcanApiSecret,
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
    const query = new URLSearchParams({
      prompt: "none",
      response_type: "code",
      state: encrypt(session.id),
      client_id: config.youcanApiKey,
      "scope[]": config.youcanApiScopes,
      redirect_uri: config.youcanApiRedirect,
    });

    const uri = `https://seller-area.youcanshop.dev/admin/oauth/authorize?${query.toString()}`;
    return await sendRedirect(
      event,
      `/auth/escape?redirect_uri=${encodeURIComponent(uri)}`,
      302
    );
  }

  event.context.session = session;
});
