-- Add up migration script here
-- Enable Row Level Security (RLS) for LMS Schema
-- Policies apply to public role (all users) for comprehensive security
-- All LMS data is organization-scoped using org_id columns
-- ========================================
-- ENABLE RLS ON LMS TABLES
-- ========================================
-- Core logistics tables
alter table lms.addresses enable row level security;

alter table lms.shipping_services enable row level security;

alter table lms.shipping_service_max_dimensions enable row level security;

-- Pricing tables
alter table lms.pricing_zones enable row level security;

alter table lms.pricing_zone_countries enable row level security;

alter table lms.pricing_rates enable row level security;

-- Shipment tables
alter table lms.shipments enable row level security;

alter table lms.packages enable row level security;

alter table lms.tracking_events enable row level security;

-- Warehouse tables
alter table lms.warehouses enable row level security;

alter table lms.warehouse_inventories enable row level security;

-- Provider tables
alter table lms.transportation_providers enable row level security;

alter table lms.provider_services enable row level security;

alter table lms.provider_service_origin_countries enable row level security;

alter table lms.provider_service_destination_countries enable row level security;

alter table lms.provider_service_max_dimensions enable row level security;

alter table lms.provider_rates enable row level security;

-- Route tables
alter table lms.routes enable row level security;

alter table lms.route_shipments enable row level security;

-- ========================================
-- LMS.ADDRESSES POLICIES
-- ========================================
-- Users can see addresses in organizations they have access to
create policy addresses_org_access on lms.addresses
  for select to public
    using (org_id in (
      select
        org_id
      from
        org.current_user_organizations()));

-- Users with 'update' permission can modify addresses
create policy addresses_update on lms.addresses
  for update to public
    using (org.current_user_has_permission(org_id, 'update'::org.permission_actions))
    with check (org.current_user_has_permission(org_id, 'update'::org.permission_actions));

-- Users with 'update' permission can create addresses
create policy addresses_insert on lms.addresses
  for insert to public
    with check (org.current_user_has_permission(org_id, 'update'::org.permission_actions));

-- Users with 'delete' permission can delete addresses
create policy addresses_delete on lms.addresses
  for delete to public
    using (org.current_user_has_permission(org_id, 'delete'::org.permission_actions));

-- ========================================
-- LMS.SHIPPING_SERVICES POLICIES
-- ========================================
create policy shipping_services_org_access on lms.shipping_services
  for select to public
    using (org_id in (
      select
        org_id
      from
        org.current_user_organizations()));

create policy shipping_services_update on lms.shipping_services
  for update to public
    using (org.current_user_has_permission(org_id, 'update'::org.permission_actions))
    with check (org.current_user_has_permission(org_id, 'update'::org.permission_actions));

create policy shipping_services_insert on lms.shipping_services
  for insert to public
    with check (org.current_user_has_permission(org_id, 'update'::org.permission_actions));

create policy shipping_services_delete on lms.shipping_services
  for delete to public
    using (org.current_user_has_permission(org_id, 'delete'::org.permission_actions));

-- ========================================
-- LMS.SHIPPING_SERVICE_MAX_DIMENSIONS POLICIES
-- ========================================
-- Inherit access through shipping service
create policy shipping_service_max_dimensions_access on lms.shipping_service_max_dimensions
  for select to public
    using (exists (
      select
        1
      from
        lms.shipping_services ss
      where
        ss.id = shipping_service_id and ss.org_id in (
          select
            org_id
          from
            org.current_user_organizations())));

create policy shipping_service_max_dimensions_update on lms.shipping_service_max_dimensions
  for update to public
    using (exists (
      select
        1
      from
        lms.shipping_services ss
      where
        ss.id = shipping_service_id and org.current_user_has_permission(ss.org_id, 'update'::org.permission_actions)))
      with check (exists (
        select
          1
        from
          lms.shipping_services ss
        where
          ss.id = shipping_service_id and org.current_user_has_permission(ss.org_id, 'update'::org.permission_actions)));

