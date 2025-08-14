-- Add up migration script here
-- Enable Row Level Security (RLS) for Org Schema
-- Policies apply to public role (all users) for comprehensive security
-- ========================================
-- ENABLE RLS ON ORG TABLES
-- ========================================
-- Enable RLS on org.organization
alter table org.organization enable row level security;

-- Enable RLS on org.teams
alter table org.teams enable row level security;

-- Enable RLS on org.team_members
alter table org.team_members enable row level security;

-- Enable RLS on org.roles
alter table org.roles enable row level security;

-- Enable RLS on org.team_roles
alter table org.team_roles enable row level security;

-- Enable RLS on org.role_actions
alter table org.role_actions enable row level security;

-- Enable RLS on org.team_resouces
alter table org.team_resouces enable row level security;

-- ========================================
-- ORG.ORGANIZATION POLICIES
-- ========================================
-- Users can see organizations they have access to (owner or team member)
create policy organization_access on org.organization
  for select to public
    using (id in (
      select
        org_id
      from
        org.current_user_organizations()));

-- Only organization owners can update organization details
create policy organization_update_owner on org.organization
  for update to public
    using (owner_id = auth.current_user_id())
    with check (owner_id = auth.current_user_id());

-- Users can create new organizations (become owner)
create policy organization_insert_new on org.organization
  for insert to public
    with check (owner_id = auth.current_user_id());

-- Only organization owners can delete organizations
create policy organization_delete_owner on org.organization
  for delete to public
    using (owner_id = auth.current_user_id());

-- ========================================
-- ORG.TEAMS POLICIES
-- ========================================
-- Users can see teams in organizations they have access to
create policy teams_access on org.teams
  for select to public
    using (org_id in (
      select
        org_id
      from
        org.current_user_organizations()));

-- Organization owners and team members can update team details
create policy teams_update on org.teams
  for update to public
    using (org.current_user_is_org_owner(org_id)
      or id in (
        select
          team_id
        from
          org.current_user_teams(org_id))) with check (org.current_user_is_org_owner(org_id)
    or id in (
      select
        team_id
      from org.current_user_teams(org_id)));

-- Organization owners and users with 'update' permission can create teams
create policy teams_insert on org.teams
  for insert to public
    with check (org.current_user_is_org_owner(org_id)
    or org.current_user_has_permission(org_id, 'update'::org.permission_actions));

-- Organization owners can delete teams
create policy teams_delete on org.teams
  for delete to public
    using (org.current_user_is_org_owner(org_id));

-- ========================================
-- ORG.TEAM_MEMBERS POLICIES
-- ========================================
-- Users can see team members in organizations they have access to
create policy team_members_access on org.team_members
  for select to public
    using (team_id in (
      select
        t.id
      from
        org.teams t
      where
        t.org_id in (
          select
            org_id
          from
            org.current_user_organizations())));

-- Organization owners and team members can update team membership
create policy team_members_update on org.team_members
  for update to public
    using (exists (
      select
        1
      from
        org.teams t
      where
        t.id = team_id and (org.current_user_is_org_owner(t.org_id) or team_id in (
          select
            team_id
          from
            org.current_user_teams(t.org_id))))) with check (exists (
      select
        1
      from org.teams t
    where
      t.id = team_id and (org.current_user_is_org_owner(t.org_id) or team_id in (
      select
        team_id
      from org.current_user_teams(t.org_id)))));

-- Organization owners and users with 'update' permission can add team members
create policy team_members_insert on org.team_members
  for insert to public
    with check (exists (
      select
        1
      from
        org.teams t
      where
        t.id = team_id and (org.current_user_is_org_owner(t.org_id) or org.current_user_has_permission(t.org_id, 'update'::org.permission_actions))));

-- Organization owners and team members can remove team members
create policy team_members_delete on org.team_members
  for delete to public
    using (exists (
      select
        1
      from
        org.teams t
      where
        t.id = team_id and (org.current_user_is_org_owner(t.org_id) or team_id in (
          select
            team_id
          from
            org.current_user_teams(t.org_id)) or user_id = auth.current_user_id() -- Users can remove themselves
)));

-- ========================================
-- ORG.ROLES POLICIES
-- ========================================
-- Users can see roles in organizations they have access to
create policy roles_access on org.roles
  for select to public
    using (org_id in (
      select
        org_id
      from
        org.current_user_organizations()));

-- Organization owners can manage roles
create policy roles_update on org.roles
  for update to public
    using (org.current_user_is_org_owner(org_id))
    with check (org.current_user_is_org_owner(org_id));

create policy roles_insert on org.roles
  for insert to public
    with check (org.current_user_is_org_owner(org_id));

create policy roles_delete on org.roles
  for delete to public
    using (org.current_user_is_org_owner(org_id));

