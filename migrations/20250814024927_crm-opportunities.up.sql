-- Add up migration script here
create type crm.opportunity_stage as enum(
  'prospecting',
  'qualification',
  'proposal',
  'closed-won',
  'closed-lost'
);

-- Type documentation
comment on type crm.opportunity_stage is 'Sales opportunity pipeline stage.';

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

-- Table and column documentation
comment on table crm.opportunities is 'Sales opportunities linked to companies/contacts.';

comment on column crm.opportunities.id is 'Primary key: UUID for the opportunity.';

comment on column crm.opportunities.name is 'Short name/label for the opportunity.';

comment on column crm.opportunities.company_id is 'FK to crm.companies(id) representing the account.';

comment on column crm.opportunities.primary_contact_id is 'FK to crm.contacts(id) for the primary contact.';

comment on column crm.opportunities.stage is 'Sales pipeline stage.';

comment on column crm.opportunities.amount is 'Expected revenue amount for the opportunity.';

comment on column crm.opportunities.close_date is 'Planned/actual close date.';

comment on column crm.opportunities.probability is 'Win probability percentage (0-100).';

comment on column crm.opportunities.created is 'Row creation timestamp (UTC).';

comment on column crm.opportunities.updated is 'Row last-updated timestamp (UTC).';

