import { useGames } from '../../features/games/hooks/useGames';
import type { Platform } from '../../features/games/types';

const platformConfig: Record<string, { family: string; image: string }> = {
  playstation5: { family: 'playstation', image: 'src/assets/playstation.png' },
  playstation4: { family: 'playstation', image: 'src/assets/playstation.png' },
  playstation3: { family: 'playstation', image: 'src/assets/playstation.png' },
  'xbox-series-x': { family: 'xbox', image: 'src/assets/xbox.png' },
  'xbox-one': { family: 'xbox', image: 'src/assets/xbox.png' },
  xbox360: { family: 'xbox', image: 'src/assets/xbox.png' },
  'nintendo-switch': { family: 'nintendo', image: 'src/assets/nintendo.png' },
  pc: { family: 'pc', image: 'src/assets/windows.png' },
  macos: { family: 'macos', image: 'src/assets/macos.png' },
};

const getUniquePlatforms = (platforms: { platform: Platform }[]) => {
  const seen = new Set<string>();
  const result: { family: string; image: string; name: string }[] = [];

  for (const p of platforms) {
    const config = platformConfig[p.platform.slug];
    if (config && !seen.has(config.family)) {
      seen.add(config.family);
      result.push({ family: config.family, image: config.image, name: p.platform.name });
    }
  }

  return result;
};

export function Home() {
  const { data } = useGames();
  console.log('data', data);
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
            {data?.results.map((game) => {
              return (
                <div className='flex flex-col  min-w-50 min-h-60 bg-neutral-700 rounded-xl'>
                  <div
                    className='h-[80%] relative rounded-xl m-1 mb-0 bg-cover bg-center'
                    style={{ backgroundImage: `url(${game.background_image})` }}
                  >
                    <div className='w-10 m-2 flex rounded-lg justify-center absolute right-0 p-2 bg-lime-600'>
                      <p>{game.metacritic}</p>
                    </div>
                  </div>
                  <div className='p-2 flex flex-col justify-between'>
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
                    <p>{game.name}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
