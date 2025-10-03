import { Skeleton } from "@mui/material";
import styles from "./dashboard-total-skeleton.module.css";

const DashboardTotalSkeleton = () => {
  return (
    <div className={styles.container}>
      <Skeleton width="15ch" height="2.5rem" />
      <Skeleton width="12ch" height="4rem" />
    </div>
  );
};

export default DashboardTotalSkeleton;
