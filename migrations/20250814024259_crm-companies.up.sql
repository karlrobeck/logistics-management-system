-- Add up migration script here
create schema crm;

create table crm.companies(
  id uuid not null primary key default gen_random_uuid(),
  name varchar(255) not null unique,
  description text,
  email varchar(320),
  website varchar(500),
  industry varchar(100),
  phone_number varchar(20),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now())