create policy shipping_service_max_dimensions_insert on lms.shipping_service_max_dimensions
  for insert to public
    with check (exists (
      select
        1
      from
        lms.shipping_services ss
      where
        ss.id = shipping_service_id and org.current_user_has_permission(ss.org_id, 'update'::org.permission_actions)));

create policy shipping_service_max_dimensions_delete on lms.shipping_service_max_dimensions
  for delete to public
    using (exists (
      select
        1
      from
        lms.shipping_services ss
      where
        ss.id = shipping_service_id and org.current_user_has_permission(ss.org_id, 'delete'::org.permission_actions)));

-- ========================================
-- LMS.PRICING_ZONES POLICIES
-- ========================================
create policy pricing_zones_org_access on lms.pricing_zones
  for select to public
    using (org_id in (
      select
        org_id
      from
        org.current_user_organizations()));

create policy pricing_zones_update on lms.pricing_zones
  for update to public
    using (org.current_user_has_permission(org_id, 'update'::org.permission_actions))
    with check (org.current_user_has_permission(org_id, 'update'::org.permission_actions));

create policy pricing_zones_insert on lms.pricing_zones
  for insert to public
    with check (org.current_user_has_permission(org_id, 'update'::org.permission_actions));

create policy pricing_zones_delete on lms.pricing_zones
  for delete to public
    using (org.current_user_has_permission(org_id, 'delete'::org.permission_actions));

-- ========================================
-- LMS.PRICING_ZONE_COUNTRIES POLICIES
-- ========================================
-- Inherit access through pricing zone
create policy pricing_zone_countries_access on lms.pricing_zone_countries
  for select to public
    using (exists (
      select
        1
      from
        lms.pricing_zones pz
      where
        pz.id = pricing_zone_id and pz.org_id in (
          select
            org_id
          from
            org.current_user_organizations())));

create policy pricing_zone_countries_update on lms.pricing_zone_countries
  for update to public
    using (exists (
      select
        1
      from
        lms.pricing_zones pz
      where
        pz.id = pricing_zone_id and org.current_user_has_permission(pz.org_id, 'update'::org.permission_actions)))
      with check (exists (
        select
          1
        from
          lms.pricing_zones pz
        where
          pz.id = pricing_zone_id and org.current_user_has_permission(pz.org_id, 'update'::org.permission_actions)));

create policy pricing_zone_countries_insert on lms.pricing_zone_countries
  for insert to public
    with check (exists (
      select
        1
      from
        lms.pricing_zones pz
      where
        pz.id = pricing_zone_id and org.current_user_has_permission(pz.org_id, 'update'::org.permission_actions)));

create policy pricing_zone_countries_delete on lms.pricing_zone_countries
  for delete to public
    using (exists (
      select
        1
      from
        lms.pricing_zones pz
      where
        pz.id = pricing_zone_id and org.current_user_has_permission(pz.org_id, 'delete'::org.permission_actions)));

-- ========================================
-- LMS.PRICING_RATES POLICIES
-- ========================================
create policy pricing_rates_org_access on lms.pricing_rates
  for select to public
    using (org_id in (
      select
        org_id
      from
        org.current_user_organizations()));

create policy pricing_rates_update on lms.pricing_rates
  for update to public
    using (org.current_user_has_permission(org_id, 'update'::org.permission_actions))
    with check (org.current_user_has_permission(org_id, 'update'::org.permission_actions));

create policy pricing_rates_insert on lms.pricing_rates
  for insert to public
    with check (org.current_user_has_permission(org_id, 'update'::org.permission_actions));

create policy pricing_rates_delete on lms.pricing_rates
  for delete to public
    using (org.current_user_has_permission(org_id, 'delete'::org.permission_actions));

-- ========================================
-- LMS.SHIPMENTS POLICIES
-- ========================================
create policy shipments_org_access on lms.shipments
  for select to public
    using (org_id in (
      select
        org_id
      from
        org.current_user_organizations()));

