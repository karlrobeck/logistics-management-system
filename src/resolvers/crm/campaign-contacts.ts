import { Insertable, Selectable, Updateable } from 'kysely';
import { db } from '../../db';
import {
  CrmCampaignContactsInsert,
  CrmCampaignContactsUpdate,
  crmCampaignContactsInsertSchema,
  crmCampaignContactsUpdateSchema,
} from '../../db/schemas';
import { DB } from '../../db/types';
import { CrmCampaignNode } from './campaigns';
import { CrmContactNode } from './contacts';

export class CrmCampaignContactNode {
  constructor(private model: Selectable<DB['crmCampaignContacts']>) {}

  id() {
    return this.model.id;
  }

  status() {
    return this.model.status;
  }

  interactionDate() {
    return this.model.interactionDate;
  }

  async campaign() {
    const campaign = await db
      .selectFrom('crmCampaigns')
      .selectAll()
      .where('id', '=', this.model.campaignId)
      .executeTakeFirst();

    return campaign ? new CrmCampaignNode(campaign) : null;
  }

  async contact() {
    const contact = await db
      .selectFrom('crmContacts')
      .selectAll()
      .where('id', '=', this.model.contactId)
      .executeTakeFirst();

    return contact ? new CrmContactNode(contact) : null;
  }

  created() {
    return this.model.created;
  }

  updated() {
    return this.model.updated;
  }
}

export const queries = {
  list: async (page: number, limit: number) => {
    const campaignContacts = await db
      .selectFrom('crmCampaignContacts')
      .selectAll()
      .offset((page - 1) * limit)
      .limit(limit)
      .execute();

    return campaignContacts.map((item) => new CrmCampaignContactNode(item));
  },
  view: async (id: string) => {
    const campaignContact = await db
      .selectFrom('crmCampaignContacts')
      .selectAll()
      .where('id', '=', id)
      .executeTakeFirstOrThrow();

    return new CrmCampaignContactNode(campaignContact);
  },
  listByCampaign: async (campaignId: string) => {
    const campaignContacts = await db
      .selectFrom('crmCampaignContacts')
      .selectAll()
      .where('campaignId', '=', campaignId)
      .execute();

    return campaignContacts.map((item) => new CrmCampaignContactNode(item));
  },
  listByContact: async (contactId: string) => {
    const campaignContacts = await db
      .selectFrom('crmCampaignContacts')
      .selectAll()
      .where('contactId', '=', contactId)
      .execute();

    return campaignContacts.map((item) => new CrmCampaignContactNode(item));
  },
};

export const mutations = {
  createCrmCampaignContact: async (payload: CrmCampaignContactsInsert) => {
    const parsedPayload = crmCampaignContactsInsertSchema.parse(payload);

    const newCampaignContact = await db
      .insertInto('crmCampaignContacts')
      .values(parsedPayload)
      .returningAll()
      .executeTakeFirstOrThrow();

    return new CrmCampaignContactNode(newCampaignContact);
  },
  updateCrmCampaignContact: async (
    id: string,
    payload: CrmCampaignContactsUpdate,
  ) => {
    const parsedPayload = crmCampaignContactsUpdateSchema.parse(payload);

    const updatedCampaignContact = await db
      .updateTable('crmCampaignContacts')
      .set(parsedPayload)
      .where('id', '=', id)
      .returningAll()
      .executeTakeFirstOrThrow();

    return new CrmCampaignContactNode(updatedCampaignContact);
  },
  deleteCrmCampaignContact: async (id: string) => {
    await db.deleteFrom('crmCampaignContacts').where('id', '=', id).execute();

    return { success: true, message: 'Campaign contact deleted successfully.' };
  },
};

export default {
  queries,
  mutations,
};
