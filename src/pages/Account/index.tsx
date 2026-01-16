import { useAuth } from '../../context/AuthContext';

export function Account() {
  const { user } = useAuth();

  return (
    <div className='p-4 lg:p-10'>
      <h1 className='text-2xl font-bold mb-6'>Account</h1>

      {user ? (
        <div className='space-y-4'>
          <div className='bg-neutral-800 rounded-lg p-4'>
            <p className='text-neutral-400 text-sm'>Email</p>
            <p className='text-white'>{user.email}</p>
          </div>
        </div>
      ) : (
        <p className='text-neutral-400'>Please sign in to view your account details.</p>
      )}
    </div>
  );
}
