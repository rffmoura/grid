import { useGames } from '../../features/games/hooks/useGames';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import GameCard from '../../components/ui/GameCard';

export function Home() {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useGames();

  const loadMoreRef = useIntersectionObserver({
    onIntersect: fetchNextPage,
    enabled: hasNextPage && !isFetchingNextPage,
  });

  const games = data?.pages.flatMap((page) => page.results) ?? [];

  return (
    <div>
      <div className='w-full flex'>
        <div className='w-[16%] p-10'>
          <h2 className='mb-2 font-bold'>Sort By</h2>
          <p>Popularity</p>
          <p>Release Date</p>

          <h2 className='my-2 font-bold'>Platforms</h2>
          <p>PC</p>
          <p>Playstation</p>
          <p>Xbox</p>
          <p>Nintendo</p>

          <h2 className='my-2 font-bold'>Genres</h2>
          <p>Action</p>
          <p>RPG</p>
          <p>Indie</p>
        </div>
        <div className='border border-neutral-800' />
        <div className='w-[90%] p-10'>
          <div className='grid grid-cols-5 gap-4'>
            {games.map((game) => (
              <GameCard key={game.id} {...game} />
            ))}
          </div>

          {/* Loader / Trigger para carregar mais */}
          <div ref={loadMoreRef} className='flex justify-center py-8'>
            {isFetchingNextPage && (
              <div className='w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin' />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
