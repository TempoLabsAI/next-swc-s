// src/lib/supabase/types.ts

/**
 * Options for cookie configuration
 * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie
 */
export interface CookieOptions {
  path?: string;
  maxAge?: number;
  domain?: string;
  secure?: boolean;
  httpOnly?: boolean;
  sameSite?: 'lax' | 'strict' | 'none';
  expires?: Date;
}

/**
 * Type for the Supabase client instance returned from createServerClient
 */
export type SupabaseClient = ReturnType<typeof import('@supabase/ssr').createServerClient>;

/**
 * Auth response types
 */
export interface AuthResponse {
  data: {
    user: User | null;
    session: Session | null;
  };
  error?: Error;
}

// Re-export commonly used Supabase types
export type { User, Session } from '@supabase/supabase-js';