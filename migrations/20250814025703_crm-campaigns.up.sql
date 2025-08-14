-- Add up migration script here
create type crm.campaign_status as enum(
  'planned',
  'active',
  'completed',
  'paused'
);

-- Type documentation
comment on type crm.campaign_status is 'Lifecycle status of a marketing campaign.';

create table crm.campaigns(
  id uuid not null primary key default gen_random_uuid(),
  name varchar(255) not null,
  description text,
  start_date date not null,
  end_date date,
  budget decimal(10, 2) default 0.00,
  status crm.campaign_status not null,
  created_at timestamp with time zone not null default now(),
  updated_at timestamp with time zone not null default now()
);

-- Table and column documentation
comment on table crm.campaigns is 'Marketing campaigns targeting contacts and companies.';

comment on column crm.campaigns.id is 'Primary key: UUID for the campaign.';

comment on column crm.campaigns.name is 'Campaign name.';

comment on column crm.campaigns.description is 'Optional campaign description.';

comment on column crm.campaigns.start_date is 'Campaign start date.';

comment on column crm.campaigns.end_date is 'Campaign end date (optional).';

comment on column crm.campaigns.budget is 'Budget allocated to the campaign.';

comment on column crm.campaigns.status is 'Current campaign status.';

comment on column crm.campaigns.created_at is 'Row creation timestamp (UTC).';

comment on column crm.campaigns.updated_at is 'Row last-updated timestamp (UTC).';

create type crm.campaign_contacts_status as enum(
  'sent',
  'opened',
  'clicked',
  'responded',
  'unsubscribe'
);

-- Type documentation
comment on type crm.campaign_contacts_status is 'Status of a contact with respect to the campaign outreach.';

create table crm.campaign_contacts(
  id uuid not null primary key default gen_random_uuid(),
  campaign_id uuid not null references crm.campaigns(id),
  contact_id uuid not null references crm.contacts(id),
  status crm.campaign_contacts_status not null,
  interaction_date timestamp with time zone,
  created_at timestamp with time zone not null default now(),
  updated_at timestamp with time zone not null default now()
);

-- Table and column documentation
comment on table crm.campaign_contacts is 'Join table tracking contact engagement with campaigns.';

comment on column crm.campaign_contacts.id is 'Primary key: UUID for the campaign-contact record.';

comment on column crm.campaign_contacts.campaign_id is 'FK to crm.campaigns(id).';

comment on column crm.campaign_contacts.contact_id is 'FK to crm.contacts(id).';

comment on column crm.campaign_contacts.status is 'Engagement status for this contact.';

comment on column crm.campaign_contacts.interaction_date is 'Timestamp of the last engagement event.';

comment on column crm.campaign_contacts.created_at is 'Row creation timestamp (UTC).';

comment on column crm.campaign_contacts.updated_at is 'Row last-updated timestamp (UTC).';

-- Indexes for crm.campaigns
create index idx_crm_campaigns_status on crm.campaigns(status);

create index idx_crm_campaigns_start_date on crm.campaigns(start_date);

create index idx_crm_campaigns_end_date on crm.campaigns(end_date);

create index idx_crm_campaigns_created_at on crm.campaigns(created_at);

-- Indexes for crm.campaign_contacts
create index idx_crm_campaign_contacts_campaign_id on crm.campaign_contacts(campaign_id);

create index idx_crm_campaign_contacts_contact_id on crm.campaign_contacts(contact_id);

create index idx_crm_campaign_contacts_status on crm.campaign_contacts(status);

create index idx_crm_campaign_contacts_interaction_date on crm.campaign_contacts(interaction_date);

create index idx_crm_campaign_contacts_created_at on crm.campaign_contacts(created_at);

