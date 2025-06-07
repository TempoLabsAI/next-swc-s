// src/types/modules.d.ts
declare module '@/lib/supabase' {
  export { createClient } from './server';
  export type { SupabaseClient, CookieOptions } from './types';
}