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

-- Type documentation
comment on type lms.provider_type is 'Class of transportation provider (courier, freight, postal, etc.).';
comment on type lms.performance_metric_type is 'Metrics used to evaluate provider performance.';
comment on type lms.provider_invoice_status is 'Lifecycle status of a provider invoice.';

-- Table and column documentation: lms.transportation_providers
comment on table lms.transportation_providers is 'External transport providers/carriers used for shipments.';
comment on column lms.transportation_providers.id is 'Primary key: UUID for the provider.';
comment on column lms.transportation_providers.company_name is 'Legal/trading name of the provider.';
comment on column lms.transportation_providers.provider_type is 'Provider category (see lms.provider_type).';
comment on column lms.transportation_providers.contact_person is 'Primary contact person name.';
comment on column lms.transportation_providers.email is 'Contact email address.';
comment on column lms.transportation_providers.phone_number is 'Contact phone number.';
comment on column lms.transportation_providers.address_id is 'FK to lms.addresses(id).';
comment on column lms.transportation_providers.api_endpoint is 'API endpoint URL for provider integration.';
comment on column lms.transportation_providers.api_key is 'API key/secret for provider integration.';
comment on column lms.transportation_providers.contract_start_date is 'Contract start date.';
comment on column lms.transportation_providers.contract_end_date is 'Contract end/renewal date.';
comment on column lms.transportation_providers.payment_terms is 'Payment terms (e.g., Net-30).';
comment on column lms.transportation_providers.insurance_coverage is 'Coverage amount for provider liability insurance.';
comment on column lms.transportation_providers.performance_rating is 'Aggregate performance rating (0-5).';
comment on column lms.transportation_providers.is_active is 'Whether the provider is currently active.';
comment on column lms.transportation_providers.created_at is 'Row creation timestamp (UTC).';
comment on column lms.transportation_providers.updated_at is 'Row last-updated timestamp (UTC).';

-- Table and column documentation: lms.provider_services
comment on table lms.provider_services is 'Services offered by a transport provider.';
comment on column lms.provider_services.id is 'Primary key: UUID for the provider service.';
comment on column lms.provider_services.provider_id is 'FK to lms.transportation_providers(id).';
comment on column lms.provider_services.service_name is 'Display name for the provider-specific service.';
comment on column lms.provider_services.service_type is 'Service type (see lms.service_type).';
comment on column lms.provider_services.transport_mode is 'Transport mode used by the service.';
comment on column lms.provider_services.max_weight is 'Max allowed weight for this provider service.';
comment on column lms.provider_services.transit_time_min is 'Estimated minimum transit time (days).';
comment on column lms.provider_services.transit_time_max is 'Estimated maximum transit time (days).';
comment on column lms.provider_services.cutoff_time is 'Latest time for same-day processing.';
comment on column lms.provider_services.tracking_available is 'Whether tracking is supported by provider.';
comment on column lms.provider_services.insurance_available is 'Whether insurance is available.';
comment on column lms.provider_services.is_active is 'Whether the provider service is active.';
comment on column lms.provider_services.created_at is 'Row creation timestamp (UTC).';
comment on column lms.provider_services.updated_at is 'Row last-updated timestamp (UTC).';

-- Table and column documentation: origin/destination country mappings
comment on table lms.provider_service_origin_countries is 'Allowed origin countries for a provider service.';
comment on column lms.provider_service_origin_countries.id is 'Primary key: UUID for the origin mapping.';
comment on column lms.provider_service_origin_countries.provider_service_id is 'FK to lms.provider_services(id).';
comment on column lms.provider_service_origin_countries.country_code is 'ISO-3166-1 alpha-3 origin country code.';
comment on column lms.provider_service_origin_countries.created_at is 'Row creation timestamp (UTC).';

comment on table lms.provider_service_destination_countries is 'Allowed destination countries for a provider service.';
comment on column lms.provider_service_destination_countries.id is 'Primary key: UUID for the destination mapping.';
comment on column lms.provider_service_destination_countries.provider_service_id is 'FK to lms.provider_services(id).';
comment on column lms.provider_service_destination_countries.country_code is 'ISO-3166-1 alpha-3 destination country code.';
comment on column lms.provider_service_destination_countries.created_at is 'Row creation timestamp (UTC).';

-- Table and column documentation: lms.provider_service_max_dimensions
comment on table lms.provider_service_max_dimensions is 'Optional max dimensions per provider service.';
comment on column lms.provider_service_max_dimensions.id is 'Primary key: UUID for the record.';
comment on column lms.provider_service_max_dimensions.provider_service_id is 'FK to lms.provider_services(id).';
comment on column lms.provider_service_max_dimensions.length is 'Max length (cm).';
comment on column lms.provider_service_max_dimensions.width is 'Max width (cm).';
comment on column lms.provider_service_max_dimensions.height is 'Max height (cm).';
comment on column lms.provider_service_max_dimensions.created_at is 'Row creation timestamp (UTC).';

