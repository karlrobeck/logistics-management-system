-- Add up migration script here
create type lms.transport_mode as enum(
  'air',
  'sea',
  'road',
  'rail'
);

create type lms.shipment_status as enum(
  'created',
  'picked_up',
  'in_transit',
  'out_for_delivery',
  'delivered',
  'exception',
  'cancelled'
);

create type lms.package_type as enum(
  'box',
  'envelope',
  'tube',
  'pallet',
  'crate',
  'bag'
);

create table lms.shipments(
  id uuid not null primary key default gen_random_uuid(),
  tracking_number varchar(50) not null unique,
  sender_company_id uuid references crm.companies(id),
  sender_contact_id uuid references crm.contacts(id),
  sender_address_id uuid not null references lms.addresses(id),
  receiver_company_id uuid references crm.companies(id),
  receiver_contact_id uuid references crm.contacts(id),
  receiver_address_id uuid not null references lms.addresses(id),
  service_id uuid not null references lms.shipping_services(id),
  primary_transport_mode lms.transport_mode not null,
  status lms.shipment_status not null,
  total_weight decimal(10, 2) not null check (total_weight > 0),
  total_value decimal(10, 2),
  insurance_amount decimal(10, 2),
  shipping_cost decimal(10, 2),
  currency varchar(3) not null default 'PHP',
  pickup_date date,
  delivery_date date,
  estimated_delivery_date date,
  special_instructions text,
  created_by uuid references auth.users(id),
  created_at timestamp with time zone not null default now(),
  updated_at timestamp with time zone not null default now()
);

create table lms.packages(
  id uuid not null primary key default gen_random_uuid(),
  shipment_id uuid not null references lms.shipments(id),
  package_number varchar(50) not null,
  weight decimal(10, 2) not null check (weight > 0),
  length decimal(10, 2),
  width decimal(10, 2),
  height decimal(10, 2),
  package_type lms.package_type not null,
  contents_description text,
  declared_value decimal(10, 2),
  created_at timestamp with time zone not null default now(),
  updated_at timestamp with time zone not null default now(),
  unique (shipment_id, package_number)
);

