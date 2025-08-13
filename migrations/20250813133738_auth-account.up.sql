-- Add up migration script here
create table auth.accounts(
  id uuid not null primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id),
  account_id text not null,
  provider_id text not null,
  access_token text,
  refresh_token text,
  access_token_expires_at timestamptz,
  refresh_token_expires_at timestamptz,
  scope text,
  id_token text,
  password text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

