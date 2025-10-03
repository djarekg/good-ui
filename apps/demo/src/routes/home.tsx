import TopSellers from '@/components/dashboards/top-sellers';
import TopSellingProductTypes from '@/components/dashboards/top-selling-product-types';
import TotalQuantitySold from '@/components/dashboards/total-quantity-sold.tsx';
import TotalSales from '@/components/dashboards/total-sales';
import DashboardTopSellingSkeleton from '@/routes/skeleton/dashboard-top-selling-skeleton/dashboard-top-selling-skeleton.tsx';
import DashboardTotalSkeleton from '@/routes/skeleton/dashboard-total-skeleton/dashboard-total-skeleton.tsx';
import { Grid } from '@mui/material';
import { Suspense } from 'react';

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
        <Suspense fallback={<DashboardTopSellingSkeleton />}>
          <TopSellers />
        </Suspense>
      </Grid>
      <Grid size={4}>
        <Suspense fallback={<DashboardTopSellingSkeleton />}>
          <TopSellingProductTypes />
        </Suspense>
      </Grid>
      <Grid size={2}></Grid>
    </Grid>
  );
};

export default Home;