-- Table and column documentation: lms.provider_rates
comment on table lms.provider_rates is 'Provider-specific rate matrix across zones with weight brackets.';
comment on column lms.provider_rates.id is 'Primary key: UUID for the provider rate row.';
comment on column lms.provider_rates.provider_service_id is 'FK to lms.provider_services(id).';
comment on column lms.provider_rates.origin_zone_id is 'FK to lms.pricing_zones(id) for origin.';
comment on column lms.provider_rates.destination_zone_id is 'FK to lms.pricing_zones(id) for destination.';
comment on column lms.provider_rates.weight_min is 'Minimum weight for the bracket (kg).';
comment on column lms.provider_rates.weight_max is 'Maximum weight for the bracket (kg).';
comment on column lms.provider_rates.base_rate is 'Base rate component.';
comment on column lms.provider_rates.per_kg_rate is 'Per-kilogram rate component.';
comment on column lms.provider_rates.fuel_surcharge_rate is 'Fuel surcharge percentage.';
comment on column lms.provider_rates.currency is 'ISO-4217 currency code.';
comment on column lms.provider_rates.effective_date is 'Date when this rate becomes effective.';
comment on column lms.provider_rates.expiry_date is 'Date when this rate expires (optional).';
comment on column lms.provider_rates.created_at is 'Row creation timestamp (UTC).';
comment on column lms.provider_rates.updated_at is 'Row last-updated timestamp (UTC).';

-- Table and column documentation: lms.provider_performance
comment on table lms.provider_performance is 'Performance metrics recorded for providers per shipment/leg.';
comment on column lms.provider_performance.id is 'Primary key: UUID for the performance row.';
comment on column lms.provider_performance.provider_id is 'FK to lms.transportation_providers(id).';
comment on column lms.provider_performance.shipment_id is 'FK to lms.shipments(id).';
comment on column lms.provider_performance.metric_type is 'Metric category (see lms.performance_metric_type).';
comment on column lms.provider_performance.metric_value is 'Numeric value of the metric.';
comment on column lms.provider_performance.measurement_date is 'When the metric was measured.';
comment on column lms.provider_performance.notes is 'Optional notes/details.';
comment on column lms.provider_performance.created_at is 'Row creation timestamp (UTC).';
comment on column lms.provider_performance.updated_at is 'Row last-updated timestamp (UTC).';

-- Table and column documentation: lms.provider_invoices
comment on table lms.provider_invoices is 'Invoices issued by transportation providers.';
comment on column lms.provider_invoices.id is 'Primary key: UUID for the invoice.';
comment on column lms.provider_invoices.provider_id is 'FK to lms.transportation_providers(id).';
comment on column lms.provider_invoices.invoice_number is 'Unique invoice number within the provider.';
comment on column lms.provider_invoices.invoice_date is 'Invoice issue date.';
comment on column lms.provider_invoices.due_date is 'Payment due date.';
comment on column lms.provider_invoices.subtotal is 'Subtotal amount before taxes.';
comment on column lms.provider_invoices.tax_amount is 'Tax amount.';
comment on column lms.provider_invoices.total_amount is 'Computed total = subtotal + tax_amount.';
comment on column lms.provider_invoices.currency is 'ISO-4217 currency code.';
comment on column lms.provider_invoices.status is 'Invoice status (see lms.provider_invoice_status).';
comment on column lms.provider_invoices.payment_date is 'Date when payment was made.';
comment on column lms.provider_invoices.created_at is 'Row creation timestamp (UTC).';
comment on column lms.provider_invoices.updated_at is 'Row last-updated timestamp (UTC).';

-- Table and column documentation: lms.provider_invoice_line_items
comment on table lms.provider_invoice_line_items is 'Line items on provider invoices.';
comment on column lms.provider_invoice_line_items.id is 'Primary key: UUID for the line item.';
comment on column lms.provider_invoice_line_items.provider_invoice_id is 'FK to lms.provider_invoices(id).';
comment on column lms.provider_invoice_line_items.description is 'Description of the charge.';
comment on column lms.provider_invoice_line_items.quantity is 'Quantity (must be > 0).';
comment on column lms.provider_invoice_line_items.unit_price is 'Unit price.';
comment on column lms.provider_invoice_line_items.line_total is 'Computed total = unit_price * quantity.';
comment on column lms.provider_invoice_line_items.created_at is 'Row creation timestamp (UTC).';
comment on column lms.provider_invoice_line_items.updated_at is 'Row last-updated timestamp (UTC).';

