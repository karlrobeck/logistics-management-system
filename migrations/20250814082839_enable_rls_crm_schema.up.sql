-- Add up migration script here
-- Enable Row Level Security (RLS) for CRM Schema
-- Policies apply to public role (all users) for comprehensive security
-- All CRM data is organization-scoped using org_id columns
-- ========================================
-- ENABLE RLS ON CRM TABLES
-- ========================================
-- Enable RLS on crm.companies
alter table crm.companies enable row level security;

-- Enable RLS on crm.contacts
alter table crm.contacts enable row level security;

-- Enable RLS on crm.leads
alter table crm.leads enable row level security;

-- Enable RLS on crm.opportunities
alter table crm.opportunities enable row level security;

-- Enable RLS on crm.interactions
alter table crm.interactions enable row level security;

-- Enable RLS on crm.campaigns
alter table crm.campaigns enable row level security;

-- Enable RLS on crm.campaign_contacts
alter table crm.campaign_contacts enable row level security;

-- Enable RLS on crm.cases
alter table crm.cases enable row level security;

-- Enable RLS on crm.products
alter table crm.products enable row level security;

-- Enable RLS on crm.opportunity_products
alter table crm.opportunity_products enable row level security;

-- Enable RLS on crm.invoices
alter table crm.invoices enable row level security;

-- Enable RLS on crm.invoice_line_items
alter table crm.invoice_line_items enable row level security;

-- Enable RLS on crm.notifications
alter table crm.notifications enable row level security;

-- ========================================
-- CRM.COMPANIES POLICIES
-- ========================================
-- Users can see companies in organizations they have access to
create policy companies_org_access on crm.companies
  for select to public
    using (org_id in (
      select
        org_id
      from
        org.current_user_organizations()));

-- Users with 'update' permission can modify companies
create policy companies_update on crm.companies
  for update to public
    using (org.current_user_has_permission(org_id, 'update'::org.permission_actions))
    with check (org.current_user_has_permission(org_id, 'update'::org.permission_actions));

-- Users with 'update' permission can create companies
create policy companies_insert on crm.companies
  for insert to public
    with check (org.current_user_has_permission(org_id, 'update'::org.permission_actions));

-- Users with 'delete' permission can delete companies
create policy companies_delete on crm.companies
  for delete to public
    using (org.current_user_has_permission(org_id, 'delete'::org.permission_actions));

-- ========================================
-- CRM.CONTACTS POLICIES
-- ========================================
-- Users can see contacts in organizations they have access to
create policy contacts_org_access on crm.contacts
  for select to public
    using (org_id in (
      select
        org_id
      from
        org.current_user_organizations()));

-- Users with 'update' permission can modify contacts
create policy contacts_update on crm.contacts
  for update to public
    using (org.current_user_has_permission(org_id, 'update'::org.permission_actions))
    with check (org.current_user_has_permission(org_id, 'update'::org.permission_actions));

-- Users with 'update' permission can create contacts
create policy contacts_insert on crm.contacts
  for insert to public
    with check (org.current_user_has_permission(org_id, 'update'::org.permission_actions));

-- Users with 'delete' permission can delete contacts
create policy contacts_delete on crm.contacts
  for delete to public
    using (org.current_user_has_permission(org_id, 'delete'::org.permission_actions));

-- ========================================
-- CRM.LEADS POLICIES
-- ========================================
-- Users can see leads in organizations they have access to
create policy leads_org_access on crm.leads
  for select to public
    using (org_id in (
      select
        org_id
      from
        org.current_user_organizations()));

-- Users with 'update' permission can modify leads
create policy leads_update on crm.leads
  for update to public
    using (org.current_user_has_permission(org_id, 'update'::org.permission_actions))
    with check (org.current_user_has_permission(org_id, 'update'::org.permission_actions));

-- Users with 'update' permission can create leads
create policy leads_insert on crm.leads
  for insert to public
    with check (org.current_user_has_permission(org_id, 'update'::org.permission_actions));

-- Users with 'delete' permission can delete leads
create policy leads_delete on crm.leads
  for delete to public
    using (org.current_user_has_permission(org_id, 'delete'::org.permission_actions));

