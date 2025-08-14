-- Add up migration script here
create type lms.tracking_event_type as enum(
  'created',
  'picked_up',
  'departed',
  'arrived',
  'out-for-delivery',
  'delivered',
  'exception',
  'cancelled'
);

create table lms.tracking_events(
  id uuid not null primary key default gen_random_uuid(),
  shipment_id uuid not null references lms.shipments(id),
  event_type lms.tracking_event_type not null,
  event_description varchar(500) not null,
  event_location varchar(200),
  event_timestamp timestamptz not null,
  created_at timestamp with time zone not null default now(),
  updated_at timestamp with time zone not null default now()
);

