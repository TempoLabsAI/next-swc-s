// src/lib/supabase/server.ts
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import type { CookieOptions, SupabaseClient } from "./types"; // Add this import

export const createClient = (): SupabaseClient => { // Added return type
  const cookieStore = cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll(): Array<{ name: string; value: string }> { // Added return type
          return Array.from(cookieStore).map((cookie) => ({
            name: cookie.name,
            value: cookie.value,
          }));
        },
        set(name: string, value: string, options: CookieOptions) { // Added type
          try {
            cookieStore.set({ name, value, ...options });
          } catch (error) {
            console.error("Cookie set error:", error);
          }
        },
        remove(name: string, options: CookieOptions) { // Added type
          cookieStore.set({ name, value: "", ...options });
        }
      },
    }
  );
};