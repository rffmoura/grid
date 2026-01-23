import { Link, useLocation } from 'react-router-dom';
import type { GameFilters, SortOption } from '../../features/games/types';
import { SORT_OPTIONS, PLATFORM_OPTIONS, GENRE_OPTIONS } from '../../features/games/types';
import { useAuth } from '../../context/AuthContext';
import { Button } from './Button';

// Icons
const UserIcon = () => (
  <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
    <path
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={2}
      d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'
    />
  </svg>
);

const SortIcon = () => (
  <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
    <path
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={2}
      d='M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12'
    />
  </svg>
);

const PlatformIcon = () => (
  <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
    <path
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={2}
      d='M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
    />
  </svg>
);

const GenreIcon = () => (
  <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
    <path
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={2}
      d='M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z'
    />
  </svg>
);

const LibraryIcon = () => (
  <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
    <path
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={2}
      d='M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z'
    />
  </svg>
);

const SettingsIcon = () => (
  <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
    <path
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={2}
      d='M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z'
    />
    <path
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={2}
      d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'
    />
  </svg>
);

interface SidebarProps {
  filters: GameFilters;
  onFilterChange: (filters: GameFilters) => void;
  onNavigate?: () => void;
  onSignIn?: () => void;
  isMobile?: boolean;
}

// Section Header Component
function SectionHeader({
  icon,
  title,
  count,
}: {
  icon: React.ReactNode;
  title: string;
  count?: number;
}) {
  return (
    <div className='flex items-center gap-2 mb-3'>
      <span className='text-neutral-500'>{icon}</span>
      <span className='text-xs font-semibold text-neutral-500 uppercase tracking-wider'>
        {title}
      </span>
      {count !== undefined && count > 0 && (
        <span className='ml-auto text-xs bg-purple-600/30 text-purple-400 px-1.5 py-0.5 rounded-full'>
          {count}
        </span>
      )}
    </div>
  );
}

export function Sidebar({
  filters,
  onFilterChange,
  onNavigate,
  onSignIn,
  isMobile = false,
}: SidebarProps) {
  const location = useLocation();
  const { user, signOut } = useAuth();

  const handleSignOut = () => {
    signOut();
    onNavigate?.();
  };

  const handleSignInClick = () => {
    onSignIn?.();
    onNavigate?.();
  };

  const handleSortChange = (value: SortOption) => {
    onFilterChange({
      ...filters,
      ordering: filters.ordering === value ? undefined : value,
    });
  };

  const handlePlatformChange = (id: number) => {
    onFilterChange({
      ...filters,
      parent_platforms: filters.parent_platforms === id ? undefined : id,
    });
  };

  const handleGenreChange = (slug: string) => {
    onFilterChange({
      ...filters,
      genres: filters.genres === slug ? undefined : slug,
    });
  };

  const userLinks = [
    { to: '/library', label: 'My Library', icon: <LibraryIcon /> },
    { to: '/account', label: 'Account', icon: <SettingsIcon /> },
  ];

  const activeFiltersCount = [filters.ordering, filters.parent_platforms, filters.genres].filter(
    Boolean
  ).length;

  return (
    <aside className='w-full space-y-6'>
      {!user && isMobile && (
        <Button onClick={handleSignInClick} variant='primary' fullWidth>
          Sign In
        </Button>
      )}

      {/* User */}
      {user && (
        <div>
          <SectionHeader icon={<UserIcon />} title='User' />
          <ul className='space-y-0.5'>
            {userLinks.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  onClick={onNavigate}
                  className={`flex items-center gap-2.5 w-full text-left px-3 py-2 rounded-lg transition-colors ${
                    location.pathname === link.to
                      ? 'bg-purple-600/20 text-purple-400 font-medium'
                      : 'text-neutral-400 hover:text-white hover:bg-neutral-800/50'
                  }`}
                >
                  <span className='opacity-70'>{link.icon}</span>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Divider */}
      {user && <div className='border-t border-neutral-800' />}

      {/* Sort By */}
      <div>
        <SectionHeader
          icon={<SortIcon />}
          title='Sort By'
          count={filters.ordering ? 1 : undefined}
        />
        <ul className='space-y-0.5'>
          {SORT_OPTIONS.map((option) => (
            <li key={option.value}>
              <button
                onClick={() => handleSortChange(option.value)}
                className={`w-full text-left px-3 py-2 cursor-pointer rounded-lg transition-colors ${
                  filters.ordering === option.value
                    ? 'bg-purple-600/20 text-purple-400 font-medium'
                    : 'text-neutral-400 hover:text-white hover:bg-neutral-800/50'
                }`}
              >
                {option.label}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Platforms */}
      <div>
        <SectionHeader
          icon={<PlatformIcon />}
          title='Platforms'
          count={filters.parent_platforms ? 1 : undefined}
        />
        <ul className='space-y-0.5'>
          {PLATFORM_OPTIONS.map((platform) => (
            <li key={platform.id}>
              <button
                onClick={() => handlePlatformChange(platform.id)}
                className={`w-full cursor-pointer text-left px-3 py-2 rounded-lg transition-colors ${
                  filters.parent_platforms === platform.id
                    ? 'bg-purple-600/20 text-purple-400 font-medium'
                    : 'text-neutral-400 hover:text-white hover:bg-neutral-800/50'
                }`}
              >
                {platform.label}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Genres */}
      <div>
        <SectionHeader icon={<GenreIcon />} title='Genres' count={filters.genres ? 1 : undefined} />
        <ul className='space-y-0.5'>
          {GENRE_OPTIONS.map((genre) => (
            <li key={genre.slug}>
              <button
                onClick={() => handleGenreChange(genre.slug)}
                className={`w-full cursor-pointer text-left px-3 py-2 rounded-lg transition-colors ${
                  filters.genres === genre.slug
                    ? 'bg-purple-600/20 text-purple-400 font-medium'
                    : 'text-neutral-400 hover:text-white hover:bg-neutral-800/50'
                }`}
              >
                {genre.label}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Clear Filters */}
      {activeFiltersCount > 0 && (
        <div className='pt-2'>
          <button
            onClick={() => onFilterChange({})}
            className='w-full flex items-center justify-center gap-2 px-3 py-2.5 text-sm text-red-400 hover:text-red-300 bg-red-500/10 hover:bg-red-500/20 rounded-lg transition-colors'
          >
            <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16'
              />
            </svg>
            Clear filters ({activeFiltersCount})
          </button>
        </div>
      )}

      {/* Sign Out */}
      {user && isMobile && (
        <div className='pt-4 border-t border-neutral-800'>
          <Button onClick={handleSignOut} variant='danger' fullWidth>
            Sair
          </Button>
        </div>
      )}
    </aside>
  );
}
