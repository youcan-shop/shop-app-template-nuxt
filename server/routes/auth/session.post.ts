export default defineEventHandler(async (event) => {
  const payload = await readBody<{
    store: string;
    session: string;
    code?: string;
  }>(event);

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

  return session;
});
