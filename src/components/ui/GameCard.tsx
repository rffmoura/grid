import { useNavigate } from 'react-router-dom';
import type { Game } from '../../features/games/types';
import { getUniquePlatforms } from '../../utils/getUniquePlatforms';

export default function GameCard(game: Game) {
  const navigate = useNavigate();

  return (
    <div key={game.id} className='relative h-72'>
      <div
        onClick={() => navigate(`/game/${game.id}`)}
        className='group absolute inset-x-0 top-0 flex flex-col bg-neutral-700 rounded-xl cursor-pointer transition-all duration-300 ease-out hover:scale-105 hover:z-20 hover:shadow-xl hover:shadow-black/50'
      >
        <div
          className='h-48 relative rounded-t-xl bg-cover bg-center'
          style={{ backgroundImage: `url(${game.background_image})` }}
        >
          {game.metacritic && (
            <div className='w-10 m-2 flex rounded-lg justify-center absolute right-0 p-2 bg-lime-600'>
              <p>{game.metacritic}</p>
            </div>
          )}
        </div>
        <div className='p-3 flex flex-col gap-2'>
          <div className='flex gap-2'>
            {getUniquePlatforms(game.platforms).map((platform) => (
              <img
                key={platform.family}
                className='w-4 h-4'
                src={platform.image}
                alt={platform.name}
              />
            ))}
          </div>
          <p className='font-semibold truncate group-hover:whitespace-normal'>{game.name}</p>

          {/* Conteúdo expandido no hover */}
          <div className='max-h-0 overflow-hidden transition-all duration-300 ease-out group-hover:max-h-40'>
            <div className='pt-2 border-t border-neutral-600 space-y-1 text-sm text-neutral-300'>
              <p>
                <span className='text-neutral-400'>Lançamento:</span> {game.released}
              </p>
              <p>
                <span className='text-neutral-400'>Média de duração:</span> {game.playtime} horas
              </p>
              <p>
                <span className='text-neutral-400'>Gêneros:</span>{' '}
                {game.genres.map((g) => g.name).join(', ')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
