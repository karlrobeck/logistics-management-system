-- Add down migration script here
-- Disable Row Level Security (RLS) for Auth Schema and drop all policies
-- ========================================
-- DROP AUTH.VERIFICATION POLICIES
-- ========================================
drop policy if exists verification_delete_own on auth.verification;

drop policy if exists verification_select_own on auth.verification;

-- ========================================
-- DROP AUTH.ACCOUNTS POLICIES
-- ========================================
drop policy if exists accounts_delete_own on auth.accounts;

drop policy if exists accounts_update_own on auth.accounts;

drop policy if exists accounts_select_own on auth.accounts;

-- ========================================
-- DROP AUTH.SESSIONS POLICIES
-- ========================================
drop policy if exists sessions_delete_own on auth.sessions;

drop policy if exists sessions_update_own on auth.sessions;

drop policy if exists sessions_select_own on auth.sessions;

-- ========================================
-- DROP AUTH.USERS POLICIES
-- ========================================
drop policy if exists users_insert_registration on auth.users;

drop policy if exists users_update_own on auth.users;

drop policy if exists users_select_org_members on auth.users;

drop policy if exists users_select_own on auth.users;

drop policy if exists users_isolation on auth.users;

-- ========================================
-- DISABLE RLS ON AUTH TABLES
-- ========================================
-- Disable RLS on auth.verification
alter table auth.verification disable row level security;

-- Disable RLS on auth.accounts
alter table auth.accounts disable row level security;

-- Disable RLS on auth.sessions
alter table auth.sessions disable row level security;

-- Disable RLS on auth.users
alter table auth.users disable row level security;

