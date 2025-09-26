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
        userId,
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

export const getTotalSales = async (ctx: Context) => {
  const { params: { year } } = ctx;
  // Construct the start and end dates for the year
  const startOfYear = new Date(`${Number(year)}-01-01T00:00:00.000Z`);
  const startOfNextYear = new Date(`${Number(year) + 1}-01-01T00:00:00.000Z`);

  try {
    const { _sum } = await prisma.productSale.aggregate({
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

    ctx.body = { total: _sum.price };
  }
  catch (err) {
    ctx.status = 500;
    ctx.body = { error: 'Failed to fetch total sales' };
    console.error('Failed to fetch total sales', err);
  }
};
