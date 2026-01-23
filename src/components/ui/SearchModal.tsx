import { useEffect, useState } from 'react';
import type { Game } from '../../features/games/types';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import GameCard from './GameCard';
import { GameCardMobile } from './GameCardMobile';
import { GamePreviewModal } from './GamePreviewModal';
import { Button } from './Button';
import { CloseIcon } from '../../assets/icons/CloseIcon';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  results: Game[];
  isLoading: boolean;
  isError: boolean;
  searchQuery: string;
  fetchNextPage: () => void;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
}

export function SearchModal({
  isOpen,
  onClose,
  results,
  isLoading,
  isError,
  searchQuery,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
}: SearchModalProps) {
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);

  const loadMoreRef = useIntersectionObserver({
    onIntersect: fetchNextPage,
    enabled: isOpen && hasNextPage && !isFetchingNextPage,
  });

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <>
      <div className='fixed inset-0 z-50 flex items-start justify-center pt-20 md:pt-24'>
        {/* Backdrop */}
        <div className='absolute inset-0 bg-black/80 backdrop-blur-sm' onClick={onClose} />

        {/* Modal */}
        <div className='relative z-10 w-full max-w-6xl max-h-[90vh] md:max-h-[80vh] mx-2 md:mx-4 bg-neutral-900 rounded-xl border border-neutral-700 overflow-hidden'>
          {/* Header */}
          <div className='flex items-center justify-between p-4 border-b border-neutral-700'>
            <h2 className='text-base md:text-lg font-semibold'>
              {isLoading
                ? 'Buscando...'
                : isError || results.length === 0
                  ? `Resultados para "${searchQuery}"`
                  : `Resultados para "${searchQuery}" (${results.length})`}
            </h2>
            <Button onClick={onClose} variant='icon' size='icon'>
              <CloseIcon />
            </Button>
          </div>

          {/* Content */}
          <div className='p-3 md:p-4 overflow-y-auto max-h-[calc(90vh-80px)] md:max-h-[calc(80vh-80px)]'>
            {isLoading ? (
              <div className='flex items-center justify-center py-12'>
                <div className='w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin' />
              </div>
            ) : isError || results.length === 0 ? (
              <div className='text-center py-12'>
                <p className='text-neutral-400 text-lg'>
                  O mundo não está preparado pra sua pesquisa ainda
                </p>
                <p className='text-neutral-500 text-sm mt-2'>Tente buscar por outro termo</p>
              </div>
            ) : (
              <>
                {/* Grid Desktop */}
                <div className='hidden md:grid grid-cols-3 lg:grid-cols-4 gap-4'>
                  {results.map((game) => (
                    <div key={game.id} onClick={onClose}>
                      <GameCard {...game} />
                    </div>
                  ))}
                </div>

                {/* Grid Mobile */}
                <div className='grid md:hidden grid-cols-2 gap-3'>
                  {results.map((game) => (
                    <GameCardMobile
                      key={game.id}
                      game={game}
                      onClick={() => setSelectedGame(game)}
                    />
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
      </div>

      {/* Game Preview Modal para mobile */}
      <GamePreviewModal
        game={selectedGame}
        isOpen={!!selectedGame}
        onClose={() => setSelectedGame(null)}
      />
    </>
  );
}
