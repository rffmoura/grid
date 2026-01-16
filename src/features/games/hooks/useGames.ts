import { useInfiniteQuery } from '@tanstack/react-query';
import { getGames } from '../api/getGames';
import type { GameFilters } from '../types';

export const useGames = (filters?: GameFilters) => {
  return useInfiniteQuery({
    queryKey: ['games', filters],
    queryFn: ({ pageParam }) => getGames(pageParam, filters),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (!lastPage.next) return undefined;
      const url = new URL(lastPage.next);
      return Number(url.searchParams.get('page'));
    },
    staleTime: 1000 * 60 * 5,
  });
};
