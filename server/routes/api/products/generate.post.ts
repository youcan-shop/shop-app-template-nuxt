export default defineEventHandler(async () => {
  const randomSuffix = Math.random().toString(36).substring(7);
  const price = Math.floor(Math.random() * 500) + 50;

  const product = await youcan.store.products.create({
    name: `Random Product ${randomSuffix}`,
    price,
    description: `This is a randomly generated product created at ${new Date().toISOString()}`,
    visibility: true,
    has_variants: false,
    track_inventory: false,
    images: [],
  });

  return product;
});
