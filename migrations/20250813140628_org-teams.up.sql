-- Add up migration script here
create table org.teams(
  id uuid not null primary key default gen_random_uuid(),
  org_id uuid not null references org.organization(id),
  name text not null,
  description text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Table and column documentation: org.teams
comment on table org.teams is 'Teams within an organization for grouping users and assigning roles.';

comment on column org.teams.id is 'Primary key: UUID for the team.';

comment on column org.teams.org_id is 'FK to org.organization(id) that owns this team.';

comment on column org.teams.name is 'Team name.';

comment on column org.teams.description is 'Optional team description.';

comment on column org.teams.created_at is 'Row creation timestamp (UTC).';

comment on column org.teams.updated_at is 'Row last-updated timestamp (UTC).';

create table org.team_members(
  id uuid not null primary key default gen_random_uuid(),
  team_id uuid not null references org.teams(id),
  user_id uuid not null references auth.users(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Table and column documentation: org.team_members
comment on table org.team_members is 'Membership mapping between users and teams.';

comment on column org.team_members.id is 'Primary key: UUID for the membership record.';

comment on column org.team_members.team_id is 'FK to org.teams(id).';

comment on column org.team_members.user_id is 'FK to auth.users(id).';

comment on column org.team_members.created_at is 'Row creation timestamp (UTC).';

comment on column org.team_members.updated_at is 'Row last-updated timestamp (UTC).';

-- Indexes for org.teams
create index idx_org_teams_org_id on org.teams(org_id);

create index idx_org_teams_name on org.teams(name);

create index idx_org_teams_created_at on org.teams(created_at);

-- Indexes for org.team_members
create index idx_org_team_members_team_id on org.team_members(team_id);

create index idx_org_team_members_user_id on org.team_members(user_id);

create index idx_org_team_members_created_at on org.team_members(created_at);

create unique index uq_org_team_members_team_user on org.team_members(team_id, user_id);