-- Indexes for lms.transportation_providers
create index idx_lms_providers_type on lms.transportation_providers(provider_type);
create index idx_lms_providers_is_active on lms.transportation_providers(is_active);
create index idx_lms_providers_created_at on lms.transportation_providers(created_at);
create index idx_lms_providers_is_active_true on lms.transportation_providers(is_active) where is_active = true;

-- Indexes for lms.provider_services
create index idx_lms_provider_services_provider on lms.provider_services(provider_id);
create index idx_lms_provider_services_type on lms.provider_services(service_type);
create index idx_lms_provider_services_mode on lms.provider_services(transport_mode);
create index idx_lms_provider_services_active on lms.provider_services(is_active);
create index idx_lms_provider_services_created_at on lms.provider_services(created_at);
create unique index idx_lms_provider_services_unique_name on lms.provider_services(provider_id, service_name);
create index idx_lms_provider_services_is_active_true on lms.provider_services(is_active) where is_active = true;

-- Indexes for origin/destination country maps
create index idx_lms_ps_origin_countries_service on lms.provider_service_origin_countries(provider_service_id);
create index idx_lms_ps_origin_countries_country on lms.provider_service_origin_countries(country_code);
create index idx_lms_ps_destination_countries_service on lms.provider_service_destination_countries(provider_service_id);
create index idx_lms_ps_destination_countries_country on lms.provider_service_destination_countries(country_code);

-- Indexes for lms.provider_service_max_dimensions
create index idx_lms_ps_max_dim_service on lms.provider_service_max_dimensions(provider_service_id);
create index idx_lms_ps_max_dim_created_at on lms.provider_service_max_dimensions(created_at);

-- Indexes for lms.provider_rates
create index idx_lms_provider_rates_service on lms.provider_rates(provider_service_id);
create index idx_lms_provider_rates_origin on lms.provider_rates(origin_zone_id);
create index idx_lms_provider_rates_destination on lms.provider_rates(destination_zone_id);
create index idx_lms_provider_rates_effective on lms.provider_rates(effective_date);
create index idx_lms_provider_rates_expiry on lms.provider_rates(expiry_date);
create index idx_lms_provider_rates_created_at on lms.provider_rates(created_at);

-- Indexes for lms.provider_performance
create index idx_lms_provider_perf_provider on lms.provider_performance(provider_id);
create index idx_lms_provider_perf_shipment on lms.provider_performance(shipment_id);
create index idx_lms_provider_perf_metric on lms.provider_performance(metric_type);
create index idx_lms_provider_perf_date on lms.provider_performance(measurement_date);
create index idx_lms_provider_perf_created_at on lms.provider_performance(created_at);

-- Indexes for lms.provider_invoices
create index idx_lms_provider_invoices_provider on lms.provider_invoices(provider_id);
create index idx_lms_provider_invoices_invoice_date on lms.provider_invoices(invoice_date);
create index idx_lms_provider_invoices_due_date on lms.provider_invoices(due_date);
create index idx_lms_provider_invoices_status on lms.provider_invoices(status);
create index idx_lms_provider_invoices_created_at on lms.provider_invoices(created_at);

-- Indexes for lms.provider_invoice_line_items
create index idx_lms_pili_invoice on lms.provider_invoice_line_items(provider_invoice_id);
create index idx_lms_pili_created_at on lms.provider_invoice_line_items(created_at);

-- Triggers for lms.transportation_providers
create trigger providers_set_updated_at
  before update on lms.transportation_providers for each row
  execute function lms.tg_set_updated_at();

create trigger providers_normalize_contact
  before insert or update on lms.transportation_providers for each row
  execute function lms.tg_providers_normalize_contact();

create trigger providers_validate_contract_dates
  before insert or update on lms.transportation_providers for each row
  execute function lms.tg_providers_validate_contract_dates();

-- Triggers for lms.provider_services
create trigger provider_services_set_updated_at
  before update on lms.provider_services for each row
  execute function lms.tg_set_updated_at();

create trigger provider_services_trim_and_validate
  before insert or update on lms.provider_services for each row
  execute function lms.tg_provider_services_trim_and_validate();

-- Triggers for origin/destination countries
create trigger ps_origin_countries_upper
  before insert or update on lms.provider_service_origin_countries for each row
  execute function lms.tg_upper_country_code();

create trigger ps_destination_countries_upper
  before insert or update on lms.provider_service_destination_countries for each row
  execute function lms.tg_upper_country_code();

-- Triggers for lms.provider_rates
create trigger provider_rates_set_updated_at
  before update on lms.provider_rates for each row
  execute function lms.tg_set_updated_at();

