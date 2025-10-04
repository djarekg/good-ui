import { useEffect, useState } from 'react';

type QueryOptionsWithParams<T, P> = {
  params: () => P;
  queryFn: (params: P) => Promise<T>;
  defaultValue?: T | null;
};

type QueryOptionsNoParams<T> = {
  params?: undefined;
  queryFn: () => Promise<T>;
  defaultValue?: T | null;
};

export type QueryOptions<T, P = unknown> = QueryOptionsWithParams<T, P> | QueryOptionsNoParams<T>;

type UseQueryResult<T> = {
  data: T | null;
  error: Error | null;
  loading: boolean;
};

/**
 * Overload: when `params` is provided the `queryFn` receives the params type P.
 */
export function useQuery<T, P>(options: QueryOptionsWithParams<T, P>): UseQueryResult<T>;
/**
 * Overload: when `params` is not provided `queryFn` takes no arguments.
 */
export function useQuery<T>(options: QueryOptionsNoParams<T>): UseQueryResult<T>;

/**
 * Implementation (single function handling both overloads).
 */
export function useQuery<T, P>(options: QueryOptions<T, P>): UseQueryResult<T> {
  const { defaultValue = null } = options as QueryOptions<T, P>;
  const [data, setData] = useState<T | null>(defaultValue);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let mounted = true;

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        if (typeof (options as QueryOptionsWithParams<T, P>).params === 'function') {
          // options has params
          const params = (options as QueryOptionsWithParams<T, P>).params();
          // TS can't narrow the union here to preserve generic P, so assert to call
          const results = await (options as QueryOptionsWithParams<T, P>).queryFn(params);
          if (!mounted) return;
          setData(results as T);
        } else {
          // no params
          const results = await (options as QueryOptionsNoParams<T>).queryFn();
          if (!mounted) return;
          setData(results);
        }
      } catch (err: unknown) {
        if (!mounted) return;
        console.error('Failed to fetch data', err);
        setError(err instanceof Error ? err : new Error(String(err)));
      } finally {
        if (!mounted) return;
        setLoading(false);
      }
    };

    fetchData();

    return () => {
      mounted = false;
    };
    // We purposely depend on the two possible function identities so that changes re-run.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [(options as any).queryFn, (options as any).params]);

  return { data, error, loading };
}
