// src/components/Layout/MainLayout.tsx
import { Link, Outlet } from 'react-router-dom';
import logo from '../../assets/logo.png';
import { SearchInput } from '../ui/SearchInput';
import { useAuth } from '../../context/AuthContext';
import { useState } from 'react';
import { AuthModal } from '../ui/AuthModal';
import { Button } from '../ui/Button';
// import Footer from '../ui/Footer';

export const MainLayout = () => {
  const { user, signOut } = useAuth();
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
                <Button onClick={signOut} variant='danger' size='sm'>
                  Sair
                </Button>
              </div>
            </>
          ) : (
            <Button onClick={() => setIsAuthModalOpen(true)} variant='primary' size='lg'>
              Sign In
            </Button>
          )}
        </nav>
      </header>

      {/* Aqui é onde as páginas (Home, Details, etc) vão aparecer */}
      <main className=''>
        <Outlet />
      </main>

      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />

      {/* <Footer /> */}
    </div>
  );
};
