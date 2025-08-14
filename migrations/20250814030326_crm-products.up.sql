-- Add up migration script here
create table crm.products(
  id uuid not null primary key default gen_random_uuid(),
  name varchar(255) not null unique,
  description text,
  price decimal(10, 2) not null,
  sku varchar(100) unique,
  created_at timestamp with time zone not null default now(),
  updated_at timestamp with time zone not null default now()
);

-- Table and column documentation
comment on table crm.products is 'Catalog of products that can be associated with opportunities.';

comment on column crm.products.id is 'Primary key: UUID for the product.';

comment on column crm.products.name is 'Unique product name.';

comment on column crm.products.description is 'Product description.';

comment on column crm.products.price is 'Base price for the product.';

comment on column crm.products.sku is 'Stock-keeping unit code (unique).';

comment on column crm.products.created_at is 'Row creation timestamp (UTC).';

comment on column crm.products.updated_at is 'Row last-updated timestamp (UTC).';

create table crm.opportunity_products(
  id uuid not null primary key default gen_random_uuid(),
  opportunity_id uuid not null references crm.opportunities(id),
  product_id uuid not null references crm.products(id),
  quantity decimal(10, 2) not null default 1,
  unit_price decimal(10, 2) not null,
  total_price decimal(10, 2) generated always as (quantity * unit_price) stored,
  created_at timestamp with time zone not null default now(),
  updated_at timestamp with time zone not null default now()
);

-- Table and column documentation
comment on table crm.opportunity_products is 'Line items (products) attached to a sales opportunity.';

comment on column crm.opportunity_products.id is 'Primary key: UUID for the line item.';

comment on column crm.opportunity_products.opportunity_id is 'FK to crm.opportunities(id).';

comment on column crm.opportunity_products.product_id is 'FK to crm.products(id).';

comment on column crm.opportunity_products.quantity is 'Quantity of the product.';

comment on column crm.opportunity_products.unit_price is 'Unit price applied for this line item (may differ from product base price).';

comment on column crm.opportunity_products.total_price is 'Computed total = quantity * unit_price.';

comment on column crm.opportunity_products.created_at is 'Row creation timestamp (UTC).';

comment on column crm.opportunity_products.updated_at is 'Row last-updated timestamp (UTC).';

-- Indexes for crm.products
create index idx_crm_products_price on crm.products(price);

create index idx_crm_products_created_at on crm.products(created_at);

-- Indexes for crm.opportunity_products
create index idx_crm_opportunity_products_opportunity_id on crm.opportunity_products(opportunity_id);

create index idx_crm_opportunity_products_product_id on crm.opportunity_products(product_id);

create index idx_crm_opportunity_products_created_at on crm.opportunity_products(created_at);

create index idx_crm_opportunity_products_total_price on crm.opportunity_products(total_price);

create unique index uq_crm_opportunity_products_unique_line on crm.opportunity_products(opportunity_id, product_id);

