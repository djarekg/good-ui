import { ApiError } from '@/core/api/api-error.ts';
import type { PlainObject } from '@/types/plain-object.ts';

export type ApiOptions = {
  headers?: Record<string, string>;
  query?: PlainObject;
  signal?: AbortSignal;
};

/**
 * Convert object query parameters to query string.
 */
const buildQueryString = (query?: PlainObject) => {
  if (!query) return '';

  const pairs: string[] = [];

  for (const [k, v] of Object.entries(query)) {
    if (v === undefined || v === null) continue;
    pairs.push(
      encodeURIComponent(k) + '=' + encodeURIComponent(String(v)),
    );
  }

  return pairs.length ? `?${pairs.join('&')}` : '';
};

/**
 * Attempt to parse response as JSON, otherwise return text.
 */
const safeParseResponse = async (res: Response): Promise<unknown> => {
  const text = await res.text();

  if (!text) return null;

  try {
    return JSON.parse(text);
  }
  catch {
    return text;
  }
};

export default function useApi(baseUrl = import.meta.env.VITE_API_URL) {
  const request = async <T = unknown>(
    method: string,
    path: string,
    body?: unknown,
    options: ApiOptions = {},
  ): Promise<T> => {
    const url = `${baseUrl}${path}${buildQueryString(options.query)}`;
    const headers: Record<string, string> = {
      // default to JSON; callers can override
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    };

    // If caller explicitly set Content-Type to undefined, remove it
    if (options.headers && options.headers['Content-Type'] === undefined) {
      delete headers['Content-Type'];
    }

    const fetchOptions: RequestInit = {
      method,
      headers,
      signal: options.signal,
    };

    if (body !== undefined && body !== null) {
      // Only attach body for methods that allow it
      if (method !== 'GET' && method !== 'HEAD') {
        // If Content-Type is JSON (default), stringify. Otherwise allow raw body.
        const ct = headers['Content-Type'] || '';
        if (ct.includes('application/json')) {
          fetchOptions.body = JSON.stringify(body);
        }
        else {
          // @ts-ignore allow non-string body if caller wants to send FormData, etc.
          fetchOptions.body = body as any;
        }
      }
    }

    let res: Response;
    try {
      res = await fetch(url, fetchOptions);
    }
    catch (err) {
      // network or CORS error
      throw err;
    }

    const parsed = await safeParseResponse(res);

    if (!res.ok) {
      throw new ApiError(res.status, res.statusText || 'HTTP Error', parsed);
    }

    return parsed as T;
  };

  const get = <T = unknown>(path: string, options?: ApiOptions) =>
    request<T>('GET', path, undefined, options);

  const create = <T = unknown>(path: string, body?: unknown, options?: ApiOptions) =>
    request<T>('POST', path, body, options);

  const update = <T = unknown>(path: string, body?: unknown, options?: ApiOptions) =>
    request<T>('PUT', path, body, options);

  const remove = <T = unknown>(path: string, options?: ApiOptions) =>
    request<T>('DELETE', path, undefined, options);

  return {
    get,
    create,
    update,
    remove,
  } as const;
}
