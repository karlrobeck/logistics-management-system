-- Add up migration script here
create type crm.notification_type as enum(
  'pickup_scheduled',
  'in_transit',
  'out_for_delivery',
  'delivered',
  'exception',
  'delayed'
);

create type crm.notification_channel as enum(
  'email',
  'sms',
  'push',
  'webhook'
);

create type crm.notification_delivery_status as enum(
  'pending',
  'sent',
  'delivered',
  'failed',
  'bounced'
);

create table crm.notifications(
  id uuid not null primary key default gen_random_uuid(),
  shipment_id uuid not null references lms.shipments(id),
  contact_id uuid not null references crm.contacts(id),
  notification_type crm.notification_type not null,
  channel crm.notification_channel not null,
  recipient varchar(320) not null,
  subject varchar(200),
  message text not null,
  sent_at timestamptz,
  delivery_status crm.notification_delivery_status not null,
  created_at timestamp with time zone not null default now(),
  updated_at timestamp with time zone not null default now()
);

