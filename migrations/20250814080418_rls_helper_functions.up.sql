-- Add up migration script here
-- RLS Helper Functions for Multi-tenant System
-- These functions extract user information from JWT claims stored in current_setting
-- Function to get current user ID from JWT claims
create or replace function auth.current_user_id()
  returns uuid
  language plpgsql
  stable
  security definer
  as $$
declare
  user_id_text text;
  user_id uuid;
begin
  -- Get user ID from JWT sub claim
  user_id_text := coalesce(nullif(current_setting('request.jwt.sub', true), ''), nullif(current_setting('app.current_user_id', true), ''));
  if user_id_text is null or user_id_text = '' then
    return null;
  end if;
  -- Validate and convert to UUID
  begin
    user_id := user_id_text::uuid;
    return user_id;
  exception
    when invalid_text_representation then
      return null;
  end;
end;

$$;

-- Function to get current user's organizations
create or replace function org.current_user_organizations()
  returns table(
    org_id uuid)
  language plpgsql
  stable
  security definer
  as $$
declare
  current_user_id uuid;
begin
  current_user_id := auth.current_user_id();
  if current_user_id is null then
    return;
  end if;
  -- Return organizations where user is owner or member of teams
  return query select distinct
    o.id
  from
    org.organization o
  where
    o.owner_id = current_user_id
  union
  select distinct
    t.org_id
  from
    org.teams t
    inner join org.team_members tm on tm.team_id = t.id
  where
    tm.user_id = current_user_id;
end;
$$;

-- Function to check if current user belongs to an organization
create or replace function org.current_user_has_org_access(target_org_id uuid)
  returns boolean
  language plpgsql
  stable
  security definer
  as $$
declare
  current_user_id uuid;
  has_access boolean := false;
begin
  current_user_id := auth.current_user_id();
  if current_user_id is null or target_org_id is null then
    return false;
  end if;
  -- Check if user is owner of the organization
  select
    exists (
      select
        1
      from
        org.organization o
      where
        o.id = target_org_id
        and o.owner_id = current_user_id) into has_access;
  if has_access then
    return true;
  end if;
  -- Check if user is member of any team in the organization
  select
    exists (
      select
        1
      from
        org.teams t
        inner join org.team_members tm on tm.team_id = t.id
      where
        t.org_id = target_org_id
        and tm.user_id = current_user_id) into has_access;
  return has_access;
end;
$$;

-- Function to get current user's teams within an organization
create or replace function org.current_user_teams(target_org_id uuid default null)
  returns table(
    team_id uuid,
    org_id uuid)
  language plpgsql
  stable
  security definer
  as $$
declare
  current_user_id uuid;
begin
  current_user_id := auth.current_user_id();
  if current_user_id is null then
    return;
  end if;
  return query
  select
    t.id as team_id,
    t.org_id
  from
    org.teams t
    inner join org.team_members tm on tm.team_id = t.id
  where
    tm.user_id = current_user_id
    and (target_org_id is null
      or t.org_id = target_org_id);
end;
$$;

-- Function to get current user's roles within an organization
create or replace function org.current_user_roles(target_org_id uuid default null)
  returns table(
    role_id uuid,
    role_name text,
    org_id uuid)
  language plpgsql
  stable
  security definer
  as $$
declare
  current_user_id uuid;
begin
  current_user_id := auth.current_user_id();
  if current_user_id is null then
    return;
  end if;
  return query select distinct
    r.id as role_id,
    r.name as role_name,
    r.org_id
  from
    org.roles r
    inner join org.team_roles tr on tr.role_id = r.id
    inner join org.teams t on t.id = tr.team_id
    inner join org.team_members tm on tm.team_id = t.id
  where
    tm.user_id = current_user_id
    and (target_org_id is null
      or r.org_id = target_org_id);
end;
$$;

-- Function to check if current user has specific action permission in an organization
create or replace function org.current_user_has_permission(target_org_id uuid, required_action org.permission_actions)
  returns boolean
  language plpgsql
  stable
  security definer
  as $$
declare
  current_user_id uuid;
  has_permission boolean := false;
begin
  current_user_id := auth.current_user_id();
  if current_user_id is null or target_org_id is null then
    return false;
  end if;
  -- Organization owners have all permissions
  select
    exists (
      select
        1
      from
        org.organization o
      where
        o.id = target_org_id
        and o.owner_id = current_user_id) into has_permission;
  if has_permission then
    return true;
  end if;
  -- Check if user has the required action through roles
  select
    exists (
      select
        1
      from
        org.roles r
        inner join org.role_actions ra on ra.role_id = r.id
        inner join org.team_roles tr on tr.role_id = r.id
        inner join org.teams t on t.id = tr.team_id
        inner join org.team_members tm on tm.team_id = t.id
      where
        tm.user_id = current_user_id
        and r.org_id = target_org_id
        and ra.action = required_action) into has_permission;
  return has_permission;
end;
$$;

-- Function to check if current user is organization owner
create or replace function org.current_user_is_org_owner(target_org_id uuid)
  returns boolean
  language plpgsql
  stable
  security definer
  as $$
declare
  current_user_id uuid;
begin
  current_user_id := auth.current_user_id();
  if current_user_id is null or target_org_id is null then
    return false;
  end if;
  return exists (
    select
      1
    from
      org.organization o
    where
      o.id = target_org_id
      and o.owner_id = current_user_id);
end;
$$;

-- Function to get organization context from JWT claims (for cases where org_id is in JWT)
create or replace function org.current_organization_id()
  returns uuid
  language plpgsql
  stable
  security definer
  as $$
declare
  org_id_text text;
  org_id uuid;
begin
  -- Get organization ID from JWT custom claim or app setting
  org_id_text := coalesce(nullif(current_setting('request.jwt.org_id', true), ''), nullif(current_setting('app.current_org_id', true), ''));
  if org_id_text is null or org_id_text = '' then
    return null;
  end if;
  -- Validate and convert to UUID
  begin
    org_id := org_id_text::uuid;
    -- Verify user has access to this organization
    if org.current_user_has_org_access(org_id) then
      return org_id;
    else
      return null;
    end if;
  exception
    when invalid_text_representation then
      return null;
  end;
end;

$$;

-- Comments on functions
comment on function auth.current_user_id() is 'Extracts current user UUID from JWT sub claim or app setting. Returns null if not authenticated.';

comment on function org.current_user_organizations() is 'Returns all organizations the current user has access to (as owner or team member).';

comment on function org.current_user_has_org_access(uuid) is 'Checks if current user has access to specified organization.';

comment on function org.current_user_teams(uuid) is 'Returns teams the current user belongs to, optionally filtered by organization.';

comment on function org.current_user_roles(uuid) is 'Returns roles assigned to current user through team membership, optionally filtered by organization.';

comment on function org.current_user_has_permission(uuid, org.permission_actions) is 'Checks if current user has specific permission in organization (owners have all permissions).';

comment on function org.current_user_is_org_owner(uuid) is 'Checks if current user is the owner of specified organization.';

comment on function org.current_organization_id() is 'Extracts current organization UUID from JWT claims, with access validation.';

-- Grant execute permissions to authenticated users
grant execute on function auth.current_user_id() to public;

grant execute on function org.current_user_organizations() to public;

grant execute on function org.current_user_has_org_access(uuid) to public;

grant execute on function org.current_user_teams(uuid) to public;

grant execute on function org.current_user_roles(uuid) to public;

grant execute on function org.current_user_has_permission(uuid, org.permission_actions) to public;

grant execute on function org.current_user_is_org_owner(uuid) to public;

grant execute on function org.current_organization_id() to public;

