import { useQuery } from '@/core/hooks/use-query.ts';
import { formatter } from '@/core/utils/currency.ts';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { useEffect, useState } from 'react';
import { Fragment } from 'react/jsx-runtime';
import styles from './dashboard-top-selling.module.css';
import type { TopSellingModel } from './top-selling.ts';

type DashboardTopSellingProps<T extends TopSellingModel> = {
  initialData?: T[];
  queryFn: () => Promise<T[]>;
  label: string;
};

const DashboardTopSelling = <T extends TopSellingModel>(
  { initialData = [], queryFn, label }: DashboardTopSellingProps<T>,
) => {
  const [filteredData, setFilteredData] = useState<T[]>([]);
  const { data } = useQuery<T[]>({ initialData, queryFn });

  useEffect(() => {
    setFilteredData(data?.slice(0, 5) ?? []);
  }, [data]);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <span className={styles.label}>{label}</span>
        <FormControlLabel control={<Switch defaultChecked />} label='Top 5' />
      </header>
      <section className={styles.section}>
        {filteredData?.map(({ id, name, total }) => {
          return (
            <Fragment key={id}>
              <div className={styles.name}>{name}</div>
              <div className={styles.total}>{formatter.format(total)}</div>
            </Fragment>
          );
        })}
      </section>
    </div>
  );
};

export default DashboardTopSelling;
