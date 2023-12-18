import jwt from "jsonwebtoken";

export default defineEventHandler(async (event) => {
  if (!event.headers.get("Authorization") || event.path.includes("escape")) {
    return;
  }

  const {
    youcan_api_secret,
    youcan_api_key,
    youcan_api_redirect,
    youcan_api_scopes,
  } = useAppConfig();

  const token = event.headers.get("Authorization")?.split(" ")[1]!;
  const payload = jwt.verify(token, youcan_api_secret) as SessionTokenPayload;

  let session = await prisma.session.findFirst({
    where: { id: payload.sid },
  });

  if (!session) {
    session = await prisma.session.create({
      data: {
        id: payload.sid,
        sellerId: payload.sub,
        storeId: payload.str,
      },
    });
  }

  if (!session.accessToken || new Date(session.accessToken) <= new Date()) {
    const query = new URLSearchParams({
      prompt: "none",
      response_type: "code",
      'scope[]': youcan_api_scopes,
      client_id: youcan_api_key,
      state: encrypt(session.id),
      redirect_uri: youcan_api_redirect,
    });

    const uri = `http://seller-area.dotshop.com/admin/oauth/authorize?${query.toString()}`;
    return await sendRedirect(
      event,
      `/escape?redirect_uri=${encodeURIComponent(uri)}`,
      302
    );
  }

  event.context.session = session;
});
