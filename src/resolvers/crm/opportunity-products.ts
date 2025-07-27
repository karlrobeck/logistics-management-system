import { Insertable, Selectable, Updateable } from 'kysely';
import { db } from '../../db';
import { DB } from '../../db/types';
import { CrmOpportunityNode } from './opportunities';
import { CrmProductNode } from './products';

export class CrmOpportunityProductNode {
  constructor(private model: Selectable<DB['crmOpportunityProducts']>) {}

  id() {
    return this.model.id;
  }

  quantity() {
    return this.model.quantity;
  }

  unitPrice() {
    return this.model.unitPrice;
  }

  totalPrice() {
    return this.model.totalPrice;
  }

  async opportunity() {
    const opportunity = await db
      .selectFrom('crmOpportunities')
      .selectAll()
      .where('id', '=', this.model.opportunityId)
      .executeTakeFirst();

    return opportunity ? new CrmOpportunityNode(opportunity) : null;
  }

  async product() {
    const product = await db
      .selectFrom('crmProducts')
      .selectAll()
      .where('id', '=', this.model.productId)
      .executeTakeFirst();

    return product ? new CrmProductNode(product) : null;
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
    const opportunityProducts = await db
      .selectFrom('crmOpportunityProducts')
      .selectAll()
      .offset((page - 1) * limit)
      .limit(limit)
      .execute();

    return opportunityProducts.map(
      (item) => new CrmOpportunityProductNode(item),
    );
  },
  view: async (id: string) => {
    const opportunityProduct = await db
      .selectFrom('crmOpportunityProducts')
      .selectAll()
      .where('id', '=', id)
      .executeTakeFirstOrThrow();

    return new CrmOpportunityProductNode(opportunityProduct);
  },
  listByOpportunity: async (opportunityId: string) => {
    const opportunityProducts = await db
      .selectFrom('crmOpportunityProducts')
      .selectAll()
      .where('opportunityId', '=', opportunityId)
      .execute();

    return opportunityProducts.map(
      (item) => new CrmOpportunityProductNode(item),
    );
  },
};

export const mutations = {
  createCrmOpportunityProduct: async (
    payload: Insertable<DB['crmOpportunityProducts']>,
  ) => {
    const newOpportunityProduct = await db
      .insertInto('crmOpportunityProducts')
      .values(payload)
      .returningAll()
      .executeTakeFirstOrThrow();

    return new CrmOpportunityProductNode(newOpportunityProduct);
  },
  updateCrmOpportunityProduct: async (
    id: string,
    payload: Updateable<DB['crmOpportunityProducts']>,
  ) => {
    const updatedOpportunityProduct = await db
      .updateTable('crmOpportunityProducts')
      .set(payload)
      .where('id', '=', id)
      .returningAll()
      .executeTakeFirstOrThrow();

    return new CrmOpportunityProductNode(updatedOpportunityProduct);
  },
  deleteCrmOpportunityProduct: async (id: string) => {
    await db
      .deleteFrom('crmOpportunityProducts')
      .where('id', '=', id)
      .execute();

    return {
      success: true,
      message: 'Opportunity product deleted successfully.',
    };
  },
};

export default {
  queries,
  mutations,
};
