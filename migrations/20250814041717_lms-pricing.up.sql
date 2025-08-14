-- Add up migration script here
create table lms.pricing_zones(
  id uuid not null primary key default gen_random_uuid(),
  name varchar(100) not null,
  zone_code varchar(10) not null unique,
  created_at timestamp with time zone not null default now(),
  updated_at timestamp with time zone not null default now()
);

create table lms.pricing_zone_countries(
  id uuid primary key default gen_random_uuid(),
  pricing_zone_id uuid not null references lms.pricing_zones(id) on delete cascade,
  country_code varchar(3) not null,
  created_at timestamp with time zone not null default now()
);

create table lms.pricing_rates(
  id uuid not null primary key default gen_random_uuid(),
  service_id uuid not null references lms.shipping_services(id),
  origin_zone_id uuid not null references lms.pricing_zones(id),
  destination_zone_id uuid not null references lms.pricing_zones(id),
  weight_min decimal(10, 2) not null,
  weight_max decimal(10, 2) not null,
  base_rate decimal(10, 2) not null,
  per_kg_rate decimal(10, 2) not null,
  fuel_surcharge_rate decimal(5, 2) default 0.00,
  effective_date date not null,
  expiry_date date,
  created_at timestamp with time zone not null default now(),
  updated_at timestamp with time zone not null default now(),
  unique (service_id, origin_zone_id, destination_zone_id),
  check (weight_max > weight_min),
  check (base_rate >= 0),
  check (per_kg_rate >= 0),
  check (fuel_surcharge_rate >= 0)
);

-- Table and column documentation: lms.pricing_zones
comment on table lms.pricing_zones is 'Geographic pricing zones for rating shipments.';

comment on column lms.pricing_zones.id is 'Primary key: UUID for the pricing zone.';

comment on column lms.pricing_zones.name is 'Human-readable name for the zone.';

comment on column lms.pricing_zones.zone_code is 'Short unique code for the zone.';

comment on column lms.pricing_zones.created_at is 'Row creation timestamp (UTC).';

comment on column lms.pricing_zones.updated_at is 'Row last-updated timestamp (UTC).';

-- Table and column documentation: lms.pricing_zone_countries
comment on table lms.pricing_zone_countries is 'Mapping of countries to pricing zones.';

comment on column lms.pricing_zone_countries.id is 'Primary key: UUID for the mapping row.';

comment on column lms.pricing_zone_countries.pricing_zone_id is 'FK to lms.pricing_zones(id).';

comment on column lms.pricing_zone_countries.country_code is 'ISO-3166-1 alpha-3 country code belonging to the zone.';

comment on column lms.pricing_zone_countries.created_at is 'Row creation timestamp (UTC).';

-- Table and column documentation: lms.pricing_rates
comment on table lms.pricing_rates is 'Rate matrix across service and origin/destination zones with weight brackets.';

comment on column lms.pricing_rates.id is 'Primary key: UUID for the rate row.';

comment on column lms.pricing_rates.service_id is 'FK to lms.shipping_services(id).';

comment on column lms.pricing_rates.origin_zone_id is 'FK to lms.pricing_zones(id) for origin.';

comment on column lms.pricing_rates.destination_zone_id is 'FK to lms.pricing_zones(id) for destination.';

comment on column lms.pricing_rates.weight_min is 'Minimum weight for the bracket (kg).';

comment on column lms.pricing_rates.weight_max is 'Maximum weight for the bracket (kg).';

comment on column lms.pricing_rates.base_rate is 'Base rate component.';

comment on column lms.pricing_rates.per_kg_rate is 'Per-kilogram rate component.';

comment on column lms.pricing_rates.fuel_surcharge_rate is 'Fuel surcharge percentage.';

comment on column lms.pricing_rates.effective_date is 'Date when this rate becomes effective.';

comment on column lms.pricing_rates.expiry_date is 'Date when this rate expires (optional).';

comment on column lms.pricing_rates.created_at is 'Row creation timestamp (UTC).';

comment on column lms.pricing_rates.updated_at is 'Row last-updated timestamp (UTC).';

-- Indexes for lms.pricing_zones
create index idx_lms_pricing_zones_name on lms.pricing_zones(name);

create index idx_lms_pricing_zones_created_at on lms.pricing_zones(created_at);

-- Indexes for lms.pricing_zone_countries
create index idx_lms_pzc_zone on lms.pricing_zone_countries(pricing_zone_id);

create index idx_lms_pzc_country on lms.pricing_zone_countries(country_code);

create index idx_lms_pzc_created_at on lms.pricing_zone_countries(created_at);

-- Country code check
alter table lms.pricing_zone_countries
  add constraint pzc_country_code_check check (char_length(country_code) = 3 and country_code = upper(country_code));

-- Indexes for lms.pricing_rates
create index idx_lms_pricing_rates_service on lms.pricing_rates(service_id);

create index idx_lms_pricing_rates_origin on lms.pricing_rates(origin_zone_id);

create index idx_lms_pricing_rates_destination on lms.pricing_rates(destination_zone_id);

create index idx_lms_pricing_rates_effective on lms.pricing_rates(effective_date);

create index idx_lms_pricing_rates_expiry on lms.pricing_rates(expiry_date);

create index idx_lms_pricing_rates_created_at on lms.pricing_rates(created_at);

-- Triggers for pricing tables
create trigger pricing_zones_set_updated_at
  before update on lms.pricing_zones for each row
  execute function lms.tg_set_updated_at();

create trigger pricing_zones_trim_fields
  before insert or update on lms.pricing_zones for each row
  execute function lms.tg_trim_zone_fields();

create trigger pricing_zone_countries_upper_country
  before insert or update on lms.pricing_zone_countries for each row
  execute function lms.tg_upper_country_code();

create trigger pricing_rates_set_updated_at
  before update on lms.pricing_rates for each row
  execute function lms.tg_set_updated_at();

create trigger pricing_rates_validate_dates
  before insert or update on lms.pricing_rates for each row
  execute function lms.tg_pricing_rates_validate_dates();

-- Comments
comment on trigger pricing_zones_set_updated_at on lms.pricing_zones is 'Keeps updated_at current.';

comment on trigger pricing_zones_trim_fields on lms.pricing_zones is 'Trims name and uppercases zone_code.';

comment on trigger pricing_zone_countries_upper_country on lms.pricing_zone_countries is 'Uppercases ISO country code.';

comment on trigger pricing_rates_set_updated_at on lms.pricing_rates is 'Keeps updated_at current.';

comment on trigger pricing_rates_validate_dates on lms.pricing_rates is 'Ensures expiry_date >= effective_date.';

-- Prevent overlapping pricing windows across weight/date for same service+zones using exclusion constraints
-- Requires btree_gist extension
create extension if not exists btree_gist;

alter table lms.pricing_rates
  add column weight_range numrange generated always as (numrange(weight_min::numeric, weight_max::numeric, '[]')) stored,
  add column effective_range daterange generated always as (daterange(effective_date, coalesce(expiry_date, 'infinity'::date), '[]')) stored;

create index idx_lms_pricing_rates_excl_gist on lms.pricing_rates using gist(service_id, origin_zone_id, destination_zone_id, weight_range, effective_range);

alter table lms.pricing_rates
  add constraint pricing_rates_no_overlap
  exclude using gist(service_id with =, origin_zone_id with =, destination_zone_id with =, weight_range with &&, effective_range with &&);

