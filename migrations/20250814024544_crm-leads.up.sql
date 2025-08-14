-- Add up migration script here
create type crm.lead_status as enum(
  'new',
  'qualified',
  'contacted',
  'unqualified'
);

-- Type documentation
comment on type crm.lead_status is 'Lead pipeline status indicating qualification and contact progress.';

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
  created_at timestamp with time zone not null default now(),
  updated_at timestamp with time zone not null default now()
);

-- Table and column documentation
comment on table crm.leads is 'Pre-contact prospects that may convert into contacts.';

comment on column crm.leads.id is 'Primary key: UUID for the lead.';

comment on column crm.leads.first_name is 'Lead first name.';

comment on column crm.leads.last_name is 'Lead last name.';

comment on column crm.leads.email is 'Unique email address of the lead.';

comment on column crm.leads.phone_number is 'Phone number of the lead.';

comment on column crm.leads.company_name is 'Company name associated with the lead (free text).';

comment on column crm.leads.lead_source is 'Where this lead originated (e.g., referral, web, event).';

comment on column crm.leads.lead_status is 'Lead pipeline status.';

comment on column crm.leads.lead_score is 'Numeric score indicating likelihood to convert.';

comment on column crm.leads.converted_to_contact_id is 'FK to crm.contacts(id) when this lead has been converted.';

comment on column crm.leads.created_at is 'Row creation timestamp (UTC).';

comment on column crm.leads.updated_at is 'Row last-updated timestamp (UTC).';

-- Indexes for crm.leads
create index idx_crm_leads_lead_status on crm.leads(lead_status);

create index idx_crm_leads_lead_source on crm.leads(lead_source);

create index idx_crm_leads_lead_score on crm.leads(lead_score);

create index idx_crm_leads_created_at on crm.leads(created_at);

create index idx_crm_leads_converted_to_contact_id on crm.leads(converted_to_contact_id);

-- Triggers for crm.leads
create trigger leads_set_updated_at
  before update on crm.leads for each row
  execute function crm.tg_set_updated_at();

create trigger leads_normalize_email
  before insert or update on crm.leads for each row
  execute function crm.tg_normalize_email();

create trigger leads_trim_names
  before insert or update on crm.leads for each row
  execute function crm.tg_trim_contact_names();

-- Comments on crm.leads triggers
comment on trigger leads_set_updated_at on crm.leads is 'Keeps leads.updated_at current on updates.';

comment on trigger leads_normalize_email on crm.leads is 'Normalizes email for leads on insert/update to avoid case/space dupes.';

comment on trigger leads_trim_names on crm.leads is 'Trims whitespace around first_name and last_name on insert/update.';

