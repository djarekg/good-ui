import DashboardTopSelling from '@/components/dashboard/dashboard-top-selling/dashboard-top-selling.js';
import { getTopSellingProductTypes } from '@/core/services/dashboard.js';

const TopSellingProductTypes = () => {
  return (
    <DashboardTopSelling
      label="Top Sellers"
      defaultValue={[]}
      loader={() => getTopSellingProductTypes(new Date().getFullYear())}
    />
  );
};

export default TopSellingProductTypes;
