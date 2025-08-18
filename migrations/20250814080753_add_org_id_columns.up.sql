-- Add up migration script here
-- Add org_id to crm.companies
alter table crm.companies
  add column org_id uuid not null references org.organization(id);

-- Add org_id to crm.contacts
alter table crm.contacts
  add column org_id uuid not null references org.organization(id);

-- Add org_id to crm.leads
alter table crm.leads
  add column org_id uuid not null references org.organization(id);

-- Add org_id to crm.opportunities
alter table crm.opportunities
  add column org_id uuid not null references org.organization(id);

-- Add org_id to crm.interactions
alter table crm.interactions
  add column org_id uuid not null references org.organization(id);

-- Add org_id to crm.campaigns
alter table crm.campaigns
  add column org_id uuid not null references org.organization(id);

-- crm.campaign_contacts inherits org_id through campaign and contact relationships
-- Add org_id to crm.cases
alter table crm.cases
  add column org_id uuid not null references org.organization(id);

-- Add org_id to crm.products
alter table crm.products
  add column org_id uuid not null references org.organization(id);

-- crm.opportunity_products inherits org_id through opportunity relationship
-- Add org_id to crm.invoices
alter table crm.invoices
  add column org_id uuid not null references org.organization(id);

-- crm.invoice_line_items inherits org_id through invoice relationship
-- Add org_id to crm.notifications
alter table crm.notifications
  add column org_id uuid not null references org.organization(id);

-- ========================================
-- LMS SCHEMA TABLES
-- ========================================
-- Add org_id to lms.addresses
alter table lms.addresses
  add column org_id uuid not null references org.organization(id);

-- Add org_id to lms.shipping_services
alter table lms.shipping_services
  add column org_id uuid not null references org.organization(id);

-- lms.shipping_service_max_dimensions inherits org_id through shipping_services relationship
-- Add org_id to lms.pricing_zones
alter table lms.pricing_zones
  add column org_id uuid not null references org.organization(id);

-- lms.pricing_zone_countries inherits org_id through pricing_zones relationship
-- Add org_id to lms.pricing_rates
alter table lms.pricing_rates
  add column org_id uuid not null references org.organization(id);

-- Add org_id to lms.shipments
alter table lms.shipments
  add column org_id uuid not null references org.organization(id);

-- lms.packages inherits org_id through shipments relationship
-- Add org_id to lms.tracking_events
alter table lms.tracking_events
  add column org_id uuid not null references org.organization(id);

-- Add org_id to lms.warehouses
alter table lms.warehouses
  add column org_id uuid not null references org.organization(id);

-- lms.warehouse_inventories inherits org_id through warehouses relationship
-- Add org_id to lms.transportation_providers
alter table lms.transportation_providers
  add column org_id uuid not null references org.organization(id);

-- lms.provider_services inherits org_id through transportation_providers relationship
-- lms.provider_service_origin_countries inherits org_id through provider_services relationship
-- lms.provider_service_destination_countries inherits org_id through provider_services relationship
-- lms.provider_service_max_dimensions inherits org_id through provider_services relationship
-- Add org_id to lms.provider_rates
alter table lms.provider_rates
  add column org_id uuid not null references org.organization(id);

-- Add org_id to lms.routes
alter table lms.routes
  add column org_id uuid not null references org.organization(id);

-- lms.route_shipments inherits org_id through routes relationship
-- ========================================
-- TMS SCHEMA TABLES
-- ========================================
-- Add org_id to tms.drivers
alter table tms.drivers
  add column org_id uuid not null references org.organization(id);

-- Add org_id to tms.vehicles
alter table tms.vehicles
  add column org_id uuid not null references org.organization(id);

-- ========================================
-- CREATE INDEXES FOR PERFORMANCE
-- ========================================
-- CRM schema indexes
create index idx_crm_companies_org_id on crm.companies(org_id);

create index idx_crm_contacts_org_id on crm.contacts(org_id);

