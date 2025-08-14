-- Add up migration script here
create type crm.case_status as enum(
  'open',
  'in_progress',
  'pending_customer',
  'closed'
);

-- Type documentation
comment on type crm.case_status is 'Lifecycle status for customer support cases.';

create type crm.case_priority as enum(
  'low',
  'medium',
  'high',
  'critical'
);

-- Type documentation
comment on type crm.case_priority is 'Priority level for customer support cases.';

create table crm.cases(
  id uuid not null primary key default gen_random_uuid(),
  subject varchar(255) not null,
  description text not null,
  status crm.case_status not null,
  priority crm.case_priority not null,
  contact_id uuid references crm.contacts(id),
  closed_at timestamp with time zone,
  created_at timestamp with time zone not null default now(),
  updated_at timestamp with time zone not null default now()
);

-- Table and column documentation
comment on table crm.cases is 'Customer support tickets/cases.';

comment on column crm.cases.id is 'Primary key: UUID for the case.';

comment on column crm.cases.subject is 'Case subject/title.';

comment on column crm.cases.description is 'Detailed description of the case.';

comment on column crm.cases.status is 'Current status of the case.';

comment on column crm.cases.priority is 'Priority level.';

comment on column crm.cases.contact_id is 'FK to crm.contacts(id) who opened/owns the case.';

comment on column crm.cases.closed_at is 'When the case was closed (if applicable).';

comment on column crm.cases.created_at is 'Row creation timestamp (UTC).';

comment on column crm.cases.updated_at is 'Row last-updated timestamp (UTC).';

-- Indexes for crm.cases
create index idx_crm_cases_contact_id on crm.cases(contact_id);

create index idx_crm_cases_status on crm.cases(status);

create index idx_crm_cases_priority on crm.cases(priority);

create index idx_crm_cases_closed_at on crm.cases(closed_at);

create index idx_crm_cases_created_at on crm.cases(created_at);

