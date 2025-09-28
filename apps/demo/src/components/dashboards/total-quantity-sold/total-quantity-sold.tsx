import { useQuery } from '@/core/hooks/use-query.ts';
import { getTotalQuantitySold } from '@/core/services/dashboard.ts';
import { formatter } from '@/core/utils/number.ts';
import type { TotalSalesModel } from '@gui/api';
import LayersIcon from '@mui/icons-material/Layers';
import styles from './total-quantity-sold.module.css';

const TotalQuantitySold = () => {
  const { data } = useQuery<TotalSalesModel>({
    initialData: { total: 0 },
    queryFn: () => getTotalQuantitySold(new Date().getFullYear()),
  });

  return (
    <section className={styles.container}>
      <LayersIcon className={styles.icon} fontSize='large' />
      <span className={styles.label}>Total Quantity</span>
      <span className={styles.price}>{formatter.format(data?.total ?? 0)}</span>
    </section>
  );
};

export default TotalQuantitySold;