-- ========================================
-- ORG.TEAM_ROLES POLICIES
-- ========================================
-- Users can see team-role assignments in organizations they have access to
create policy team_roles_access on org.team_roles
  for select to public
    using (exists (
      select
        1
      from
        org.teams t
      where
        t.id = team_id and t.org_id in (
          select
            org_id
          from
            org.current_user_organizations())));

-- Organization owners can manage team-role assignments
create policy team_roles_update on org.team_roles
  for update to public
    using (exists (
      select
        1
      from
        org.teams t
      where
        t.id = team_id and org.current_user_is_org_owner(t.org_id)))
      with check (exists (
        select
          1
        from
          org.teams t
        where
          t.id = team_id and org.current_user_is_org_owner(t.org_id)));

create policy team_roles_insert on org.team_roles
  for insert to public
    with check (exists (
      select
        1
      from
        org.teams t
      where
        t.id = team_id and org.current_user_is_org_owner(t.org_id)));

create policy team_roles_delete on org.team_roles
  for delete to public
    using (exists (
      select
        1
      from
        org.teams t
      where
        t.id = team_id and org.current_user_is_org_owner(t.org_id)));

-- ========================================
-- ORG.ROLE_ACTIONS POLICIES
-- ========================================
-- Users can see role actions in organizations they have access to
create policy role_actions_access on org.role_actions
  for select to public
    using (exists (
      select
        1
      from
        org.roles r
      where
        r.id = role_id and r.org_id in (
          select
            org_id
          from
            org.current_user_organizations())));

-- Organization owners can manage role actions
create policy role_actions_update on org.role_actions
  for update to public
    using (exists (
      select
        1
      from
        org.roles r
      where
        r.id = role_id and org.current_user_is_org_owner(r.org_id)))
      with check (exists (
        select
          1
        from
          org.roles r
        where
          r.id = role_id and org.current_user_is_org_owner(r.org_id)));

create policy role_actions_insert on org.role_actions
  for insert to public
    with check (exists (
      select
        1
      from
        org.roles r
      where
        r.id = role_id and org.current_user_is_org_owner(r.org_id)));

create policy role_actions_delete on org.role_actions
  for delete to public
    using (exists (
      select
        1
      from
        org.roles r
      where
        r.id = role_id and org.current_user_is_org_owner(r.org_id)));

-- ========================================
-- ORG.TEAM_RESOUCES POLICIES
-- ========================================
-- All authenticated users can see available resources
create policy team_resouces_access on org.team_resouces
  for select to public
    using (auth.current_user_id() is not null);

-- Only system/admin can manage resources (no public insert/update/delete)
-- Resources are typically managed at system level
-- ========================================
-- COMMENTS ON POLICIES
-- ========================================
comment on policy organization_access on org.organization is 'Users can view organizations they have access to (as owner or team member).';

comment on policy organization_update_owner on org.organization is 'Only organization owners can update organization details.';

comment on policy organization_insert_new on org.organization is 'Users can create new organizations (becoming the owner).';

comment on policy organization_delete_owner on org.organization is 'Only organization owners can delete their organizations.';

comment on policy teams_access on org.teams is 'Users can view teams in organizations they have access to.';

comment on policy teams_update on org.teams is 'Organization owners and team members can update team details.';

comment on policy teams_insert on org.teams is 'Organization owners and users with update permission can create teams.';

comment on policy teams_delete on org.teams is 'Only organization owners can delete teams.';

comment on policy team_members_access on org.team_members is 'Users can view team membership in accessible organizations.';

comment on policy team_members_update on org.team_members is 'Organization owners and team members can update membership.';

comment on policy team_members_insert on org.team_members is 'Organization owners and users with update permission can add team members.';

comment on policy team_members_delete on org.team_members is 'Organization owners, team members, and users themselves can remove team membership.';

comment on policy roles_access on org.roles is 'Users can view roles in organizations they have access to.';

comment on policy roles_update on org.roles is 'Only organization owners can update roles.';

comment on policy roles_insert on org.roles is 'Only organization owners can create roles.';

comment on policy roles_delete on org.roles is 'Only organization owners can delete roles.';

comment on policy team_roles_access on org.team_roles is 'Users can view team-role assignments in accessible organizations.';

comment on policy team_roles_update on org.team_roles is 'Only organization owners can update team-role assignments.';

comment on policy team_roles_insert on org.team_roles is 'Only organization owners can create team-role assignments.';

comment on policy team_roles_delete on org.team_roles is 'Only organization owners can delete team-role assignments.';

comment on policy role_actions_access on org.role_actions is 'Users can view role actions in accessible organizations.';

comment on policy role_actions_update on org.role_actions is 'Only organization owners can update role actions.';

comment on policy role_actions_insert on org.role_actions is 'Only organization owners can create role actions.';

comment on policy role_actions_delete on org.role_actions is 'Only organization owners can delete role actions.';

comment on policy team_resouces_access on org.team_resouces is 'All authenticated users can view available resources.';

