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

-- Type documentation
comment on type lms.route_status is 'Lifecycle status of a delivery route.';

comment on type lms.delivery_status is 'Delivery status for a shipment while on a route.';

-- Table and column documentation: lms.routes
comment on table lms.routes is 'Planned/actual delivery routes with driver/vehicle assignments.';

comment on column lms.routes.id is 'Primary key: UUID for the route.';

comment on column lms.routes.route_name is 'Route display name or code.';

comment on column lms.routes.driver_id is 'FK to tms.drivers(id) assigned to this route.';

comment on column lms.routes.vehicle_id is 'FK to tms.vehicles(id) used for this route.';

comment on column lms.routes.route_date is 'Date of the route.';

comment on column lms.routes.estimated_departure is 'Planned departure timestamp.';

comment on column lms.routes.actual_departure is 'Actual departure timestamp.';

comment on column lms.routes.estimated_arrival is 'Planned arrival timestamp.';

comment on column lms.routes.actual_arrival is 'Actual arrival timestamp.';

comment on column lms.routes.status is 'Current route status.';

comment on column lms.routes.created_at is 'Row creation timestamp (UTC).';

comment on column lms.routes.updated_at is 'Row last-updated timestamp (UTC).';

-- Table and column documentation: lms.route_shipments
comment on table lms.route_shipments is 'Assignment of shipments to routes with sequence and POD.';

comment on column lms.route_shipments.id is 'Primary key: UUID for the route-shipment mapping.';

comment on column lms.route_shipments.route_id is 'FK to lms.routes(id).';

comment on column lms.route_shipments.shipment_id is 'FK to lms.shipments(id).';

comment on column lms.route_shipments.sequence_number is 'Order of delivery for this shipment on the route.';

comment on column lms.route_shipments.delivery_date is 'Planned delivery date for the stop.';

comment on column lms.route_shipments.estimated_delivery is 'Planned delivery timestamp.';

comment on column lms.route_shipments.actual_delivery is 'Actual delivery timestamp.';

comment on column lms.route_shipments.delivery_status is 'Per-shipment delivery status while on route.';

comment on column lms.route_shipments.signature_required is 'Whether recipient signature is required.';

comment on column lms.route_shipments.recipient_signature is 'Recipient name/signature captured.';

comment on column lms.route_shipments.created_at is 'Row creation timestamp (UTC).';

comment on column lms.route_shipments.updated_at is 'Row last-updated timestamp (UTC).';

-- Indexes for lms.routes
create index idx_lms_routes_driver on lms.routes(driver_id);

create index idx_lms_routes_vehicle on lms.routes(vehicle_id);

create index idx_lms_routes_date on lms.routes(route_date);

create index idx_lms_routes_status on lms.routes(status);

create index idx_lms_routes_created_at on lms.routes(created_at);

create index idx_lms_routes_active on lms.routes(status)
where
  status in ('planned', 'in_progress');

-- Indexes for lms.route_shipments
create index idx_lms_route_shipments_route on lms.route_shipments(route_id);

create index idx_lms_route_shipments_shipment on lms.route_shipments(shipment_id);

create index idx_lms_route_shipments_sequence on lms.route_shipments(sequence_number);

create index idx_lms_route_shipments_delivery_date on lms.route_shipments(delivery_date);

create index idx_lms_route_shipments_delivery_status on lms.route_shipments(delivery_status);

create index idx_lms_route_shipments_created_at on lms.route_shipments(created_at);

-- Triggers for lms.routes
create trigger routes_set_updated_at
  before update on lms.routes for each row
  execute function lms.tg_set_updated_at();

create trigger routes_trim_name
  before insert or update on lms.routes for each row
  execute function lms.tg_routes_trim_name();

create trigger routes_validate_times
  before insert or update on lms.routes for each row
  execute function lms.tg_routes_validate_times();

-- Triggers for lms.route_shipments
create trigger route_shipments_set_updated_at
  before update on lms.route_shipments for each row
  execute function lms.tg_set_updated_at();

create trigger route_shipments_trim_and_validate
  before insert or update on lms.route_shipments for each row
  execute function lms.tg_route_shipments_trim_and_validate();

-- Comments
comment on trigger routes_set_updated_at on lms.routes is 'Keeps updated_at current.';

comment on trigger routes_trim_name on lms.routes is 'Trims route_name.';

comment on trigger routes_validate_times on lms.routes is 'Ensures arrival is not earlier than departure.';

comment on trigger route_shipments_set_updated_at on lms.route_shipments is 'Keeps updated_at current.';

comment on trigger route_shipments_trim_and_validate on lms.route_shipments is 'Trims signature, validates time ordering, and enforces signature for delivered with signature_required.';

-- Constraints
alter table lms.routes
  add constraint routes_date_times_consistency check ((estimated_departure is null or estimated_arrival is null or estimated_arrival >= estimated_departure) and (actual_departure is null or actual_arrival is null or actual_arrival >= actual_departure));

alter table lms.route_shipments
  add constraint route_shipments_delivery_date_check check (delivery_date is not null);

