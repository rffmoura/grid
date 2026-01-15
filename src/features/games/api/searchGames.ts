import { api } from '../../../lib/axios';
import type { FetchGamesResponse } from '../types';

export const searchGames = async (query: string, page?: number): Promise<FetchGamesResponse> => {
  const response = await api.get<FetchGamesResponse>('/games', {
    params: { search: query, page },
  });
  return response.data;
};
