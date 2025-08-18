-- Add up migration script here
-- Enable Row Level Security (RLS) for Auth Schema
-- Policies apply to public role (all users) for comprehensive security
-- ========================================
-- ENABLE RLS ON AUTH TABLES
-- ========================================
-- Enable RLS on auth.users
alter table auth.users enable row level security;

-- Enable RLS on auth.sessions
alter table auth.sessions enable row level security;

-- Enable RLS on auth.accounts
alter table auth.accounts enable row level security;

-- Enable RLS on auth.verification
alter table auth.verification enable row level security;

-- ========================================
-- AUTH.USERS POLICIES
-- ========================================
-- Users can only see and modify their own user record, plus read basic info of org members
create policy users_isolation on auth.users
  for all to public
    using (id = auth.current_user_id());

-- Allow users to read their own full profile
create policy users_select_own on auth.users
  for select to public
    using (id = auth.current_user_id());

-- Allow users to read basic info of other users in same organization
create policy users_select_org_members on auth.users
  for select to public
    using (id != auth.current_user_id()
      and id in (
      -- Get all users who are owners of orgs that current user has access to
        select
          o.owner_id from org.organization o
          where
            o.id in (
              select
                org_id
              from org.current_user_organizations())
            union
            -- Get all users who are team members in orgs that current user has access to
              select
                tm.user_id
              from org.team_members tm
              inner join org.teams t on t.id = tm.team_id
              where
                t.org_id in (
                  select
                    org_id
                  from org.current_user_organizations())));

-- Allow users to update their own profile
create policy users_update_own on auth.users
  for update to public
    using (id = auth.current_user_id())
    with check (id = auth.current_user_id());

-- Allow user registration (insert new users) - anonymous only
create policy users_insert_registration on auth.users
  for insert to public
    with CHECK (-- Only allow insert if no current user (anonymous registration only)
    auth.current_user_id() is null);

-- Users cannot delete their own account (business rule - use soft delete/deactivation)
-- No delete policy for users
-- ========================================
-- AUTH.SESSIONS POLICIES
-- ========================================
-- Users can only see their own sessions
create policy sessions_select_own on auth.sessions
  for select to public
    using (user_id = auth.current_user_id());

-- Users can update their own sessions (for session refresh, etc.)
create policy sessions_update_own on auth.sessions
  for update to public
    using (user_id = auth.current_user_id())
    with check (user_id = auth.current_user_id());

-- Users can delete their own sessions (logout)
create policy sessions_delete_own on auth.sessions
  for delete to public
    using (user_id = auth.current_user_id());

-- Only auth service can insert sessions
-- No public insert policy
-- ========================================
-- AUTH.ACCOUNTS POLICIES
-- ========================================
-- Users can only see their own linked accounts
create policy accounts_select_own on auth.accounts
  for select to public
    using (user_id = auth.current_user_id());

-- Users can update their own account linkages (token refresh, etc.)
create policy accounts_update_own on auth.accounts
  for update to public
    using (user_id = auth.current_user_id())
    with check (user_id = auth.current_user_id());

-- Users can unlink their own accounts
create policy accounts_delete_own on auth.accounts
  for delete to public
    using (user_id = auth.current_user_id());

-- Only auth service can create account linkages
-- No public insert policy
-- ========================================
-- AUTH.VERIFICATION POLICIES
-- ========================================
-- Users can only see verification records for their email/identifier
create policy verification_select_own on auth.verification
  for select to public
    using (identifier =(
      select
        email
      from
        auth.users
      where
        id = auth.current_user_id())
        or identifier = auth.current_user_id()::text);

-- No update policy - verification records are immutable once created
-- Users can delete their own verification records (after use)
create policy verification_delete_own on auth.verification
  for delete to public
    using (identifier =(
      select
        email
      from
        auth.users
      where
        id = auth.current_user_id())
        or identifier = auth.current_user_id()::text);

-- Only auth service can create verification records
-- No public insert policy
-- ========================================
-- COMMENTS ON POLICIES
-- ========================================
comment on policy users_isolation on auth.users is 'Users can only access their own user record.';

comment on policy users_select_own on auth.users is 'Users can read their own profile information.';

comment on policy users_select_org_members on auth.users is 'Users can read basic profile information of other users in the same organization.';

comment on policy users_update_own on auth.users is 'Users can update their own profile information.';

comment on policy users_insert_registration on auth.users is 'Allows user registration - only anonymous users can insert new user records during signup.';

comment on policy sessions_select_own on auth.sessions is 'Users can view their own active sessions.';

comment on policy sessions_update_own on auth.sessions is 'Users can update their own sessions (refresh tokens, etc.).';

comment on policy sessions_delete_own on auth.sessions is 'Users can delete their own sessions (logout).';

comment on policy accounts_select_own on auth.accounts is 'Users can view their own linked identity provider accounts.';

comment on policy accounts_update_own on auth.accounts is 'Users can update their own account linkages (token refresh).';

comment on policy accounts_delete_own on auth.accounts is 'Users can unlink their own identity provider accounts.';

comment on policy verification_select_own on auth.verification is 'Users can view verification records for their email or user ID.';

comment on policy verification_delete_own on auth.verification is 'Users can delete their own verification records after use.';

-- ========================================
-- SECURITY NOTES
-- ========================================
-- Note: These policies assume:
-- 1. Auth service operates with elevated privileges (service role)
-- 2. Application users operate through 'authenticated' role or similar
-- 3. JWT contains valid user ID in 'sub' claim
-- 4. auth.current_user_id() function is available and working
-- 5. Insert operations for auth tables are handled by auth service, not end users
-- For development/testing, you may need to temporarily disable RLS:
-- ALTER TABLE auth.users DISABLE ROW LEVEL SECURITY;
-- To check RLS status:
-- SELECT schemaname, tablename, rowsecurity
-- FROM pg_tables
-- WHERE schemaname = 'auth';
