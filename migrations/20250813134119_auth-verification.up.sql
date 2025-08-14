-- Add up migration script here
create table auth.verification(
  id uuid not null primary key default gen_random_uuid(),
  identifier text not null,
  value text not null,
  expires_at timestamptz not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Table and column documentation
comment on table auth.verification is 'Verification challenges (magic links, OTPs, email verification tokens).';

comment on column auth.verification.id is 'Primary key: UUID for the verification record.';

comment on column auth.verification.identifier is 'Subject being verified (e.g., email address or user id).';

comment on column auth.verification.value is 'Opaque verification value (token, code).';

comment on column auth.verification.expires_at is 'When the verification challenge expires and is no longer valid.';

comment on column auth.verification.created_at is 'Row creation timestamp (UTC).';

comment on column auth.verification.updated_at is 'Row last-updated timestamp (UTC).';

