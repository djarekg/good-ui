import { Skeleton } from '@mui/material';
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
      {rowsArray.map((_, rowIndex) => {
        return columnsArray.map((_, colIndex) => {
          return (
            <div key={`row-${rowIndex}-col-${colIndex}`} className={`col-${(colIndex + 1)}`}>
              <Skeleton width={colIndex === 0 ? '9ch' : '11ch'} />
            </div>
          );
        });
      })}
    </div>
  );
};

export default SkeletonTable;
