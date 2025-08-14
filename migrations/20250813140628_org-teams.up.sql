-- Add up migration script here
create table org.teams(
  id uuid not null primary key default gen_random_uuid(),
  org_id uuid not null references org.organization(id),
  name text not null,
  description text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table org.team_members(
  id uuid not null primary key default gen_random_uuid(),
  team_id uuid not null references org.teams(id),
  user_id uuid not null references auth.users(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

