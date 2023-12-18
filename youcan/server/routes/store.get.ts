export default defineEventHandler(async (event) => {
  const session = event.context.session;

  const res = await fetch('http://api.dotshop.com/me', {
    method: 'GET',
    headers: {Authorization: `Bearer ${session.accessToken}`}
  });

  const store = await res.json();

  return store;
})
