import { useEffect, useState } from 'react';

type QueryOptions<T> = {
  queryFn: () => Promise<T>;
  initialData?: T;
};

const useQuery = <T = unknown>(options: QueryOptions<T>) => {
  const { initialData = null, queryFn } = options;
  const [data, setData] = useState<T | null>(initialData);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const results = await queryFn();
        setData(results);
      }
      catch (err) {
        console.error('Failed to fetch data', err);
      }
    };
    fetchData();
  });

  return { data };
};

export { type QueryOptions, useQuery };
