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

