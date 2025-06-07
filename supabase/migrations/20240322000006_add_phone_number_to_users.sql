ALTER TABLE public.users ADD COLUMN IF NOT EXISTS phone_number text;

alter publication supabase_realtime add table users;