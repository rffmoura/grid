import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Game } from '../../features/games/types';
import { getUniquePlatforms } from '../../utils/getUniquePlatforms';

interface GamePreviewModalProps {
  game: Game | null;
  isOpen: boolean;
  onClose: () => void;
}

export function GamePreviewModal({ game, isOpen, onClose }: GamePreviewModalProps) {
  const navigate = useNavigate();

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

  if (!isOpen || !game) return null;

  const handleViewDetails = () => {
    onClose();
    navigate(`/game/${game.id}`);
  };

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center p-4'>
      {/* Backdrop */}
      <div
        className='absolute inset-0 bg-black/90 backdrop-blur-sm animate-[fadeIn_200ms_ease-out]'
        onClick={onClose}
      />

      {/* Modal */}
      <div className='relative z-10 w-full max-w-md bg-neutral-900 rounded-2xl overflow-hidden animate-[slideUp_300ms_ease-out]'>
        {/* Imagem */}
        <div
          className='w-full h-48 bg-cover bg-center'
          style={{ backgroundImage: `url(${game.background_image})` }}
        >
          {/* Botão fechar */}
          <button
            onClick={onClose}
            className='absolute top-3 right-3 p-2 bg-black/50 rounded-full text-white hover:bg-black/70 transition-colors'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='20'
              height='20'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
            >
              <line x1='18' y1='6' x2='6' y2='18'></line>
              <line x1='6' y1='6' x2='18' y2='18'></line>
            </svg>
          </button>

          {/* Metacritic */}
          {game.metacritic && (
            <div className='absolute top-3 left-3 px-3 py-1 bg-lime-600 rounded-lg font-bold'>
              {game.metacritic}
            </div>
          )}
        </div>

        {/* Conteúdo */}
        <div className='p-4 space-y-4'>
          {/* Título e Plataformas */}
          <div>
            <h2 className='text-xl font-bold mb-2'>{game.name}</h2>
            <div className='flex gap-2'>
              {getUniquePlatforms(game.platforms).map((platform) => (
                <img
                  key={platform.family}
                  className='w-5 h-5'
                  src={platform.image}
                  alt={platform.name}
                />
              ))}
            </div>
          </div>

          {/* Informações */}
          <div className='space-y-2 text-sm text-neutral-300'>
            <div className='flex justify-between'>
              <span className='text-neutral-500'>Lançamento</span>
              <span>{game.released}</span>
            </div>
            <div className='flex justify-between'>
              <span className='text-neutral-500'>Rating</span>
              <span>{game.rating}/5</span>
            </div>
            <div className='flex justify-between'>
              <span className='text-neutral-500'>Playtime</span>
              <span>{game.playtime} horas</span>
            </div>
            {game.genres.length > 0 && (
              <div className='flex justify-between'>
                <span className='text-neutral-500'>Gêneros</span>
                <span className='text-right'>{game.genres.map((g) => g.name).join(', ')}</span>
              </div>
            )}
          </div>

          {/* Botão Ver Detalhes */}
          <button
            onClick={handleViewDetails}
            className='w-full py-3 bg-purple-600 hover:bg-purple-700 rounded-xl font-semibold transition-colors'
          >
            Ver mais detalhes
          </button>
        </div>
      </div>
    </div>
  );
}
