-- Add up migration script here
create table org.roles(
  id uuid not null primary key default gen_random_uuid(),
  org_id uuid not null references org.organization(id),
  name text not null,
  description text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table org.team_roles(
  role_id uuid not null references org.roles(id),
  team_id uuid not null references org.teams(id)
);

create type org.permission_actions as enum(
  'select',
  'read',
  'update',
  'delete'
);

create table org.role_actions(
  id uuid not null primary key default gen_random_uuid(),
  role_id uuid not null references org.roles(id),
  action org.permission_actions not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table org.team_resouces(
  id uuid not null primary key default gen_random_uuid(),
  resource text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

