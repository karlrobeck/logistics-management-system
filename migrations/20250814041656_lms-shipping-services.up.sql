-- Add up migration script here
create type lms.service_type as enum(
  'standard',
  'express',
  'overnight',
  'economy',
  'freight'
);

create table lms.shipping_services(
  id uuid not null primary key default gen_random_uuid(),
  name varchar(100) not null unique,
  description text,
  service_type lms.service_type not null,
  max_weight decimal(10, 2),
  delivery_time_min integer,
  delivery_time_max integer,
  is_active boolean not null default true,
  created_at timestamp with time zone not null default now(),
  updated_at timestamp with time zone not null default now()
);

create table lms.shipping_service_max_dimensions(
  id uuid primary key default gen_random_uuid(),
  shipping_service_id uuid not null references lms.shipping_services(id) on delete cascade,
  length decimal(10, 2),
  width decimal(10, 2),
  height decimal(10, 2),
  created_at timestamp with time zone not null default now()
);

