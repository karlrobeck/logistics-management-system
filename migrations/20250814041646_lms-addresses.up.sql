-- Add up migration script here
create schema lms;

create type lms.address_type as enum(
  'shipping',
  'billing',
  'warehouse',
  'office'
);

create table lms.addresses(
  id uuid not null primary key default gen_random_uuid(),
  address_line1 varchar(255) not null,
  address_line2 varchar(255),
  city varchar(100) not null,
  state varchar(100) not null,
  postal_code varchar(20) not null,
  country varchar(3) not null,
  address_type lms.address_type not null,
  is_validated boolean not null default false,
  latitude decimal(10, 8),
  longitude decimal(11, 8),
  created_at timestamp with time zone not null default now(),
  updated_at timestamp with time zone not null default now(),
  unique (latitude, longitude)
);

-- Schema and type documentation
comment on schema lms is 'Logistics Management System: addresses, shipments, pricing, providers, warehouses, routes, and tracking.';

comment on type lms.address_type is 'Classification of address usage (shipping, billing, warehouse, office).';

-- Table and column documentation: lms.addresses
comment on table lms.addresses is 'Postal/geo addresses used for senders, receivers, warehouses, and providers.';

comment on column lms.addresses.id is 'Primary key: UUID for the address record.';

comment on column lms.addresses.address_line1 is 'Address line 1 (street, building, house number).';

comment on column lms.addresses.address_line2 is 'Address line 2 (apartment, suite, unit). Optional.';

comment on column lms.addresses.city is 'City or locality.';

comment on column lms.addresses.state is 'State, province, or region.';

comment on column lms.addresses.postal_code is 'ZIP/postal code.';

comment on column lms.addresses.country is 'ISO 3166-1 alpha-3 (three-letter) country code.';

comment on column lms.addresses.address_type is 'Intended usage of the address.';

comment on column lms.addresses.is_validated is 'Whether the address has been validated/standardized.';

comment on column lms.addresses.latitude is 'Latitude in decimal degrees; part of unique pair (latitude, longitude) to prevent duplicate geocoded points.';

comment on column lms.addresses.longitude is 'Longitude in decimal degrees; part of unique pair (latitude, longitude) to prevent duplicate geocoded points.';

comment on column lms.addresses.created_at is 'Row creation timestamp (UTC).';

comment on column lms.addresses.updated_at is 'Row last-updated timestamp (UTC).';

-- Indexes for lms.addresses
create index idx_lms_addresses_city on lms.addresses(city);

create index idx_lms_addresses_state on lms.addresses(state);

create index idx_lms_addresses_postal_code on lms.addresses(postal_code);

create index idx_lms_addresses_country on lms.addresses(country);

create index idx_lms_addresses_address_type on lms.addresses(address_type);

create index idx_lms_addresses_is_validated on lms.addresses(is_validated);

create index idx_lms_addresses_created_at on lms.addresses(created_at);

-- LMS trigger functions
create or replace function lms.tg_set_updated_at()
  returns trigger
  language plpgsql
  as $$
begin
  new.updated_at := now();
  return new;
end;
$$;

create or replace function lms.tg_trim_address_fields()
  returns trigger
  language plpgsql
  as $$
begin
  if new.address_line1 is not null then
    new.address_line1 := btrim(new.address_line1);
  end if;
  if new.address_line2 is not null then
    new.address_line2 := btrim(new.address_line2);
  end if;
  if new.city is not null then
    new.city := btrim(new.city);
  end if;
  if new.state is not null then
    new.state := btrim(new.state);
  end if;
  if new.postal_code is not null then
    new.postal_code := btrim(new.postal_code);
  end if;
  if new.country is not null then
    new.country := upper(btrim(new.country));
  end if;
  return new;
end;
$$;

create or replace function lms.tg_require_lat_long_pair()
  returns trigger
  language plpgsql
  as $$
begin
  if(new.latitude is null and new.longitude is not null) or(new.latitude is not null and new.longitude is null) then
    raise exception 'latitude and longitude must both be null or both be non-null';
  end if;
  return new;
end;
$$;

create or replace function lms.tg_upper_country_code()
  returns trigger
  language plpgsql
  as $$
begin
  if new.country_code is not null then
    new.country_code := upper(btrim(new.country_code));
  end if;
  return new;
end;
$$;

create or replace function lms.tg_trim_service_fields()
  returns trigger
  language plpgsql
  as $$
begin
  if new.name is not null then
    new.name := btrim(new.name);
  end if;
  if new.description is not null then
    new.description := btrim(new.description);
  end if;
  return new;
end;
$$;

create or replace function lms.tg_shipping_services_validate_durations()
  returns trigger
  language plpgsql
  as $$