-- ========================================
-- CRM.OPPORTUNITIES POLICIES
-- ========================================
-- Users can see opportunities in organizations they have access to
create policy opportunities_org_access on crm.opportunities
  for select to public
    using (org_id in (
      select
        org_id
      from
        org.current_user_organizations()));

-- Users with 'update' permission can modify opportunities
create policy opportunities_update on crm.opportunities
  for update to public
    using (org.current_user_has_permission(org_id, 'update'::org.permission_actions))
    with check (org.current_user_has_permission(org_id, 'update'::org.permission_actions));

-- Users with 'update' permission can create opportunities
create policy opportunities_insert on crm.opportunities
  for insert to public
    with check (org.current_user_has_permission(org_id, 'update'::org.permission_actions));

-- Users with 'delete' permission can delete opportunities
create policy opportunities_delete on crm.opportunities
  for delete to public
    using (org.current_user_has_permission(org_id, 'delete'::org.permission_actions));

-- ========================================
-- CRM.INTERACTIONS POLICIES
-- ========================================
-- Users can see interactions in organizations they have access to
create policy interactions_org_access on crm.interactions
  for select to public
    using (org_id in (
      select
        org_id
      from
        org.current_user_organizations()));

-- Users with 'update' permission can modify interactions
create policy interactions_update on crm.interactions
  for update to public
    using (org.current_user_has_permission(org_id, 'update'::org.permission_actions))
    with check (org.current_user_has_permission(org_id, 'update'::org.permission_actions));

-- Users with 'update' permission can create interactions
create policy interactions_insert on crm.interactions
  for insert to public
    with check (org.current_user_has_permission(org_id, 'update'::org.permission_actions));

-- Users with 'delete' permission can delete interactions
create policy interactions_delete on crm.interactions
  for delete to public
    using (org.current_user_has_permission(org_id, 'delete'::org.permission_actions));

-- ========================================
-- CRM.CAMPAIGNS POLICIES
-- ========================================
-- Users can see campaigns in organizations they have access to
create policy campaigns_org_access on crm.campaigns
  for select to public
    using (org_id in (
      select
        org_id
      from
        org.current_user_organizations()));

-- Users with 'update' permission can modify campaigns
create policy campaigns_update on crm.campaigns
  for update to public
    using (org.current_user_has_permission(org_id, 'update'::org.permission_actions))
    with check (org.current_user_has_permission(org_id, 'update'::org.permission_actions));

-- Users with 'update' permission can create campaigns
create policy campaigns_insert on crm.campaigns
  for insert to public
    with check (org.current_user_has_permission(org_id, 'update'::org.permission_actions));

-- Users with 'delete' permission can delete campaigns
create policy campaigns_delete on crm.campaigns
  for delete to public
    using (org.current_user_has_permission(org_id, 'delete'::org.permission_actions));

-- ========================================
-- CRM.CAMPAIGN_CONTACTS POLICIES
-- ========================================
-- Users can see campaign contacts through campaign and contact access
create policy campaign_contacts_access on crm.campaign_contacts
  for select to public
    using (exists (
      select
        1
      from
        crm.campaigns c
      where
        c.id = campaign_id and c.org_id in (
          select
            org_id
          from
            org.current_user_organizations()))
            and exists (
              select
                1
              from
                crm.contacts ct
              where
                ct.id = contact_id and ct.org_id in (
                  select
                    org_id
                  from
                    org.current_user_organizations())));

-- Users with 'update' permission can modify campaign contacts
create policy campaign_contacts_update on crm.campaign_contacts
  for update to public
    using (exists (
      select
        1
      from
        crm.campaigns c
      where
        c.id = campaign_id and org.current_user_has_permission(c.org_id, 'update'::org.permission_actions)))
      with check (exists (
        select
          1
        from
          crm.campaigns c
        where
          c.id = campaign_id and org.current_user_has_permission(c.org_id, 'update'::org.permission_actions)));

