-- Add up migration script here
create type crm.invoice_status as enum(
  'draft',
  'sent',
  'paid',
  'overdue',
  'cancelled'
);

-- Type documentation
comment on type crm.invoice_status is 'Lifecycle status of CRM invoices.';

create table crm.invoices(
  id uuid not null primary key default gen_random_uuid(),
  invoice_number varchar(50) not null unique,
  company_id uuid references crm.companies(id),
  contact_id uuid references crm.contacts(id),
  invoice_date date not null,
  due_date date not null,
  subtotal decimal(10, 2) not null check (subtotal >= 0),
  tax_amount decimal(10, 2) not null default 0.00 check (tax_amount >= 0),
  total_amount decimal(10, 2) not null check (total_amount >= 0) generated always as ((subtotal + tax_amount)) stored,
  currency varchar(3) not null default 'PHP',
  status crm.invoice_status not null,
  payment_terms varchar(100),
  created_at timestamp with time zone not null default now(),
  updated_at timestamp with time zone not null default now()
);

-- Table and column documentation: crm.invoices
comment on table crm.invoices is 'Customer invoices for shipments or CRM billable items.';

comment on column crm.invoices.id is 'Primary key: UUID for the invoice.';

comment on column crm.invoices.invoice_number is 'Unique invoice number (human-readable).';

comment on column crm.invoices.company_id is 'FK to crm.companies(id) for the billed company.';

comment on column crm.invoices.contact_id is 'FK to crm.contacts(id) for the billed contact.';

comment on column crm.invoices.invoice_date is 'Date when the invoice was issued.';

comment on column crm.invoices.due_date is 'Payment due date.';

comment on column crm.invoices.subtotal is 'Subtotal amount before taxes.';

comment on column crm.invoices.tax_amount is 'Tax amount applied to the invoice.';

comment on column crm.invoices.total_amount is 'Total amount billed (subtotal + taxes + adjustments).';

comment on column crm.invoices.currency is 'ISO-4217 currency code.';

comment on column crm.invoices.status is 'Invoice lifecycle status (see crm.invoice_status).';

comment on column crm.invoices.payment_terms is 'Payment terms (e.g., Net-30).';

comment on column crm.invoices.created_at is 'Row creation timestamp (UTC).';

comment on column crm.invoices.updated_at is 'Row last-updated timestamp (UTC).';

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

-- Indexes for crm.invoices
-- invoice_number is unique already
create index idx_crm_invoices_company on crm.invoices(company_id);

create index idx_crm_invoices_contact on crm.invoices(contact_id);

create index idx_crm_invoices_status on crm.invoices(status);

create index idx_crm_invoices_invoice_date on crm.invoices(invoice_date);

create index idx_crm_invoices_due_date on crm.invoices(due_date);

create index idx_crm_invoices_created_at on crm.invoices(created_at);

-- Indexes for crm.invoice_line_items
create index idx_crm_invoice_line_items_invoice on crm.invoice_line_items(invoice_id);

create index idx_crm_invoice_line_items_shipment on crm.invoice_line_items(shipment_id);

create index idx_crm_invoice_line_items_created_at on crm.invoice_line_items(created_at);

-- Trigger functions for CRM invoices
create or replace function crm.tg_invoices_validate_and_normalize()
  returns trigger
  language plpgsql
  as $$
begin
  if new.due_date is not null and new.invoice_date is not null and new.due_date < new.invoice_date then
    raise exception 'due_date must be >= invoice_date';
  end if;
  if new.invoice_number is not null then
    new.invoice_number := btrim(new.invoice_number);
  end if;
  if new.payment_terms is not null then
    new.payment_terms := btrim(new.payment_terms);
  end if;
  if new.currency is not null then
    new.currency := upper(btrim(new.currency));
  end if;
  return new;
end;
$$;

create or replace function crm.tg_invoice_line_items_trim()
  returns trigger
  language plpgsql
  as $$
begin
  if new.description is not null then
    new.description := btrim(new.description);
  end if;
  return new;
end;
$$;

-- Triggers for CRM invoices
create trigger invoices_set_updated_at
  before update on crm.invoices for each row
  execute function crm.tg_set_updated_at();

create trigger invoices_validate_and_normalize
  before insert or update on crm.invoices for each row
  execute function crm.tg_invoices_validate_and_normalize();

-- Triggers for CRM invoice_line_items
create trigger invoice_line_items_set_updated_at
  before update on crm.invoice_line_items for each row
  execute function crm.tg_set_updated_at();

create trigger invoice_line_items_trim
  before insert or update on crm.invoice_line_items for each row
  execute function crm.tg_invoice_line_items_trim();

-- Comments on functions and triggers
comment on function crm.tg_invoices_validate_and_normalize() is 'BEFORE INSERT/UPDATE on crm.invoices: trims fields, uppercases currency, validates due_date >= invoice_date.';

comment on function crm.tg_invoice_line_items_trim() is 'BEFORE INSERT/UPDATE on crm.invoice_line_items: trims description.';

comment on trigger invoices_set_updated_at on crm.invoices is 'Keeps invoices.updated_at current on updates.';

comment on trigger invoices_validate_and_normalize on crm.invoices is 'Normalizes invoice fields and validates dates.';

comment on trigger invoice_line_items_set_updated_at on crm.invoice_line_items is 'Keeps invoice_line_items.updated_at current on updates.';

comment on trigger invoice_line_items_trim on crm.invoice_line_items is 'Trims line item description.';

-- Table and column documentation: crm.invoice_line_items
comment on table crm.invoice_line_items is 'Line items that make up an invoice total.';

comment on column crm.invoice_line_items.id is 'Primary key: UUID for the line item.';

comment on column crm.invoice_line_items.invoice_id is 'FK to crm.invoices(id) this item belongs to.';

comment on column crm.invoice_line_items.shipment_id is 'Optional FK to lms.shipments(id) this charge relates to.';

comment on column crm.invoice_line_items.description is 'Description of the billed item or service.';

comment on column crm.invoice_line_items.quantity is 'Quantity for the item (must be > 0).';

comment on column crm.invoice_line_items.unit_price is 'Unit price for this item.';

comment on column crm.invoice_line_items.line_total is 'Computed total for the line = unit_price * quantity.';

comment on column crm.invoice_line_items.created_at is 'Row creation timestamp (UTC).';

comment on column crm.invoice_line_items.updated_at is 'Row last-updated timestamp (UTC).';

