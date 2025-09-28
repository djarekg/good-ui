import { useQuery } from '@/core/hooks/use-query.ts';
import { getTopSellingProductTypes } from '@/core/services/dashboard.ts';
import { formatter } from '@/core/utils/currency.ts';
import { titleCase } from '@/core/utils/title-case.ts';
import type { ProductTypeTotalModel } from '@gui/api';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { useEffect, useState } from 'react';
import { Fragment } from 'react/jsx-runtime';
import styles from './top-selling-product-types.module.css';

const TopSellingProductTypes = () => {
  const [displayData, setDisplayData] = useState<ProductTypeTotalModel[]>([]);
  const { data } = useQuery<ProductTypeTotalModel[]>({
    initialData: [],
    queryFn: () => getTopSellingProductTypes(new Date().getFullYear()),
  });

  useEffect(() => {
    setDisplayData(data?.slice(0, 5) ?? []);
  }, [data]);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <span className={styles.label}>Top Sellers</span>
        <FormControlLabel control={<Switch defaultChecked />} label='Top 5' />
      </header>
      <section className={styles.section}>
        {displayData?.map(({ productType, total }) => {
          return (
            <Fragment key={productType}>
              <div className={styles.name}>{titleCase(productType)}</div>
              <div className={styles.total}>{formatter.format(total)}</div>
            </Fragment>
          );
        })}
      </section>
    </div>
  );
};

export default TopSellingProductTypes;
