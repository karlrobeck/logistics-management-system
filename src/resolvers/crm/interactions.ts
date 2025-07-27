import { Insertable, Selectable, Updateable } from 'kysely';
import { db } from '../../db';
import { DB } from '../../db/types';
import { CrmContactNode } from './contacts';
import { CrmOpportunityNode } from './opportunities';

export class CrmInteractionNode {
  constructor(private model: Selectable<DB['crmInteractions']>) {}

  id() {
    return this.model.id;
  }

  type() {
    return this.model.type;
  }

  subject() {
    return this.model.subject;
  }

  description() {
    return this.model.description;
  }

  interactionDate() {
    return this.model.interactionDate;
  }

  async contact() {
    if (!this.model.contactId) return null;

    const contact = await db
      .selectFrom('crmContacts')
      .selectAll()
      .where('id', '=', this.model.contactId)
      .executeTakeFirst();

    return contact ? new CrmContactNode(contact) : null;
  }

  async opportunity() {
    if (!this.model.opportunityId) return null;

    const opportunity = await db
      .selectFrom('crmOpportunities')
      .selectAll()
      .where('id', '=', this.model.opportunityId)
      .executeTakeFirst();

    return opportunity ? new CrmOpportunityNode(opportunity) : null;
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
    const interactions = await db
      .selectFrom('crmInteractions')
      .selectAll()
      .offset((page - 1) * limit)
      .limit(limit)
      .execute();

    return interactions.map(
      (interaction) => new CrmInteractionNode(interaction),
    );
  },
  view: async (id: string) => {
    const interaction = await db
      .selectFrom('crmInteractions')
      .selectAll()
      .where('id', '=', id)
      .executeTakeFirstOrThrow();

    return new CrmInteractionNode(interaction);
  },
};

export const mutations = {
  createCrmInteraction: async (payload: Insertable<DB['crmInteractions']>) => {
    const newInteraction = await db
      .insertInto('crmInteractions')
      .values(payload)
      .returningAll()
      .executeTakeFirstOrThrow();

    return new CrmInteractionNode(newInteraction);
  },
  updateCrmInteraction: async (
    id: string,
    payload: Updateable<DB['crmInteractions']>,
  ) => {
    const updatedInteraction = await db
      .updateTable('crmInteractions')
      .set(payload)
      .where('id', '=', id)
      .returningAll()
      .executeTakeFirstOrThrow();

    return new CrmInteractionNode(updatedInteraction);
  },
  deleteCrmInteraction: async (id: string) => {
    await db.deleteFrom('crmInteractions').where('id', '=', id).execute();

    return { success: true, message: 'Interaction deleted successfully.' };
  },
};

export default {
  queries,
  mutations,
};
