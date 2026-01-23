import type { Platform } from '../features/games/types';
import playstationIcon from '../assets/playstation.png';
import xboxIcon from '../assets/xbox.png';
import nintendoIcon from '../assets/nintendo.png';
import windowsIcon from '../assets/windows.png';
import macosIcon from '../assets/macos.png';

const platformConfig: Record<string, { family: string; image: string }> = {
  // Slugs específicos (do endpoint /games)
  playstation5: { family: 'playstation', image: playstationIcon },
  playstation4: { family: 'playstation', image: playstationIcon },
  playstation3: { family: 'playstation', image: playstationIcon },
  'xbox-series-x': { family: 'xbox', image: xboxIcon },
  'xbox-one': { family: 'xbox', image: xboxIcon },
  xbox360: { family: 'xbox', image: xboxIcon },
  'nintendo-switch': { family: 'nintendo', image: nintendoIcon },
  pc: { family: 'pc', image: windowsIcon },
  macos: { family: 'macos', image: macosIcon },

  // Slugs genéricos (do endpoint /games/{id} parent_platforms)
  playstation: { family: 'playstation', image: playstationIcon },
  xbox: { family: 'xbox', image: xboxIcon },
  nintendo: { family: 'nintendo', image: nintendoIcon },
};

export const getUniquePlatforms = (platforms: { platform: Platform }[] | null | undefined) => {
  const seen = new Set<string>();
  const result: { family: string; image: string; name: string }[] = [];

  if (!platforms) return result;

  for (const p of platforms) {
    const config = platformConfig[p.platform.slug];
    if (config && !seen.has(config.family)) {
      seen.add(config.family);
      result.push({ family: config.family, image: config.image, name: p.platform.name });
    }
  }

  return result;
};
