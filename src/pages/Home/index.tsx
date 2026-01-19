import { useState } from 'react';
import { useGames } from '../../features/games/hooks/useGames';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import type { Game } from '../../features/games/types';
import { SORT_OPTIONS, PLATFORM_OPTIONS, GENRE_OPTIONS } from '../../features/games/types';
import GameCard from '../../components/ui/GameCard';
import { GameCardMobile } from '../../components/ui/GameCardMobile';
import { GamePreviewModal } from '../../components/ui/GamePreviewModal';
import { Sidebar } from '../../components/ui/Sidebar';
import { useFilters } from '../../context/FilterContext';
import { CloseIcon } from '../../assets/icons/CloseIcon';

export function Home() {
  const { filters, setFilters } = useFilters();
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = useGames(filters);
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);

  const loadMoreRef = useIntersectionObserver({
    onIntersect: fetchNextPage,
    enabled: hasNextPage && !isFetchingNextPage,
  });

  const games = data?.pages.flatMap((page) => page.results) ?? [];
  const totalCount = data?.pages[0]?.count ?? 0;

  // Get labels for active filters
  const activeGenre = GENRE_OPTIONS.find((g) => g.slug === filters.genres);
  const activePlatform = PLATFORM_OPTIONS.find((p) => p.id === filters.parent_platforms);
  const activeSort = SORT_OPTIONS.find((s) => s.value === filters.ordering);

  // Build dynamic title
  const getTitle = () => {
    if (activeGenre) return `${activeGenre.label} Games`;
    if (activePlatform) return `${activePlatform.label} Games`;
    if (activeSort) {
      if (filters.ordering === '-metacritic') return 'Top Rated Games';
      if (filters.ordering === '-added') return 'Popular Games';
    }
    return 'Discover Games';
  };

  // Build subtitle
  const getSubtitle = () => {
    const parts: string[] = [];
    if (activeSort && !activeGenre && !activePlatform) return '';
    if (activeSort) parts.push(`sorted by ${activeSort.label.toLowerCase()}`);
    return parts.join(' ');
  };

  const removeFilter = (type: 'genres' | 'parent_platforms' | 'ordering') => {
    setFilters({ ...filters, [type]: undefined });
  };

  const hasActiveFilters = filters.genres || filters.parent_platforms || filters.ordering;

  return (
    <div>
      <div className='w-full flex'>
        {/* Sidebar - escondida em mobile */}
        <div className='hidden lg:block w-[16%] p-6'>
          <Sidebar filters={filters} onFilterChange={setFilters} />
        </div>
        <div className='hidden lg:block border border-neutral-800' />

        {/* Conteúdo principal */}
        <div className='w-full lg:w-[84%] p-4 lg:px-10 lg:py-8'>
          {/* Section Header */}
          <div className='mb-6 lg:mb-8'>
            <div className='flex flex-col md:flex-row md:items-end md:justify-between gap-2 mb-4'>
              <div>
                <h1 className='text-2xl md:text-4xl font-bold text-white'>{getTitle()}</h1>
                {getSubtitle() && <p className='text-neutral-400 text-sm mt-1'>{getSubtitle()}</p>}
              </div>
              {!isLoading && (
                <p className='text-neutral-500 text-sm'>
                  {totalCount.toLocaleString()} games found
                </p>
              )}
            </div>

            {/* Active Filters Chips */}
            {hasActiveFilters && (
              <div className='flex flex-wrap gap-2'>
                {activeGenre && (
                  <button
                    onClick={() => removeFilter('genres')}
                    className='inline-flex items-center gap-1.5 px-3 py-1.5 bg-purple-600/20 text-purple-400 rounded-full text-sm hover:bg-purple-600/30 transition-colors'
                  >
                    {activeGenre.label}
                    <CloseIcon className='w-3.5 h-3.5' />
                  </button>
                )}
                {activePlatform && (
                  <button
                    onClick={() => removeFilter('parent_platforms')}
                    className='inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-600/20 text-blue-400 rounded-full text-sm hover:bg-blue-600/30 transition-colors'
                  >
                    {activePlatform.label}
                    <CloseIcon className='w-3.5 h-3.5' />
                  </button>
                )}
                {activeSort && (
                  <button
                    onClick={() => removeFilter('ordering')}
                    className='inline-flex items-center gap-1.5 px-3 py-1.5 bg-green-600/20 text-green-400 rounded-full text-sm hover:bg-green-600/30 transition-colors'
                  >
                    {activeSort.label}
                    <CloseIcon className='w-3.5 h-3.5' />
                  </button>
                )}
              </div>
            )}
          </div>

          {isLoading ? (
            <div className='flex justify-center items-center min-h-[400px]'>
              <div className='w-10 h-10 border-2 border-purple-500 border-t-transparent rounded-full animate-spin' />
            </div>
          ) : (
            <>
              {/* Grid Desktop */}
              <div className='hidden md:grid grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4'>
                {games.map((game) => (
                  <GameCard key={game.id} {...game} />
                ))}
              </div>

              {/* Grid Mobile */}
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
