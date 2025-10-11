import {
  getProductTypeSalesByMonth,
  getTopSellers,
  getTopSellingProductTypes,
  getTotalQuantitySold,
  getTotalSales,
} from '#app/controllers/dashboard.js';
import Router from '@koa/router';

const router = new Router();

router.get('/dashboard/top-sellers/:year', getTopSellers);
router.get('/dashboard/top-selling-product-types/:year', getTopSellingProductTypes);
router.get('/dashboard/total-sales/:year', getTotalSales);
router.get('/dashboard/total-quantity-sold/:year', getTotalQuantitySold);
router.get('/dashboard/total-product-type-sales-by-month/:year', getProductTypeSalesByMonth);

export default router;
