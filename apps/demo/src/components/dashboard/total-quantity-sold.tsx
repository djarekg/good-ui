import DashboardTotal from '@/components/dashboard/dashboard-total/dashboard-total.js';
import { TotalType } from '@/components/dashboard/dashboard-total/total-type.js';
import { getTotalQuantitySold } from '@/core/services/dashboard.js';

const TotalQuantitySold = () => {
  return (
    <DashboardTotal
      type={TotalType.int}
      label="Total Quantity"
      initialData={{ total: 0 }}
      queryFn={() => getTotalQuantitySold(new Date().getFullYear())}
    />
  );
};

export default TotalQuantitySold;
