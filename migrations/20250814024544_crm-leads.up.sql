-- Add up migration script here
create type crm.lead_status as enum(
  'new',
  'qualified',
  'contacted',
  'unqualified'
);

create table crm.leads(
  id uuid not null primary key default gen_random_uuid(),
  first_name varchar(100) not null,
  last_name varchar(100) not null,
  email varchar(320) not null unique,
  phone_number varchar(20),
  company_name varchar(255),
  lead_source varchar(100),
  lead_status crm.lead_status not null default 'new',
  lead_score integer not null default 0,
  converted_to_contact_id uuid references crm.contacts(id),
  created timestamp with time zone not null default now(),
  updated timestamp with time zone not null default now()
);