-- Users with 'update' permission can create campaign contacts
create policy campaign_contacts_insert on crm.campaign_contacts
  for insert to public
    with check (exists (
      select
        1
      from
        crm.campaigns c
      where
        c.id = campaign_id and org.current_user_has_permission(c.org_id, 'update'::org.permission_actions)));

-- Users with 'delete' permission can delete campaign contacts
create policy campaign_contacts_delete on crm.campaign_contacts
  for delete to public
    using (exists (
      select
        1
      from
        crm.campaigns c
      where
        c.id = campaign_id and org.current_user_has_permission(c.org_id, 'delete'::org.permission_actions)));

-- ========================================
-- CRM.CASES POLICIES
-- ========================================
-- Users can see cases in organizations they have access to
create policy cases_org_access on crm.cases
  for select to public
    using (org_id in (
      select
        org_id
      from
        org.current_user_organizations()));

-- Users with 'update' permission can modify cases
create policy cases_update on crm.cases
  for update to public
    using (org.current_user_has_permission(org_id, 'update'::org.permission_actions))
    with check (org.current_user_has_permission(org_id, 'update'::org.permission_actions));

-- Users with 'update' permission can create cases
create policy cases_insert on crm.cases
  for insert to public
    with check (org.current_user_has_permission(org_id, 'update'::org.permission_actions));

-- Users with 'delete' permission can delete cases
create policy cases_delete on crm.cases
  for delete to public
    using (org.current_user_has_permission(org_id, 'delete'::org.permission_actions));

-- ========================================
-- CRM.PRODUCTS POLICIES
-- ========================================
-- Users can see products in organizations they have access to
create policy products_org_access on crm.products
  for select to public
    using (org_id in (
      select
        org_id
      from
        org.current_user_organizations()));

-- Users with 'update' permission can modify products
create policy products_update on crm.products
  for update to public
    using (org.current_user_has_permission(org_id, 'update'::org.permission_actions))
    with check (org.current_user_has_permission(org_id, 'update'::org.permission_actions));

-- Users with 'update' permission can create products
create policy products_insert on crm.products
  for insert to public
    with check (org.current_user_has_permission(org_id, 'update'::org.permission_actions));

-- Users with 'delete' permission can delete products
create policy products_delete on crm.products
  for delete to public
    using (org.current_user_has_permission(org_id, 'delete'::org.permission_actions));

-- ========================================
-- CRM.OPPORTUNITY_PRODUCTS POLICIES
-- ========================================
-- Users can see opportunity products through opportunity access
create policy opportunity_products_access on crm.opportunity_products
  for select to public
    using (exists (
      select
        1
      from
        crm.opportunities o
      where
        o.id = opportunity_id and o.org_id in (
          select
            org_id
          from
            org.current_user_organizations())));

-- Users with 'update' permission can modify opportunity products
create policy opportunity_products_update on crm.opportunity_products
  for update to public
    using (exists (
      select
        1
      from
        crm.opportunities o
      where
        o.id = opportunity_id and org.current_user_has_permission(o.org_id, 'update'::org.permission_actions)))
      with check (exists (
        select
          1
        from
          crm.opportunities o
        where
          o.id = opportunity_id and org.current_user_has_permission(o.org_id, 'update'::org.permission_actions)));

-- Users with 'update' permission can create opportunity products
create policy opportunity_products_insert on crm.opportunity_products
  for insert to public
    with check (exists (
      select
        1
      from
        crm.opportunities o
      where
        o.id = opportunity_id and org.current_user_has_permission(o.org_id, 'update'::org.permission_actions)));

-- Users with 'delete' permission can delete opportunity products
create policy opportunity_products_delete on crm.opportunity_products
  for delete to public
    using (exists (
      select
        1
      from
        crm.opportunities o
      where
        o.id = opportunity_id and org.current_user_has_permission(o.org_id, 'delete'::org.permission_actions)));

-- ========================================
-- CRM.INVOICES POLICIES
-- ========================================
-- Users can see invoices in organizations they have access to
create policy invoices_org_access on crm.invoices
  for select to public
    using (org_id in (
      select
        org_id
      from
        org.current_user_organizations()));

