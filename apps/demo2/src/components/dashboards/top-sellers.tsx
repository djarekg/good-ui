import DashboardTopSelling from '@/components/dashboards/dashboard-top-selling/dashboard-top-selling.tsx';
import { getTopSellers } from '@/core/services/dashboard.ts';

const TopSellers = () => {
  return (
    <DashboardTopSelling
      label='Top Sellers'
      initialData={[]}
      queryFn={() => getTopSellers(new Date().getFullYear())}
    />
  );
};

export default TopSellers;
