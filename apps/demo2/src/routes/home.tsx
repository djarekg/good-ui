import TopSellers from '@/components/dashboards/top-sellers';
import TopSellingProductTypes from '@/components/dashboards/top-selling-product-types';
import TotalQuantitySold from '@/components/dashboards/total-quantity-sold.tsx';
import TotalSales from '@/components/dashboards/total-sales';
import { Grid } from '@mui/material';

const Home = () => {
  return (
    <Grid container spacing={4}>
      <Grid size={2}></Grid>
      <Grid size={4}>
        <TotalSales />
      </Grid>
      <Grid size={4}>
        <TotalQuantitySold />
      </Grid>
      <Grid size={2}></Grid>
      <Grid size={2}></Grid>
      <Grid size={4}>
        <TopSellers />
      </Grid>
      <Grid size={4}>
        <TopSellingProductTypes />
      </Grid>
      <Grid size={2}></Grid>
    </Grid>
  );
};

export default Home;
