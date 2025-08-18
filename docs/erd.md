```mermaid
erDiagram
    %% Auth Schema
    "auth.users" {
        UUID id PK
        TEXT name
        TEXT email UK
        TIMESTAMPTZ email_verified
        TEXT image
        TIMESTAMPTZ created_at
        TIMESTAMPTZ updated_at
    }
    "auth.sessions" {
        UUID id PK
        UUID user_id FK
        TEXT token UK
        TIMESTAMPTZ expires_at
        TEXT ip_address
        TEXT user_agent
        TIMESTAMPTZ created_at
        TIMESTAMPTZ updated_at
    }
    "auth.accounts" {
        UUID id PK
        UUID user_id FK
        TEXT account_id
        TEXT provider_id
        TEXT access_token
        TEXT refresh_token
        TIMESTAMPTZ access_token_expires_at
        TIMESTAMPTZ refresh_token_expires_at
        TEXT scope
        TEXT id_token
        TEXT password
        TIMESTAMPTZ created_at
        TIMESTAMPTZ updated_at
    }
    "auth.verification" {
        UUID id PK
        TEXT identifier
        TEXT value
        TIMESTAMPTZ expires_at
        TIMESTAMPTZ created_at
        TIMESTAMPTZ updated_at
    }

    %% Org Schema
    "org.organization" {
        UUID id PK
        TEXT name
        UUID owner_id FK
        TIMESTAMPTZ created_at
        TIMESTAMPTZ updated_at
    }
    "org.teams" {
        UUID id PK
        UUID org_id FK
        TEXT name
        TEXT description
        TIMESTAMPTZ created_at
        TIMESTAMPTZ updated_at
    }
    "org.team_members" {
        UUID id PK
        UUID team_id FK
        UUID user_id FK
        TIMESTAMPTZ created_at
        TIMESTAMPTZ updated_at
    }
    "org.roles" {
        UUID id PK
        UUID org_id FK
        TEXT name
        TEXT description
        TIMESTAMPTZ created_at
        TIMESTAMPTZ updated_at
    }
    "org.team_roles" {
        UUID role_id FK
        UUID team_id FK
    }
    "org.role_actions" {
        UUID id PK
        UUID role_id FK
        permission_actions action
        TIMESTAMPTZ created_at
        TIMESTAMPTZ updated_at
    }
    "org.team_resouces" {
        UUID id PK
        TEXT resource
        TIMESTAMPTZ created_at
        TIMESTAMPTZ updated_at
    }

    %% CRM Schema
    "crm.companies" {
        UUID id PK
        VARCHAR name UK
        TEXT description
        VARCHAR email
        VARCHAR website
        VARCHAR industry
        VARCHAR phone_number
        UUID org_id FK
        TIMESTAMPTZ created_at
        TIMESTAMPTZ updated_at
    }
    "crm.contacts" {
        UUID id PK
        VARCHAR first_name
        VARCHAR last_name
        VARCHAR email UK
        VARCHAR phone_number
        VARCHAR job_title
        VARCHAR lead_source
        contact_status status
        DATE birth_date
        UUID company_id FK
        UUID org_id FK
        TIMESTAMPTZ created_at
        TIMESTAMPTZ updated_at
    }
    "crm.leads" {
        UUID id PK
        VARCHAR first_name
        VARCHAR last_name
        VARCHAR email UK
        VARCHAR phone_number
        VARCHAR company_name
        VARCHAR lead_source
        lead_status lead_status
        INTEGER lead_score
        UUID converted_to_contact_id FK
        UUID org_id FK
        TIMESTAMPTZ created_at
        TIMESTAMPTZ updated_at
    }
    "crm.opportunities" {
        UUID id PK
        VARCHAR name
        UUID company_id FK
        UUID primary_contact_id FK
        opportunity_stage stage
        DECIMAL amount
        DATE close_date
        DECIMAL probability
        UUID org_id FK
        TIMESTAMPTZ created_at
        TIMESTAMPTZ updated_at
    }
    "crm.interactions" {
        UUID id PK
        interaction_type type
        VARCHAR subject
        TEXT description
        TIMESTAMPTZ interaction_date
        UUID contact_id FK
        UUID opportunity_id FK
        UUID org_id FK
        TIMESTAMPTZ created_at
        TIMESTAMPTZ updated_at
    }
    "crm.campaigns" {
        UUID id PK
        VARCHAR name
        TEXT description
        DATE start_date
        DATE end_date
        DECIMAL budget
        campaign_status status
        UUID org_id FK
        TIMESTAMPTZ created_at
        TIMESTAMPTZ updated_at
    }
    "crm.campaign_contacts" {
        UUID id PK
        UUID campaign_id FK
        UUID contact_id FK
        campaign_contacts_status status
        TIMESTAMPTZ interaction_date
        TIMESTAMPTZ created_at
        TIMESTAMPTZ updated_at
    }
    "crm.cases" {
        UUID id PK
        VARCHAR subject
        TEXT description
        case_status status
        case_priority priority
        UUID contact_id FK
        TIMESTAMPTZ closed_at
        UUID org_id FK
        TIMESTAMPTZ created_at
        TIMESTAMPTZ updated_at
    }
    "crm.products" {
        UUID id PK
        VARCHAR name UK
        TEXT description
        DECIMAL price
        VARCHAR sku UK
        UUID org_id FK
        TIMESTAMPTZ created_at
        TIMESTAMPTZ updated_at
    }
    "crm.opportunity_products" {
        UUID id PK
        UUID opportunity_id FK
        UUID product_id FK
        DECIMAL quantity
        DECIMAL unit_price
        DECIMAL total_price
        TIMESTAMPTZ created_at
        TIMESTAMPTZ updated_at
    }
    "crm.invoices" {
        UUID id PK
        VARCHAR invoice_number UK
        UUID company_id FK
        UUID contact_id FK
        DATE invoice_date
        DATE due_date
        DECIMAL subtotal
        DECIMAL tax_amount
        DECIMAL total_amount
        VARCHAR currency
        invoice_status status
        VARCHAR payment_terms
        UUID org_id FK
        TIMESTAMPTZ created_at
        TIMESTAMPTZ updated_at
    }
    "crm.invoice_line_items" {
        UUID id PK
        UUID invoice_id FK
        UUID shipment_id FK
        VARCHAR description
        DECIMAL quantity
        DECIMAL unit_price
        DECIMAL line_total
        TIMESTAMPTZ created_at
        TIMESTAMPTZ updated_at
    }
    "crm.notifications" {
        UUID id PK
        UUID shipment_id FK
        UUID contact_id FK
        notification_type notification_type
        notification_channel channel
        VARCHAR recipient
        VARCHAR subject
        TEXT message
        TIMESTAMPTZ sent_at
        notification_delivery_status delivery_status
        UUID org_id FK
        TIMESTAMPTZ created_at
        TIMESTAMPTZ updated_at
    }

    %% TMS Schema
    "tms.drivers" {
        UUID id PK
        VARCHAR employee_id UK
        VARCHAR first_name
        VARCHAR last_name
        VARCHAR license_number UK
        VARCHAR phone_number
        VARCHAR email UK
        DATE hire_date
        driver_status status
        UUID org_id FK
        TIMESTAMPTZ created_at
        TIMESTAMPTZ updated_at
    }
    "tms.vehicles" {
        UUID id PK
        VARCHAR vehicle_number UK
        VARCHAR license_plate UK
        vehicle_type vehicle_type
        VARCHAR make
        VARCHAR model
        INTEGER year
        DECIMAL capacity_weight
        DECIMAL capacity_volume
        vehicle_status status
        UUID org_id FK
        TIMESTAMPTZ created_at
        TIMESTAMPTZ updated_at
    }

    %% LMS Schema
    "lms.addresses" {
        UUID id PK
        VARCHAR address_line1
        VARCHAR address_line2
        VARCHAR city
        VARCHAR state
        VARCHAR postal_code
        VARCHAR country
        address_type address_type
        BOOLEAN is_validated
        DECIMAL latitude
        DECIMAL longitude
        UUID org_id FK
        TIMESTAMPTZ created_at
        TIMESTAMPTZ updated_at
    }
    "lms.shipping_services" {
        UUID id PK
        VARCHAR name UK
        TEXT description
        service_type service_type
        DECIMAL max_weight
        INTEGER delivery_time_min
        INTEGER delivery_time_max
        BOOLEAN is_active
        UUID org_id FK
        TIMESTAMPTZ created_at
        TIMESTAMPTZ updated_at
    }
    "lms.shipping_service_max_dimensions" {
        UUID id PK
        UUID shipping_service_id FK
        DECIMAL length
        DECIMAL width
        DECIMAL height
        TIMESTAMPTZ created_at
    }
    "lms.pricing_zones" {
        UUID id PK
        VARCHAR name
        VARCHAR zone_code UK
        UUID org_id FK
        TIMESTAMPTZ created_at
        TIMESTAMPTZ updated_at
    }
    "lms.pricing_zone_countries" {
        UUID id PK
        UUID pricing_zone_id FK
        VARCHAR country_code
        TIMESTAMPTZ created_at
    }
    "lms.pricing_rates" {
        UUID id PK
        UUID service_id FK
        UUID origin_zone_id FK
        UUID destination_zone_id FK
        DECIMAL weight_min
        DECIMAL weight_max
        DECIMAL base_rate
        DECIMAL per_kg_rate
        DECIMAL fuel_surcharge_rate
        DATE effective_date
        DATE expiry_date
        UUID org_id FK
        TIMESTAMPTZ created_at
        TIMESTAMPTZ updated_at
    }
    "lms.shipments" {
        UUID id PK
        VARCHAR tracking_number UK
        UUID sender_company_id FK
        UUID sender_contact_id FK
        UUID sender_address_id FK
        UUID receiver_company_id FK
        UUID receiver_contact_id FK
        UUID receiver_address_id FK
        UUID service_id FK
        transport_mode primary_transport_mode
        shipment_status status
        DECIMAL total_weight
        DECIMAL total_value
        DECIMAL insurance_amount
        DECIMAL shipping_cost
        VARCHAR currency
        DATE pickup_date
        DATE delivery_date
        DATE estimated_delivery_date
        TEXT special_instructions
        UUID created_by FK
        UUID org_id FK
        TIMESTAMPTZ created_at
        TIMESTAMPTZ updated_at
    }
    "lms.packages" {
        UUID id PK
        UUID shipment_id FK
        VARCHAR package_number
        DECIMAL weight
        DECIMAL length
        DECIMAL width
        DECIMAL height
        package_type package_type
        TEXT contents_description
        DECIMAL declared_value
        TIMESTAMPTZ created_at
        TIMESTAMPTZ updated_at
    }
    "lms.tracking_events" {
        UUID id PK
        UUID shipment_id FK
        tracking_event_type event_type
        VARCHAR event_description
        VARCHAR event_location
        TIMESTAMPTZ event_timestamp
        UUID org_id FK
        TIMESTAMPTZ created_at
        TIMESTAMPTZ updated_at
    }
    "lms.warehouses" {
        UUID id PK
        VARCHAR name
        VARCHAR code UK
        UUID address_id FK
        warehouse_type warehouse_type
        INTEGER capacity
        BOOLEAN is_active
        UUID manager_id FK
        UUID org_id FK
        TIMESTAMPTZ created_at
        TIMESTAMPTZ updated_at
    }
    "lms.warehouse_inventories" {
        UUID id PK
        UUID warehouse_id FK
        UUID shipment_id FK
        UUID package_id FK
        VARCHAR location_code
        warehouse_inventory_status status
        TIMESTAMPTZ arrived_at
        TIMESTAMPTZ departed_at
        TIMESTAMPTZ created_at
        TIMESTAMPTZ updated_at
    }
    "lms.transportation_providers" {
        UUID id PK
        VARCHAR company_name
        provider_type provider_type
        VARCHAR contact_person
        VARCHAR email
        VARCHAR phone_number
        UUID address_id FK
        VARCHAR api_endpoint
        TEXT api_key
        DATE contract_start_date
        DATE contract_end_date
        VARCHAR payment_terms
        DECIMAL insurance_coverage
        DECIMAL performance_rating
        BOOLEAN is_active
        UUID org_id FK
        TIMESTAMPTZ created_at
        TIMESTAMPTZ updated_at
    }
    "lms.provider_services" {
        UUID id PK
        UUID provider_id FK
        VARCHAR service_name
        service_type service_type
        transport_mode transport_mode
        DECIMAL max_weight
        INTEGER transit_time_min
        INTEGER transit_time_max
        TIME cutoff_time
        BOOLEAN tracking_available
        BOOLEAN insurance_available
        BOOLEAN is_active
        TIMESTAMPTZ created_at
        TIMESTAMPTZ updated_at
    }
    "lms.provider_service_origin_countries" {
        UUID id PK
        UUID provider_service_id FK
        VARCHAR country_code
        TIMESTAMPTZ created_at
    }
    "lms.provider_service_destination_countries" {
        UUID id PK
        UUID provider_service_id FK
        VARCHAR country_code
        TIMESTAMPTZ created_at
    }
    "lms.provider_service_max_dimensions" {
        UUID id PK
        UUID provider_service_id FK
        DECIMAL length
        DECIMAL width
        DECIMAL height
        TIMESTAMPTZ created_at
    }
    "lms.provider_rates" {
        UUID id PK
        UUID provider_service_id FK
        UUID origin_zone_id FK
        UUID destination_zone_id FK
        DECIMAL weight_min
        DECIMAL weight_max
        DECIMAL base_rate
        DECIMAL per_kg_rate
        DECIMAL fuel_surcharge_rate
        VARCHAR currency
        DATE effective_date
        DATE expiry_date
        UUID org_id FK
        TIMESTAMPTZ created_at
        TIMESTAMPTZ updated_at
    }
    "lms.provider_performance" {
        UUID id PK
        UUID provider_id FK
        UUID shipment_id FK
        performance_metric_type metric_type
        DECIMAL metric_value
        DATE measurement_date
        TEXT notes
        UUID transport_leg_id FK
        TIMESTAMPTZ created_at
        TIMESTAMPTZ updated_at
    }
    "lms.provider_invoices" {
        UUID id PK
        UUID provider_id FK
        VARCHAR invoice_number
        DATE invoice_date
        DATE due_date
        DECIMAL subtotal
        DECIMAL tax_amount
        DECIMAL total_amount
        VARCHAR currency
        provider_invoice_status status
        DATE payment_date
        TIMESTAMPTZ created_at
        TIMESTAMPTZ updated_at
    }
    "lms.provider_invoice_line_items" {
        UUID id PK
        UUID provider_invoice_id FK
        VARCHAR description
        INTEGER quantity
        DECIMAL unit_price
        DECIMAL line_total
        UUID transport_leg_id FK
        TIMESTAMPTZ created_at
        TIMESTAMPTZ updated_at
    }
    "lms.transport_legs" {
        UUID id PK
        UUID shipment_id FK
        INTEGER leg_sequence
        transport_leg_type transport_type
        UUID provider_id FK
        UUID provider_service_id FK
        VARCHAR provider_tracking_number
        UUID vehicle_id FK
        UUID driver_id FK
        UUID origin_warehouse_id FK
        UUID destination_warehouse_id FK
        UUID origin_address_id FK
        UUID destination_address_id FK
        TIMESTAMPTZ scheduled_pickup
        TIMESTAMPTZ actual_pickup
        TIMESTAMPTZ scheduled_delivery
        TIMESTAMPTZ actual_delivery
        DECIMAL cost
        VARCHAR currency
        leg_status status
        TEXT special_instructions
        TIMESTAMPTZ created_at
        TIMESTAMPTZ updated_at
    }
    "lms.routes" {
        UUID id PK
        VARCHAR route_name
        UUID driver_id FK
        UUID vehicle_id FK
        DATE route_date
        TIMESTAMPTZ estimated_departure
        TIMESTAMPTZ actual_departure
        TIMESTAMPTZ estimated_arrival
        TIMESTAMPTZ actual_arrival
        route_status status
        UUID org_id FK
        TIMESTAMPTZ created_at
        TIMESTAMPTZ updated_at
    }
    "lms.route_shipments" {
        UUID id PK
        UUID route_id FK
        UUID shipment_id FK
        INTEGER sequence_number
        DATE delivery_date
        TIMESTAMPTZ estimated_delivery
        TIMESTAMPTZ actual_delivery
        delivery_status delivery_status
        BOOLEAN signature_required
        VARCHAR recipient_signature
        TIMESTAMPTZ created_at
        TIMESTAMPTZ updated_at
    }

    %% Relationships
    "auth.users" ||--o{ "auth.sessions" : "has"
    "auth.users" ||--o{ "auth.accounts" : "has"
    "auth.users" ||--o{ "org.organization" : "owns"
    "auth.users" ||--o{ "org.team_members" : "is member of"
    "auth.users" ||--o{ "lms.shipments" : "created by"
    "auth.users" ||--o{ "lms.warehouses" : "managed by"

    "org.organization" ||--o{ "org.teams" : "has"
    "org.organization" ||--o{ "org.roles" : "has"
    "org.organization" ||--o{ "crm.companies" : "owns"
    "org.organization" ||--o{ "crm.contacts" : "owns"
    "org.organization" ||--o{ "crm.leads" : "owns"
    "org.organization" ||--o{ "crm.opportunities" : "owns"
    "org.organization" ||--o{ "crm.interactions" : "owns"
    "org.organization" ||--o{ "crm.campaigns" : "owns"
    "org.organization" ||--o{ "crm.cases" : "owns"
    "org.organization" ||--o{ "crm.products" : "owns"
    "org.organization" ||--o{ "crm.invoices" : "owns"
    "org.organization" ||--o{ "crm.notifications" : "owns"
    "org.organization" ||--o{ "tms.drivers" : "employs"
    "org.organization" ||--o{ "tms.vehicles" : "owns"
    "org.organization" ||--o{ "lms.addresses" : "owns"
    "org.organization" ||--o{ "lms.shipping_services" : "owns"
    "org.organization" ||--o{ "lms.pricing_zones" : "owns"
    "org.organization" ||--o{ "lms.pricing_rates" : "owns"
    "org.organization" ||--o{ "lms.shipments" : "owns"
    "org.organization" ||--o{ "lms.tracking_events" : "owns"
    "org.organization" ||--o{ "lms.warehouses" : "owns"
    "org.organization" ||--o{ "lms.transportation_providers" : "owns"
    "org.organization" ||--o{ "lms.provider_rates" : "owns"
    "org.organization" ||--o{ "lms.routes" : "owns"

    "org.teams" ||--|{ "org.team_members" : "has"
    "org.teams" }|--|{ "org.roles" : "has roles"

    "org.roles" ||--o{ "org.role_actions" : "has"

    "crm.companies" ||--o{ "crm.contacts" : "employs"
    "crm.companies" ||--o{ "crm.opportunities" : "has"
    "crm.companies" ||--o{ "crm.invoices" : "billed to"
    "crm.companies" ||--o{ "lms.shipments" : "sender"
    "crm.companies" ||--o{ "lms.shipments" : "receiver"

    "crm.contacts" ||--o{ "crm.leads" : "converted from"
    "crm.contacts" ||--o{ "crm.opportunities" : "primary contact for"
    "crm.contacts" ||--o{ "crm.interactions" : "interacts with"
    "crm.contacts" ||--|{ "crm.campaign_contacts" : "in campaign"
    "crm.contacts" ||--o{ "crm.cases" : "opened by"
    "crm.contacts" ||--o{ "crm.invoices" : "billed to"
    "crm.contacts" ||--o{ "lms.shipments" : "sender"
    "crm.contacts" ||--o{ "lms.shipments" : "receiver"
    "crm.contacts" ||--o{ "crm.notifications" : "receives"

    "crm.opportunities" ||--o{ "crm.interactions" : "has"
    "crm.opportunities" ||--o{ "crm.opportunity_products" : "includes"

    "crm.products" ||--o{ "crm.opportunity_products" : "is in"

    "crm.campaigns" ||--|{ "crm.campaign_contacts" : "targets"

    "crm.invoices" ||--o{ "crm.invoice_line_items" : "has"

    "tms.drivers" ||--o{ "lms.transport_legs" : "drives"
    "tms.drivers" ||--o{ "lms.routes" : "assigned to"

    "tms.vehicles" ||--o{ "lms.transport_legs" : "used for"
    "tms.vehicles" ||--o{ "lms.routes" : "assigned to"

    "lms.addresses" ||--o{ "lms.shipments" : "sender address"
    "lms.addresses" ||--o{ "lms.shipments" : "receiver address"
    "lms.addresses" ||--o{ "lms.warehouses" : "located at"
    "lms.addresses" ||--o{ "lms.transportation_providers" : "located at"
    "lms.addresses" ||--o{ "lms.transport_legs" : "origin"
    "lms.addresses" ||--o{ "lms.transport_legs" : "destination"

    "lms.shipping_services" ||--o{ "lms.shipping_service_max_dimensions" : "has"
    "lms.shipping_services" ||--o{ "lms.pricing_rates" : "has"
    "lms.shipping_services" ||--o{ "lms.shipments" : "uses"

    "lms.pricing_zones" ||--o{ "lms.pricing_zone_countries" : "includes"
    "lms.pricing_zones" ||--o{ "lms.pricing_rates" : "origin"
    "lms.pricing_zones" ||--o{ "lms.pricing_rates" : "destination"
    "lms.pricing_zones" ||--o{ "lms.provider_rates" : "origin"
    "lms.pricing_zones" ||--o{ "lms.provider_rates" : "destination"

    "lms.shipments" ||--o{ "lms.packages" : "contains"
    "lms.shipments" ||--o{ "lms.tracking_events" : "has"
    "lms.shipments" ||--o{ "lms.warehouse_inventories" : "is in"
    "lms.shipments" ||--o{ "lms.provider_performance" : "evaluates"
    "lms.shipments" ||--o{ "lms.transport_legs" : "has"
    "lms.shipments" ||--|{ "lms.route_shipments" : "is on"
    "lms.shipments" ||--o{ "crm.invoice_line_items" : "is billed in"
    "lms.shipments" ||--o{ "crm.notifications" : "triggers"

    "lms.packages" ||--o{ "lms.warehouse_inventories" : "is in"

    "lms.warehouses" ||--o{ "lms.warehouse_inventories" : "contains"
    "lms.warehouses" ||--o{ "lms.transport_legs" : "origin"
    "lms.warehouses" ||--o{ "lms.transport_legs" : "destination"

    "lms.transportation_providers" ||--o{ "lms.provider_services" : "offers"
    "lms.transportation_providers" ||--o{ "lms.provider_performance" : "is evaluated"
    "lms.transportation_providers" ||--o{ "lms.provider_invoices" : "sends"
    "lms.transportation_providers" ||--o{ "lms.transport_legs" : "handles"

    "lms.provider_services" ||--o{ "lms.provider_service_origin_countries" : "originates from"
    "lms.provider_services" ||--o{ "lms.provider_service_destination_countries" : "delivers to"
    "lms.provider_services" ||--o{ "lms.provider_service_max_dimensions" : "has"
    "lms.provider_services" ||--o{ "lms.provider_rates" : "has"
    "lms.provider_services" ||--o{ "lms.transport_legs" : "uses"

    "lms.provider_invoices" ||--o{ "lms.provider_invoice_line_items" : "has"

    "lms.transport_legs" ||--o{ "lms.provider_performance" : "is evaluated"
    "lms.transport_legs" ||--o{ "lms.provider_invoice_line_items" : "is billed in"

    "lms.routes" ||--|{ "lms.route_shipments" : "contains"
```
