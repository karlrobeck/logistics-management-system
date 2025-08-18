-- Add down migration script here
-- Disable Row Level Security (RLS) for TMS Schema and drop all policies
-- ========================================
-- DROP TMS.VEHICLES POLICIES
-- ========================================
drop policy if exists vehicles_delete on tms.vehicles;

drop policy if exists vehicles_insert on tms.vehicles;

drop policy if exists vehicles_update on tms.vehicles;

drop policy if exists vehicles_org_access on tms.vehicles;

-- ========================================
-- DROP TMS.DRIVERS POLICIES
-- ========================================
drop policy if exists drivers_delete on tms.drivers;

drop policy if exists drivers_insert on tms.drivers;

drop policy if exists drivers_update on tms.drivers;

drop policy if exists drivers_org_access on tms.drivers;

-- ========================================
-- DISABLE RLS ON TMS TABLES
-- ========================================
-- Disable RLS on tms.vehicles
alter table tms.vehicles disable row level security;

-- Disable RLS on tms.drivers
alter table tms.drivers disable row level security;