create policy shipments_update on lms.shipments
  for update to public
    using (org.current_user_has_permission(org_id, 'update'::org.permission_actions))
    with check (org.current_user_has_permission(org_id, 'update'::org.permission_actions));

create policy shipments_insert on lms.shipments
  for insert to public
    with check (org.current_user_has_permission(org_id, 'update'::org.permission_actions));

create policy shipments_delete on lms.shipments
  for delete to public
    using (org.current_user_has_permission(org_id, 'delete'::org.permission_actions));

-- ========================================
-- LMS.PACKAGES POLICIES
-- ========================================
-- Inherit access through shipment
create policy packages_access on lms.packages
  for select to public
    using (exists (
      select
        1
      from
        lms.shipments s
      where
        s.id = shipment_id and s.org_id in (
          select
            org_id
          from
            org.current_user_organizations())));

create policy packages_update on lms.packages
  for update to public
    using (exists (
      select
        1
      from
        lms.shipments s
      where
        s.id = shipment_id and org.current_user_has_permission(s.org_id, 'update'::org.permission_actions)))
      with check (exists (
        select
          1
        from
          lms.shipments s
        where
          s.id = shipment_id and org.current_user_has_permission(s.org_id, 'update'::org.permission_actions)));

create policy packages_insert on lms.packages
  for insert to public
    with check (exists (
      select
        1
      from
        lms.shipments s
      where
        s.id = shipment_id and org.current_user_has_permission(s.org_id, 'update'::org.permission_actions)));

create policy packages_delete on lms.packages
  for delete to public
    using (exists (
      select
        1
      from
        lms.shipments s
      where
        s.id = shipment_id and org.current_user_has_permission(s.org_id, 'delete'::org.permission_actions)));

-- ========================================
-- LMS.TRACKING_EVENTS POLICIES
-- ========================================
create policy tracking_events_org_access on lms.tracking_events
  for select to public
    using (org_id in (
      select
        org_id
      from
        org.current_user_organizations()));

create policy tracking_events_update on lms.tracking_events
  for update to public
    using (org.current_user_has_permission(org_id, 'update'::org.permission_actions))
    with check (org.current_user_has_permission(org_id, 'update'::org.permission_actions));

create policy tracking_events_insert on lms.tracking_events
  for insert to public
    with check (org.current_user_has_permission(org_id, 'update'::org.permission_actions));

create policy tracking_events_delete on lms.tracking_events
  for delete to public
    using (org.current_user_has_permission(org_id, 'delete'::org.permission_actions));

-- ========================================
-- LMS.WAREHOUSES POLICIES
-- ========================================
create policy warehouses_org_access on lms.warehouses
  for select to public
    using (org_id in (
      select
        org_id
      from
        org.current_user_organizations()));

create policy warehouses_update on lms.warehouses
  for update to public
    using (org.current_user_has_permission(org_id, 'update'::org.permission_actions))
    with check (org.current_user_has_permission(org_id, 'update'::org.permission_actions));

create policy warehouses_insert on lms.warehouses
  for insert to public
    with check (org.current_user_has_permission(org_id, 'update'::org.permission_actions));

create policy warehouses_delete on lms.warehouses
  for delete to public
    using (org.current_user_has_permission(org_id, 'delete'::org.permission_actions));

-- ========================================
-- LMS.WAREHOUSE_INVENTORIES POLICIES
-- ========================================
-- Inherit access through warehouse
create policy warehouse_inventories_access on lms.warehouse_inventories
  for select to public
    using (exists (
      select
        1
      from
        lms.warehouses w
      where
        w.id = warehouse_id and w.org_id in (
          select
            org_id
          from
            org.current_user_organizations())));

create policy warehouse_inventories_update on lms.warehouse_inventories
  for update to public
    using (exists (
      select
        1
      from
        lms.warehouses w
      where
        w.id = warehouse_id and org.current_user_has_permission(w.org_id, 'update'::org.permission_actions)))
      with check (exists (
        select
          1
        from
          lms.warehouses w
        where
          w.id = warehouse_id and org.current_user_has_permission(w.org_id, 'update'::org.permission_actions)));