begin
  if new.delivery_time_min is not null and new.delivery_time_max is not null then
    if new.delivery_time_min > new.delivery_time_max then
      raise exception 'delivery_time_min must be <= delivery_time_max';
    end if;
  end if;
  return new;
end;
$$;

create or replace function lms.tg_trim_zone_fields()
  returns trigger
  language plpgsql
  as $$
begin
  if new.name is not null then
    new.name := btrim(new.name);
  end if;
  if new.zone_code is not null then
    new.zone_code := upper(btrim(new.zone_code));
  end if;
  return new;
end;
$$;

create or replace function lms.tg_pricing_rates_validate_dates()
  returns trigger
  language plpgsql
  as $$
begin
  if new.expiry_date is not null and new.expiry_date < new.effective_date then
    raise exception 'expiry_date must be >= effective_date';
  end if;
  return new;
end;
$$;

create or replace function lms.tg_shipments_normalize_fields()
  returns trigger
  language plpgsql
  as $$
begin
  if new.tracking_number is not null then
    new.tracking_number := upper(btrim(new.tracking_number));
  end if;
  if new.currency is not null then
    new.currency := upper(btrim(new.currency));
  end if;
  return new;
end;
$$;

create or replace function lms.tg_warehouses_trim_fields()
  returns trigger
  language plpgsql
  as $$
begin
  if new.name is not null then
    new.name := btrim(new.name);
  end if;
  if new.code is not null then
    new.code := upper(btrim(new.code));
  end if;
  return new;
end;
$$;

create or replace function lms.tg_warehouse_inventory_validate_timestamps()
  returns trigger
  language plpgsql
  as $$
begin
  if new.arrived_at is not null and new.departed_at is not null then
    if new.departed_at < new.arrived_at then
      raise exception 'departed_at must be >= arrived_at';
    end if;
  end if;
  return new;
end;
$$;

create or replace function lms.tg_providers_normalize_contact()
  returns trigger
  language plpgsql
  as $$
begin
  if new.company_name is not null then
    new.company_name := btrim(new.company_name);
  end if;
  if new.email is not null then
    new.email := lower(btrim(new.email));
  end if;
  return new;
end;
$$;

create or replace function lms.tg_provider_invoices_validate_dates()
  returns trigger
  language plpgsql
  as $$
begin
  if new.due_date is not null and new.invoice_date is not null and new.due_date < new.invoice_date then
    raise exception 'due_date must be >= invoice_date';
  end if;
  if new.currency is not null then
    new.currency := upper(btrim(new.currency));
  end if;
  return new;
end;
$$;

create or replace function lms.tg_upper_currency()
  returns trigger
  language plpgsql
  as $$
begin
  if new.currency is not null then
    new.currency := upper(btrim(new.currency));
  end if;
  return new;
end;
$$;

create or replace function lms.tg_transport_legs_validate_times()
  returns trigger
  language plpgsql
  as $$
begin
  if new.scheduled_pickup is not null and new.actual_pickup is not null and new.actual_pickup < new.scheduled_pickup then
    raise exception 'actual_pickup must be >= scheduled_pickup';
  end if;
  if new.scheduled_delivery is not null and new.actual_delivery is not null and new.actual_delivery < new.scheduled_delivery then
    raise exception 'actual_delivery must be >= scheduled_delivery';
  end if;
  if new.currency is not null then
    new.currency := upper(btrim(new.currency));
  end if;
  return new;
end;
$$;

create or replace function lms.tg_routes_trim_name()
  returns trigger
  language plpgsql
  as $$
begin
  if new.route_name is not null then
    new.route_name := btrim(new.route_name);
  end if;
  return new;
end;
$$;

-- Triggers for lms.addresses
create trigger addresses_set_updated_at
  before update on lms.addresses for each row
  execute function lms.tg_set_updated_at();

create trigger addresses_trim_fields
  before insert or update on lms.addresses for each row
  execute function lms.tg_trim_address_fields();

create trigger addresses_require_lat_long_pair
  before insert or update on lms.addresses for each row
  execute function lms.tg_require_lat_long_pair();

-- Comments on LMS trigger functions
comment on function lms.tg_set_updated_at() is 'BEFORE UPDATE: sets NEW.updated_at := now() across LMS tables.';

comment on function lms.tg_trim_address_fields() is 'BEFORE INSERT/UPDATE on lms.addresses: trims address fields and uppercases country.';

comment on function lms.tg_require_lat_long_pair() is 'BEFORE INSERT/UPDATE on lms.addresses: enforces latitude/longitude presence as a pair.';

