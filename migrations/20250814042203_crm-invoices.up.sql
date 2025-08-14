-- Add up migration script here
create type crm.invoice_status as enum(
  'draft',
  'sent',
  'paid',
  'overdue',
  'cancelled'
);

create table crm.invoices(
  id uuid not null primary key default gen_random_uuid(),
  invoice_number varchar(50) not null unique,
  company_id uuid references crm.companies(id),
  contact_id uuid references crm.contacts(id),
  invoice_date date not null,
  due_date date not null,
  subtotal decimal(10, 2) not null check (subtotal >= 0),
  tax_amount decimal(10, 2) not null default 0.00 check (tax_amount >= 0),
  total_amount decimal(10, 2) not null check (total_amount >= 0),
  currency varchar(3) not null default 'PHP',
  status crm.invoice_status not null,
  payment_terms varchar(100),
  created_at timestamp with time zone not null default now(),
  updated_at timestamp with time zone not null default now()
);

create table crm.invoice_line_items(
  id uuid not null primary key default gen_random_uuid(),
  invoice_id uuid not null references crm.invoices(id),
  shipment_id uuid references lms.shipments(id),
  description varchar(500) not null,
  quantity decimal(10, 2) not null default 1 check (quantity > 0),
  unit_price decimal(10, 2) not null check (unit_price >= 0),
  line_total decimal(10, 2) generated always as (unit_price * quantity) stored,
  created_at timestamp with time zone not null default now(),
  updated_at timestamp with time zone not null default now()
);

