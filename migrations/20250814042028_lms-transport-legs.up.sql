-- Add up migration script here
create type lms.transport_leg_type as enum(
  'pickup',
  'linehaul',
  'delivery',
  'transfer'
);

create type lms.leg_status as enum(
  'planned',
  'in_progress',
  'completed',
  'cancelled'
);

create table lms.transport_legs(
  id uuid not null primary key default gen_random_uuid(),
  shipment_id uuid not null references lms.shipments(id),
  leg_sequence integer not null check (leg_sequence > 0),
  transport_type lms.transport_leg_type not null,
  provider_id uuid references lms.transportation_providers(id),
  provider_service_id uuid references lms.provider_services(id),
  provider_tracking_number varchar(50),
  vehicle_id uuid references tms.vehicles(id),
  driver_id uuid references tms.drivers(id),
  origin_warehouse_id uuid references lms.warehouses(id),
  destination_warehouse_id uuid references lms.warehouses(id),
  origin_address_id uuid references lms.addresses(id),
  destination_address_id uuid references lms.addresses(id),
  scheduled_pickup timestamptz,
  actual_pickup timestamptz,
  scheduled_delivery timestamptz,
  actual_delivery timestamptz,
  cost decimal(10, 2),
  currency varchar(3) default 'PHP',
  status lms.leg_status not null,
  special_instructions text,
  unique (shipment_id, leg_sequence),
  created_at timestamp with time zone not null default now(),
  updated_at timestamp with time zone not null default now()
);

alter table lms.provider_performance
  add column transport_leg_id uuid references lms.transport_legs(id);

alter table lms.provider_invoice_line_items
  add column transport_leg_id uuid references lms.transport_legs(id);