create trigger provider_rates_upper_currency
  before insert or update on lms.provider_rates for each row
  execute function lms.tg_upper_currency();

create trigger provider_rates_validate_dates
  before insert or update on lms.provider_rates for each row
  execute function lms.tg_pricing_rates_validate_dates();

-- Triggers for lms.provider_performance
create trigger provider_performance_set_updated_at
  before update on lms.provider_performance for each row
  execute function lms.tg_set_updated_at();

-- Triggers for lms.provider_invoices
create trigger provider_invoices_set_updated_at
  before update on lms.provider_invoices for each row
  execute function lms.tg_set_updated_at();

create trigger provider_invoices_validate_dates
  before insert or update on lms.provider_invoices for each row
  execute function lms.tg_provider_invoices_validate_dates();

-- Triggers for lms.provider_invoice_line_items
create trigger provider_invoice_line_items_set_updated_at
  before update on lms.provider_invoice_line_items for each row
  execute function lms.tg_set_updated_at();

-- Comments
comment on trigger providers_set_updated_at on lms.transportation_providers is 'Keeps updated_at current.';
comment on trigger providers_normalize_contact on lms.transportation_providers is 'Trims company and lowercases email.';
comment on trigger providers_validate_contract_dates on lms.transportation_providers is 'Ensures contract_end_date >= contract_start_date.';
comment on trigger provider_services_set_updated_at on lms.provider_services is 'Keeps updated_at current.';
comment on trigger provider_services_trim_and_validate on lms.provider_services is 'Trims service_name and validates transit times.';
comment on trigger ps_origin_countries_upper on lms.provider_service_origin_countries is 'Uppercases ISO country code.';
comment on trigger ps_destination_countries_upper on lms.provider_service_destination_countries is 'Uppercases ISO country code.';
comment on trigger provider_rates_set_updated_at on lms.provider_rates is 'Keeps updated_at current.';
comment on trigger provider_rates_upper_currency on lms.provider_rates is 'Uppercases currency code.';
comment on trigger provider_rates_validate_dates on lms.provider_rates is 'Ensures expiry_date >= effective_date.';
comment on trigger provider_performance_set_updated_at on lms.provider_performance is 'Keeps updated_at current.';
comment on trigger provider_invoices_set_updated_at on lms.provider_invoices is 'Keeps updated_at current.';
comment on trigger provider_invoices_validate_dates on lms.provider_invoices is 'Validates due_date and uppercases currency.';
comment on trigger provider_invoice_line_items_set_updated_at on lms.provider_invoice_line_items is 'Keeps updated_at current.';

-- Tighten constraints and FK actions
alter table lms.provider_services
  add constraint provider_services_max_weight_pos check (max_weight is null or max_weight > 0);

alter table lms.transportation_providers
  add constraint providers_email_lower check (email is null or email = lower(btrim(email)));

alter table lms.provider_rates
  drop constraint if exists provider_rates_provider_service_id_fkey,
  add constraint provider_rates_provider_service_id_fkey foreign key (provider_service_id) references lms.provider_services(id) on delete cascade,
  add constraint provider_rates_currency_check check (char_length(currency)=3 and currency = upper(currency));

alter table lms.provider_invoices
  alter column status set default 'draft',
  add constraint provider_invoices_currency_check check (char_length(currency)=3 and currency = upper(currency));

-- Country code checks
alter table lms.provider_service_origin_countries
  add constraint pso_country_code_check check (char_length(country_code)=3 and country_code = upper(country_code));
alter table lms.provider_service_destination_countries
  add constraint psd_country_code_check check (char_length(country_code)=3 and country_code = upper(country_code));

-- Prevent overlapping provider rate windows by weight/date per provider_service
create extension if not exists btree_gist;

alter table lms.provider_rates
  add column weight_range numrange generated always as (numrange(weight_min::numeric, weight_max::numeric, '[]')) stored,
  add column effective_range daterange generated always as (daterange(effective_date, coalesce(expiry_date, 'infinity'::date), '[]')) stored;

create index idx_lms_provider_rates_excl_gist on lms.provider_rates using gist (
  provider_service_id, origin_zone_id, destination_zone_id, weight_range, effective_range
);

alter table lms.provider_rates
  add constraint provider_rates_no_overlap exclude using gist (
    provider_service_id with =,
    origin_zone_id with =,
    destination_zone_id with =,
    weight_range with &&,
    effective_range with &&
  );

alter table lms.provider_invoice_line_items
  drop constraint if exists provider_invoice_line_items_provider_invoice_id_fkey,
  add constraint provider_invoice_line_items_provider_invoice_id_fkey foreign key (provider_invoice_id) references lms.provider_invoices(id) on delete cascade;


