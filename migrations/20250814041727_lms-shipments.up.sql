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

-- Type documentation
comment on type lms.transport_mode is 'Primary mode of transportation for the shipment.';

comment on type lms.shipment_status is 'Lifecycle status of a shipment.';

comment on type lms.package_type is 'Packaging type of a parcel within a shipment.';

-- Table and column documentation: lms.shipments
comment on table lms.shipments is 'Top-level shipment record linking sender/receiver, service and costs.';

comment on column lms.shipments.id is 'Primary key: UUID for the shipment.';

comment on column lms.shipments.tracking_number is 'Unique tracking number.';

comment on column lms.shipments.sender_company_id is 'FK to crm.companies(id) for the sender company.';

comment on column lms.shipments.sender_contact_id is 'FK to crm.contacts(id) for the sender contact.';

comment on column lms.shipments.sender_address_id is 'FK to lms.addresses(id) for pickup origin.';

comment on column lms.shipments.receiver_company_id is 'FK to crm.companies(id) for the receiver company.';

comment on column lms.shipments.receiver_contact_id is 'FK to crm.contacts(id) for the receiver contact.';

comment on column lms.shipments.receiver_address_id is 'FK to lms.addresses(id) for delivery destination.';

comment on column lms.shipments.service_id is 'FK to lms.shipping_services(id) used for rating/booking.';

comment on column lms.shipments.primary_transport_mode is 'Primary transport mode (air/sea/road/rail).';

comment on column lms.shipments.status is 'Current shipment status.';

comment on column lms.shipments.total_weight is 'Total shipment weight (kg).';

comment on column lms.shipments.total_value is 'Declared total value of the shipment.';

comment on column lms.shipments.insurance_amount is 'Insurance amount for the shipment (optional).';

comment on column lms.shipments.shipping_cost is 'Rated shipping cost (optional).';

comment on column lms.shipments.currency is 'ISO-4217 currency code.';

comment on column lms.shipments.pickup_date is 'Pickup date (planned or actual).';

comment on column lms.shipments.delivery_date is 'Delivery date (actual).';

comment on column lms.shipments.estimated_delivery_date is 'Estimated delivery date.';

comment on column lms.shipments.special_instructions is 'Special handling instructions.';

comment on column lms.shipments.created_by is 'FK to auth.users(id) who created the shipment.';

comment on column lms.shipments.created_at is 'Row creation timestamp (UTC).';

comment on column lms.shipments.updated_at is 'Row last-updated timestamp (UTC).';

-- Table and column documentation: lms.packages
comment on table lms.packages is 'Packages belonging to a shipment with dimensions and weight.';

comment on column lms.packages.id is 'Primary key: UUID for the package.';

comment on column lms.packages.shipment_id is 'FK to lms.shipments(id).';

comment on column lms.packages.package_number is 'Shipment-local identifier for the package (unique per shipment).';

comment on column lms.packages.weight is 'Weight of the package (kg).';

comment on column lms.packages.length is 'Length (cm).';

comment on column lms.packages.width is 'Width (cm).';

comment on column lms.packages.height is 'Height (cm).';

comment on column lms.packages.package_type is 'Packaging type (see lms.package_type).';

comment on column lms.packages.contents_description is 'Short description of package contents.';

comment on column lms.packages.declared_value is 'Declared value for customs/insurance.';

comment on column lms.packages.created_at is 'Row creation timestamp (UTC).';

comment on column lms.packages.updated_at is 'Row last-updated timestamp (UTC).';

-- Indexes for lms.shipments
-- tracking_number is unique already
create index idx_lms_shipments_sender_company on lms.shipments(sender_company_id);

create index idx_lms_shipments_sender_contact on lms.shipments(sender_contact_id);

create index idx_lms_shipments_sender_address on lms.shipments(sender_address_id);

create index idx_lms_shipments_receiver_company on lms.shipments(receiver_company_id);

create index idx_lms_shipments_receiver_contact on lms.shipments(receiver_contact_id);

create index idx_lms_shipments_receiver_address on lms.shipments(receiver_address_id);

