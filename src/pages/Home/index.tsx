import { useGames } from '../../features/games/hooks/useGames';
import GameCard from '../../components/ui/GameCard';

export function Home() {
  const { data } = useGames();
  return (
    <div>
      <div className='w-full flex'>
        <div className='w-[10%] p-10'>
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
            {data?.results.map((game) => (
              <GameCard {...game} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
