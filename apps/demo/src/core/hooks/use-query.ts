import { useEffect, useState } from 'react';

type QueryOptions<T> = {
  queryFn: () => Promise<T>;
  initialData?: T;
};

const useQuery = <T = unknown>(options: QueryOptions<T>) => {
  const { initialData = null, queryFn } = options;
  const [data, setData] = useState<T | null>(initialData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<{ message: string; } | null>(null);

  useEffect(() => {
    let mounted = true;

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const results = await queryFn();
        if (!mounted) return;
        setData(results);
      }
      catch (err: unknown) {
        if (!mounted) return;
        console.error('Failed to fetch data', err);
        setError({ message: (err as Error)?.message ?? String(err) });
      }
      finally {
        if (!mounted) return;
        setLoading(false);
      }
    };

    fetchData();

    return () => {
      mounted = false;
    };
  }, [queryFn]); // <-- run once on mount, and again only if queryFn identity changes

  return { data, error, loading };
};

export { type QueryOptions, useQuery };
