// import { api } from '../../../lib/axios';
import { api } from '../../../lib/axios';
import type { FetchGamesResponse } from '../types';

export const getGames = async (): Promise<FetchGamesResponse> => {
  // O axios já injeta a baseURL e a key configuradas no passo 3
  const response = await api.get<FetchGamesResponse>('/games');
  return response.data;
};
