-- Add up migration script here
-- Enable Row Level Security (RLS) for TMS Schema
-- Policies apply to public role (all users) for comprehensive security
-- All TMS data is organization-scoped using org_id columns
-- ========================================
-- ENABLE RLS ON TMS TABLES
-- ========================================
-- Enable RLS on tms.drivers
alter table tms.drivers enable row level security;

-- Enable RLS on tms.vehicles
alter table tms.vehicles enable row level security;

-- ========================================
-- TMS.DRIVERS POLICIES
-- ========================================
-- Users can see drivers in organizations they have access to
create policy drivers_org_access on tms.drivers
  for select to public
    using (org_id in (
      select
        org_id
      from
        org.current_user_organizations()));

-- Users with 'update' permission can modify drivers
create policy drivers_update on tms.drivers
  for update to public
    using (org.current_user_has_permission(org_id, 'update'::org.permission_actions))
    with check (org.current_user_has_permission(org_id, 'update'::org.permission_actions));

-- Users with 'update' permission can create drivers
create policy drivers_insert on tms.drivers
  for insert to public
    with check (org.current_user_has_permission(org_id, 'update'::org.permission_actions));

-- Users with 'delete' permission can delete drivers
create policy drivers_delete on tms.drivers
  for delete to public
    using (org.current_user_has_permission(org_id, 'delete'::org.permission_actions));

-- ========================================
-- TMS.VEHICLES POLICIES
-- ========================================
-- Users can see vehicles in organizations they have access to
create policy vehicles_org_access on tms.vehicles
  for select to public
    using (org_id in (
      select
        org_id
      from
        org.current_user_organizations()));

-- Users with 'update' permission can modify vehicles
create policy vehicles_update on tms.vehicles
  for update to public
    using (org.current_user_has_permission(org_id, 'update'::org.permission_actions))
    with check (org.current_user_has_permission(org_id, 'update'::org.permission_actions));

-- Users with 'update' permission can create vehicles
create policy vehicles_insert on tms.vehicles
  for insert to public
    with check (org.current_user_has_permission(org_id, 'update'::org.permission_actions));

-- Users with 'delete' permission can delete vehicles
create policy vehicles_delete on tms.vehicles
  for delete to public
    using (org.current_user_has_permission(org_id, 'delete'::org.permission_actions));

-- ========================================
-- COMMENTS ON POLICIES
-- ========================================
comment on policy drivers_org_access on tms.drivers is 'Users can view drivers in organizations they have access to.';

comment on policy drivers_update on tms.drivers is 'Users with update permission can modify driver records.';

comment on policy drivers_insert on tms.drivers is 'Users with update permission can create new driver records.';

comment on policy drivers_delete on tms.drivers is 'Users with delete permission can delete driver records.';

comment on policy vehicles_org_access on tms.vehicles is 'Users can view vehicles in organizations they have access to.';

comment on policy vehicles_update on tms.vehicles is 'Users with update permission can modify vehicle records.';

comment on policy vehicles_insert on tms.vehicles is 'Users with update permission can create new vehicle records.';

comment on policy vehicles_delete on tms.vehicles is 'Users with delete permission can delete vehicle records.';

-- ========================================
-- SECURITY NOTES
-- ========================================
-- Note: TMS schema policies follow the same pattern as CRM schema:
-- 1. Organization-scoped access using org_id column
-- 2. Permission-based modification using ABAC system
-- 3. Cross-organization isolation for multi-tenant security
-- 4. Integration with org.current_user_organizations() and org.current_user_has_permission()
-- Business roles that typically interact with TMS data:
-- - Fleet Manager: 'update' permission → Can manage drivers and vehicles
-- - Dispatcher: 'select' permission → Can view fleet for route planning
-- - Operations Manager: 'update'/'delete' permissions → Full fleet management
-- - Driver: 'select' permission → Can view own assignments (handled in LMS routes)
-- For driver self-service (viewing own assignments), additional policies
-- may be needed in the LMS schema for route assignments.
