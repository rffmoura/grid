import type { Game } from '../../features/games/types';

interface GameCardMobileProps {
  game: Game;
  onClick: () => void;
}

export function GameCardMobile({ game, onClick }: GameCardMobileProps) {
  return (
    <div
      onClick={onClick}
      className='flex flex-col rounded-2xl overflow-hidden cursor-pointer border-2 border-neutral-700 hover:border-purple-500 transition-colors bg-neutral-800'
    >
      <div
        className='aspect-square w-full bg-cover bg-center rounded-b-xl'
        style={{ backgroundImage: `url(${game.background_image})` }}
      />
      <p className='p-2 text-sm font-semibold truncate'>{game.name}</p>
    </div>
  );
}
