-- Add up migration script here
create type crm.contact_status as enum(
  'lead',
  'prospect',
  'customer',
  'inactive'
);

-- Type documentation
comment on type crm.contact_status is 'Lifecycle status of a contact in the CRM.';

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

-- Table and column documentation
comment on table crm.contacts is 'Individual people/contacts tracked in the CRM.';

comment on column crm.contacts.id is 'Primary key: UUID for the contact.';

comment on column crm.contacts.first_name is 'Contact first name.';

comment on column crm.contacts.last_name is 'Contact last name.';

comment on column crm.contacts.email is 'Unique email address of the contact.';

comment on column crm.contacts.phone_number is 'Phone number of the contact.';

comment on column crm.contacts.job_title is 'Job title/role of the contact.';

comment on column crm.contacts.lead_source is 'Where this contact originated (e.g., referral, web, event).';

comment on column crm.contacts.status is 'Lifecycle status of the contact.';

comment on column crm.contacts.birth_date is 'Birth date of the contact (optional).';

comment on column crm.contacts.company_id is 'FK to crm.companies(id) if the contact is associated with a company.';

comment on column crm.contacts.created is 'Row creation timestamp (UTC).';

comment on column crm.contacts.updated is 'Row last-updated timestamp (UTC).';

