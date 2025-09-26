import { useQuery } from '@/core/hooks/use-query.ts';
import { getTopSellers } from '@/core/services/dashboard.ts';
import { formatter } from '@/core/utils/currency.ts';
import type { TopSellerModel } from '@gui/api';
import styles from './top-sellers.module.css';

const TopSellers = () => {
  const { data } = useQuery<TopSellerModel[]>({
    initialData: [],
    queryFn: () => getTopSellers(new Date().getFullYear()),
  });

  return (
    <>
      <header className={styles.header}>
        Top Sellers
      </header>
      <section className={styles.container}>
        {data?.map(({ name, total }) => {
          return (
            <>
              <div>{name}</div>
              <div>{formatter.format(total)}</div>
            </>
          );
        })}
      </section>
    </>
  );
};

export default TopSellers;
