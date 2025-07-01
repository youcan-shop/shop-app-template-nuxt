import { useAuth } from '~/youcan/composables/use-auth';

interface CallbackQuery {
  code: string;
  state: string;
}

export default defineEventHandler(async (event) => {
  const { fetchAccessToken } = useAuth();

  const { code, state } = getQuery<CallbackQuery>(event);

  const session = await prisma.session.findFirst({
    where: { id: decrypt(state) },
  });

  if (!session) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized',
    });
  }

  const { access_token, expires_in } = await fetchAccessToken(code);

  await prisma.session.update({
    where: { id: session.id },
    data: {
      accessToken: access_token,
      expires: new Date(Date.now() + expires_in),
    },
  });

  return await sendRedirect(event, '/');
});
