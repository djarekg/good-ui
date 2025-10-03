import type { FC } from 'react';
import styles from './skeleton-table.module.css';

type SkeletonTableProps = {
  rows: number;
  columns: number;
};

const SkeletonTable: FC<SkeletonTableProps> = ({ rows, columns }) => {
  const rowsArray = Array.from({ length: rows }).fill(0);
  const columnsArray = Array.from({ length: columns }).fill(0);

  return (
    <div className={styles.table}>
      {rowsArray.map(() => {
        return (
          <div>
            {columnsArray.map(() => {
              return (
                <div>
                  <span className={`${styles.cell} ${styles.skeleton}`} />
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default SkeletonTable;
