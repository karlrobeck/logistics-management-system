-- Add up migration script here
create type lms.warehouse_type as enum(
  'distribution',
  'fulfillment',
  'cross_dock',
  'cold_storage',
  'bonded'
);

create type lms.warehouse_inventory_status as enum(
  'received',
  'stored',
  'picked',
  'shipped'
);

create table lms.warehouses(
  id uuid not null primary key default gen_random_uuid(),
  name varchar(100) not null,
  code varchar(10) not null unique,
  address_id uuid not null references lms.addresses(id),
  warehouse_type lms.warehouse_type not null,
  capacity integer,
  is_active boolean not null default true,
  manager_id uuid references auth.users(id),
  created_at timestamp with time zone not null default now(),
  updated_at timestamp with time zone not null default now()
);

create table lms.warehouse_inventories(
  id uuid not null primary key default gen_random_uuid(),
  warehouse_id uuid not null references lms.warehouses(id),
  shipment_id uuid not null references lms.shipments(id),
  package_id uuid not null references lms.packages(id),
  location_code varchar(20),
  status lms.warehouse_inventory_status not null,
  arrived_at timestamptz,
  departed_at timestamptz,
  created_at timestamp with time zone not null default now(),
  updated_at timestamp with time zone not null default now()
);

-- Type documentation
comment on type lms.warehouse_type is 'Classification of warehouse operations.';

comment on type lms.warehouse_inventory_status is 'Lifecycle state of inventory within a warehouse.';

-- Table and column documentation: lms.warehouses
comment on table lms.warehouses is 'Warehouse facilities used in logistics operations.';

comment on column lms.warehouses.id is 'Primary key: UUID for the warehouse.';

comment on column lms.warehouses.name is 'Warehouse display name.';

comment on column lms.warehouses.code is 'Short unique code for the warehouse.';

comment on column lms.warehouses.address_id is 'FK to lms.addresses(id).';

comment on column lms.warehouses.warehouse_type is 'Warehouse type (see lms.warehouse_type).';

comment on column lms.warehouses.capacity is 'Optional capacity number (unit depends on org policy).';

comment on column lms.warehouses.is_active is 'Whether the warehouse is active.';

comment on column lms.warehouses.manager_id is 'FK to auth.users(id) managing this warehouse.';

comment on column lms.warehouses.created_at is 'Row creation timestamp (UTC).';

comment on column lms.warehouses.updated_at is 'Row last-updated timestamp (UTC).';

-- Table and column documentation: lms.warehouse_inventories
comment on table lms.warehouse_inventories is 'Inventory mapping of packages within warehouses.';

comment on column lms.warehouse_inventories.id is 'Primary key: UUID for the inventory record.';

comment on column lms.warehouse_inventories.warehouse_id is 'FK to lms.warehouses(id).';

comment on column lms.warehouse_inventories.shipment_id is 'FK to lms.shipments(id).';

comment on column lms.warehouse_inventories.package_id is 'FK to lms.packages(id).';

comment on column lms.warehouse_inventories.location_code is 'Optional location/shelf/bin code inside the warehouse.';

comment on column lms.warehouse_inventories.status is 'Inventory status (see lms.warehouse_inventory_status).';

comment on column lms.warehouse_inventories.arrived_at is 'When the package arrived at the warehouse.';

comment on column lms.warehouse_inventories.departed_at is 'When the package departed the warehouse.';

comment on column lms.warehouse_inventories.created_at is 'Row creation timestamp (UTC).';

comment on column lms.warehouse_inventories.updated_at is 'Row last-updated timestamp (UTC).';

-- Indexes for lms.warehouses
-- code is unique already
create index idx_lms_warehouses_name on lms.warehouses(name);

create index idx_lms_warehouses_address on lms.warehouses(address_id);

create index idx_lms_warehouses_type on lms.warehouses(warehouse_type);

create index idx_lms_warehouses_is_active on lms.warehouses(is_active);

create index idx_lms_warehouses_manager on lms.warehouses(manager_id);

create index idx_lms_warehouses_created_at on lms.warehouses(created_at);

create index idx_lms_warehouses_is_active_true on lms.warehouses(is_active)
where
  is_active = true;

-- Indexes for lms.warehouse_inventories
create index idx_lms_whinv_warehouse on lms.warehouse_inventories(warehouse_id);

create index idx_lms_whinv_shipment on lms.warehouse_inventories(shipment_id);

create index idx_lms_whinv_package on lms.warehouse_inventories(package_id);

create index idx_lms_whinv_status on lms.warehouse_inventories(status);

create index idx_lms_whinv_arrived_at on lms.warehouse_inventories(arrived_at);

create index idx_lms_whinv_departed_at on lms.warehouse_inventories(departed_at);

create index idx_lms_whinv_created_at on lms.warehouse_inventories(created_at);

-- Triggers for lms.warehouses
create trigger warehouses_set_updated_at
  before update on lms.warehouses for each row
  execute function lms.tg_set_updated_at();

create trigger warehouses_trim_fields
  before insert or update on lms.warehouses for each row
  execute function lms.tg_warehouses_trim_fields();

-- Triggers for lms.warehouse_inventories
create trigger warehouse_inventories_set_updated_at
  before update on lms.warehouse_inventories for each row
  execute function lms.tg_set_updated_at();

create trigger warehouse_inventories_validate_times
  before insert or update on lms.warehouse_inventories for each row
  execute function lms.tg_warehouse_inventory_validate_timestamps();

-- Comments
comment on trigger warehouses_set_updated_at on lms.warehouses is 'Keeps updated_at current.';

comment on trigger warehouses_trim_fields on lms.warehouses is 'Trims name and uppercases code.';

comment on trigger warehouse_inventories_set_updated_at on lms.warehouse_inventories is 'Keeps updated_at current.';

comment on trigger warehouse_inventories_validate_times on lms.warehouse_inventories is 'Validates departed_at >= arrived_at.';

-- Constraints & checks
alter table lms.warehouses
  add constraint warehouses_capacity_nonneg check (capacity is null or capacity >= 0);

-- Enforce package->shipment coherence on inventories
create trigger warehouse_inventories_pkg_shipment_match
  before insert or update on lms.warehouse_inventories for each row
  execute function lms.tg_wh_inventory_package_matches_shipment();

comment on trigger warehouse_inventories_pkg_shipment_match on lms.warehouse_inventories is 'Ensures package.shipment_id equals row.shipment_id.';

-- Set FK actions for inventories
alter table lms.warehouse_inventories
  drop constraint if exists warehouse_inventories_warehouse_id_fkey,
  add constraint warehouse_inventories_warehouse_id_fkey foreign key (warehouse_id) references lms.warehouses(id) on delete cascade,
  drop constraint if exists warehouse_inventories_package_id_fkey,
  add constraint warehouse_inventories_package_id_fkey foreign key (package_id) references lms.packages(id) on delete cascade,
  drop constraint if exists warehouse_inventories_shipment_id_fkey,
  add constraint warehouse_inventories_shipment_id_fkey foreign key (shipment_id) references lms.shipments(id) on delete restrict;

