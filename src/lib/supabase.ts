import { createClient } from '@supabase/supabase-js';

// O TypeScript pode reclamar se não garantirmos que é string, por isso o 'as string'
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

// Cria a conexão única
export const supabase = createClient(supabaseUrl, supabaseKey);
