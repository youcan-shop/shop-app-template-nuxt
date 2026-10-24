export default defineEventHandler(async (event) => {
  const launch = verifyLaunch(getRequestURL(event).searchParams);

  if (!launch) {
    throw createError({ statusCode: 401, statusMessage: 'Invalid signature' });
  }

  let session = await prisma.session.findFirst({
    where: { id: launch.session },
  });

  if (!session) {
    session = await prisma.session.create({
      data: {
        id: launch.session,
        store: launch.store,
      },
    });
  }
  else {
    session = await prisma.session.update({
      where: { id: launch.session },
      data: { accessToken: null },
    });
  }

  event.context.session = session;

  return session;
});
