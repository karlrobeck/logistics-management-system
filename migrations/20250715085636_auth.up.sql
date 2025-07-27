-- Add up migration script here
CREATE EXTENSION pgcrypto;

CREATE TABLE public.auth_users(
  id uuid NOT NULL PRIMARY KEY DEFAULT gen_random_uuid(),
  name varchar(128) NOT NULL,
  email varchar(128) NOT NULL UNIQUE,
  email_verified boolean NOT NULL DEFAULT FALSE,
  password text NOT NULL,
  created timestamp with time zone NOT NULL DEFAULT now(),
  updated timestamp with time zone NOT NULL DEFAULT now()
);

COMMENT ON TABLE public.auth_users IS 'Application users with authentication credentials';

COMMENT ON COLUMN public.auth_users.name IS 'User display name';

COMMENT ON COLUMN public.auth_users.email IS 'Unique email address for authentication';

COMMENT ON COLUMN public.auth_users.email_verified IS 'Whether the email address has been verified';

COMMENT ON COLUMN public.auth_users.password IS 'Hashed password using bcrypt or similar - never store plaintext';

COMMENT ON COLUMN public.auth_users.created IS 'Timestamp when user was created';

COMMENT ON COLUMN public.auth_users.updated IS 'Timestamp when user was last updated';

CREATE INDEX idx_auth_users_email ON public.auth_users(email);

CREATE OR REPLACE FUNCTION public.auth_current_user()
  RETURNS SETOF public.auth_users
  AS $$
BEGIN
  RETURN query
  SELECT
    *
  FROM
    public.auth_users
  WHERE
    id = current_setting('app.current_user', TRUE)::uuid;
END;
$$
LANGUAGE plpgsql
SECURITY DEFINER;

COMMENT ON FUNCTION public.auth_current_user() IS 'Returns the current authenticated user based on app.current_user setting';

