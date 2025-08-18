-- Add down migration script here
drop table lms.addresses;

drop type lms.address_type;

drop schema lms cascade;

