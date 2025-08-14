-- Add up migration script here
create table auth.accounts(
  id uuid not null primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id),
  account_id text not null,
  provider_id text not null,
  access_token text,
  refresh_token text,
  access_token_expires_at timestamptz,
  refresh_token_expires_at timestamptz,
  scope text,
  id_token text,
  password text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Table and column documentation
comment on table auth.accounts is 'External identity provider accounts and/or local credentials linked to users.';

comment on column auth.accounts.id is 'Primary key: UUID for the account linkage record.';

comment on column auth.accounts.user_id is 'FK to auth.users(id) that owns this account linkage.';

comment on column auth.accounts.account_id is 'Provider-specific account identifier (e.g., subject/user id at the provider).';

comment on column auth.accounts.provider_id is 'Identifier for the identity provider (e.g., google, github, email).';

comment on column auth.accounts.access_token is 'Access token issued by the provider, if applicable.';

comment on column auth.accounts.refresh_token is 'Refresh token issued by the provider, if applicable.';

comment on column auth.accounts.access_token_expires_at is 'Expiration timestamp for the access token.';

comment on column auth.accounts.refresh_token_expires_at is 'Expiration timestamp for the refresh token.';

comment on column auth.accounts.scope is 'Scopes granted for the tokens (space- or comma-separated).';

comment on column auth.accounts.id_token is 'ID token (JWT) returned by the provider, if applicable.';

comment on column auth.accounts.password is 'Password hash for local credentials (if using email+password).';

comment on column auth.accounts.created_at is 'Row creation timestamp (UTC).';

comment on column auth.accounts.updated_at is 'Row last-updated timestamp (UTC).';

