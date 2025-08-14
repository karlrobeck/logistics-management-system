-- Add up migration script here
create type lms.provider_type as enum(
  'courier',
  'freight',
  'postal',
  'express',
  'ltl',
  'ftl'
);

create type lms.performance_metric_type as enum(
  'on_time_delivery',
  'damage_rate',
  'cost_efficiency',
  'customer_satisfaction'
);

create type lms.provider_invoice_status as enum(
  'draft',
  'sent',
  'paid',
  'overdue',
  'cancelled'
);

create table lms.transportation_providers(
  id uuid not null primary key default gen_random_uuid(),
  company_name varchar(200) not null,
  provider_type lms.provider_type not null,
  contact_person varchar(100),
  email varchar(320),
  phone_number varchar(20),
  address_id uuid references lms.addresses(id),
  api_endpoint varchar(500),
  api_key text,
  contract_start_date date,
  contract_end_date date,
  payment_terms varchar(100),
  insurance_coverage decimal(15, 2),
  performance_rating decimal(3, 2) check (performance_rating >= 0 and performance_rating <= 5),
  is_active boolean not null default true,
  created_at timestamp with time zone not null default now(),
  updated_at timestamp with time zone not null default now()
);

create table lms.provider_services(
  id uuid not null primary key default gen_random_uuid(),
  provider_id uuid not null references lms.transportation_providers(id),
  service_name varchar(100) not null,
  service_type lms.service_type not null,
  transport_mode lms.transport_mode not null,
  max_weight decimal(10, 2),
  transit_time_min integer,
  transit_time_max integer,
  cutoff_time time,
  tracking_available boolean not null default true,
  insurance_available boolean not null default true,
  is_active boolean not null default true,
  created_at timestamp with time zone not null default now(),
  updated_at timestamp with time zone not null default now()
);

create table lms.provider_service_origin_countries(
  id uuid primary key default gen_random_uuid(),
  provider_service_id uuid not null references lms.provider_services(id) on delete cascade,
  country_code varchar(3) not null,
  created_at timestamp with time zone not null default now()
);

create table lms.provider_service_destination_countries(
  id uuid primary key default gen_random_uuid(),
  provider_service_id uuid not null references lms.provider_services(id) on delete cascade,
  country_code varchar(3) not null,
  created_at timestamp with time zone not null default now()
);

create table lms.provider_service_max_dimensions(
  id uuid primary key default gen_random_uuid(),
  provider_service_id uuid not null references lms.provider_services(id) on delete cascade,
  length decimal(10, 2),
  width decimal(10, 2),
  height decimal(10, 2),
  created_at timestamp with time zone not null default now()
);

create table lms.provider_rates(
  id uuid not null primary key default gen_random_uuid(),
  provider_service_id uuid not null references lms.provider_services(id),
  origin_zone_id uuid not null references lms.pricing_zones(id),
  destination_zone_id uuid not null references lms.pricing_zones(id),
  weight_min decimal(10, 2) not null,
  weight_max decimal(10, 2) not null,
  base_rate decimal(10, 2) not null,
  per_kg_rate decimal(10, 2) not null,
  fuel_surcharge_rate decimal(5, 2) default 0.00,
  currency varchar(3) not null default 'PHP',
  effective_date date not null,
  expiry_date date,
  created_at timestamp with time zone not null default now(),
  updated_at timestamp with time zone not null default now()
);

create table lms.provider_performance(
  id uuid not null primary key default gen_random_uuid(),
  provider_id uuid not null references lms.transportation_providers(id),
  shipment_id uuid not null references lms.shipments(id),
  metric_type lms.performance_metric_type not null,
  metric_value decimal(10, 4),
  measurement_date date not null,
  notes text,
  created_at timestamp with time zone not null default now(),
  updated_at timestamp with time zone not null default now()
);

create table lms.provider_invoices(
  id uuid not null primary key default gen_random_uuid(),
  provider_id uuid not null references lms.transportation_providers(id),
  invoice_number varchar(50) not null,
  invoice_date date not null,
  due_date date not null,
  subtotal decimal(10, 2) not null check (subtotal >= 0),
  tax_amount decimal(10, 2) default 0.00 check (tax_amount >= 0),
  total_amount decimal(10, 2) check (total_amount >= 0) generated always as (subtotal + tax_amount) stored,
  currency varchar(3) not null default 'PHP',
  status lms.provider_invoice_status not null,
  payment_date date,
  created_at timestamp with time zone not null default now(),
  updated_at timestamp with time zone not null default now(),
  unique (provider_id, invoice_number)
);

create table lms.provider_invoice_line_items(
  id uuid not null primary key default gen_random_uuid(),
  provider_invoice_id uuid not null references lms.provider_invoices(id),
  description varchar(500) not null,
  quantity integer not null default 1 check (quantity > 0),
  unit_price decimal(10, 2) not null check (unit_price >= 0),
  line_total decimal(10, 2) check (line_total >= 0) generated always as (unit_price * quantity) stored,
  created_at timestamp with time zone not null default now(),
  updated_at timestamp with time zone not null default now()
);

