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

-- Triggers for org.teams
create trigger teams_set_updated_at
  before update on org.teams for each row
  execute function org.tg_set_updated_at();

create trigger teams_trim_name
  before insert or update on org.teams for each row
  execute function org.tg_trim_name();

-- Triggers for org.team_members
create trigger team_members_set_updated_at
  before update on org.team_members for each row
  execute function org.tg_set_updated_at();

-- Indexes for org.teams
create index idx_org_teams_org_id on org.teams(org_id);

create index idx_org_teams_name on org.teams(name);

create index idx_org_teams_created_at on org.teams(created_at);

-- Indexes for org.team_members
create index idx_org_team_members_team_id on org.team_members(team_id);

create index idx_org_team_members_user_id on org.team_members(user_id);

create index idx_org_team_members_created_at on org.team_members(created_at);

create unique index uq_org_team_members_team_user on org.team_members(team_id, user_id);

-- Comments on org.teams triggers
comment on trigger teams_set_updated_at on org.teams is 'Keeps teams.updated_at current on updates.';

comment on trigger teams_trim_name on org.teams is 'Trims whitespace around team.name on insert/update.';

-- Comments on org.team_members triggers
comment on trigger team_members_set_updated_at on org.team_members is 'Keeps team_members.updated_at current on updates.';

