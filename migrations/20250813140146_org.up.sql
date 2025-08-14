-- Add up migration script here
create schema org;

create table org.organization(
  id uuid not null primary key default gen_random_uuid(),
  name text not null,
  owner_id uuid not null references auth.users(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Schema and table documentation
comment on schema org is 'Organization and access control (teams, roles, permissions).';

comment on table org.organization is 'Top-level organizations that own resources and teams.';

comment on column org.organization.id is 'Primary key: UUID for the organization.';

comment on column org.organization.name is 'Human-readable organization name.';

comment on column org.organization.owner_id is 'FK to auth.users(id) designating the org owner.';

comment on column org.organization.created_at is 'Row creation timestamp (UTC).';

comment on column org.organization.updated_at is 'Row last-updated timestamp (UTC).';

