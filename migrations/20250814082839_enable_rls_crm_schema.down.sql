-- Add down migration script here
-- Disable Row Level Security (RLS) for CRM Schema and drop all policies
-- ========================================
-- DROP CRM.NOTIFICATIONS POLICIES
-- ========================================
drop policy if exists notifications_delete on crm.notifications;

drop policy if exists notifications_insert on crm.notifications;

drop policy if exists notifications_update on crm.notifications;

drop policy if exists notifications_org_access on crm.notifications;

-- ========================================
-- DROP CRM.INVOICE_LINE_ITEMS POLICIES
-- ========================================
drop policy if exists invoice_line_items_delete on crm.invoice_line_items;

drop policy if exists invoice_line_items_insert on crm.invoice_line_items;

drop policy if exists invoice_line_items_update on crm.invoice_line_items;

drop policy if exists invoice_line_items_access on crm.invoice_line_items;

-- ========================================
-- DROP CRM.INVOICES POLICIES
-- ========================================
drop policy if exists invoices_delete on crm.invoices;

drop policy if exists invoices_insert on crm.invoices;

drop policy if exists invoices_update on crm.invoices;

drop policy if exists invoices_org_access on crm.invoices;

-- ========================================
-- DROP CRM.OPPORTUNITY_PRODUCTS POLICIES
-- ========================================
drop policy if exists opportunity_products_delete on crm.opportunity_products;

drop policy if exists opportunity_products_insert on crm.opportunity_products;

drop policy if exists opportunity_products_update on crm.opportunity_products;

drop policy if exists opportunity_products_access on crm.opportunity_products;

-- ========================================
-- DROP CRM.PRODUCTS POLICIES
-- ========================================
drop policy if exists products_delete on crm.products;

drop policy if exists products_insert on crm.products;

drop policy if exists products_update on crm.products;

drop policy if exists products_org_access on crm.products;

-- ========================================
-- DROP CRM.CASES POLICIES
-- ========================================
drop policy if exists cases_delete on crm.cases;

drop policy if exists cases_insert on crm.cases;

drop policy if exists cases_update on crm.cases;

drop policy if exists cases_org_access on crm.cases;

-- ========================================
-- DROP CRM.CAMPAIGN_CONTACTS POLICIES
-- ========================================
drop policy if exists campaign_contacts_delete on crm.campaign_contacts;

drop policy if exists campaign_contacts_insert on crm.campaign_contacts;

drop policy if exists campaign_contacts_update on crm.campaign_contacts;

drop policy if exists campaign_contacts_access on crm.campaign_contacts;

-- ========================================
-- DROP CRM.CAMPAIGNS POLICIES
-- ========================================
drop policy if exists campaigns_delete on crm.campaigns;

drop policy if exists campaigns_insert on crm.campaigns;

drop policy if exists campaigns_update on crm.campaigns;

drop policy if exists campaigns_org_access on crm.campaigns;

-- ========================================
-- DROP CRM.INTERACTIONS POLICIES
-- ========================================
drop policy if exists interactions_delete on crm.interactions;

drop policy if exists interactions_insert on crm.interactions;

drop policy if exists interactions_update on crm.interactions;

drop policy if exists interactions_org_access on crm.interactions;

-- ========================================
-- DROP CRM.OPPORTUNITIES POLICIES
-- ========================================
drop policy if exists opportunities_delete on crm.opportunities;

drop policy if exists opportunities_insert on crm.opportunities;

drop policy if exists opportunities_update on crm.opportunities;

drop policy if exists opportunities_org_access on crm.opportunities;

-- ========================================
-- DROP CRM.LEADS POLICIES
-- ========================================
drop policy if exists leads_delete on crm.leads;

drop policy if exists leads_insert on crm.leads;

drop policy if exists leads_update on crm.leads;

drop policy if exists leads_org_access on crm.leads;

-- ========================================
-- DROP CRM.CONTACTS POLICIES
-- ========================================
drop policy if exists contacts_delete on crm.contacts;

drop policy if exists contacts_insert on crm.contacts;

drop policy if exists contacts_update on crm.contacts;

drop policy if exists contacts_org_access on crm.contacts;

-- ========================================
-- DROP CRM.COMPANIES POLICIES
-- ========================================
drop policy if exists companies_delete on crm.companies;

drop policy if exists companies_insert on crm.companies;

drop policy if exists companies_update on crm.companies;

drop policy if exists companies_org_access on crm.companies;

-- ========================================
-- DISABLE RLS ON CRM TABLES
-- ========================================
-- Disable RLS on crm.notifications
alter table crm.notifications disable row level security;

-- Disable RLS on crm.invoice_line_items
alter table crm.invoice_line_items disable row level security;

-- Disable RLS on crm.invoices
alter table crm.invoices disable row level security;

-- Disable RLS on crm.opportunity_products
alter table crm.opportunity_products disable row level security;

-- Disable RLS on crm.products
alter table crm.products disable row level security;

-- Disable RLS on crm.cases
alter table crm.cases disable row level security;

-- Disable RLS on crm.campaign_contacts
alter table crm.campaign_contacts disable row level security;

-- Disable RLS on crm.campaigns
alter table crm.campaigns disable row level security;

-- Disable RLS on crm.interactions
alter table crm.interactions disable row level security;

-- Disable RLS on crm.opportunities
alter table crm.opportunities disable row level security;

-- Disable RLS on crm.leads
alter table crm.leads disable row level security;

-- Disable RLS on crm.contacts
alter table crm.contacts disable row level security;

-- Disable RLS on crm.companies
alter table crm.companies disable row level security;

