-- Add up migration script here
create type crm.interaction_type as enum(
  'call',
  'email',
  'meeting',
  'chat',
  'note'
);

-- Type documentation
comment on type crm.interaction_type is 'Kinds of CRM interactions with contacts/opportunities.';

create table crm.interactions(
  id uuid not null primary key default gen_random_uuid(),
  type crm.interaction_type not null,
  subject varchar(255),
  description text,
  interaction_date timestamp with time zone not null,
  contact_id uuid references crm.contacts(id),
  opportunity_id uuid references crm.opportunities(id),
  created_at timestamp with time zone not null default now(),
  updated_at timestamp with time zone not null default now()
);

-- Table and column documentation
comment on table crm.interactions is 'Recorded interactions such as calls, emails, and meetings.';

comment on column crm.interactions.id is 'Primary key: UUID for the interaction record.';

comment on column crm.interactions.type is 'Interaction type.';

comment on column crm.interactions.subject is 'Subject or short title.';

comment on column crm.interactions.description is 'Detailed notes of the interaction.';

comment on column crm.interactions.interaction_date is 'When the interaction occurred.';

comment on column crm.interactions.contact_id is 'FK to crm.contacts(id) if linked to a contact.';

comment on column crm.interactions.opportunity_id is 'FK to crm.opportunities(id) if linked to an opportunity.';

comment on column crm.interactions.created_at is 'Row creation timestamp (UTC).';

comment on column crm.interactions.updated_at is 'Row last-updated timestamp (UTC).';

-- Indexes for crm.interactions
create index idx_crm_interactions_type on crm.interactions(type);

create index idx_crm_interactions_interaction_date on crm.interactions(interaction_date);

create index idx_crm_interactions_contact_id on crm.interactions(contact_id);

create index idx_crm_interactions_opportunity_id on crm.interactions(opportunity_id);

create index idx_crm_interactions_created_at on crm.interactions(created_at);

