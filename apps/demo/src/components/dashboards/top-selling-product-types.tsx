import DashboardTopSelling from '@/components/dashboards/dashboard-top-selling/dashboard-top-selling.tsx';
import { getTopSellingProductTypes } from '@/core/services/dashboard.ts';

const TopSellingProductTypes = () => {
  return (
    <DashboardTopSelling
      label='Top Sellers'
      initialData={[]}
      queryFn={() => getTopSellingProductTypes(new Date().getFullYear())}
    />
  );
};

export default TopSellingProductTypes;
