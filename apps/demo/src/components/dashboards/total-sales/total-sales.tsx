import { useQuery } from '@/core/hooks/use-query.ts';
import { getTotalSales } from '@/core/services/dashboard.ts';
import { formatter } from '@/core/utils/currency.ts';
import type { TotalSalesModel } from '@gui/api';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import styles from './total-sales.module.css';

const TotalSales = () => {
  const { data } = useQuery<TotalSalesModel>({
    initialData: { total: 0 },
    queryFn: () => getTotalSales(new Date().getFullYear()),
  });

  return (
    <section className={styles.container}>
      <AttachMoneyIcon className={styles.icon} fontSize='large' />
      <span className={styles.label}>Total Sales</span>
      <span className={styles.price}>{formatter.format(data?.total ?? 0)}</span>
    </section>
  );
};

export default TotalSales;
