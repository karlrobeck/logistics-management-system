import { Insertable, Selectable, Updateable } from 'kysely';
import { db } from '../../db';
import { DB } from '../../db/types';
import { CrmContactNode } from './contacts';

export class CrmLeadNode {
  constructor(private model: Selectable<DB['crmLeads']>) {}

  id() {
    return this.model.id;
  }

  firstName() {
    return this.model.firstName;
  }

  lastName() {
    return this.model.lastName;
  }

  email() {
    return this.model.email;
  }

  phoneNumber() {
    return this.model.phoneNumber;
  }

  companyName() {
    return this.model.companyName;
  }

  leadSource() {
    return this.model.leadSource;
  }

  leadStatus() {
    return this.model.leadStatus;
  }

  leadScore() {
    return this.model.leadScore;
  }

  async convertedToContact() {
    if (!this.model.convertedToContactId) return null;

    const contact = await db
      .selectFrom('crmContacts')
      .selectAll()
      .where('id', '=', this.model.convertedToContactId)
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
    const leads = await db
      .selectFrom('crmLeads')
      .selectAll()
      .offset((page - 1) * limit)
      .limit(limit)
      .execute();

    return leads.map((lead) => new CrmLeadNode(lead));
  },
  view: async (id: string) => {
    const lead = await db
      .selectFrom('crmLeads')
      .selectAll()
      .where('id', '=', id)
      .executeTakeFirstOrThrow();

    return new CrmLeadNode(lead);
  },
};

export const mutations = {
  createCrmLead: async (payload: Insertable<DB['crmLeads']>) => {
    const newLead = await db
      .insertInto('crmLeads')
      .values(payload)
      .returningAll()
      .executeTakeFirstOrThrow();

    return new CrmLeadNode(newLead);
  },
  updateCrmLead: async (id: string, payload: Updateable<DB['crmLeads']>) => {
    const updatedLead = await db
      .updateTable('crmLeads')
      .set(payload)
      .where('id', '=', id)
      .returningAll()
      .executeTakeFirstOrThrow();

    return new CrmLeadNode(updatedLead);
  },
  deleteCrmLead: async (id: string) => {
    await db.deleteFrom('crmLeads').where('id', '=', id).execute();

    return { success: true, message: 'Lead deleted successfully.' };
  },
};

export default {
  queries,
  mutations,
};
