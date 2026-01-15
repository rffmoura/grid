import { api } from '../../../lib/axios';
import type { FetchGamesResponse } from '../types';

export const getGames = async (pageParam?: number): Promise<FetchGamesResponse> => {
  const response = await api.get<FetchGamesResponse>('/games', {
    params: pageParam ? { page: pageParam } : undefined,
  });
  return response.data;
};
