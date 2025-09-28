import DashboardTotal from '@/components/dashboards/dashboard-total/dashboard-total.tsx';
import { TotalType } from '@/components/dashboards/dashboard-total/total-type.ts';
import { getTotalQuantitySold } from '@/core/services/dashboard.ts';

const TotalQuantitySold = () => {
  return (
    <DashboardTotal
      type={TotalType.int}
      label='Total Quantity'
      initialData={{ total: 0 }}
      queryFn={() => getTotalQuantitySold(new Date().getFullYear())}
    />
  );
};

export default TotalQuantitySold;