comment on function lms.tg_upper_country_code() is 'BEFORE INSERT/UPDATE: upper(btrim(country_code)) for country mapping tables.';

comment on function lms.tg_trim_service_fields() is 'BEFORE INSERT/UPDATE: trims name/description for service-like tables.';

comment on function lms.tg_shipping_services_validate_durations() is 'BEFORE INSERT/UPDATE on lms.shipping_services: validates delivery_time_min <= delivery_time_max.';

comment on function lms.tg_trim_zone_fields() is 'BEFORE INSERT/UPDATE on lms.pricing_zones: trims name and uppercases zone_code.';

comment on function lms.tg_pricing_rates_validate_dates() is 'BEFORE INSERT/UPDATE on lms.pricing_rates: validates expiry_date >= effective_date when set.';

comment on function lms.tg_shipments_normalize_fields() is 'BEFORE INSERT/UPDATE on lms.shipments: trims/uppercases tracking_number and currency.';

comment on function lms.tg_warehouses_trim_fields() is 'BEFORE INSERT/UPDATE on lms.warehouses: trims name and uppercases code.';

comment on function lms.tg_warehouse_inventory_validate_timestamps() is 'BEFORE INSERT/UPDATE on lms.warehouse_inventories: validates departed_at >= arrived_at.';

comment on function lms.tg_providers_normalize_contact() is 'BEFORE INSERT/UPDATE on lms.transportation_providers: trims company_name and lower(btrim(email)).';

comment on function lms.tg_provider_invoices_validate_dates() is 'BEFORE INSERT/UPDATE on lms.provider_invoices: validates due_date >= invoice_date and uppercases currency.';

comment on function lms.tg_upper_currency() is 'BEFORE INSERT/UPDATE: upper(btrim(currency)) for tables with currency column.';

comment on function lms.tg_transport_legs_validate_times() is 'BEFORE INSERT/UPDATE on lms.transport_legs: validates actual times >= scheduled and uppercases currency.';

comment on function lms.tg_routes_trim_name() is 'BEFORE INSERT/UPDATE on lms.routes: trims route_name.';

-- Comments on lms.addresses triggers
comment on trigger addresses_set_updated_at on lms.addresses is 'Keeps addresses.updated_at current on updates.';

comment on trigger addresses_trim_fields on lms.addresses is 'Trims/normalizes address fields.';

comment on trigger addresses_require_lat_long_pair on lms.addresses is 'Ensures latitude/longitude are set together.';

-- Additional LMS trigger functions (shared across LMS tables)
create or replace function lms.tg_shipments_validate_dates()
  returns trigger
  language plpgsql
  as $$
begin
  if new.pickup_date is not null and new.delivery_date is not null and new.delivery_date < new.pickup_date then
    raise exception 'delivery_date must be >= pickup_date';
  end if;
  if new.pickup_date is not null and new.estimated_delivery_date is not null and new.estimated_delivery_date < new.pickup_date then
    raise exception 'estimated_delivery_date must be >= pickup_date';
  end if;
  return new;
end;
$$;

create or replace function lms.tg_packages_trim_and_validate()
  returns trigger
  language plpgsql
  as $$
begin
  if new.package_number is not null then
    new.package_number := btrim(new.package_number);
  end if;
  if new.length is not null and new.length <= 0 then
    raise exception 'length, when provided, must be > 0';
  end if;
  if new.width is not null and new.width <= 0 then
    raise exception 'width, when provided, must be > 0';
  end if;
  if new.height is not null and new.height <= 0 then
    raise exception 'height, when provided, must be > 0';
  end if;
  return new;
end;
$$;

create or replace function lms.tg_providers_validate_contract_dates()
  returns trigger
  language plpgsql
  as $$
begin
  if new.contract_start_date is not null and new.contract_end_date is not null and new.contract_end_date < new.contract_start_date then
    raise exception 'contract_end_date must be >= contract_start_date';
  end if;
  return new;
end;
$$;

create or replace function lms.tg_provider_services_trim_and_validate()
  returns trigger
  language plpgsql
  as $$
begin
  if new.service_name is not null then
    new.service_name := btrim(new.service_name);
  end if;
  if new.transit_time_min is not null and new.transit_time_max is not null and new.transit_time_min > new.transit_time_max then
    raise exception 'transit_time_min must be <= transit_time_max';
  end if;
  return new;
end;
$$;

create or replace function lms.tg_routes_validate_times()
  returns trigger
  language plpgsql
  as $$
begin
  if new.estimated_departure is not null and new.estimated_arrival is not null and new.estimated_arrival < new.estimated_departure then
    raise exception 'estimated_arrival must be >= estimated_departure';
  end if;
  if new.actual_departure is not null and new.actual_arrival is not null and new.actual_arrival < new.actual_departure then
    raise exception 'actual_arrival must be >= actual_departure';
  end if;
  return new;
