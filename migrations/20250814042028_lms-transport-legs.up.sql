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

-- Type documentation
comment on type lms.transport_leg_type is 'Leg classification within a shipment route.';

comment on type lms.leg_status is 'Lifecycle status of a transport leg.';

-- Table and column documentation: lms.transport_legs
comment on table lms.transport_legs is 'Disaggregated legs of a shipment with timing and cost.';

comment on column lms.transport_legs.id is 'Primary key: UUID for the transport leg.';

comment on column lms.transport_legs.shipment_id is 'FK to lms.shipments(id).';

comment on column lms.transport_legs.leg_sequence is 'Sequence number within the shipment (starts at 1).';

comment on column lms.transport_legs.transport_type is 'Type of leg (pickup/linehaul/delivery/transfer).';

comment on column lms.transport_legs.provider_id is 'FK to lms.transportation_providers(id).';

comment on column lms.transport_legs.provider_service_id is 'FK to lms.provider_services(id).';

comment on column lms.transport_legs.provider_tracking_number is 'Tracking number at the provider level (optional).';

comment on column lms.transport_legs.vehicle_id is 'FK to tms.vehicles(id) used for this leg (if applicable).';

comment on column lms.transport_legs.driver_id is 'FK to tms.drivers(id) assigned to this leg (if applicable).';

comment on column lms.transport_legs.origin_warehouse_id is 'FK to lms.warehouses(id) origin (optional).';

comment on column lms.transport_legs.destination_warehouse_id is 'FK to lms.warehouses(id) destination (optional).';

comment on column lms.transport_legs.origin_address_id is 'FK to lms.addresses(id) origin (optional).';

comment on column lms.transport_legs.destination_address_id is 'FK to lms.addresses(id) destination (optional).';

comment on column lms.transport_legs.scheduled_pickup is 'Planned pickup timestamp.';

comment on column lms.transport_legs.actual_pickup is 'Actual pickup timestamp.';

comment on column lms.transport_legs.scheduled_delivery is 'Planned delivery timestamp.';

comment on column lms.transport_legs.actual_delivery is 'Actual delivery timestamp.';

comment on column lms.transport_legs.cost is 'Cost attributed to this leg.';

comment on column lms.transport_legs.currency is 'ISO-4217 currency code for the leg cost.';

comment on column lms.transport_legs.status is 'Current status of the leg.';

comment on column lms.transport_legs.special_instructions is 'Special handling or notes for this leg.';

comment on column lms.transport_legs.created_at is 'Row creation timestamp (UTC).';

comment on column lms.transport_legs.updated_at is 'Row last-updated timestamp (UTC).';

-- Indexes for lms.transport_legs
create index idx_lms_transport_legs_shipment on lms.transport_legs(shipment_id);

create index idx_lms_transport_legs_sequence on lms.transport_legs(leg_sequence);

create index idx_lms_transport_legs_type on lms.transport_legs(transport_type);

create index idx_lms_transport_legs_provider on lms.transport_legs(provider_id);

create index idx_lms_transport_legs_provider_service on lms.transport_legs(provider_service_id);

create index idx_lms_transport_legs_vehicle on lms.transport_legs(vehicle_id);

create index idx_lms_transport_legs_driver on lms.transport_legs(driver_id);

create index idx_lms_transport_legs_origin_wh on lms.transport_legs(origin_warehouse_id);

create index idx_lms_transport_legs_dest_wh on lms.transport_legs(destination_warehouse_id);

create index idx_lms_transport_legs_origin_addr on lms.transport_legs(origin_address_id);

create index idx_lms_transport_legs_dest_addr on lms.transport_legs(destination_address_id);

create index idx_lms_transport_legs_sched_pickup on lms.transport_legs(scheduled_pickup);

create index idx_lms_transport_legs_actual_pickup on lms.transport_legs(actual_pickup);

create index idx_lms_transport_legs_sched_delivery on lms.transport_legs(scheduled_delivery);

create index idx_lms_transport_legs_actual_delivery on lms.transport_legs(actual_delivery);

create index idx_lms_transport_legs_status on lms.transport_legs(status);

create index idx_lms_transport_legs_created_at on lms.transport_legs(created_at);

create index idx_lms_transport_legs_status_active on lms.transport_legs(status)
where
  status in ('planned', 'in_progress');

create index idx_lms_transport_legs_shipment_seq on lms.transport_legs(shipment_id, leg_sequence);

-- Triggers for lms.transport_legs
create trigger transport_legs_set_updated_at
  before update on lms.transport_legs for each row
  execute function lms.tg_set_updated_at();

create trigger transport_legs_validate_times
  before insert or update on lms.transport_legs for each row
  execute function lms.tg_transport_legs_validate_times();

create trigger transport_legs_validate_provider_service
  before insert or update on lms.transport_legs for each row
  execute function lms.tg_transport_legs_validate_provider_service();

create trigger transport_legs_upper_currency
  before insert or update on lms.transport_legs for each row
  execute function lms.tg_upper_currency();

-- Comments
comment on trigger transport_legs_set_updated_at on lms.transport_legs is 'Keeps updated_at current.';

comment on trigger transport_legs_validate_times on lms.transport_legs is 'Ensures actual times are not earlier than scheduled.';

comment on trigger transport_legs_validate_provider_service on lms.transport_legs is 'Ensures provider_service belongs to the provider.';

comment on trigger transport_legs_upper_currency on lms.transport_legs is 'Uppercases currency code.';

-- Constraints
alter table lms.transport_legs
  add constraint transport_legs_provider_pairing check ((provider_id is null and provider_service_id is null) or (provider_id is not null and provider_service_id is not null)),
  add constraint transport_legs_origin_presence check ((origin_warehouse_id is not null) or (origin_address_id is not null)),
  add constraint transport_legs_destination_presence check ((destination_warehouse_id is not null) or (destination_address_id is not null)),
  add constraint transport_legs_currency_check check (currency is null or (char_length(currency) = 3 and currency = upper(currency)));

