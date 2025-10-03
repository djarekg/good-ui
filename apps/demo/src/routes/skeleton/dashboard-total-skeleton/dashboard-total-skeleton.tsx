import styles from './dashboard-total-skeleton.module.css';

const DashboardTotalSkeleton = () => {
  return (
    <div className={styles.container}>
      <span className={`${styles.skeleton} ${styles.label}`} />
      <span className={`${styles.skeleton} ${styles.total}`} />
    </div>
  );
};

export default DashboardTotalSkeleton;
