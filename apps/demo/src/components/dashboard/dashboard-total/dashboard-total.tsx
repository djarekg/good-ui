import { useResource } from '@/core/hooks/use-resource.js';
import { formatter as currencyFormatter } from '@/core/utils/currency';
import { formatter as numberFormatter } from '@/core/utils/number';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import LayersIcon from '@mui/icons-material/Layers';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import IconButton from '@mui/material/IconButton';
import styles from './dashboard-total.module.css';
import { TotalType } from './total-type.js';
import type { TotalModel } from './total.js';

const formatter = {
  [TotalType.currency]: currencyFormatter,
  [TotalType.int]: numberFormatter,
};

const renderIcon = (type: TotalType) => {
  switch (type) {
    case TotalType.currency:
      return <AttachMoneyIcon className={styles.icon} fontSize="large" />;
    case TotalType.int:
      return <LayersIcon className={styles.icon} fontSize="large" />;
  }
};

type DashboardTotalProps<T extends TotalModel> = {
  defaultValue?: T;
  loader: () => Promise<T>;
  label: string;
  type: TotalType;
};

const DashboardTotal = <T extends TotalModel>({
  defaultValue = { total: 0 } as T,
  loader,
  label,
  type,
}: DashboardTotalProps<T>) => {
  const { data } = useResource({ defaultValue, loader });

  return (
    <section className={styles.container}>
      {renderIcon(type)}
      <IconButton aria-label="options" className={styles.options}>
        <MoreHorizIcon />
      </IconButton>
      <span className={styles.label}>{label}</span>
      <span className={styles.total}>{formatter[type].format(data?.total ?? 0)}</span>
    </section>
  );
};

export default DashboardTotal;
