import { useInfiniteQuery } from '@tanstack/react-query';
import { searchGames } from '../api/searchGames';
import { useDebounce } from '../../../hooks/useDebounce';

export const useSearchGames = (query: string) => {
  const debouncedQuery = useDebounce(query, 500);
  const isDebouncing = query !== debouncedQuery;

  const queryResult = useInfiniteQuery({
    queryKey: ['games', 'search', debouncedQuery],
    queryFn: ({ pageParam }) => searchGames(debouncedQuery, pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (!lastPage.next) return undefined;
      const url = new URL(lastPage.next);
      return Number(url.searchParams.get('page'));
    },
    enabled: debouncedQuery.length >= 2,
    staleTime: 1000 * 60 * 5,
  });

  return {
    ...queryResult,
    isDebouncing,
  };
};
