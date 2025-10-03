import DashboardTotal from '@/components/dashboards/dashboard-total/dashboard-total.tsx';
import { TotalType } from '@/components/dashboards/dashboard-total/total-type.ts';
import { getTotalSales } from '@/core/services/dashboard.ts';

const TotalSales = () => {
  return (
    <DashboardTotal
      type={TotalType.currency}
      label='Total Sales'
      initialData={{ total: 0 }}
      queryFn={() => getTotalSales(new Date().getFullYear())}
    />
  );
};

export default TotalSales;
