import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = !!(
  supabaseUrl && 
  supabaseAnonKey && 
  supabaseUrl !== 'https://your-project-id.supabase.co' && 
  !supabaseUrl.includes('your-project-id')
);

// Fallback mock client to prevent null pointer exceptions if database is not set up
const mockSupabase = {
  from: (table: string) => ({
    select: () => ({
      order: () => Promise.resolve({ data: [], error: null }),
      eq: () => ({
        order: () => Promise.resolve({ data: [], error: null })
      })
    }),
    insert: () => Promise.resolve({ data: [], error: null }),
    update: () => ({
      eq: () => Promise.resolve({ data: [], error: null })
    }),
    delete: () => ({
      eq: () => Promise.resolve({ data: [], error: null })
    })
  })
} as any;

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : mockSupabase;