create index idx_crm_leads_org_id on crm.leads(org_id);

create index idx_crm_opportunities_org_id on crm.opportunities(org_id);

create index idx_crm_interactions_org_id on crm.interactions(org_id);

create index idx_crm_campaigns_org_id on crm.campaigns(org_id);

create index idx_crm_cases_org_id on crm.cases(org_id);

create index idx_crm_products_org_id on crm.products(org_id);

create index idx_crm_invoices_org_id on crm.invoices(org_id);

create index idx_crm_notifications_org_id on crm.notifications(org_id);

-- LMS schema indexes
create index idx_lms_addresses_org_id on lms.addresses(org_id);

create index idx_lms_shipping_services_org_id on lms.shipping_services(org_id);

create index idx_lms_pricing_zones_org_id on lms.pricing_zones(org_id);

create index idx_lms_pricing_rates_org_id on lms.pricing_rates(org_id);

create index idx_lms_shipments_org_id on lms.shipments(org_id);

create index idx_lms_tracking_events_org_id on lms.tracking_events(org_id);

create index idx_lms_warehouses_org_id on lms.warehouses(org_id);

create index idx_lms_transportation_providers_org_id on lms.transportation_providers(org_id);

create index idx_lms_provider_rates_org_id on lms.provider_rates(org_id);

create index idx_lms_routes_org_id on lms.routes(org_id);

-- TMS schema indexes
create index idx_tms_drivers_org_id on tms.drivers(org_id);

create index idx_tms_vehicles_org_id on tms.vehicles(org_id);

-- ========================================
-- COMMENTS ON NEW COLUMNS
-- ========================================
-- CRM schema comments
comment on column crm.companies.org_id is 'FK to org.organization(id) - organization that owns this company record.';

comment on column crm.contacts.org_id is 'FK to org.organization(id) - organization that owns this contact record.';

comment on column crm.leads.org_id is 'FK to org.organization(id) - organization that owns this lead record.';

comment on column crm.opportunities.org_id is 'FK to org.organization(id) - organization that owns this opportunity.';

comment on column crm.interactions.org_id is 'FK to org.organization(id) - organization that owns this interaction record.';

comment on column crm.campaigns.org_id is 'FK to org.organization(id) - organization that owns this campaign.';

comment on column crm.cases.org_id is 'FK to org.organization(id) - organization that owns this support case.';

comment on column crm.products.org_id is 'FK to org.organization(id) - organization that owns this product.';

comment on column crm.invoices.org_id is 'FK to org.organization(id) - organization that owns this invoice.';

comment on column crm.notifications.org_id is 'FK to org.organization(id) - organization that owns this notification.';

-- LMS schema comments
comment on column lms.addresses.org_id is 'FK to org.organization(id) - organization that owns this address record.';

comment on column lms.shipping_services.org_id is 'FK to org.organization(id) - organization that owns this shipping service.';

comment on column lms.pricing_zones.org_id is 'FK to org.organization(id) - organization that owns this pricing zone.';

comment on column lms.pricing_rates.org_id is 'FK to org.organization(id) - organization that owns this pricing rate.';

comment on column lms.shipments.org_id is 'FK to org.organization(id) - organization that owns this shipment.';

comment on column lms.tracking_events.org_id is 'FK to org.organization(id) - organization that owns this tracking event.';

comment on column lms.warehouses.org_id is 'FK to org.organization(id) - organization that owns this warehouse.';

comment on column lms.transportation_providers.org_id is 'FK to org.organization(id) - organization that owns this provider relationship.';

comment on column lms.provider_rates.org_id is 'FK to org.organization(id) - organization that owns this provider rate.';

comment on column lms.routes.org_id is 'FK to org.organization(id) - organization that owns this route.';

-- TMS schema comments
comment on column tms.drivers.org_id is 'FK to org.organization(id) - organization that employs this driver.';

comment on column tms.vehicles.org_id is 'FK to org.organization(id) - organization that owns this vehicle.';