-- Users with 'update' permission can modify invoices
create policy invoices_update on crm.invoices
  for update to public
    using (org.current_user_has_permission(org_id, 'update'::org.permission_actions))
    with check (org.current_user_has_permission(org_id, 'update'::org.permission_actions));

-- Users with 'update' permission can create invoices
create policy invoices_insert on crm.invoices
  for insert to public
    with check (org.current_user_has_permission(org_id, 'update'::org.permission_actions));

-- Users with 'delete' permission can delete invoices
create policy invoices_delete on crm.invoices
  for delete to public
    using (org.current_user_has_permission(org_id, 'delete'::org.permission_actions));

-- ========================================
-- CRM.INVOICE_LINE_ITEMS POLICIES
-- ========================================
-- Users can see invoice line items through invoice access
create policy invoice_line_items_access on crm.invoice_line_items
  for select to public
    using (exists (
      select
        1
      from
        crm.invoices i
      where
        i.id = invoice_id and i.org_id in (
          select
            org_id
          from
            org.current_user_organizations())));

-- Users with 'update' permission can modify invoice line items
create policy invoice_line_items_update on crm.invoice_line_items
  for update to public
    using (exists (
      select
        1
      from
        crm.invoices i
      where
        i.id = invoice_id and org.current_user_has_permission(i.org_id, 'update'::org.permission_actions)))
      with check (exists (
        select
          1
        from
          crm.invoices i
        where
          i.id = invoice_id and org.current_user_has_permission(i.org_id, 'update'::org.permission_actions)));

-- Users with 'update' permission can create invoice line items
create policy invoice_line_items_insert on crm.invoice_line_items
  for insert to public
    with check (exists (
      select
        1
      from
        crm.invoices i
      where
        i.id = invoice_id and org.current_user_has_permission(i.org_id, 'update'::org.permission_actions)));

-- Users with 'delete' permission can delete invoice line items
create policy invoice_line_items_delete on crm.invoice_line_items
  for delete to public
    using (exists (
      select
        1
      from
        crm.invoices i
      where
        i.id = invoice_id and org.current_user_has_permission(i.org_id, 'delete'::org.permission_actions)));

-- ========================================
-- CRM.NOTIFICATIONS POLICIES
-- ========================================
-- Users can see notifications in organizations they have access to
create policy notifications_org_access on crm.notifications
  for select to public
    using (org_id in (
      select
        org_id
      from
        org.current_user_organizations()));

-- Users with 'update' permission can modify notifications
create policy notifications_update on crm.notifications
  for update to public
    using (org.current_user_has_permission(org_id, 'update'::org.permission_actions))
    with check (org.current_user_has_permission(org_id, 'update'::org.permission_actions));

-- Users with 'update' permission can create notifications
create policy notifications_insert on crm.notifications
  for insert to public
    with check (org.current_user_has_permission(org_id, 'update'::org.permission_actions));

-- Users with 'delete' permission can delete notifications
create policy notifications_delete on crm.notifications
  for delete to public
    using (org.current_user_has_permission(org_id, 'delete'::org.permission_actions));

-- ========================================
-- COMMENTS ON POLICIES
-- ========================================
comment on policy companies_org_access on crm.companies is 'Users can view companies in organizations they have access to.';

comment on policy companies_update on crm.companies is 'Users with update permission can modify companies.';

comment on policy companies_insert on crm.companies is 'Users with update permission can create companies.';

comment on policy companies_delete on crm.companies is 'Users with delete permission can delete companies.';

comment on policy contacts_org_access on crm.contacts is 'Users can view contacts in organizations they have access to.';

comment on policy contacts_update on crm.contacts is 'Users with update permission can modify contacts.';

comment on policy contacts_insert on crm.contacts is 'Users with update permission can create contacts.';

comment on policy contacts_delete on crm.contacts is 'Users with delete permission can delete contacts.';

comment on policy leads_org_access on crm.leads is 'Users can view leads in organizations they have access to.';

comment on policy leads_update on crm.leads is 'Users with update permission can modify leads.';

comment on policy leads_insert on crm.leads is 'Users with update permission can create leads.';

