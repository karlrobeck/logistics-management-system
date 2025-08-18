-- Add down migration script here
drop table crm.invoice_line_items;

drop table crm.invoices;

drop type crm.invoice_status;

