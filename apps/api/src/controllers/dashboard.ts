import { prisma } from '#app/client/index.js';
import type { Context } from 'koa';

export const getTopSellers = async (ctx: Context) => {
  const { params: { year } } = ctx;
  // Construct the start and end dates for the year
  const startOfYear = new Date(`${year}-01-01T00:00:00.000Z`);
  const startOfNextYear = new Date(`${year + 1}-01-01T00:00:00.000Z`);

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

    ctx.body = totalSales;
  }
  catch (err) {
    ctx.status = 500;
    ctx.body = { error: 'Failed to fetch top sellers' };
    console.error('Failed to fetch top sellers', err);
  }
};

export const getTotalSales = async (ctx: Context) => {
  const { params: { year } } = ctx;
  // Construct the start and end dates for the year
  const startOfYear = new Date(`${year}-01-01T00:00:00.000Z`);
  const startOfNextYear = new Date(`${year + 1}-01-01T00:00:00.000Z`);

  try {
    const totalSales = await prisma.productSale.aggregate({
      _sum: {
        price: true,
      },
      where: {
        dateCreated: {
          gte: startOfYear,
          lt: startOfNextYear,
        },
      },
    });

    ctx.body = totalSales;
  }
  catch (err) {
    ctx.status = 500;
    ctx.body = { error: 'Failed to fetch total sales' };
    console.error('Failed to fetch total sales', err);
  }
};
