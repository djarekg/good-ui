import { useQuery } from '@/core/hooks/use-query.ts';
import { formatter as currencyFormatter } from '@/core/utils/currency';
import { formatter as numberFormatter } from '@/core/utils/number';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import LayersIcon from '@mui/icons-material/Layers';
import styles from './dashboard-total.module.css';
import { TotalType } from './total-type.ts';
import type { TotalModel } from './total.ts';

const formatter = {
  [TotalType.currency]: currencyFormatter,
  [TotalType.int]: numberFormatter,
};

type DashboardTotalProps<T extends TotalModel> = {
  initialData?: T;
  queryFn: () => Promise<T>;
  label: string;
  type: TotalType;
};

const DashboardTotal = <T extends TotalModel>(
  { initialData = { total: 0 } as T, queryFn, label, type }: DashboardTotalProps<T>,
) => {
  const { data } = useQuery<T>({ initialData, queryFn });

  const renderIcon = () => {
    switch (type) {
      case TotalType.currency:
        return <AttachMoneyIcon className={styles.icon} fontSize='large' />;
      case TotalType.int:
        return <LayersIcon className={styles.icon} fontSize='large' />;
    }
  };

  return (
    <section className={styles.container}>
      {renderIcon()}
      <span className={styles.label}>{label}</span>
      <span className={styles.total}>{formatter[type].format(data?.total ?? 0)}</span>
    </section>
  );
};

export default DashboardTotal;
