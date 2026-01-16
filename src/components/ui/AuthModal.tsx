import { useState } from 'react';
import { supabase } from '../../lib/supabase';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal = ({ isOpen, onClose }: AuthModalProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState<'magic' | 'signin' | 'signup'>('signin');
  const [message, setMessage] = useState<{ type: 'error' | 'success'; text: string } | null>(null);

  if (!isOpen) return null;

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      if (mode === 'magic') {
        const { error } = await supabase.auth.signInWithOtp({ email });
        if (error) throw error;
        setMessage({ type: 'success', text: 'Cheque seu email para o link mágico!' });
      } else if (mode === 'signup') {
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;
        setMessage({ type: 'success', text: 'Conta criada! Verifique seu email.' });
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        onClose(); // Fecha modal ao logar com sucesso
      }
    } catch (error: unknown) {
      console.error('error', error);
      setMessage({ type: 'error', text: 'Ocorreu um erro' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4 backdrop-blur-sm'>
      <div className='bg-gray-800 rounded-xl p-6 w-full max-w-md shadow-2xl border border-gray-700 relative'>
        <button onClick={onClose} className='absolute top-4 right-4 text-gray-400 hover:text-white'>
          ✕
        </button>

        <h2 className='text-2xl font-bold text-white mb-6 text-center'>
          {mode === 'magic'
            ? 'Magic Link'
            : mode === 'signup'
              ? 'Crie sua conta'
              : 'Bem-vindo de volta'}
        </h2>

        {message && (
          <div
            className={`p-3 rounded mb-4 text-sm ${message.type === 'success' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}
          >
            {message.text}
          </div>
        )}

        <form onSubmit={handleAuth} className='space-y-4'>
          <div>
            <label className='block text-gray-400 text-sm mb-1'>Email</label>
            <input
              type='email'
              required
              className='w-full bg-gray-900 border border-gray-700 rounded p-2 text-white focus:ring-2 focus:ring-purple-500 outline-none'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {mode !== 'magic' && (
            <div>
              <label className='block text-gray-400 text-sm mb-1'>Senha</label>
              <input
                type='password'
                required
                className='w-full bg-gray-900 border border-gray-700 rounded p-2 text-white focus:ring-2 focus:ring-purple-500 outline-none'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          )}

          <button
            disabled={loading}
            className='w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 rounded transition disabled:opacity-50'
          >
            {loading
              ? 'Processando...'
              : mode === 'magic'
                ? 'Enviar Link'
                : mode === 'signup'
                  ? 'Cadastrar'
                  : 'Entrar'}
          </button>
        </form>

        <div className='mt-6 flex flex-col gap-2 text-sm text-center text-gray-400'>
          {mode === 'signin' && (
            <>
              <button onClick={() => setMode('signup')} className='hover:text-white underline'>
                Não tem conta? Cadastre-se
              </button>
              <button onClick={() => setMode('magic')} className='hover:text-purple-400'>
                Esqueci a senha / Usar Magic Link
              </button>
            </>
          )}
          {(mode === 'signup' || mode === 'magic') && (
            <button onClick={() => setMode('signin')} className='hover:text-white underline'>
              Já tem conta? Entrar
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
