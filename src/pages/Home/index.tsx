import { useState } from 'react';
import { useGames } from '../../features/games/hooks/useGames';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import type { Game } from '../../features/games/types';
import GameCard from '../../components/ui/GameCard';
import { GameCardMobile } from '../../components/ui/GameCardMobile';
import { GamePreviewModal } from '../../components/ui/GamePreviewModal';
import { Sidebar } from '../../components/ui/Sidebar';
import { useFilters } from '../../context/FilterContext';

export function Home() {
  const { filters, setFilters } = useFilters();
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = useGames(filters);
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);

  const loadMoreRef = useIntersectionObserver({
    onIntersect: fetchNextPage,
    enabled: hasNextPage && !isFetchingNextPage,
  });

  const games = data?.pages.flatMap((page) => page.results) ?? [];

  return (
    <div>
      <div className='w-full flex'>
        {/* Sidebar - escondida em mobile */}
        <div className='hidden lg:block w-[16%] p-6'>
          <Sidebar filters={filters} onFilterChange={setFilters} />
        </div>
        <div className='hidden lg:block border border-neutral-800' />

        {/* Conteúdo principal */}
        <div className='w-full lg:w-[90%] p-4 lg:p-10'>
          {isLoading ? (
            <div className='flex justify-center items-center min-h-[400px]'>
              <div className='w-10 h-10 border-2 border-purple-500 border-t-transparent rounded-full animate-spin' />
            </div>
          ) : (
            <>
              {/* Grid Desktop - 5 colunas */}
              <div className='hidden md:grid grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4'>
                {games.map((game) => (
                  <GameCard key={game.id} {...game} />
                ))}
              </div>

              {/* Grid Mobile - 2 colunas */}
              <div className='grid md:hidden grid-cols-2 gap-3'>
                {games.map((game) => (
                  <GameCardMobile key={game.id} game={game} onClick={() => setSelectedGame(game)} />
                ))}
              </div>

              {/* Loader / Trigger para carregar mais */}
              <div ref={loadMoreRef} className='flex justify-center py-8'>
                {isFetchingNextPage && (
                  <div className='w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin' />
                )}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Modal de preview para mobile */}
      <GamePreviewModal
        game={selectedGame}
        isOpen={!!selectedGame}
        onClose={() => setSelectedGame(null)}
      />
    </div>
  );
}
