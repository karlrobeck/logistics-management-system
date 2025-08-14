-- Add up migration script here
create type crm.contact_status as enum(
  'lead',
  'prospect',
  'customer',
  'inactive'
);

create table crm.contacts(
  id uuid not null primary key default gen_random_uuid(),
  first_name varchar(100) not null,
  last_name varchar(100) not null,
  email varchar(320) not null unique,
  phone_number varchar(20),
  job_title varchar(150),
  lead_source varchar(100),
  status crm.contact_status not null default 'lead',
  birth_date date,
  company_id uuid references crm.companies(id),
  created timestamp with time zone not null default now(),
  updated timestamp with time zone not null default now()
);

