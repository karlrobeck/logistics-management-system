-- Add down migration script here
-- Disable Row Level Security (RLS) for LMS Schema
-- Removes all RLS policies and disables RLS enforcement

-- ========================================
-- DROP ALL LMS POLICIES
-- ========================================

-- LMS.ADDRESSES
drop policy if exists addresses_org_access on lms.addresses;
drop policy if exists addresses_update on lms.addresses;
drop policy if exists addresses_insert on lms.addresses;
drop policy if exists addresses_delete on lms.addresses;

-- LMS.SHIPPING_SERVICES
drop policy if exists shipping_services_org_access on lms.shipping_services;
drop policy if exists shipping_services_update on lms.shipping_services;
drop policy if exists shipping_services_insert on lms.shipping_services;
drop policy if exists shipping_services_delete on lms.shipping_services;

-- LMS.SHIPPING_SERVICE_MAX_DIMENSIONS
drop policy if exists shipping_service_max_dimensions_access on lms.shipping_service_max_dimensions;
drop policy if exists shipping_service_max_dimensions_update on lms.shipping_service_max_dimensions;
drop policy if exists shipping_service_max_dimensions_insert on lms.shipping_service_max_dimensions;
drop policy if exists shipping_service_max_dimensions_delete on lms.shipping_service_max_dimensions;

-- LMS.PRICING_ZONES
drop policy if exists pricing_zones_org_access on lms.pricing_zones;
drop policy if exists pricing_zones_update on lms.pricing_zones;
drop policy if exists pricing_zones_insert on lms.pricing_zones;
drop policy if exists pricing_zones_delete on lms.pricing_zones;

-- LMS.PRICING_ZONE_COUNTRIES
drop policy if exists pricing_zone_countries_access on lms.pricing_zone_countries;
drop policy if exists pricing_zone_countries_update on lms.pricing_zone_countries;
drop policy if exists pricing_zone_countries_insert on lms.pricing_zone_countries;
drop policy if exists pricing_zone_countries_delete on lms.pricing_zone_countries;

-- LMS.PRICING_RATES
drop policy if exists pricing_rates_org_access on lms.pricing_rates;
drop policy if exists pricing_rates_update on lms.pricing_rates;
drop policy if exists pricing_rates_insert on lms.pricing_rates;
drop policy if exists pricing_rates_delete on lms.pricing_rates;

-- LMS.SHIPMENTS
drop policy if exists shipments_org_access on lms.shipments;
drop policy if exists shipments_update on lms.shipments;
drop policy if exists shipments_insert on lms.shipments;
drop policy if exists shipments_delete on lms.shipments;

-- LMS.PACKAGES
drop policy if exists packages_access on lms.packages;
drop policy if exists packages_update on lms.packages;
drop policy if exists packages_insert on lms.packages;
drop policy if exists packages_delete on lms.packages;

-- LMS.TRACKING_EVENTS
drop policy if exists tracking_events_org_access on lms.tracking_events;
drop policy if exists tracking_events_update on lms.tracking_events;
drop policy if exists tracking_events_insert on lms.tracking_events;
drop policy if exists tracking_events_delete on lms.tracking_events;

-- LMS.WAREHOUSES
drop policy if exists warehouses_org_access on lms.warehouses;
drop policy if exists warehouses_update on lms.warehouses;
drop policy if exists warehouses_insert on lms.warehouses;
drop policy if exists warehouses_delete on lms.warehouses;

-- LMS.WAREHOUSE_INVENTORIES
drop policy if exists warehouse_inventories_access on lms.warehouse_inventories;
drop policy if exists warehouse_inventories_update on lms.warehouse_inventories;
drop policy if exists warehouse_inventories_insert on lms.warehouse_inventories;
drop policy if exists warehouse_inventories_delete on lms.warehouse_inventories;

