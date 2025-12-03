'use client';

import useSWR from 'swr';

async function fetcher(url: string) {
  return fetch(url).then((res) => res.json());
}

export function useFetcher<T>(path: string) {
  const { data, error, isLoading } = useSWR<T>(
    `${process.env.NEXT_PUBLIC_API_URL}${path}`,
    fetcher,
  );

  return { data, error, isLoading };
}
