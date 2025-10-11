import { type PrismaClient, ProductType, Role } from '#app/generated/prisma/client.js';

// Define the number of sales transactions to create for each product type
const productTypeSaleTransactionQuantityMap: Record<ProductType, number> = {
  [ProductType.DRESS]: 90,
  [ProductType.HAT]: 133,
  [ProductType.HOODIE]: 100,
  [ProductType.JACKET]: 200,
  [ProductType.PANTS]: 250,
  [ProductType.SHIRT]: 200,
  [ProductType.SHOES]: 150,
  [ProductType.SHORTS]: 156,
  [ProductType.SOCKS]: 230,
  [ProductType.SWEATER]: 56,
  [ProductType.UNDERWEAR]: 78,
};

export const createProductSales = async (prisma: PrismaClient) => {
  console.log('Seeding ProductSale...');

  const createProductSales = async () => {
    const customerIds = (await prisma.customer.findMany()).map(({ id }) => id);
    const salesUserIds = (
      await prisma.user.findMany({
        where: {
          userCredential: {
            role: Role.SALES,
          },
        },
      })
    ).map(({ id }) => id);

    for (const productType in productTypeSaleTransactionQuantityMap) {
      const quantityToCreate = productTypeSaleTransactionQuantityMap[productType as ProductType];

      for (let i = 0; i < quantityToCreate; i++) {
        const products = await prisma.product.findMany({
          select: {
            id: true,
            price: true,
          },
          where: {
            productType: productType as ProductType,
          },
        });

        const { id: productId, price } = products[Math.floor(Math.random() * products.length)];
        const customerId = customerIds[Math.floor(Math.random() * customerIds.length)];
        const userId = salesUserIds[Math.floor(Math.random() * salesUserIds.length)];
        const quantity = Math.floor(Math.random() * 10) + 1;

        // Random date within the pasts year
        const now = new Date();
        const oneYearAgo = new Date();
        oneYearAgo.setFullYear(now.getFullYear() - 1);

        const randomTimestamp =
          oneYearAgo.getTime() + Math.random() * (now.getTime() - oneYearAgo.getTime());
        const dateCreated = new Date(randomTimestamp);
        dateCreated.setHours(0, 0, 0, 0);

        await prisma.productSale.create({
          data: {
            productId,
            customerId,
            userId,
            quantity,
            price,
            dateCreated,
          },
        });
      }
    }
  };

  await createProductSales();
};