create index idx_lms_shipments_service on lms.shipments(service_id);

create index idx_lms_shipments_primary_mode on lms.shipments(primary_transport_mode);

create index idx_lms_shipments_status on lms.shipments(status);

create index idx_lms_shipments_pickup_date on lms.shipments(pickup_date);

create index idx_lms_shipments_delivery_date on lms.shipments(delivery_date);

create index idx_lms_shipments_est_delivery on lms.shipments(estimated_delivery_date);

create index idx_lms_shipments_created_by on lms.shipments(created_by);

create index idx_lms_shipments_created_at on lms.shipments(created_at);

-- Indexes for lms.packages
create index idx_lms_packages_shipment on lms.packages(shipment_id);

create index idx_lms_packages_pkg_number on lms.packages(package_number);

create index idx_lms_packages_weight on lms.packages(weight);

create index idx_lms_packages_package_type on lms.packages(package_type);

create index idx_lms_packages_created_at on lms.packages(created_at);

-- Triggers for lms.shipments
create trigger shipments_set_updated_at
  before update on lms.shipments for each row
  execute function lms.tg_set_updated_at();

create trigger shipments_normalize_fields
  before insert or update on lms.shipments for each row
  execute function lms.tg_shipments_normalize_fields();

create trigger shipments_validate_dates
  before insert or update on lms.shipments for each row
  execute function lms.tg_shipments_validate_dates();

-- Triggers for lms.packages
create trigger packages_set_updated_at
  before update on lms.packages for each row
  execute function lms.tg_set_updated_at();

create trigger packages_trim_and_validate
  before insert or update on lms.packages for each row
  execute function lms.tg_packages_trim_and_validate();

-- Comments
comment on trigger shipments_set_updated_at on lms.shipments is 'Keeps updated_at current.';

comment on trigger shipments_normalize_fields on lms.shipments is 'Uppercases tracking_number/currency.';

comment on trigger shipments_validate_dates on lms.shipments is 'Validates date ordering (delivery/estimated >= pickup).';

comment on trigger packages_set_updated_at on lms.packages is 'Keeps updated_at current.';

comment on trigger packages_trim_and_validate on lms.packages is 'Trims package_number and validates dimensions.';

-- Constraints & FK actions
alter table lms.packages
  drop constraint if exists packages_shipment_id_fkey,
  add constraint packages_shipment_id_fkey foreign key (shipment_id) references lms.shipments(id) on delete cascade,
  add constraint packages_declared_value_nonneg check (declared_value is null or declared_value >= 0),
  add constraint packages_dims_positive check ((length is null or length > 0) and (width is null or width > 0) and (height is null or height > 0));

alter table lms.shipments
  add constraint shipments_amounts_nonneg check ((total_value is null or total_value >= 0) and (insurance_amount is null or insurance_amount >= 0) and (shipping_cost is null or shipping_cost >= 0)),
  add constraint shipments_currency_check check (char_length(currency) = 3 and currency = upper(currency));

-- Performance indexes
-- moved to lms-transport-legs migration to avoid forward reference
-- Adjust FKs to set-null on delete for optional CRM/auth references
alter table lms.shipments
  drop constraint if exists shipments_sender_company_id_fkey,
  add constraint shipments_sender_company_id_fkey foreign key (sender_company_id) references crm.companies(id) on delete set null,
  drop constraint if exists shipments_sender_contact_id_fkey,
  add constraint shipments_sender_contact_id_fkey foreign key (sender_contact_id) references crm.contacts(id) on delete set null,
  drop constraint if exists shipments_receiver_company_id_fkey,
  add constraint shipments_receiver_company_id_fkey foreign key (receiver_company_id) references crm.companies(id) on delete set null,
  drop constraint if exists shipments_receiver_contact_id_fkey,
  add constraint shipments_receiver_contact_id_fkey foreign key (receiver_contact_id) references crm.contacts(id) on delete set null,
  drop constraint if exists shipments_created_by_fkey,
  add constraint shipments_created_by_fkey foreign key (created_by) references auth.users(id) on delete set null;

