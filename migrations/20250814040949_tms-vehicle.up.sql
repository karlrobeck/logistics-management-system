-- Add up migration script here
create type tms.vehicle_type as enum(
  'van',
  'truck',
  'trailer',
  'motorcycle',
  'car'
);

create type tms.vehicle_status as enum(
  'active',
  'maintenance',
  'retired',
  'out-of-service'
);

create table tms.vehicles(
  id uuid not null primary key default gen_random_uuid(),
  vehicle_number varchar(20) not null unique,
  license_plate varchar(15) not null unique,
  vehicle_type tms.vehicle_type not null,
  make varchar(30) not null,
  model varchar(30) not null,
  year integer not null check (year >= 1900 and year <= date_part('year', current_date) + 1),
  capacity_weight decimal(10, 2),
  capacity_volume decimal(10, 2),
  status tms.vehicle_status not null,
  created_at timestamp with time zone not null default now(),
  updated_at timestamp with time zone not null default now()
);

-- Type documentation
comment on type tms.vehicle_type is 'Type/class of vehicle used for transport.';

comment on type tms.vehicle_status is 'Operational status of the vehicle.';

-- Table and column documentation: tms.vehicles
comment on table tms.vehicles is 'Fleet vehicles used in transportation operations.';

comment on column tms.vehicles.id is 'Primary key: UUID for the vehicle.';

comment on column tms.vehicles.vehicle_number is 'Internal vehicle identifier (unique).';

comment on column tms.vehicles.license_plate is 'License plate number (unique).';

comment on column tms.vehicles.vehicle_type is 'Vehicle type (see tms.vehicle_type).';

comment on column tms.vehicles.make is 'Vehicle manufacturer (make).';

comment on column tms.vehicles.model is 'Vehicle model.';

comment on column tms.vehicles.year is 'Model year; constrained to a reasonable range.';

comment on column tms.vehicles.capacity_weight is 'Weight capacity in kilograms (or configured unit).';

comment on column tms.vehicles.capacity_volume is 'Volume capacity in cubic meters (or configured unit).';

comment on column tms.vehicles.status is 'Current operational status.';

comment on column tms.vehicles.created_at is 'Row creation timestamp (UTC).';

comment on column tms.vehicles.updated_at is 'Row last-updated timestamp (UTC).';

-- Indexes for tms.vehicles
-- Unique constraints already index: vehicle_number, license_plate
create index idx_tms_vehicles_vehicle_type on tms.vehicles(vehicle_type);

create index idx_tms_vehicles_status on tms.vehicles(status);

create index idx_tms_vehicles_year on tms.vehicles(year);

create index idx_tms_vehicles_created_at on tms.vehicles(created_at);

-- Triggers for tms.vehicles
create trigger vehicles_set_updated_at
  before update on tms.vehicles for each row
  execute function tms.tg_set_updated_at();

create trigger vehicles_trim_fields
  before insert or update on tms.vehicles for each row
  execute function tms.tg_trim_vehicle_fields();

-- Comments on tms.vehicles triggers
comment on trigger vehicles_set_updated_at on tms.vehicles is 'Keeps vehicles.updated_at current on updates.';

comment on trigger vehicles_trim_fields on tms.vehicles is 'Trims/normalizes select vehicle fields on insert/update.';

