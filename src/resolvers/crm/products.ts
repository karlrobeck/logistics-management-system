import { Insertable, Selectable, Updateable } from 'kysely';
import { db } from '../../db';
import { DB } from '../../db/types';

export class CrmProductNode {
  constructor(private model: Selectable<DB['crmProducts']>) {}

  id() {
    return this.model.id;
  }

  name() {
    return this.model.name;
  }

  description() {
    return this.model.description;
  }

  price() {
    return this.model.price;
  }

  sku() {
    return this.model.sku;
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
    const products = await db
      .selectFrom('crmProducts')
      .selectAll()
      .offset((page - 1) * limit)
      .limit(limit)
      .execute();

    return products.map((product) => new CrmProductNode(product));
  },
  view: async (id: string) => {
    const product = await db
      .selectFrom('crmProducts')
      .selectAll()
      .where('id', '=', id)
      .executeTakeFirstOrThrow();

    return new CrmProductNode(product);
  },
};

export const mutations = {
  createCrmProduct: async (payload: Insertable<DB['crmProducts']>) => {
    const newProduct = await db
      .insertInto('crmProducts')
      .values(payload)
      .returningAll()
      .executeTakeFirstOrThrow();

    return new CrmProductNode(newProduct);
  },
  updateCrmProduct: async (
    id: string,
    payload: Updateable<DB['crmProducts']>,
  ) => {
    const updatedProduct = await db
      .updateTable('crmProducts')
      .set(payload)
      .where('id', '=', id)
      .returningAll()
      .executeTakeFirstOrThrow();

    return new CrmProductNode(updatedProduct);
  },
  deleteCrmProduct: async (id: string) => {
    await db.deleteFrom('crmProducts').where('id', '=', id).execute();

    return { success: true, message: 'Product deleted successfully.' };
  },
};

export default {
  queries,
  mutations,
};
