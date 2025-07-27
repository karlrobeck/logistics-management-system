import { Insertable, Selectable, Updateable } from 'kysely';
import { db } from '../../db';
import { DB } from '../../db/types';
import { LmsShipmentNode } from '../lms/shipments';
import { CrmInvoiceNode } from './invoices';

export class CrmInvoiceLineItemNode {
  constructor(private model: Selectable<DB['crmInvoiceLineItems']>) {}

  id() {
    return this.model.id;
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

  async invoice() {
    const invoice = await db
      .selectFrom('crmInvoices')
      .selectAll()
      .where('id', '=', this.model.invoiceId)
      .executeTakeFirst();

    return invoice ? new CrmInvoiceNode(invoice) : null;
  }

  async shipment() {
    if (!this.model.shipmentId) return null;

    const shipment = await db
      .selectFrom('lmsShipments')
      .selectAll()
      .where('id', '=', this.model.shipmentId)
      .executeTakeFirst();

    return shipment ? new LmsShipmentNode(shipment) : null;
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
    const invoiceLineItems = await db
      .selectFrom('crmInvoiceLineItems')
      .selectAll()
      .offset((page - 1) * limit)
      .limit(limit)
      .execute();

    return invoiceLineItems.map((item) => new CrmInvoiceLineItemNode(item));
  },
  view: async (id: string) => {
    const invoiceLineItem = await db
      .selectFrom('crmInvoiceLineItems')
      .selectAll()
      .where('id', '=', id)
      .executeTakeFirstOrThrow();

    return new CrmInvoiceLineItemNode(invoiceLineItem);
  },
  listByInvoice: async (invoiceId: string) => {
    const invoiceLineItems = await db
      .selectFrom('crmInvoiceLineItems')
      .selectAll()
      .where('invoiceId', '=', invoiceId)
      .execute();

    return invoiceLineItems.map((item) => new CrmInvoiceLineItemNode(item));
  },
};

export const mutations = {
  createCrmInvoiceLineItem: async (
    payload: Insertable<DB['crmInvoiceLineItems']>,
  ) => {
    const newInvoiceLineItem = await db
      .insertInto('crmInvoiceLineItems')
      .values(payload)
      .returningAll()
      .executeTakeFirstOrThrow();

    return new CrmInvoiceLineItemNode(newInvoiceLineItem);
  },
  updateCrmInvoiceLineItem: async (
    id: string,
    payload: Updateable<DB['crmInvoiceLineItems']>,
  ) => {
    const updatedInvoiceLineItem = await db
      .updateTable('crmInvoiceLineItems')
      .set(payload)
      .where('id', '=', id)
      .returningAll()
      .executeTakeFirstOrThrow();

    return new CrmInvoiceLineItemNode(updatedInvoiceLineItem);
  },
  deleteCrmInvoiceLineItem: async (id: string) => {
    await db.deleteFrom('crmInvoiceLineItems').where('id', '=', id).execute();

    return {
      success: true,
      message: 'Invoice line item deleted successfully.',
    };
  },
};

export default {
  queries,
  mutations,
};
