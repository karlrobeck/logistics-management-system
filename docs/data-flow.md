```mermaid
%% High-Level System Data Flow
graph TD
    subgraph "External Entities"
        A[Customer]
        B[Sales/Support Rep]
        C[Logistics Coordinator]
        D[Transportation Provider]
    end

    subgraph "CRM System"
        subgraph "Lead & Opportunity Management"
            direction LR
            P1[Capture Lead]
            P2[Convert Lead to Contact/Company]
            P3[Create Opportunity]
            P4[Manage Interactions]
        end
        subgraph "Sales & Invoicing"
            direction LR
            P5[Add Products to Opportunity]
            P6[Generate Invoice]
        end
        DS1["crm.leads"]
        DS2["crm.contacts"]
        DS3["crm.companies"]
        DS4["crm.opportunities"]
        DS5["crm.interactions"]
        DS6["crm.products"]
        DS7["crm.invoices"]
    end

    subgraph "LMS (Logistics Management System)"
        subgraph "Shipment & Tracking"
            direction LR
            P7[Create Shipment]
            P8[Track Shipment]
            P9[Manage Warehouse Inventory]
        end
        DS8["lms.shipments"]
        DS9["lms.packages"]
        DS10["lms.tracking_events"]
        DS11["lms.warehouses"]
    end

    subgraph "TMS (Transportation Management System)"
        direction LR
        P10[Assign Driver/Vehicle]
        DS12["tms.drivers"]
        DS13["tms.vehicles"]
    end

    %% Connections
    A -- "Lead Info" --> P1
    B -- "Manages Leads/Opportunities" --> P1 & P3
    P1 --> DS1
    P2 --> DS2 & DS3
    P3 --> DS4
    B -- "Logs Interaction" --> P4
    P4 --> DS5
    B -- "Adds Products" --> P5
    P5 -- "Opportunity Products" --> DS4 & DS6
    B -- "Generates Invoice" --> P6
    P6 --> DS7

    DS7 -- "Shipment Request" --> P7
    C -- "Creates Shipment" --> P7
    P7 --> DS8 & DS9
    D -- "Tracking Update" --> P8
    P8 --> DS10
    C -- "Manages Inventory" --> P9
    P9 --> DS11

    P7 -- "Assigns Transport" --> P10
    P10 --> DS12 & DS13
```

Detailed Process: Lead to Invoice This diagram shows the flow from capturing a
new lead to generating an invoice.

```mermaid
graph TD
    A[Customer] -- "Provides Info" --> P1[Capture Lead]
    P1 -- "Stores Lead Data" --> DS1["crm.leads"]
    B[Sales Rep] -- "Qualifies Lead" --> P2[Convert Lead]
    P2 -- "Creates" --> DS2["crm.contacts"]
    P2 -- "Creates" --> DS3["crm.companies"]
    B -- "Creates Opportunity" --> P3[Manage Opportunity]
    P3 -- "Updates" --> DS4["crm.opportunities"]
    P3 -- "Logs" --> DS5["crm.interactions"]
    B -- "Adds Products" --> P4[Add Opportunity Products]
    P4 -- "Reads Product Info" --> DS6["crm.products"]
    P4 -- "Updates" --> DS4
    B -- "Generates Invoice" --> P5[Create Invoice]
    P5 -- "Reads Company/Contact Info" --> DS2 & DS3
    P5 -- "Reads Opportunity Info" --> DS4
    P5 -- "Creates" --> DS7["crm.invoices"]
    P5 -- "Creates" --> DS7_LI["crm.invoice_line_items"]
```

Detailed Process: Shipment Creation and Tracking This diagram details the
process of creating a shipment from an invoice and tracking its progress.

```mermaid
graph TD
    DS_Inv["crm.invoices"] -- "Triggers Shipment" --> P1[Create Shipment]
    C[Logistics Coordinator] -- "Enters Shipment Details" --> P1
    P1 -- "Reads" --> DS_Addr["lms.addresses"]
    P1 -- "Reads" --> DS_Serv["lms.shipping_services"]
    P1 -- "Creates" --> DS_Ship["lms.shipments"]
    P1 -- "Creates" --> DS_Pack["lms.packages"]

    P1 -- "Requests Transport" --> P2[Assign Transport Leg]
    P2 -- "Reads" --> DS_Prov["lms.transportation_providers"]
    P2 -- "Reads" --> DS_Driv["tms.drivers"]
    P2 -- "Reads" --> DS_Veh["tms.vehicles"]
    P2 -- "Creates" --> DS_Leg["lms.transport_legs"]

    D[Transportation Provider] -- "Sends Tracking Update" --> P3[Update Tracking Event]
    P3 -- "Creates" --> DS_Track["lms.tracking_events"]
    P3 -- "Updates" --> DS_Ship

    C -- "Manages Warehouse" --> P4[Update Warehouse Inventory]
    P4 -- "Reads" --> DS_Ware["lms.warehouses"]
    P4 -- "Creates/Updates" --> DS_Inv["lms.warehouse_inventories"]
```

Process Flowchart: Shipment Creation and Tracking This flowchart shows the
sequential steps involved in the shipment process.

```mermaid
flowchart TD
    Start([Start]) --> A{Invoice Finalized in CRM};
    A --> B["Logistics Coordinator <br> Initiates Shipment"];
    B --> C{"Gather Shipment Info <br> (Addresses, Service)"};
    C --> D["Create Records: <br> lms.shipments <br> lms.packages"];
    D --> E{"Assign Transport Leg <br> (Provider, Driver, Vehicle)"};
    E --> F["Create Record: <br> lms.transport_legs"];
    F --> G{Shipment in Transit};
    G --> H["Transportation Provider <br> Sends Tracking Update"];
    H --> I["Create Record: <br> lms.tracking_events"];
    I --> J["Update Status in <br> lms.shipments"];
    J --> K{Shipment Arrives/Departs <br> Warehouse?};
    K -- Yes --> L["Logistics Coordinator <br> Scans Packages"];
    L --> M["Update Record: <br> lms.warehouse_inventories"];
    M --> N([End]);
    K -- No --> G;
```
