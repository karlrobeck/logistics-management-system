import { Insertable, Selectable, Updateable } from 'kysely';
import { db } from '../../db';
import {
  LmsProviderInvoiceLineItemsInsert,
  LmsProviderInvoiceLineItemsUpdate,
  lmsProviderInvoiceLineItemsInsertSchema,
  lmsProviderInvoiceLineItemsUpdateSchema,
} from '../../db/schemas';
import { DB } from '../../db/types';

class LmsProviderInvoiceLineItemNode {
  constructor(private model: Selectable<DB['lmsProviderInvoiceLineItems']>) {}

  id() {
    return this.model.id;
  }

  providerInvoiceId() {
    return this.model.providerInvoiceId;
  }

  transportLegId() {
    return this.model.transportLegId;
  }

  description() {
    return this.model.description;
  }

  quantity() {
    return this.model.quantity;
  }

  unitPrice() {
    return this.model.unitPrice;
  }

  lineTotal() {
    return this.model.lineTotal;
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
    const lineItems = await db
      .selectFrom('lmsProviderInvoiceLineItems')
      .selectAll()
      .offset((page - 1) * limit)
      .limit(limit)
      .execute();

    return lineItems.map((item) => new LmsProviderInvoiceLineItemNode(item));
  },
  view: async (id: string) => {
    const lineItem = await db
      .selectFrom('lmsProviderInvoiceLineItems')
      .selectAll()
      .where('id', '=', id)
      .executeTakeFirstOrThrow();

    return new LmsProviderInvoiceLineItemNode(lineItem);
  },
  listByInvoice: async (providerInvoiceId: string) => {
    const lineItems = await db
      .selectFrom('lmsProviderInvoiceLineItems')
      .selectAll()
      .where('providerInvoiceId', '=', providerInvoiceId)
      .execute();

    return lineItems.map((item) => new LmsProviderInvoiceLineItemNode(item));
  },
  listByTransportLeg: async (transportLegId: string) => {
    const lineItems = await db
      .selectFrom('lmsProviderInvoiceLineItems')
      .selectAll()
      .where('transportLegId', '=', transportLegId)
      .execute();

    return lineItems.map((item) => new LmsProviderInvoiceLineItemNode(item));
  },
};

export const mutations = {
  createLmsProviderInvoiceLineItem: async (
    payload: LmsProviderInvoiceLineItemsInsert,
  ) => {
    const parsedPayload =
      lmsProviderInvoiceLineItemsInsertSchema.parse(payload);
    const newLineItem = await db
      .insertInto('lmsProviderInvoiceLineItems')
      .values(parsedPayload)
      .returningAll()
      .executeTakeFirstOrThrow();

    return new LmsProviderInvoiceLineItemNode(newLineItem);
  },
  updateLmsProviderInvoiceLineItem: async (
    id: string,
    payload: LmsProviderInvoiceLineItemsUpdate,
  ) => {
    const parsedPayload =
      lmsProviderInvoiceLineItemsUpdateSchema.parse(payload);
    const updatedLineItem = await db
      .updateTable('lmsProviderInvoiceLineItems')
      .set(parsedPayload)
      .where('id', '=', id)
      .returningAll()
      .executeTakeFirstOrThrow();

    return new LmsProviderInvoiceLineItemNode(updatedLineItem);
  },
  deleteLmsProviderInvoiceLineItem: async (id: string) => {
    await db
      .deleteFrom('lmsProviderInvoiceLineItems')
      .where('id', '=', id)
      .execute();

    return {
      success: true,
      message: 'Provider invoice line item deleted successfully.',
    };
  },
};

export default {
  queries,
  mutations,
};
