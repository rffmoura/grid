import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { UserIcon } from '../../assets/icons/UserIcon';
import { LibraryIcon } from '../../assets/icons/LibraryIcon';
import { LogoutIcon } from '../../assets/icons/LogoutIcon';

export function UserDropdownMenu() {
  const { user, signOut } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!user) return null;

  return (
    <div className='relative' ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className='w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold uppercase hover:bg-purple-500 transition-colors cursor-pointer'
      >
        {user.email?.charAt(0)}
      </button>

      {isOpen && (
        <div className='absolute right-0 top-full mt-2 w-48 bg-neutral-800 border border-neutral-700 rounded-xl shadow-2xl z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-100'>
          <div className='p-2 border-b border-neutral-700'>
            <p className='text-sm text-neutral-400 truncate px-2'>{user.email}</p>
          </div>
          <div className='p-1'>
            <Link
              to='/account'
              onClick={() => setIsOpen(false)}
              className='flex items-center gap-3 w-full px-3 py-2.5 text-sm text-neutral-200 hover:bg-neutral-700 rounded-lg transition-colors'
            >
              <UserIcon className='w-4 h-4' />
              Account
            </Link>
            <Link
              to='/library'
              onClick={() => setIsOpen(false)}
              className='flex items-center gap-3 w-full px-3 py-2.5 text-sm text-neutral-200 hover:bg-neutral-700 rounded-lg transition-colors'
            >
              <LibraryIcon className='w-4 h-4' />
              My Library
            </Link>
          </div>
          <div className='border-t border-neutral-700 p-1'>
            <button
              onClick={() => {
                signOut();
                setIsOpen(false);
              }}
              className='flex items-center gap-3 w-full px-3 py-2.5 text-sm text-red-400 hover:bg-red-500/10 rounded-lg transition-colors'
            >
              <LogoutIcon className='w-4 h-4' />
              Sair
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
