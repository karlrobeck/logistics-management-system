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

-- Type documentation
comment on type lms.tracking_event_type is 'Kinds of milestone events during shipment lifecycle.';

-- Table and column documentation: lms.tracking_events
comment on table lms.tracking_events is 'Event log for shipments with time and location.';

comment on column lms.tracking_events.id is 'Primary key: UUID for the event.';

comment on column lms.tracking_events.shipment_id is 'FK to lms.shipments(id).';

comment on column lms.tracking_events.event_type is 'Event type (see lms.tracking_event_type).';

comment on column lms.tracking_events.event_description is 'Short description/details of the event.';

comment on column lms.tracking_events.event_location is 'Optional free-text location for the event.';

comment on column lms.tracking_events.event_timestamp is 'When the event occurred.';

comment on column lms.tracking_events.created_at is 'Row creation timestamp (UTC).';

comment on column lms.tracking_events.updated_at is 'Row last-updated timestamp (UTC).';

-- Indexes for lms.tracking_events
create index idx_lms_tracking_events_shipment on lms.tracking_events(shipment_id);

create index idx_lms_tracking_events_event_type on lms.tracking_events(event_type);

create index idx_lms_tracking_events_timestamp on lms.tracking_events(event_timestamp);

create index idx_lms_tracking_events_created_at on lms.tracking_events(created_at);

create index idx_lms_tracking_events_shipment_ts on lms.tracking_events(shipment_id, event_timestamp desc);

-- Triggers for lms.tracking_events
create trigger tracking_events_set_updated_at
  before update on lms.tracking_events for each row
  execute function lms.tg_set_updated_at();

create trigger tracking_events_trim
  before insert or update on lms.tracking_events for each row
  execute function lms.tg_tracking_events_trim();

-- Comments
comment on trigger tracking_events_set_updated_at on lms.tracking_events is 'Keeps updated_at current.';

comment on trigger tracking_events_trim on lms.tracking_events is 'Trims event_description and event_location.';

