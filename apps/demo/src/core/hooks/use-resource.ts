import { useEffect, useRef, useState } from 'react';

type MaybePromise<T> = T | Promise<T>;

type QueryOptionsWithParams<T, P> = {
  params: () => P;
  loader: (params: P) => MaybePromise<T>;
  defaultValue?: T | null;
};

type QueryOptionsNoParams<T> = {
  params?: undefined;
  loader: () => MaybePromise<T>;
  defaultValue?: T | null;
};

export type UseResourceOptions<T, P = unknown> =
  | QueryOptionsWithParams<T, P>
  | QueryOptionsNoParams<T>;

type UseResourceResult<T> = {
  data: T | null;
  error: Error | null;
  loading: boolean;
};

/**
 * Overload: when `params` is provided the `loader` receives the params type P.
 */
export function useResource<T, P>(
  options: QueryOptionsWithParams<T, P>,
  deps?: unknown[]
): UseResourceResult<T>;
/**
 * Overload: when `params` is not provided `loader` takes no arguments.
 */
export function useResource<T>(
  options: QueryOptionsNoParams<T>,
  deps?: unknown[]
): UseResourceResult<T>;

/**
 * Implementation that supports both overloads and an optional deps array as the second arg.
 */
export function useResource<T, P>(
  options: UseResourceOptions<T, P>,
  deps: unknown[] = []
): UseResourceResult<T> {
  const { defaultValue = null } = options as UseResourceOptions<T, P>;
  const [data, setData] = useState<T | null>(defaultValue);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  // request id to avoid race conditions - only latest request writes state
  const reqIdRef = useRef(0);
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  useEffect(() => {
    const currentReq = ++reqIdRef.current;
    setLoading(true);
    setError(null);

    const run = async () => {
      try {
        if (typeof (options as QueryOptionsWithParams<T, P>).params === 'function') {
          // Has params
          const params = (options as QueryOptionsWithParams<T, P>).params();
          const result = (options as QueryOptionsWithParams<T, P>).loader(params);
          const resolved = await Promise.resolve(result);
          if (!mountedRef.current || reqIdRef.current !== currentReq) return;
          setData(resolved as T);
        } else {
          // No params
          const result = (options as QueryOptionsNoParams<T>).loader();
          const resolved = await Promise.resolve(result);
          if (!mountedRef.current || reqIdRef.current !== currentReq) return;
          setData(resolved);
        }
      } catch (err: unknown) {
        if (!mountedRef.current || reqIdRef.current !== currentReq) return;
        setError(err instanceof Error ? err : new Error(String(err)));
      } finally {
        if (!mountedRef.current || reqIdRef.current !== currentReq) return;
        setLoading(false);
      }
    };

    run();

    // Dependencies:
    // - loader identity
    // - params identity
    // - explicit deps provided by caller (deps array argument)
    // We intentionally read the functions via (options as any) to ensure we depend on their identity.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [(options as any).loader, (options as any).params, ...deps]);

  return { data, error, loading };
}
