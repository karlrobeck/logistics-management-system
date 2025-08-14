-- Add up migration script here
create type lms.service_type as enum(
  'standard',
  'express',
  'overnight',
  'economy',
  'freight'
);

create table lms.shipping_services(
  id uuid not null primary key default gen_random_uuid(),
  name varchar(100) not null unique,
  description text,
  service_type lms.service_type not null,
  max_weight decimal(10, 2),
  delivery_time_min integer,
  delivery_time_max integer,
  is_active boolean not null default true,
  created_at timestamp with time zone not null default now(),
  updated_at timestamp with time zone not null default now()
);

create table lms.shipping_service_max_dimensions(
  id uuid primary key default gen_random_uuid(),
  shipping_service_id uuid not null references lms.shipping_services(id) on delete cascade,
  length decimal(10, 2),
  width decimal(10, 2),
  height decimal(10, 2),
  created_at timestamp with time zone not null default now()
);

-- Type documentation
comment on type lms.service_type is 'Kinds of shipping services offered (parcel, freight, speed tiers).';

-- Table and column documentation: lms.shipping_services
comment on table lms.shipping_services is 'Catalog of available shipping services.';

comment on column lms.shipping_services.id is 'Primary key: UUID for the shipping service.';

comment on column lms.shipping_services.name is 'Service display name (unique).';

comment on column lms.shipping_services.description is 'Optional service description.';

comment on column lms.shipping_services.service_type is 'Service category (see lms.service_type).';

comment on column lms.shipping_services.max_weight is 'Max allowed weight for this service (kg by default).';

comment on column lms.shipping_services.delivery_time_min is 'Estimated minimum delivery time (days).';

comment on column lms.shipping_services.delivery_time_max is 'Estimated maximum delivery time (days).';

comment on column lms.shipping_services.is_active is 'Whether this service is currently available.';

comment on column lms.shipping_services.created_at is 'Row creation timestamp (UTC).';

comment on column lms.shipping_services.updated_at is 'Row last-updated timestamp (UTC).';

-- Table and column documentation: lms.shipping_service_max_dimensions
comment on table lms.shipping_service_max_dimensions is 'Optional dimensional limits associated to a shipping service.';

comment on column lms.shipping_service_max_dimensions.id is 'Primary key: UUID for the record.';

comment on column lms.shipping_service_max_dimensions.shipping_service_id is 'FK to lms.shipping_services(id).';

comment on column lms.shipping_service_max_dimensions.length is 'Max length allowed (cm by default).';

comment on column lms.shipping_service_max_dimensions.width is 'Max width allowed (cm by default).';

comment on column lms.shipping_service_max_dimensions.height is 'Max height allowed (cm by default).';

comment on column lms.shipping_service_max_dimensions.created_at is 'Row creation timestamp (UTC).';

-- Indexes for lms.shipping_services
-- name is unique already
create index idx_lms_shipping_services_service_type on lms.shipping_services(service_type);

create index idx_lms_shipping_services_is_active on lms.shipping_services(is_active);

create index idx_lms_shipping_services_created_at on lms.shipping_services(created_at);

create index idx_lms_shipping_services_is_active_true on lms.shipping_services(is_active)
where
  is_active = true;

-- Indexes for lms.shipping_service_max_dimensions
create index idx_lms_ss_max_dimensions_service on lms.shipping_service_max_dimensions(shipping_service_id);

create index idx_lms_ss_max_dimensions_created_at on lms.shipping_service_max_dimensions(created_at);

-- Triggers for lms.shipping_services
create trigger shipping_services_set_updated_at
  before update on lms.shipping_services for each row
  execute function lms.tg_set_updated_at();

create trigger shipping_services_trim_fields
  before insert or update on lms.shipping_services for each row
  execute function lms.tg_trim_service_fields();

create trigger shipping_services_validate_durations
  before insert or update on lms.shipping_services for each row
  execute function lms.tg_shipping_services_validate_durations();

-- Comments
comment on trigger shipping_services_set_updated_at on lms.shipping_services is 'Keeps updated_at current.';

comment on trigger shipping_services_trim_fields on lms.shipping_services is 'Trims name/description.';

comment on trigger shipping_services_validate_durations on lms.shipping_services is 'Ensures delivery_time_min <= delivery_time_max.';

-- Constraints
alter table lms.shipping_services
  add constraint shipping_services_max_weight_pos check (max_weight is null or max_weight > 0);

