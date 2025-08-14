-- Add up migration script here
create table auth.sessions(
  id uuid not null primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id),
  token text not null unique,
  expires_at timestamptz not null,
  ip_address text,
  user_agent text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Table and column documentation
comment on table auth.sessions is 'Login sessions for users; used for token/session validation.';

comment on column auth.sessions.id is 'Primary key: UUID for the session record.';

comment on column auth.sessions.user_id is 'FK to auth.users(id) indicating the session owner.';

comment on column auth.sessions.token is 'Opaque, unique session token.';

comment on column auth.sessions.expires_at is 'When the session becomes invalid and will no longer be accepted.';

comment on column auth.sessions.ip_address is 'Last seen IP address for the session (if available).';

comment on column auth.sessions.user_agent is 'User agent string from the client (if available).';

comment on column auth.sessions.created_at is 'Row creation timestamp (UTC).';

comment on column auth.sessions.updated_at is 'Row last-updated timestamp (UTC).';

-- Triggers for auth.sessions
create trigger sessions_set_updated_at
  before update on auth.sessions for each row
  execute function auth.tg_set_updated_at();

-- Indexes for auth.sessions
create index idx_auth_sessions_user_id on auth.sessions(user_id);

-- token is already unique; unique index is created implicitly by the constraint
create index idx_auth_sessions_expires_at on auth.sessions(expires_at);

create index idx_auth_sessions_created_at on auth.sessions(created_at);

-- Comments on auth.sessions triggers
comment on trigger sessions_set_updated_at on auth.sessions is 'Keeps sessions.updated_at in sync on updates.';