-- LMS.TRANSPORTATION_PROVIDERS
drop policy if exists transportation_providers_org_access on lms.transportation_providers;
drop policy if exists transportation_providers_update on lms.transportation_providers;
drop policy if exists transportation_providers_insert on lms.transportation_providers;
drop policy if exists transportation_providers_delete on lms.transportation_providers;

-- LMS.PROVIDER_SERVICES
drop policy if exists provider_services_access on lms.provider_services;
drop policy if exists provider_services_update on lms.provider_services;
drop policy if exists provider_services_insert on lms.provider_services;
drop policy if exists provider_services_delete on lms.provider_services;

-- LMS.PROVIDER_SERVICE_ORIGIN_COUNTRIES
drop policy if exists provider_service_origin_countries_access on lms.provider_service_origin_countries;
drop policy if exists provider_service_origin_countries_update on lms.provider_service_origin_countries;
drop policy if exists provider_service_origin_countries_insert on lms.provider_service_origin_countries;
drop policy if exists provider_service_origin_countries_delete on lms.provider_service_origin_countries;

-- LMS.PROVIDER_SERVICE_DESTINATION_COUNTRIES
drop policy if exists provider_service_destination_countries_access on lms.provider_service_destination_countries;
drop policy if exists provider_service_destination_countries_update on lms.provider_service_destination_countries;
drop policy if exists provider_service_destination_countries_insert on lms.provider_service_destination_countries;
drop policy if exists provider_service_destination_countries_delete on lms.provider_service_destination_countries;

-- LMS.PROVIDER_SERVICE_MAX_DIMENSIONS
drop policy if exists provider_service_max_dimensions_access on lms.provider_service_max_dimensions;
drop policy if exists provider_service_max_dimensions_update on lms.provider_service_max_dimensions;
drop policy if exists provider_service_max_dimensions_insert on lms.provider_service_max_dimensions;
drop policy if exists provider_service_max_dimensions_delete on lms.provider_service_max_dimensions;

-- LMS.PROVIDER_RATES
drop policy if exists provider_rates_org_access on lms.provider_rates;
drop policy if exists provider_rates_update on lms.provider_rates;
drop policy if exists provider_rates_insert on lms.provider_rates;
drop policy if exists provider_rates_delete on lms.provider_rates;

-- LMS.ROUTES
drop policy if exists routes_org_access on lms.routes;
drop policy if exists routes_update on lms.routes;
drop policy if exists routes_insert on lms.routes;
drop policy if exists routes_delete on lms.routes;

-- LMS.ROUTE_SHIPMENTS
drop policy if exists route_shipments_access on lms.route_shipments;
drop policy if exists route_shipments_update on lms.route_shipments;
drop policy if exists route_shipments_insert on lms.route_shipments;
drop policy if exists route_shipments_delete on lms.route_shipments;

-- ========================================
-- DISABLE RLS ON ALL LMS TABLES
-- ========================================

-- Core logistics tables
alter table lms.addresses disable row level security;
alter table lms.shipping_services disable row level security;
alter table lms.shipping_service_max_dimensions disable row level security;

-- Pricing tables
alter table lms.pricing_zones disable row level security;
alter table lms.pricing_zone_countries disable row level security;
alter table lms.pricing_rates disable row level security;

-- Shipment tables
alter table lms.shipments disable row level security;
alter table lms.packages disable row level security;
alter table lms.tracking_events disable row level security;

-- Warehouse tables
alter table lms.warehouses disable row level security;
alter table lms.warehouse_inventories disable row level security;

-- Provider tables
alter table lms.transportation_providers disable row level security;
alter table lms.provider_services disable row level security;
alter table lms.provider_service_origin_countries disable row level security;
alter table lms.provider_service_destination_countries disable row level security;
alter table lms.provider_service_max_dimensions disable row level security;
alter table lms.provider_rates disable row level security;

-- Route tables
alter table lms.routes disable row level security;
alter table lms.route_shipments disable row level security;
