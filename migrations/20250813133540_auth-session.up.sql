-- Add up migration script here
create table auth.sessions(
  id uuid not null primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id),
  token text not null unique,
  expires_at timestamptz not null,
  ip_address text,
  user_agent text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

