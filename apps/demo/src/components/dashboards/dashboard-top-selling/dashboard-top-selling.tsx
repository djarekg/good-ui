import { useQuery } from '@/core/hooks/use-query.ts';
import { formatter } from '@/core/utils/currency.ts';
import { titleCase } from '@/core/utils/title-case.ts';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import FormControlLabel from '@mui/material/FormControlLabel';
import IconButton from '@mui/material/IconButton';
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
  const [isTopFive, setIsTopFive] = useState(true);
  const [filteredData, setFilteredData] = useState<T[]>([]);
  const { data } = useQuery<T[]>({ initialData, queryFn });

  useEffect(() => {
    if (isTopFive) {
      setFilteredData(data?.slice(0, 5) ?? []);
    }
    else {
      setFilteredData(data ?? []);
    }
  }, [data]);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <span className={styles.label}>{label}</span>
        <FormControlLabel
          control={<Switch checked={isTopFive} onChange={e => setIsTopFive(e.target.checked)} />}
          label={isTopFive ? 'Top 5' : 'All'}
        />
        <IconButton aria-label='options' className={styles.options}>
          <MoreHorizIcon />
        </IconButton>
      </header>
      <section className={styles.section}>
        {filteredData?.map(({ id, name, total }) => {
          return (
            <Fragment key={id}>
              <div className={styles.name}>{titleCase(name)}</div>
              <div className={styles.total}>{formatter.format(total)}</div>
            </Fragment>
          );
        })}
      </section>
    </div>
  );
};

export default DashboardTopSelling;
