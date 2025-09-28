import { prisma } from '#app/client/index.js';
import type { Context } from 'koa';

export const getTopSellers = async (ctx: Context) => {
  const { params: { year } } = ctx;
  // Construct the start and end dates for the year
  const startOfYear = new Date(`${Number(year)}-01-01T00:00:00.000Z`);
  const startOfNextYear = new Date(`${Number(year) + 1}-01-01T00:00:00.000Z`);

  try {
    const totalSales = await prisma.productSale.groupBy({
      by: ['userId'],
      _sum: {
        price: true,
      },
      where: {
        dateCreated: {
          gte: startOfYear,
          lt: startOfNextYear,
        },
      },
      orderBy: {
        _sum: {
          price: 'desc',
        },
      },
    });

    const userIds = totalSales.map(({ userId }) => userId);

    const users = await prisma.user.findMany({
      where: {
        id: {
          in: userIds,
        },
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
      },
    });

    const result = totalSales.map(({ _sum: { price }, userId }) => {
      const { firstName, lastName } = users.find(({ id }) => id === userId)!;

      return {
        id: userId,
        name: `${firstName} ${lastName}`,
        total: price,
      };
    });

    ctx.body = result;
  }
  catch (err) {
    ctx.status = 500;
    ctx.body = { error: 'Failed to fetch top sellers' };
    console.error('Failed to fetch top sellers', err);
  }
};

export const getTopSellingProductTypes = async (ctx: Context) => {
  const { params: { year } } = ctx;
  // Construct the start and end dates for the year
  const startOfYear = new Date(`${Number(year)}-01-01T00:00:00.000Z`);
  const startOfNextYear = new Date(`${Number(year) + 1}-01-01T00:00:00.000Z`);

  try {
    // Load sales with product.productType included
    const productSales = await prisma.productSale.findMany({
      include: {
        product: {
          select: {
            productType: true,
          },
        },
      },
      where: {
        dateCreated: {
          gte: startOfYear,
          lt: startOfNextYear,
        },
      },
    });

    // Aggregate totals by productType (sum of quantity * price)
    const totalsByType = productSales.reduce<Record<string, number>>((acc, sale) => {
      const productType = sale.product?.productType ?? 'Unknown';
      const qty = Number(sale.quantity ?? 0);
      const price = Number(sale.price ?? 0);
      acc[productType] = (acc[productType] || 0) + qty * price;
      return acc;
    }, {});

    // Convert to array and sort descending by total
    const result = Object.entries(totalsByType)
      .map(([productType, total]) => ({ id: productType, name: productType, total }))
      .sort((a, b) => b.total - a.total);

    ctx.body = result;
  }
  catch (err) {
    ctx.status = 500;
    ctx.body = { error: 'Failed to fetch top selling product types' };
    console.error('Failed to fetch top selling product types', err);
  }
};

export const getTotalSales = async (ctx: Context) => {
  const { params: { year } } = ctx;
  // Construct the start and end dates for the year
  const startOfYear = new Date(`${Number(year)}-01-01T00:00:00.000Z`);
  const startOfNextYear = new Date(`${Number(year) + 1}-01-01T00:00:00.000Z`);

  try {
    const sales = await prisma.productSale.findMany({
      select: {
        quantity: true,
        price: true,
      },
      where: {
        dateCreated: {
          gte: startOfYear,
          lt: startOfNextYear,
        },
      },
    });

    // calculate sales by multiplying qty * price and summing the result
    const totalSales = sales.reduce((acc, item) => {
      const q = Number(item.quantity ?? 0);
      const p = Number(item.price ?? 0);
      return acc + q * p;
    }, 0);

    ctx.body = { total: totalSales };
  }
  catch (err) {
    ctx.status = 500;
    ctx.body = { error: 'Failed to fetch total sales' };
    console.error('Failed to fetch total sales', err);
  }
};

export const getTotalQuantitySold = async (ctx: Context) => {
  const { params: { year } } = ctx;
  // Construct the start and end dates for the year
  const startOfYear = new Date(`${Number(year)}-01-01T00:00:00.000Z`);
  const startOfNextYear = new Date(`${Number(year) + 1}-01-01T00:00:00.000Z`);

  try {
    const { _sum } = await prisma.productSale.aggregate({
      _sum: {
        quantity: true,
      },
      where: {
        dateCreated: {
          gte: startOfYear,
          lt: startOfNextYear,
        },
      },
    });

    ctx.body = { total: _sum.quantity };
  }
  catch (err) {
    ctx.status = 500;
    ctx.body = { error: 'Failed to fetch total quantity sold' };
    console.error('Failed to fetch total quantity sold', err);
  }
};
