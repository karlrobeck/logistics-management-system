-- Add down migration script here
drop table lms.packages;

drop table lms.shipments;

drop type lms.package_type;

drop type lms.shipment_status;

drop type lms.transport_mode;

