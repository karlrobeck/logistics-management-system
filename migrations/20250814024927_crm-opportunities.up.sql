-- Add up migration script here
create type crm.opportunity_stage as enum(
  'prospecting',
  'qualification',
  'proposal',
  'closed-won',
  'closed-lost'
);

create table crm.opportunities(
  id uuid not null primary key default gen_random_uuid(),
  name varchar(255) not null,
  company_id uuid references crm.companies(id),
  primary_contact_id uuid references crm.contacts(id),
  stage crm.opportunity_stage not null,
  amount decimal(10, 2) not null default 0.00,
  close_date date,
  probability decimal(5, 2) not null default 0.00,
  created timestamp with time zone not null default now(),
  updated timestamp with time zone not null default now()
);

