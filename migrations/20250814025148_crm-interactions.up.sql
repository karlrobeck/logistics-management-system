-- Add up migration script here
create type crm.interaction_type as enum(
  'call',
  'email',
  'meeting',
  'chat',
  'note'
);

create table crm.interactions(
  id uuid not null primary key default gen_random_uuid(),
  type crm.interaction_type not null,
  subject varchar(255),
  description text,
  interaction_date timestamp with time zone not null,
  contact_id uuid references crm.contacts(id),
  opportunity_id uuid references crm.opportunities(id),
  created timestamp with time zone not null default now(),
  updated timestamp with time zone not null default now()
);