create policy warehouse_inventories_insert on lms.warehouse_inventories
  for insert to public
    with check (exists (
      select
        1
      from
        lms.warehouses w
      where
        w.id = warehouse_id and org.current_user_has_permission(w.org_id, 'update'::org.permission_actions)));

create policy warehouse_inventories_delete on lms.warehouse_inventories
  for delete to public
    using (exists (
      select
        1
      from
        lms.warehouses w
      where
        w.id = warehouse_id and org.current_user_has_permission(w.org_id, 'delete'::org.permission_actions)));

-- ========================================
-- LMS.TRANSPORTATION_PROVIDERS POLICIES
-- ========================================
create policy transportation_providers_org_access on lms.transportation_providers
  for select to public
    using (org_id in (
      select
        org_id
      from
        org.current_user_organizations()));

create policy transportation_providers_update on lms.transportation_providers
  for update to public
    using (org.current_user_has_permission(org_id, 'update'::org.permission_actions))
    with check (org.current_user_has_permission(org_id, 'update'::org.permission_actions));

create policy transportation_providers_insert on lms.transportation_providers
  for insert to public
    with check (org.current_user_has_permission(org_id, 'update'::org.permission_actions));

create policy transportation_providers_delete on lms.transportation_providers
  for delete to public
    using (org.current_user_has_permission(org_id, 'delete'::org.permission_actions));

-- ========================================
-- LMS.PROVIDER_SERVICES POLICIES
-- ========================================
-- Inherit access through provider
create policy provider_services_access on lms.provider_services
  for select to public
    using (exists (
      select
        1
      from
        lms.transportation_providers tp
      where
        tp.id = provider_id and tp.org_id in (
          select
            org_id
          from
            org.current_user_organizations())));

create policy provider_services_update on lms.provider_services
  for update to public
    using (exists (
      select
        1
      from
        lms.transportation_providers tp
      where
        tp.id = provider_id and org.current_user_has_permission(tp.org_id, 'update'::org.permission_actions)))
      with check (exists (
        select
          1
        from
          lms.transportation_providers tp
        where
          tp.id = provider_id and org.current_user_has_permission(tp.org_id, 'update'::org.permission_actions)));

create policy provider_services_insert on lms.provider_services
  for insert to public
    with check (exists (
      select
        1
      from
        lms.transportation_providers tp
      where
        tp.id = provider_id and org.current_user_has_permission(tp.org_id, 'update'::org.permission_actions)));

create policy provider_services_delete on lms.provider_services
  for delete to public
    using (exists (
      select
        1
      from
        lms.transportation_providers tp
      where
        tp.id = provider_id and org.current_user_has_permission(tp.org_id, 'delete'::org.permission_actions)));

-- ========================================
-- LMS.PROVIDER_SERVICE_ORIGIN_COUNTRIES POLICIES
-- ========================================
-- Inherit access through provider service
create policy provider_service_origin_countries_access on lms.provider_service_origin_countries
  for select to public
    using (exists (
      select
        1
      from
        lms.provider_services ps
        inner join lms.transportation_providers tp on tp.id = ps.provider_id
      where
        ps.id = provider_service_id and tp.org_id in (
          select
            org_id
          from
            org.current_user_organizations())));

create policy provider_service_origin_countries_update on lms.provider_service_origin_countries
  for update to public
    using (exists (
      select
        1
      from
        lms.provider_services ps
        inner join lms.transportation_providers tp on tp.id = ps.provider_id
      where
        ps.id = provider_service_id and org.current_user_has_permission(tp.org_id, 'update'::org.permission_actions)))
      with check (exists (
        select
          1
        from
          lms.provider_services ps
          inner join lms.transportation_providers tp on tp.id = ps.provider_id
        where
          ps.id = provider_service_id and org.current_user_has_permission(tp.org_id, 'update'::org.permission_actions)));

