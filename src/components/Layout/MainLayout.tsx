// src/components/Layout/MainLayout.tsx
import { Link, Outlet } from 'react-router-dom';
import logo from '../../assets/logo.png';
import { SearchInput } from '../ui/SearchInput';
import { useAuth } from '../../context/AuthContext';
import { useState } from 'react';
import { AuthModal } from '../ui/AuthModal';

export const MainLayout = () => {
  const { user, signOut } = useAuth();
  console.log('user', user);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  return (
    <div className='min-h-screen w-full'>
      {/* Navbar Provisória */}
      <header className='p-4 border-b border-neutral-800 flex justify-between items-center'>
        <Link to='/' className='hover:opacity-80 transition'>
          <img width={80} src={logo} />
        </Link>
        <SearchInput />
        <nav className='flex items-center gap-4'>
          {user ? (
            <>
              <Link to='/library' className='hover:text-purple-400 font-medium'>
                My Library
              </Link>
              <div className='h-4 w-px bg-gray-700 mx-2'></div>
              <div className='flex items-center gap-3'>
                <div className='w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold uppercase'>
                  {user.email?.charAt(0)}
                </div>
                <button
                  onClick={signOut}
                  className='bg-red-500/10 hover:bg-red-500/20 text-red-500 px-3 py-1.5 rounded text-sm font-bold transition'
                >
                  Sair
                </button>
              </div>
            </>
          ) : (
            <button
              onClick={() => setIsAuthModalOpen(true)}
              className='bg-purple-600 cursor-pointer hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-bold transition'
            >
              Sign In
            </button>
          )}
        </nav>
      </header>

      {/* Aqui é onde as páginas (Home, Details, etc) vão aparecer */}
      <main className=''>
        <Outlet />
      </main>

      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />

      <footer className='p-8 text-center text-gray-500 text-sm border-t border-gray-800 mt-10'>
        © 2026 Game Discovery App. Powered by RAWG & Supabase.
      </footer>
    </div>
  );
};
