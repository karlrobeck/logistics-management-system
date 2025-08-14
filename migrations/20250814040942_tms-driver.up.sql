-- Add up migration script here
create schema tms;

create type tms.driver_status as enum(
  'active',
  'inactive',
  'on-leave',
  'terminated'
);

create table tms.drivers(
  id uuid not null primary key default gen_random_uuid(),
  employee_id varchar(20) not null unique,
  first_name varchar(50) not null,
  last_name varchar(50) not null,
  license_number varchar(30) not null unique,
  phone_number varchar(20) not null,
  email varchar(320) not null unique,
  hire_date date not null,
  status tms.driver_status not null,
  created_at timestamp with time zone not null default now(),
  updated_at timestamp with time zone not null default now()
);

-- Schema and type documentation
comment on schema tms is 'Transportation Management System domain (drivers, vehicles, routes, dispatch, assignments).';

comment on type tms.driver_status is 'Employment/availability status of a driver.';

-- Table and column documentation: tms.drivers
comment on table tms.drivers is 'Driver records used for dispatching and compliance.';

comment on column tms.drivers.id is 'Primary key: UUID for the driver.';

comment on column tms.drivers.employee_id is 'Internal employee identifier (unique).';

comment on column tms.drivers.first_name is 'Driver first name.';

comment on column tms.drivers.last_name is 'Driver last name.';

comment on column tms.drivers.license_number is 'Government driver''s license number (unique).';

comment on column tms.drivers.phone_number is 'Contact phone number for the driver.';

comment on column tms.drivers.email is 'Contact email address (unique).';

comment on column tms.drivers.hire_date is 'Date the driver was hired.';

comment on column tms.drivers.status is 'Current driver status (see tms.driver_status).';

comment on column tms.drivers.created_at is 'Row creation timestamp (UTC).';

comment on column tms.drivers.updated_at is 'Row last-updated timestamp (UTC).';

-- Indexes for tms.drivers
-- Unique constraints already create indexes for: employee_id, license_number, email
create index idx_tms_drivers_status on tms.drivers(status);

create index idx_tms_drivers_hire_date on tms.drivers(hire_date);

create index idx_tms_drivers_created_at on tms.drivers(created_at);

-- TMS trigger functions
create or replace function tms.tg_set_updated_at()
  returns trigger
  language plpgsql
  as $$
begin
  new.updated_at := now();
  return new;
end;
$$;

create or replace function tms.tg_normalize_email()
  returns trigger
  language plpgsql
  as $$
begin
  if new.email is not null then
    new.email := lower(btrim(new.email));
  end if;
  return new;
end;
$$;

create or replace function tms.tg_trim_driver_names()
  returns trigger
  language plpgsql
  as $$
begin
  if new.first_name is not null then
    new.first_name := btrim(new.first_name);
  end if;
  if new.last_name is not null then
    new.last_name := btrim(new.last_name);
  end if;
  return new;
end;
$$;

-- Define vehicle fields trimper for later use in vehicles migration
create or replace function tms.tg_trim_vehicle_fields()
  returns trigger
  language plpgsql
  as $$
begin
  if new.vehicle_number is not null then
    new.vehicle_number := btrim(new.vehicle_number);
  end if;
  if new.license_plate is not null then
    new.license_plate := upper(btrim(new.license_plate));
  end if;
  if new.make is not null then
    new.make := btrim(new.make);
  end if;
  if new.model is not null then
    new.model := btrim(new.model);
  end if;
  return new;
end;
$$;

-- Triggers for tms.drivers
create trigger drivers_set_updated_at
  before update on tms.drivers for each row
  execute function tms.tg_set_updated_at();

create trigger drivers_normalize_email
  before insert or update on tms.drivers for each row
  execute function tms.tg_normalize_email();

create trigger drivers_trim_names
  before insert or update on tms.drivers for each row
  execute function tms.tg_trim_driver_names();

-- Comments on TMS trigger functions
comment on function tms.tg_set_updated_at() is 'BEFORE UPDATE for TMS tables: sets NEW.updated_at := now().';

comment on function tms.tg_normalize_email() is 'BEFORE INSERT/UPDATE on tms.drivers: lower(btrim(email)) to normalize addresses.';

comment on function tms.tg_trim_driver_names() is 'BEFORE INSERT/UPDATE on tms.drivers: btrim(first_name/last_name).';

comment on function tms.tg_trim_vehicle_fields() is 'BEFORE INSERT/UPDATE on tms.vehicles: btrim(vehicle_number/make/model), and upper(btrim(license_plate)).';

-- Comments on tms.drivers triggers
comment on trigger drivers_set_updated_at on tms.drivers is 'Keeps drivers.updated_at current on updates.';

comment on trigger drivers_normalize_email on tms.drivers is 'Normalizes email on insert/update to avoid case/space duplicates.';

comment on trigger drivers_trim_names on tms.drivers is 'Trims whitespace around driver names on insert/update.';

