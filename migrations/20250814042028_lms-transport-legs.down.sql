-- Add down migration script here
alter table lms.provider_performance
  drop column transport_leg_id;

alter table lms.provider_invoice_line_items
  drop column transport_leg_id;

drop table lms.transport_legs;

drop type lms.leg_status;

drop type lms.transport_leg_type;

