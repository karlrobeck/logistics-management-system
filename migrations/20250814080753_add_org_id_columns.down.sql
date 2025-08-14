-- Add down migration script here
-- Removing org_id columns from all tables (reverse of add_org_id_columns migration)

-- ========================================
-- DROP VALIDATION TRIGGER FUNCTIONS
-- ========================================

drop function if exists crm.tg_validate_org_consistency();
drop function if exists lms.tg_validate_org_consistency();
drop function if exists tms.tg_validate_org_consistency();

-- ========================================
-- DROP INDEXES
-- ========================================

-- CRM schema indexes
drop index if exists idx_crm_companies_org_id;
drop index if exists idx_crm_contacts_org_id;
drop index if exists idx_crm_leads_org_id;
drop index if exists idx_crm_opportunities_org_id;
drop index if exists idx_crm_interactions_org_id;
drop index if exists idx_crm_campaigns_org_id;
drop index if exists idx_crm_cases_org_id;
drop index if exists idx_crm_products_org_id;
drop index if exists idx_crm_invoices_org_id;
drop index if exists idx_crm_notifications_org_id;

-- LMS schema indexes
drop index if exists idx_lms_addresses_org_id;
drop index if exists idx_lms_shipping_services_org_id;
drop index if exists idx_lms_pricing_zones_org_id;
drop index if exists idx_lms_pricing_rates_org_id;
drop index if exists idx_lms_shipments_org_id;
drop index if exists idx_lms_tracking_events_org_id;
drop index if exists idx_lms_warehouses_org_id;
drop index if exists idx_lms_transportation_providers_org_id;
drop index if exists idx_lms_provider_rates_org_id;
drop index if exists idx_lms_routes_org_id;

-- TMS schema indexes
drop index if exists idx_tms_drivers_org_id;
drop index if exists idx_tms_vehicles_org_id;

-- ========================================
-- DROP ORG_ID COLUMNS
-- ========================================

-- TMS schema columns
alter table tms.vehicles drop column if exists org_id;
alter table tms.drivers drop column if exists org_id;

-- LMS schema columns
alter table lms.routes drop column if exists org_id;
alter table lms.provider_rates drop column if exists org_id;
alter table lms.transportation_providers drop column if exists org_id;
alter table lms.warehouses drop column if exists org_id;
alter table lms.tracking_events drop column if exists org_id;
alter table lms.shipments drop column if exists org_id;
alter table lms.pricing_rates drop column if exists org_id;
alter table lms.pricing_zones drop column if exists org_id;
alter table lms.shipping_services drop column if exists org_id;
alter table lms.addresses drop column if exists org_id;

-- CRM schema columns
alter table crm.notifications drop column if exists org_id;
alter table crm.invoices drop column if exists org_id;
alter table crm.products drop column if exists org_id;
alter table crm.cases drop column if exists org_id;
alter table crm.campaigns drop column if exists org_id;
alter table crm.interactions drop column if exists org_id;
alter table crm.opportunities drop column if exists org_id;
alter table crm.leads drop column if exists org_id;
alter table crm.contacts drop column if exists org_id;
alter table crm.companies drop column if exists org_id;
