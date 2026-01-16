import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getLibraryGames, addToLibrary, removeFromLibrary, type LibraryGame } from '../api';

export const useLibrary = () => {
  const queryClient = useQueryClient();

  // Buscar jogos
  const { data: games = [], isLoading } = useQuery({
    queryKey: ['library'],
    queryFn: getLibraryGames,
  });

  // Mutation para Adicionar
  const addMutation = useMutation({
    mutationFn: (variables: {
      id: number;
      name: string;
      image: string;
      status: LibraryGame['status'];
    }) => addToLibrary(variables.id, variables.name, variables.image, variables.status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['library'] }); // Atualiza a lista
    },
  });

  // Mutation para Remover
  const removeMutation = useMutation({
    mutationFn: removeFromLibrary,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['library'] });
    },
  });

  // Helper para verificar se um jogo já está na biblioteca
  const isGameInLibrary = (gameId: number) => {
    return games.some((g) => g.game_id === gameId);
  };

  return {
    games,
    isLoading,
    addGame: addMutation.mutate,
    removeGame: removeMutation.mutate,
    isGameInLibrary,
    isAdding: addMutation.isPending,
  };
};
