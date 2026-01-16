import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLibrary } from '../../features/library/hooks/useLibrary';

type StatusFilter = 'all' | 'backlog' | 'playing' | 'completed' | 'wishlist';

export const MyLibrary = () => {
  const { games, isLoading, removeGame } = useLibrary();
  const [filter, setFilter] = useState<StatusFilter>('all');

  if (isLoading) return <div className='text-white p-8 text-center'>Carregando sua coleção...</div>;

  // Filtragem local
  const filteredGames = games.filter((game) => (filter === 'all' ? true : game.status === filter));

  // Mapeamento de cores para as badges
  const statusColors = {
    backlog: 'bg-gray-600 text-gray-200',
    playing: 'bg-green-600 text-white',
    completed: 'bg-yellow-600 text-white',
    wishlist: 'bg-blue-600 text-white',
  };

  return (
    <div className='p-6'>
      <div className='flex flex-col md:flex-row justify-between items-center mb-8 gap-4'>
        <div>
          <h1 className='text-3xl font-bold text-white'>Minha Coleção</h1>
          <p className='text-gray-400'>Você tem {games.length} jogos salvos.</p>
        </div>

        {/* Filtros */}
        <div className='flex bg-gray-800 p-1 rounded-lg'>
          {(['all', 'playing', 'backlog', 'completed', 'wishlist'] as const).map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition capitalize ${
                filter === status
                  ? 'bg-purple-600 text-white shadow'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {filteredGames.length === 0 ? (
        <div className='text-center py-20 bg-gray-800/50 rounded-xl border border-gray-700 border-dashed'>
          <p className='text-gray-400 mb-4'>Nenhum jogo encontrado nesta categoria.</p>
          <Link to='/' className='text-purple-400 hover:underline'>
            Explorar jogos
          </Link>
        </div>
      ) : (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
          {filteredGames.map((game) => (
            <div key={game.id} className='bg-gray-800 rounded-xl overflow-hidden group relative'>
              {/* Imagem (Link para detalhes) */}
              <Link to={`/game/${game.game_id}`}>
                <div className='aspect-video relative overflow-hidden'>
                  <img
                    src={game.game_image}
                    alt={game.game_name}
                    className='w-full h-full object-cover transition duration-500 group-hover:scale-110 opacity-80 group-hover:opacity-100'
                  />
                  <span
                    className={`absolute top-2 right-2 px-2 py-1 rounded text-xs font-bold uppercase ${statusColors[game.status]}`}
                  >
                    {game.status}
                  </span>
                </div>
              </Link>

              {/* Footer do Card */}
              <div className='p-4 flex justify-between items-center'>
                <h3 className='text-white font-bold truncate pr-2 flex-1'>{game.game_name}</h3>
                <button
                  onClick={() => removeGame(game.game_id)}
                  className='text-gray-500 hover:text-red-500 transition p-2'
                  title='Remover da biblioteca'
                >
                  ✕
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
