-- Add down migration script here
-- Disable Row Level Security (RLS) for Org Schema and drop all policies
-- ========================================
-- DROP ORG.TEAM_RESOUCES POLICIES
-- ========================================
drop policy if exists team_resouces_access on org.team_resouces;

-- ========================================
-- DROP ORG.ROLE_ACTIONS POLICIES
-- ========================================
drop policy if exists role_actions_delete on org.role_actions;

drop policy if exists role_actions_insert on org.role_actions;

drop policy if exists role_actions_update on org.role_actions;

drop policy if exists role_actions_access on org.role_actions;

-- ========================================
-- DROP ORG.TEAM_ROLES POLICIES
-- ========================================
drop policy if exists team_roles_delete on org.team_roles;

drop policy if exists team_roles_insert on org.team_roles;

drop policy if exists team_roles_update on org.team_roles;

drop policy if exists team_roles_access on org.team_roles;

-- ========================================
-- DROP ORG.ROLES POLICIES
-- ========================================
drop policy if exists roles_delete on org.roles;

drop policy if exists roles_insert on org.roles;

drop policy if exists roles_update on org.roles;

drop policy if exists roles_access on org.roles;

-- ========================================
-- DROP ORG.TEAM_MEMBERS POLICIES
-- ========================================
drop policy if exists team_members_delete on org.team_members;

drop policy if exists team_members_insert on org.team_members;

drop policy if exists team_members_update on org.team_members;

drop policy if exists team_members_access on org.team_members;

-- ========================================
-- DROP ORG.TEAMS POLICIES
-- ========================================
drop policy if exists teams_delete on org.teams;

drop policy if exists teams_insert on org.teams;

drop policy if exists teams_update on org.teams;

drop policy if exists teams_access on org.teams;

-- ========================================
-- DROP ORG.ORGANIZATION POLICIES
-- ========================================
drop policy if exists organization_delete_owner on org.organization;

drop policy if exists organization_insert_new on org.organization;

drop policy if exists organization_update_owner on org.organization;

drop policy if exists organization_access on org.organization;

-- ========================================
-- DISABLE RLS ON ORG TABLES
-- ========================================
-- Disable RLS on org.team_resouces
alter table org.team_resouces disable row level security;

-- Disable RLS on org.role_actions
alter table org.role_actions disable row level security;

-- Disable RLS on org.team_roles
alter table org.team_roles disable row level security;

-- Disable RLS on org.roles
alter table org.roles disable row level security;

-- Disable RLS on org.team_members
alter table org.team_members disable row level security;

-- Disable RLS on org.teams
alter table org.teams disable row level security;

-- Disable RLS on org.organization
alter table org.organization disable row level security;

