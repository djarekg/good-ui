import DashboardTotalByMonth from '@/components/dashboard/dashboard-total-by-month/dashboard-total-by-month.js';
import ErrorMessage from '@/components/error/error-message.js';
import Loader from '@/components/loader/loader.js';
import { useResource } from '@/core/hooks/use-resource.js';
import { getTotalProductTypeSalesByMonth } from '@/core/services/dashboard.js';

const TotalProductTypeSalesByMonth = () => {
  const { data, error, loading } = useResource({
    defaultValue: [],
    params: () => new Date().getFullYear(),
    loader: (year) => getTotalProductTypeSalesByMonth(year),
  });

  if (loading) return <Loader />;
  if (error) return <ErrorMessage message={error.message} />;

  return <DashboardTotalByMonth data={data} />;
};

export default TotalProductTypeSalesByMonth;
