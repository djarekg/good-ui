import DashboardTotal from '@/components/dashboard/dashboard-total/dashboard-total.js';
import { TotalType } from '@/components/dashboard/dashboard-total/total-type.js';
import { getTotalSales } from '@/core/services/dashboard.js';

const TotalSales = () => {
  return (
    <DashboardTotal
      type={TotalType.currency}
      label="Total Sales"
      defaultValue={{ total: 0 }}
      loader={() => getTotalSales(new Date().getFullYear())}
    />
  );
};

export default TotalSales;