comment on policy leads_delete on crm.leads is 'Users with delete permission can delete leads.';

comment on policy opportunities_org_access on crm.opportunities is 'Users can view opportunities in organizations they have access to.';

comment on policy opportunities_update on crm.opportunities is 'Users with update permission can modify opportunities.';

comment on policy opportunities_insert on crm.opportunities is 'Users with update permission can create opportunities.';

comment on policy opportunities_delete on crm.opportunities is 'Users with delete permission can delete opportunities.';

comment on policy interactions_org_access on crm.interactions is 'Users can view interactions in organizations they have access to.';

comment on policy interactions_update on crm.interactions is 'Users with update permission can modify interactions.';

comment on policy interactions_insert on crm.interactions is 'Users with update permission can create interactions.';

comment on policy interactions_delete on crm.interactions is 'Users with delete permission can delete interactions.';

comment on policy campaigns_org_access on crm.campaigns is 'Users can view campaigns in organizations they have access to.';

comment on policy campaigns_update on crm.campaigns is 'Users with update permission can modify campaigns.';

comment on policy campaigns_insert on crm.campaigns is 'Users with update permission can create campaigns.';

comment on policy campaigns_delete on crm.campaigns is 'Users with delete permission can delete campaigns.';

comment on policy campaign_contacts_access on crm.campaign_contacts is 'Users can view campaign contacts if they have access to both campaign and contact.';

comment on policy campaign_contacts_update on crm.campaign_contacts is 'Users with update permission can modify campaign contacts.';

comment on policy campaign_contacts_insert on crm.campaign_contacts is 'Users with update permission can create campaign contacts.';

comment on policy campaign_contacts_delete on crm.campaign_contacts is 'Users with delete permission can delete campaign contacts.';

comment on policy cases_org_access on crm.cases is 'Users can view cases in organizations they have access to.';

comment on policy cases_update on crm.cases is 'Users with update permission can modify cases.';

comment on policy cases_insert on crm.cases is 'Users with update permission can create cases.';

comment on policy cases_delete on crm.cases is 'Users with delete permission can delete cases.';

comment on policy products_org_access on crm.products is 'Users can view products in organizations they have access to.';

comment on policy products_update on crm.products is 'Users with update permission can modify products.';

comment on policy products_insert on crm.products is 'Users with update permission can create products.';

comment on policy products_delete on crm.products is 'Users with delete permission can delete products.';

comment on policy opportunity_products_access on crm.opportunity_products is 'Users can view opportunity products if they have access to the opportunity.';

comment on policy opportunity_products_update on crm.opportunity_products is 'Users with update permission can modify opportunity products.';

comment on policy opportunity_products_insert on crm.opportunity_products is 'Users with update permission can create opportunity products.';

comment on policy opportunity_products_delete on crm.opportunity_products is 'Users with delete permission can delete opportunity products.';

comment on policy invoices_org_access on crm.invoices is 'Users can view invoices in organizations they have access to.';

comment on policy invoices_update on crm.invoices is 'Users with update permission can modify invoices.';

comment on policy invoices_insert on crm.invoices is 'Users with update permission can create invoices.';

comment on policy invoices_delete on crm.invoices is 'Users with delete permission can delete invoices.';

comment on policy invoice_line_items_access on crm.invoice_line_items is 'Users can view invoice line items if they have access to the invoice.';

comment on policy invoice_line_items_update on crm.invoice_line_items is 'Users with update permission can modify invoice line items.';

comment on policy invoice_line_items_insert on crm.invoice_line_items is 'Users with update permission can create invoice line items.';

comment on policy invoice_line_items_delete on crm.invoice_line_items is 'Users with delete permission can delete invoice line items.';

comment on policy notifications_org_access on crm.notifications is 'Users can view notifications in organizations they have access to.';

comment on policy notifications_update on crm.notifications is 'Users with update permission can modify notifications.';

comment on policy notifications_insert on crm.notifications is 'Users with update permission can create notifications.';

comment on policy notifications_delete on crm.notifications is 'Users with delete permission can delete notifications.';

