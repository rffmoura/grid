import { useInfiniteQuery } from '@tanstack/react-query';
import { getGames } from '../api/getGames';

export const useGames = () => {
  return useInfiniteQuery({
    queryKey: ['games'],
    queryFn: ({ pageParam }) => getGames(pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (!lastPage.next) return undefined;
      const url = new URL(lastPage.next);
      return Number(url.searchParams.get('page'));
    },
    staleTime: 1000 * 60 * 5,
  });
};
