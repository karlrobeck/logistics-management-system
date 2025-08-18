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

-- CRM trigger functions
create or replace function crm.tg_set_updated_at()
  returns trigger
  language plpgsql
  as $$
begin
  new.updated_at := now();
  return new;
end;
$$;

create or replace function crm.tg_normalize_email()
  returns trigger
  language plpgsql
  as $$
begin
  if new.email is not null then
    new.email := lower(btrim(new.email));
  end if;
  return new;
end;
$$;

create or replace function crm.tg_trim_name()
  returns trigger
  language plpgsql
  as $$
begin
  if new.name is not null then
    new.name := btrim(new.name);
  end if;
  return new;
end;
$$;

create or replace function crm.tg_trim_contact_names()
  returns trigger
  language plpgsql
  as $$
begin
  if new.first_name is not null then
    new.first_name := btrim(new.first_name);
  end if;
  if new.last_name is not null then
    new.last_name := btrim(new.last_name);
  end if;
  return new;
end;
$$;

create or replace function crm.tg_trim_product_fields()
  returns trigger
  language plpgsql
  as $$
begin
  if new.name is not null then
    new.name := btrim(new.name);
  end if;
  if new.sku is not null then
    new.sku := btrim(new.sku);
  end if;
  return new;
end;
$$;

create or replace function crm.tg_opportunity_contact_company_match()
  returns trigger
  language plpgsql
  as $$
declare
  v_contact_company uuid;
begin
  if new.primary_contact_id is not null then
    if new.company_id is null then
      raise exception 'company_id must be set when primary_contact_id is provided';
    end if;
    select
      c.company_id into v_contact_company
    from
      crm.contacts c
    where
      c.id = new.primary_contact_id;
    if v_contact_company is null then
      raise exception 'Primary contact % does not exist or has no company', new.primary_contact_id;
    end if;
    if v_contact_company <> new.company_id then
      raise exception 'Contact''s company (%) does not match opportunity company (%)', v_contact_company, new.company_id;
    end if;
  end if;
  return new;
end;
$$;

create or replace function crm.tg_interactions_require_link()
  returns trigger
  language plpgsql
  as $$
declare
  v_contact_company uuid;
  v_oppty_company uuid;
begin
  if new.contact_id is null and new.opportunity_id is null then
    raise exception 'interaction must link to at least a contact or an opportunity';
  end if;
  if new.contact_id is not null and new.opportunity_id is not null then
    select
      c.company_id into v_contact_company
    from
      crm.contacts c
    where
      c.id = new.contact_id;
    select
      o.company_id into v_oppty_company
    from
      crm.opportunities o
    where
      o.id = new.opportunity_id;
    if v_contact_company is not null and v_oppty_company is not null and v_contact_company <> v_oppty_company then
      raise exception 'When both contact and opportunity are set, they must share the same company';
    end if;
  end if;
  return new;
end;
$$;

-- Triggers for crm.companies
create trigger companies_set_updated_at
  before update on crm.companies for each row
  execute function crm.tg_set_updated_at();

create trigger companies_trim_name
  before insert or update on crm.companies for each row
  execute function crm.tg_trim_name();

-- Comments on CRM trigger functions
comment on function crm.tg_set_updated_at() is 'BEFORE UPDATE for CRM tables: sets NEW.updated_at := now().';

comment on function crm.tg_normalize_email() is 'BEFORE INSERT/UPDATE: lower(btrim(email)) to normalize email addresses.';

comment on function crm.tg_trim_name() is 'BEFORE INSERT/UPDATE: btrim(name) for entities with a name field.';

comment on function crm.tg_trim_contact_names() is 'BEFORE INSERT/UPDATE: btrim(first_name/last_name) for contacts/leads.';

comment on function crm.tg_trim_product_fields() is 'BEFORE INSERT/UPDATE: btrim(name, sku) for products.';

comment on function crm.tg_opportunity_contact_company_match() is 'BEFORE INSERT/UPDATE on opportunities: ensures primary_contact.company_id equals opportunity.company_id.';

comment on function crm.tg_interactions_require_link() is 'BEFORE INSERT/UPDATE on interactions: requires at least one link and ensures contact/opportunity belong to same company when both set.';

-- Comments on crm.companies triggers
comment on trigger companies_set_updated_at on crm.companies is 'Keeps companies.updated_at current on updates.';

comment on trigger companies_trim_name on crm.companies is 'Trims whitespace around company.name on insert/update.';

