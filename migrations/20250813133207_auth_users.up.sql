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

