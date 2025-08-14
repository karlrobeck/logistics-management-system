-- Add up migration script here
create type lms.route_status as enum(
  'planned',
  'in_progress',
  'completed',
  'cancelled'
);

create type lms.delivery_status as enum(
  'pending',
  'attempted',
  'delivered',
  'failed',
  'rescheduled'
);

create table lms.routes(
  id uuid not null primary key default gen_random_uuid(),
  route_name varchar(100) not null,
  driver_id uuid references tms.drivers(id),
  vehicle_id uuid references tms.vehicles(id),
  route_date date not null,
  estimated_departure timestamptz,
  actual_departure timestamptz,
  estimated_arrival timestamptz,
  actual_arrival timestamptz,
  status lms.route_status not null,
  created_at timestamp with time zone not null default now(),
  updated_at timestamp with time zone not null default now()
);

create table lms.route_shipments(
  id uuid not null primary key default gen_random_uuid(),
  route_id uuid not null references lms.routes(id),
  shipment_id uuid not null references lms.shipments(id),
  sequence_number integer not null check (sequence_number > 0),
  delivery_date date not null,
  estimated_delivery timestamptz,
  actual_delivery timestamptz,
  delivery_status lms.delivery_status not null,
  signature_required boolean not null default false,
  recipient_signature varchar(100),
  unique (route_id, shipment_id),
  created_at timestamp with time zone not null default now(),
  updated_at timestamp with time zone not null default now()
);

