-- Add down migration script here
drop table lms.provider_invoice_line_items;

drop table lms.provider_invoices;

drop table lms.provider_performance;

drop table lms.provider_rates;

drop table lms.provider_service_max_dimensions;

drop table lms.provider_service_destination_countries;

drop table lms.provider_service_origin_countries;

drop table lms.provider_services;

drop table lms.transportation_providers;

drop type lms.provider_type;

drop type lms.performance_metric_type;

drop type lms.provider_invoice_status;

