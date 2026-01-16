import { api } from '../../../lib/axios';
import type { FetchGamesResponse, GameFilters } from '../types';

export const getGames = async (
  pageParam?: number,
  filters?: GameFilters
): Promise<FetchGamesResponse> => {
  const response = await api.get<FetchGamesResponse>('/games', {
    params: {
      page: pageParam,
      ordering: filters?.ordering,
      parent_platforms: filters?.parent_platforms,
      genres: filters?.genres,
    },
  });
  return response.data;
};
