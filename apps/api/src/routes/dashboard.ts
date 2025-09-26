import { getTopSellers, getTotalSales } from '#app/controllers/dashboard.js';
import Router from '@koa/router';

const router = new Router();

router.get('/dashboard/top-sellers/:year', getTopSellers);
router.get('/dashboard/total-sales/:year', getTotalSales);

export default router;
