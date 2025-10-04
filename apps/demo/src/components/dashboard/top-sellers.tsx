import DashboardTopSelling from '@/components/dashboard/dashboard-top-selling/dashboard-top-selling.js';
import { getTopSellers } from '@/core/services/dashboard.js';

const TopSellers = () => {
  return (
    <DashboardTopSelling
      label="Top Sellers"
      defaultValue={[]}
      loader={() => getTopSellers(new Date().getFullYear())}
    />
  );
};

export default TopSellers;
