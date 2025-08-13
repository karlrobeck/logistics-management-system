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

