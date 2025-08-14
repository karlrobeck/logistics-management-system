-- Add up migration script here
create table org.roles(
  id uuid not null primary key default gen_random_uuid(),
  org_id uuid not null references org.organization(id),
  name text not null,
  description text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Table and column documentation: org.roles
comment on table org.roles is 'Roles within an organization for access control (ABAC/RBAC hybrid).';

comment on column org.roles.id is 'Primary key: UUID for the role.';

comment on column org.roles.org_id is 'FK to org.organization(id) that owns this role.';

comment on column org.roles.name is 'Role name (e.g., admin, member).';

comment on column org.roles.description is 'Optional role description.';

comment on column org.roles.created_at is 'Row creation timestamp (UTC).';

comment on column org.roles.updated_at is 'Row last-updated timestamp (UTC).';

create table org.team_roles(
  role_id uuid not null references org.roles(id),
  team_id uuid not null references org.teams(id)
);

-- Table and column documentation: org.team_roles
comment on table org.team_roles is 'Mapping of roles to teams.';

comment on column org.team_roles.role_id is 'FK to org.roles(id).';

comment on column org.team_roles.team_id is 'FK to org.teams(id).';

create type org.permission_actions as enum(
  'select',
  'read',
  'update',
  'delete'
);

-- Type documentation: org.permission_actions
comment on type org.permission_actions is 'Enumerates allowed actions within an organization for authorization checks.';

create table org.role_actions(
  id uuid not null primary key default gen_random_uuid(),
  role_id uuid not null references org.roles(id),
  action org.permission_actions not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Table and column documentation: org.role_actions
comment on table org.role_actions is 'Actions granted to a given role.';

comment on column org.role_actions.id is 'Primary key: UUID for the role-action grant.';

comment on column org.role_actions.role_id is 'FK to org.roles(id).';

comment on column org.role_actions.action is 'Permitted action from org.permission_actions.';

comment on column org.role_actions.created_at is 'Row creation timestamp (UTC).';

comment on column org.role_actions.updated_at is 'Row last-updated timestamp (UTC).';

create table org.team_resouces(
  id uuid not null primary key default gen_random_uuid(),
  resource text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Table and column documentation: org.team_resouces
comment on table org.team_resouces is 'Resources addressable by teams (e.g., dataset, project, feature flags). Typo in name kept for backward-compat.';

comment on column org.team_resouces.id is 'Primary key: UUID for the resource.';

comment on column org.team_resouces.resource is 'Resource identifier string.';

comment on column org.team_resouces.created_at is 'Row creation timestamp (UTC).';

comment on column org.team_resouces.updated_at is 'Row last-updated timestamp (UTC).';

