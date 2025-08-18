-- Drop triggers
drop trigger if exists shipments_notify_status_change on lms.shipments;

drop trigger if exists shipments_notify_pickup_scheduled on lms.shipments;

drop trigger if exists tracking_events_notify on lms.tracking_events;

-- Drop functions
drop function if exists lms.tg_notify_shipment_status_change();

drop function if exists lms.tg_notify_pickup_scheduled();

drop function if exists lms.tg_notify_tracking_event();

