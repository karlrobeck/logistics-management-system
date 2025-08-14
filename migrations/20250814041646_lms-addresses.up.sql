-- Add up migration script here
create schema lms;

create type lms.address_type as enum(
  'shipping',
  'billing',
  'warehouse',
  'office'
);

create table lms.addresses(
  id uuid not null primary key default gen_random_uuid(),
  address_line1 varchar(255) not null,
  address_line2 varchar(255),
  city varchar(100) not null,
  state varchar(100) not null,
  postal_code varchar(20) not null,
  country varchar(3) not null,
  address_type lms.address_type not null,
  is_validated boolean not null default false,
  latitude decimal(10, 8),
  longitude decimal(11, 8),
  created_at timestamp with time zone not null default now(),
  updated_at timestamp with time zone not null default now(),
  unique (latitude, longitude)
);

