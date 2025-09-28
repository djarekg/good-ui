import TopSellers from '@/components/dashboards/top-sellers/top-sellers.tsx';
import TopSellingProductTypes from '@/components/dashboards/top-selling-product-types/top-selling-product-types.tsx';
import TotalQuantitySold from '@/components/dashboards/total-quantity-sold/total-quantity-sold.tsx';
import TotalSales from '@/components/dashboards/total-sales/total-sales';
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