create policy provider_service_origin_countries_insert on lms.provider_service_origin_countries
  for insert to public
    with check (exists (
      select
        1
      from
        lms.provider_services ps
        inner join lms.transportation_providers tp on tp.id = ps.provider_id
      where
        ps.id = provider_service_id and org.current_user_has_permission(tp.org_id, 'update'::org.permission_actions)));

create policy provider_service_origin_countries_delete on lms.provider_service_origin_countries
  for delete to public
    using (exists (
      select
        1
      from
        lms.provider_services ps
        inner join lms.transportation_providers tp on tp.id = ps.provider_id
      where
        ps.id = provider_service_id and org.current_user_has_permission(tp.org_id, 'delete'::org.permission_actions)));

-- ========================================
-- LMS.PROVIDER_SERVICE_DESTINATION_COUNTRIES POLICIES
-- ========================================
-- Inherit access through provider service
create policy provider_service_destination_countries_access on lms.provider_service_destination_countries
  for select to public
    using (exists (
      select
        1
      from
        lms.provider_services ps
        inner join lms.transportation_providers tp on tp.id = ps.provider_id
      where
        ps.id = provider_service_id and tp.org_id in (
          select
            org_id
          from
            org.current_user_organizations())));

create policy provider_service_destination_countries_update on lms.provider_service_destination_countries
  for update to public
    using (exists (
      select
        1
      from
        lms.provider_services ps
        inner join lms.transportation_providers tp on tp.id = ps.provider_id
      where
        ps.id = provider_service_id and org.current_user_has_permission(tp.org_id, 'update'::org.permission_actions)))
      with check (exists (
        select
          1
        from
          lms.provider_services ps
          inner join lms.transportation_providers tp on tp.id = ps.provider_id
        where
          ps.id = provider_service_id and org.current_user_has_permission(tp.org_id, 'update'::org.permission_actions)));

create policy provider_service_destination_countries_insert on lms.provider_service_destination_countries
  for insert to public
    with check (exists (
      select
        1
      from
        lms.provider_services ps
        inner join lms.transportation_providers tp on tp.id = ps.provider_id
      where
        ps.id = provider_service_id and org.current_user_has_permission(tp.org_id, 'update'::org.permission_actions)));

create policy provider_service_destination_countries_delete on lms.provider_service_destination_countries
  for delete to public
    using (exists (
      select
        1
      from
        lms.provider_services ps
        inner join lms.transportation_providers tp on tp.id = ps.provider_id
      where
        ps.id = provider_service_id and org.current_user_has_permission(tp.org_id, 'delete'::org.permission_actions)));

-- ========================================
-- LMS.PROVIDER_SERVICE_MAX_DIMENSIONS POLICIES
-- ========================================
-- Inherit access through provider service
create policy provider_service_max_dimensions_access on lms.provider_service_max_dimensions
  for select to public
    using (exists (
      select
        1
      from
        lms.provider_services ps
        inner join lms.transportation_providers tp on tp.id = ps.provider_id
      where
        ps.id = provider_service_id and tp.org_id in (
          select
            org_id
          from
            org.current_user_organizations())));

create policy provider_service_max_dimensions_update on lms.provider_service_max_dimensions
  for update to public
    using (exists (
      select
        1
      from
        lms.provider_services ps
        inner join lms.transportation_providers tp on tp.id = ps.provider_id
      where
        ps.id = provider_service_id and org.current_user_has_permission(tp.org_id, 'update'::org.permission_actions)))
      with check (exists (
        select
          1
        from
          lms.provider_services ps
          inner join lms.transportation_providers tp on tp.id = ps.provider_id
        where
          ps.id = provider_service_id and org.current_user_has_permission(tp.org_id, 'update'::org.permission_actions)));

