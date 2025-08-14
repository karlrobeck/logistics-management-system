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
  updated_at timestamptz not null default now()
);

-- Schema and table documentation
comment on schema crm is 'Customer Relationship Management (companies, contacts, leads, opportunities, campaigns, products).';

comment on table crm.companies is 'Organizations/companies tracked in the CRM.';

comment on column crm.companies.id is 'Primary key: UUID for the company.';

comment on column crm.companies.name is 'Unique company name.';

comment on column crm.companies.description is 'Optional description/notes about the company.';

comment on column crm.companies.email is 'Primary contact email for the company.';

comment on column crm.companies.website is 'Company website URL.';

comment on column crm.companies.industry is 'Industry classification.';

comment on column crm.companies.phone_number is 'Main phone number for the company.';

comment on column crm.companies.created_at is 'Row creation timestamp (UTC).';

comment on column crm.companies.updated_at is 'Row last-updated timestamp (UTC).';

-- Indexes for crm.companies
create index idx_crm_companies_email on crm.companies(email);

create index idx_crm_companies_industry on crm.companies(industry);

create index idx_crm_companies_created_at on crm.companies(created_at);

