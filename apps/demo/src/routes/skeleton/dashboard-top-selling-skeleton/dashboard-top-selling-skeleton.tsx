import SkeletonTable from '@/routes/skeleton/skeleton-table/skeleton-table.tsx';
import styles from './dashboard-top-selling-skeleton.module.css';

const DashboardTopSellingSkeleton = () => {
  return (
    <div className={styles.container}>
      <SkeletonTable rows={5} columns={2} />
    </div>
  );
};

export default DashboardTopSellingSkeleton;
