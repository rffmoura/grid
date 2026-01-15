import { useQuery } from '@tanstack/react-query';
import { getGames } from '../api/getGames';

export const useGames = () => {
  return useQuery({
    queryKey: ['games'], // Chave única para o cache
    queryFn: getGames,
    staleTime: 1000 * 60 * 5, // Os dados ficam "frescos" por 5 minutos (não refaz fetch)
  });
};
