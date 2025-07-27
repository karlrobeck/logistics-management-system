import CampaignContacts from './campaign-contacts';
import Campaigns from './campaigns';
import Cases from './cases';
import Companies from './companies';
import Contacts from './contacts';
import Interactions from './interactions';
import InvoiceLineItems from './invoice-line-items';
import Invoices from './invoices';
import Leads from './leads';
import Notifications from './notifications';
import Opportunities from './opportunities';
import OpportunityProducts from './opportunity-products';
import Products from './products';

export const queries = {
  contacts: Contacts.queries,
  companies: Companies.queries,
  campaigns: Campaigns.queries,
  cases: Cases.queries,
  interactions: Interactions.queries,
  leads: Leads.queries,
  opportunities: Opportunities.queries,
  products: Products.queries,
  invoices: Invoices.queries,
  invoiceLineItems: InvoiceLineItems.queries,
  notifications: Notifications.queries,
  opportunityProducts: OpportunityProducts.queries,
  campaignContacts: CampaignContacts.queries,
};

export const mutations = {
  ...Contacts.mutations,
  ...Companies.mutations,
  ...Campaigns.mutations,
  ...Cases.mutations,
  ...Interactions.mutations,
  ...Leads.mutations,
  ...Opportunities.mutations,
  ...Products.mutations,
  ...Invoices.mutations,
  ...InvoiceLineItems.mutations,
  ...Notifications.mutations,
  ...OpportunityProducts.mutations,
  ...CampaignContacts.mutations,
};

export default {
  queries,
  mutations,
};
