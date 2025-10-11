import TotalProductTypeSalesByMonth from '@/components/dashboard/total-product-type-sales-by-month.js';
import DashboardTopSellingSkeleton from '@/components/skeleton/dashboard-top-selling-skeleton/dashboard-top-selling-skeleton';
import DashboardTotalSkeleton from '@/components/skeleton/dashboard-total-skeleton/dashboard-total-skeleton';
import { lazyDelay } from '@/core/utils/lazy-delay.js';
import { Grid } from '@mui/material';
import { Suspense } from 'react';

const TopSellingProductTypes = lazyDelay(
  () => import('@/components/dashboard/top-selling-product-types.js')
);
const TopSellers = lazyDelay(() => import('@/components/dashboard/top-sellers.js'));
const TotalQuantitySold = lazyDelay(() => import('@/components/dashboard/total-quantity-sold.js'));
const TotalSales = lazyDelay(() => import('@/components/dashboard/total-sales.js'));

const Home = () => {
  return (
    <Grid container spacing={4}>
      <Grid size={2}></Grid>
      <Grid size={4}>
        <Suspense fallback={<DashboardTotalSkeleton />}>
          <TotalSales />
        </Suspense>
      </Grid>
      <Grid size={4}>
        <Suspense fallback={<DashboardTotalSkeleton />}>
          <TotalQuantitySold />
        </Suspense>
      </Grid>
      <Grid size={2}></Grid>
      <Grid size={2}></Grid>
      <Grid size={4}>
        <Suspense fallback={<DashboardTotalSkeleton />}>
          <TotalProductTypeSalesByMonth />
        </Suspense>
      </Grid>
      <Grid size={4}>
        <Suspense fallback={<DashboardTopSellingSkeleton />}>
          <TopSellingProductTypes />
        </Suspense>
      </Grid>
      <Grid size={2}></Grid>
      <Grid size={2}></Grid>
      <Grid size={4}>
        <Suspense fallback={<DashboardTopSellingSkeleton />}>
          <TopSellers />
        </Suspense>
      </Grid>
      <Grid size={4}></Grid>
      <Grid size={2}></Grid>
    </Grid>
  );
};

export default Home;