end;
$$;

create or replace function lms.tg_route_shipments_trim_and_validate()
  returns trigger
  language plpgsql
  as $$
begin
  if new.recipient_signature is not null then
    new.recipient_signature := btrim(new.recipient_signature);
  end if;
  if new.estimated_delivery is not null and new.actual_delivery is not null and new.actual_delivery < new.estimated_delivery then
    raise exception 'actual_delivery must be >= estimated_delivery';
  end if;
  if new.delivery_status = 'delivered' and new.signature_required = true and(new.recipient_signature is null or length(btrim(new.recipient_signature)) = 0) then
    raise exception 'recipient_signature is required when delivery_status is delivered and signature_required is true';
  end if;
  return new;
end;
$$;

create or replace function lms.tg_tracking_events_trim()
  returns trigger
  language plpgsql
  as $$
begin
  if new.event_description is not null then
    new.event_description := btrim(new.event_description);
  end if;
  if new.event_location is not null then
    new.event_location := btrim(new.event_location);
  end if;
  return new;
end;
$$;

create or replace function lms.tg_transport_legs_validate_provider_service()
  returns trigger
  language plpgsql
  as $$
declare
  svc_provider uuid;
begin
  if new.provider_id is not null and new.provider_service_id is not null then
    select
      provider_id into svc_provider
    from
      lms.provider_services
    where
      id = new.provider_service_id;
    if svc_provider is null then
      raise exception 'provider_service_id % does not exist', new.provider_service_id;
    end if;
    if svc_provider <> new.provider_id then
      raise exception 'provider_service % does not belong to provider %', new.provider_service_id, new.provider_id;
    end if;
  end if;
  return new;
end;
$$;

-- Comments on additional functions
comment on function lms.tg_shipments_validate_dates() is 'BEFORE INSERT/UPDATE on lms.shipments: ensures delivery/estimated dates are not earlier than pickup_date.';

comment on function lms.tg_packages_trim_and_validate() is 'BEFORE INSERT/UPDATE on lms.packages: trims package_number and validates dimensions when provided > 0.';

comment on function lms.tg_providers_validate_contract_dates() is 'BEFORE INSERT/UPDATE on lms.transportation_providers: ensures contract_end_date >= contract_start_date.';

comment on function lms.tg_provider_services_trim_and_validate() is 'BEFORE INSERT/UPDATE on lms.provider_services: trims service_name and validates transit_time_min <= transit_time_max.';

comment on function lms.tg_routes_validate_times() is 'BEFORE INSERT/UPDATE on lms.routes: validates estimated/actual arrival not earlier than respective departures.';

comment on function lms.tg_route_shipments_trim_and_validate() is 'BEFORE INSERT/UPDATE on lms.route_shipments: trims recipient_signature, validates time ordering, and enforces signature when delivered.';

comment on function lms.tg_tracking_events_trim() is 'BEFORE INSERT/UPDATE on lms.tracking_events: trims event_description and event_location.';

comment on function lms.tg_transport_legs_validate_provider_service() is 'BEFORE INSERT/UPDATE on lms.transport_legs: verifies provider_service belongs to provider when both set.';

-- Data quality CHECK constraints for lms.addresses
alter table lms.addresses
  add constraint addresses_latitude_range check (latitude is null or (latitude >= -90 and latitude <= 90)),
  add constraint addresses_longitude_range check (longitude is null or (longitude >= -180 and longitude <= 180)),
  add constraint addresses_country_check check (country is null or (char_length(country) = 3 and country = upper(country)));

-- Helpful composite index for geo lookups
create index if not exists idx_lms_addresses_lat_lng on lms.addresses(latitude, longitude);

-- Integrity: ensure warehouse_inventories.package_id matches shipment_id
create or replace function lms.tg_wh_inventory_package_matches_shipment()
  returns trigger
  language plpgsql
  as $$
declare
  pkg_shipment uuid;
begin
  select
    shipment_id into pkg_shipment
  from
    lms.packages
  where
    id = new.package_id;
  if pkg_shipment is null then
    raise exception 'package % does not exist', new.package_id;
  end if;
  if new.shipment_id is distinct from pkg_shipment then
    raise exception 'package % belongs to shipment %, but row has shipment %', new.package_id, pkg_shipment, new.shipment_id;
  end if;
  return new;
end;
$$;

comment on function lms.tg_wh_inventory_package_matches_shipment() is 'BEFORE INSERT/UPDATE on lms.warehouse_inventories: enforces package.shipment_id = row.shipment_id.';

