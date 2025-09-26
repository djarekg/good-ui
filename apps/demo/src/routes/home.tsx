import TopSellers from '@/components/dashboards/top-sellers/top-sellers.tsx';
import TotalSales from '@/components/dashboards/total-sales/total-sales';
import { Grid } from '@mui/material';

const Home = () => {
  return (
    <Grid container spacing={4}>
      <Grid size={3}>
        <TotalSales />
      </Grid>
      <Grid size={9}></Grid>
      <Grid size={6}>
        <TopSellers />
      </Grid>
      <Grid size={6}></Grid>
    </Grid>
  );
};

export default Home;