create policy provider_service_max_dimensions_insert on lms.provider_service_max_dimensions
  for insert to public
    with check (exists (
      select
        1
      from
        lms.provider_services ps
        inner join lms.transportation_providers tp on tp.id = ps.provider_id
      where
        ps.id = provider_service_id and org.current_user_has_permission(tp.org_id, 'update'::org.permission_actions)));

create policy provider_service_max_dimensions_delete on lms.provider_service_max_dimensions
  for delete to public
    using (exists (
      select
        1
      from
        lms.provider_services ps
        inner join lms.transportation_providers tp on tp.id = ps.provider_id
      where
        ps.id = provider_service_id and org.current_user_has_permission(tp.org_id, 'delete'::org.permission_actions)));

-- ========================================
-- LMS.PROVIDER_RATES POLICIES
-- ========================================
create policy provider_rates_org_access on lms.provider_rates
  for select to public
    using (org_id in (
      select
        org_id
      from
        org.current_user_organizations()));

create policy provider_rates_update on lms.provider_rates
  for update to public
    using (org.current_user_has_permission(org_id, 'update'::org.permission_actions))
    with check (org.current_user_has_permission(org_id, 'update'::org.permission_actions));

create policy provider_rates_insert on lms.provider_rates
  for insert to public
    with check (org.current_user_has_permission(org_id, 'update'::org.permission_actions));

create policy provider_rates_delete on lms.provider_rates
  for delete to public
    using (org.current_user_has_permission(org_id, 'delete'::org.permission_actions));

-- ========================================
-- LMS.ROUTES POLICIES
-- ========================================
create policy routes_org_access on lms.routes
  for select to public
    using (org_id in (
      select
        org_id
      from
        org.current_user_organizations()));

create policy routes_update on lms.routes
  for update to public
    using (org.current_user_has_permission(org_id, 'update'::org.permission_actions))
    with check (org.current_user_has_permission(org_id, 'update'::org.permission_actions));

create policy routes_insert on lms.routes
  for insert to public
    with check (org.current_user_has_permission(org_id, 'update'::org.permission_actions));

create policy routes_delete on lms.routes
  for delete to public
    using (org.current_user_has_permission(org_id, 'delete'::org.permission_actions));

-- ========================================
-- LMS.ROUTE_SHIPMENTS POLICIES
-- ========================================
-- Inherit access through route
create policy route_shipments_access on lms.route_shipments
  for select to public
    using (exists (
      select
        1
      from
        lms.routes r
      where
        r.id = route_id and r.org_id in (
          select
            org_id
          from
            org.current_user_organizations())));

create policy route_shipments_update on lms.route_shipments
  for update to public
    using (exists (
      select
        1
      from
        lms.routes r
      where
        r.id = route_id and org.current_user_has_permission(r.org_id, 'update'::org.permission_actions)))
      with check (exists (
        select
          1
        from
          lms.routes r
        where
          r.id = route_id and org.current_user_has_permission(r.org_id, 'update'::org.permission_actions)));

create policy route_shipments_insert on lms.route_shipments
  for insert to public
    with check (exists (
      select
        1
      from
        lms.routes r
      where
        r.id = route_id and org.current_user_has_permission(r.org_id, 'update'::org.permission_actions)));

create policy route_shipments_delete on lms.route_shipments
  for delete to public
    using (exists (
      select
        1
      from
        lms.routes r
      where
        r.id = route_id and org.current_user_has_permission(r.org_id, 'delete'::org.permission_actions)));

-- ========================================
-- COMMENTS ON POLICIES
-- ========================================
comment on policy addresses_org_access on lms.addresses is 'Users can view addresses in organizations they have access to.';

comment on policy shipments_org_access on lms.shipments is 'Users can view shipments in organizations they have access to.';

comment on policy warehouses_org_access on lms.warehouses is 'Users can view warehouses in organizations they have access to.';

comment on policy routes_org_access on lms.routes is 'Users can view routes in organizations they have access to.';

-- Note: Additional comments would be added for all policies, but keeping concise for migration size
