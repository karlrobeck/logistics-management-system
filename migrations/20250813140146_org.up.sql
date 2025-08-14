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

-- Trigger functions for org schema
create or replace function org.tg_set_updated_at()
  returns trigger
  language plpgsql
  as $$
begin
  new.updated_at := now();
  return new;
end;
$$;

create or replace function org.tg_trim_name()
  returns trigger
  language plpgsql
  as $$
begin
  if TG_OP = 'INSERT' or TG_OP = 'UPDATE' then
    -- Trim whitespace around name if present
    if new.name is not null then
      new.name := btrim(new.name);
    end if;
  end if;
  return new;
end;
$$;

create or replace function org.tg_team_roles_same_org()
  returns trigger
  language plpgsql
  as $$
declare
  v_role_org uuid;
  v_team_org uuid;
begin
  select
    r.org_id into v_role_org
  from
    org.roles r
  where
    r.id = new.role_id;
  select
    t.org_id into v_team_org
  from
    org.teams t
  where
    t.id = new.team_id;
  if v_role_org is null or v_team_org is null then
    raise exception 'Role or Team does not exist for provided ids';
  end if;
  if v_role_org <> v_team_org then
    raise exception 'Role (%) and Team (%) must belong to the same organization', new.role_id, new.team_id;
  end if;
  return new;
end;
$$;

-- Triggers for org.organization
create trigger organization_set_updated_at
  before update on org.organization for each row
  execute function org.tg_set_updated_at();

create trigger organization_trim_name
  before insert or update on org.organization for each row
  execute function org.tg_trim_name();

-- Indexes for org.organization
create index idx_org_organization_owner_id on org.organization(owner_id);

create index idx_org_organization_name on org.organization(name);

create index idx_org_organization_created_at on org.organization(created_at);

-- Comments on org trigger functions
comment on function org.tg_set_updated_at() is 'BEFORE UPDATE function for org tables: sets NEW.updated_at := now().';

comment on function org.tg_trim_name() is 'BEFORE INSERT/UPDATE: btrim(name) to remove leading/trailing whitespace.';

comment on function org.tg_team_roles_same_org() is 'BEFORE INSERT/UPDATE on org.team_roles: validates role and team belong to the same organization.';

-- Comments on org.organization triggers
comment on trigger organization_set_updated_at on org.organization is 'Keeps organization.updated_at current on updates.';

comment on trigger organization_trim_name on org.organization is 'Trims whitespace around organization.name on insert/update.';

