interface CallbackQuery {
  code: string;
  state: string;
}

export default defineEventHandler(async (event) => {
  const { youcan_api_secret, youcan_api_key, youcan_api_redirect } =
    useAppConfig();

  const { code, state } = getQuery<CallbackQuery>(event);

  const session = await prisma.session.findFirst({
    where: { id: decrypt(state) },
  });

  if (!session) {
    throw createError({
      statusCode: 401,
      statusMessage: "Unauthorized",
    });
  }

  const query = new URLSearchParams({
    code,
    client_id: youcan_api_key,
    grant_type: "authorization_code",
    client_secret: youcan_api_secret,
    redirect_uri: youcan_api_redirect,
  });

  const res = await fetch(`https://api.youcanshop.dev/oauth/token`, {
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    method: "POST",
    body: query,
  });

  const { access_token, expires_in } = await res.json();

  await prisma.session.update({
    where: { id: session.id },
    data: {
      accessToken: access_token,
      expires: new Date(Date.now() + expires_in),
    },
  });

  return await sendRedirect(event, "/");
});
