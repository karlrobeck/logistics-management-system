-- Add up migration script here
create type lms.warehouse_type as enum(
  'distribution',
  'fulfillment',
  'cross_dock',
  'cold_storage',
  'bonded'
);

create type lms.warehouse_inventory_status as enum(
  'received',
  'stored',
  'picked',
  'shipped'
);

create table lms.warehouses(
  id uuid not null primary key default gen_random_uuid(),
  name varchar(100) not null,
  code varchar(10) not null unique,
  address_id uuid not null references lms.addresses(id),
  warehouse_type lms.warehouse_type not null,
  capacity integer,
  is_active boolean not null default true,
  manager_id uuid references auth.users(id),
  created_at timestamp with time zone not null default now(),
  updated_at timestamp with time zone not null default now()
);

create table lms.warehouse_inventories(
  id uuid not null primary key default gen_random_uuid(),
  warehouse_id uuid not null references lms.warehouses(id),
  shipment_id uuid not null references lms.shipments(id),
  package_id uuid not null references lms.packages(id),
  location_code varchar(20),
  status lms.warehouse_inventory_status not null,
  arrived_at timestamptz,
  departed_at timestamptz,
  created_at timestamp with time zone not null default now(),
  updated_at timestamp with time zone not null default now()
);

