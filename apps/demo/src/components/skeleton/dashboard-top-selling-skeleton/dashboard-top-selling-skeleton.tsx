import SkeletonTable from "@/components/skeleton/skeleton-table/skeleton-table";
import { Skeleton } from "@mui/material";
import styles from "./dashboard-top-selling-skeleton.module.css";

const DashboardTopSellingSkeleton = () => {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <Skeleton variant="text" sx={{ fontSize: "2rem" }} width="12ch" />
      </header>
      <SkeletonTable rows={5} columns={2} />
    </div>
  );
};

export default DashboardTopSellingSkeleton;
