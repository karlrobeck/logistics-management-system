-- Add up migration script here
create schema auth;

create table auth.users(
  id uuid not null primary key default gen_random_uuid(),
  name text not null,
  email text not null unique,
  email_verified timestamptz,
  image text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Schema and table documentation
comment on schema auth is 'Authentication and identity schema: users, sessions, accounts, and verification tokens.';

comment on table auth.users is 'Application users and their core profile attributes.';

comment on column auth.users.id is 'Primary key: stable UUID for the user.';

comment on column auth.users.name is 'Display name shown in the UI.';

comment on column auth.users.email is 'Unique email address for the user.';

comment on column auth.users.email_verified is 'Timestamp when the email address was verified; null if not verified.';

comment on column auth.users.image is 'URL to the user''s profile image/avatar.';

comment on column auth.users.created_at is 'Row creation timestamp (UTC).';

comment on column auth.users.updated_at is 'Row last-updated timestamp (UTC).';

-- Trigger functions (auth schema)
create or replace function auth.tg_set_updated_at()
  returns trigger
  language plpgsql
  as $$
begin
  new.updated_at := now();
  return new;
end;
$$;

create or replace function auth.tg_users_normalize_email()
  returns trigger
  language plpgsql
  as $$
begin
  if new.email is not null then
    new.email := lower(btrim(new.email));
  end if;
  return new;
end;
$$;

-- Triggers for auth.users
create trigger users_set_updated_at
  before update on auth.users for each row
  execute function auth.tg_set_updated_at();

create trigger users_normalize_email
  before insert or update on auth.users for each row
  execute function auth.tg_users_normalize_email();

-- Comments on auth trigger functions and triggers
comment on function auth.tg_set_updated_at() is 'BEFORE UPDATE function for all auth tables: sets NEW.updated_at := now().';

comment on function auth.tg_users_normalize_email() is 'BEFORE INSERT/UPDATE on auth.users: lower(btrim(email)) to normalize and enforce uniqueness consistently.';

comment on trigger users_set_updated_at on auth.users is 'Keeps users.updated_at in sync on updates.';

comment on trigger users_normalize_email on auth.users is 'Normalizes email on insert/update to avoid case/space dupes.';

-- Indexes for auth.users
create index idx_auth_users_email_verified on auth.users(email_verified);

create index idx_auth_users_created_at on auth.users(created_at);

