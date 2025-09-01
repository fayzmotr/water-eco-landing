import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Check if Supabase is properly configured
const isSupabaseConfigured = supabaseUrl && 
  supabaseAnonKey && 
  supabaseUrl !== 'https://your-project.supabase.co' && 
  supabaseAnonKey !== 'your-anon-key-here' &&
  supabaseUrl !== 'your_supabase_url' &&
  supabaseAnonKey !== 'your_supabase_anon_key';

if (!isSupabaseConfigured) {
  console.warn('Supabase is not configured. Please set up your environment variables.');
}

// Create a mock client for when Supabase is not configured
const mockSupabaseClient = {
  from: (table: string) => ({
    select: (columns?: string) => ({
      order: (column: string, options?: any) => ({
        limit: (count: number) => Promise.resolve({ data: [], error: null }),
        eq: (column: string, value: any) => Promise.resolve({ data: [], error: null }),
        single: () => Promise.resolve({ data: null, error: { message: 'Supabase not configured' } })
      }),
      eq: (column: string, value: any) => ({
        single: () => Promise.resolve({ data: null, error: { message: 'Supabase not configured' } }),
        order: (column: string, options?: any) => Promise.resolve({ data: [], error: null }),
        limit: (count: number) => Promise.resolve({ data: [], error: null })
      }),
      not: (column: string, operator: string, value: any) => ({
        order: (column: string, options?: any) => Promise.resolve({ data: [], error: null })
      }),
      limit: (count: number) => Promise.resolve({ data: [], error: null }),
      single: () => Promise.resolve({ data: null, error: { message: 'Supabase not configured' } })
    }),
    insert: (values: any) => ({
      select: () => ({
        single: () => Promise.resolve({ data: null, error: { message: 'Supabase not configured' } })
      })
    }),
    update: (values: any) => ({
      eq: (column: string, value: any) => ({
        select: () => ({
          single: () => Promise.resolve({ data: null, error: { message: 'Supabase not configured' } })
        })
      })
    }),
    delete: () => ({
      eq: (column: string, value: any) => Promise.resolve({ data: null, error: { message: 'Supabase not configured' } })
    }),
    upsert: (values: any, options?: any) => Promise.resolve({ data: null, error: { message: 'Supabase not configured' } })
  }),
  rpc: (functionName: string, params?: any) => Promise.resolve({ data: null, error: { message: 'Supabase not configured' } }),
  auth: {
    signUp: () => Promise.resolve({ data: null, error: { message: 'Supabase not configured' } }),
    signIn: () => Promise.resolve({ data: null, error: { message: 'Supabase not configured' } }),
    signOut: () => Promise.resolve({ error: null }),
    getUser: () => Promise.resolve({ data: { user: null }, error: null }),
    onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } })
  },
  storage: {
    from: (bucket: string) => ({
      upload: (path: string, file: File) => Promise.resolve({ data: null, error: { message: 'Supabase not configured' } }),
      remove: (paths: string[]) => Promise.resolve({ data: null, error: { message: 'Supabase not configured' } }),
      getPublicUrl: (path: string) => ({ data: { publicUrl: '' } })
    })
  }
};

export const supabase = isSupabaseConfigured 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : mockSupabaseClient as any;

export const isSupabaseReady = isSupabaseConfigured;