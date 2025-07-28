import { Insertable, Selectable, Updateable } from "kysely";
import { db } from "../../db";
import { DB } from "../../db/types";
import {
  LmsProviderInvoicesInsert,
  lmsProviderInvoicesInsertSchema,
  LmsProviderInvoicesUpdate,
  lmsProviderInvoicesUpdateSchema,
} from "../../db/schemas";

class LmsProviderInvoiceNode {
  constructor(private model: Selectable<DB["lmsProviderInvoices"]>) {}

  id() {
    return this.model.id;
  }

  providerId() {
    return this.model.providerId;
  }

  invoiceNumber() {
    return this.model.invoiceNumber;
  }

  invoiceDate() {
    return this.model.invoiceDate;
  }

  dueDate() {
    return this.model.dueDate;
  }

  paymentDate() {
    return this.model.paymentDate;
  }

  status() {
    return this.model.status;
  }

  subtotal() {
    return this.model.subtotal;
  }

  taxAmount() {
    return this.model.taxAmount;
  }

  totalAmount() {
    return this.model.totalAmount;
  }

  currency() {
    return this.model.currency;
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
    const providerInvoices = await db
      .selectFrom("lmsProviderInvoices")
      .selectAll()
      .offset((page - 1) * limit)
      .limit(limit)
      .execute();

    return providerInvoices.map(
      (invoice) => new LmsProviderInvoiceNode(invoice),
    );
  },
  view: async (id: string) => {
    const providerInvoice = await db
      .selectFrom("lmsProviderInvoices")
      .selectAll()
      .where("id", "=", id)
      .executeTakeFirstOrThrow();

    return new LmsProviderInvoiceNode(providerInvoice);
  },
  listByProvider: async (providerId: string) => {
    const providerInvoices = await db
      .selectFrom("lmsProviderInvoices")
      .selectAll()
      .where("providerId", "=", providerId)
      .execute();

    return providerInvoices.map(
      (invoice) => new LmsProviderInvoiceNode(invoice),
    );
  },
  listByStatus: async (status: string) => {
    const providerInvoices = await db
      .selectFrom("lmsProviderInvoices")
      .selectAll()
      .where("status", "=", status as any)
      .execute();

    return providerInvoices.map(
      (invoice) => new LmsProviderInvoiceNode(invoice),
    );
  },
  viewByInvoiceNumber: async (invoiceNumber: string) => {
    const providerInvoice = await db
      .selectFrom("lmsProviderInvoices")
      .selectAll()
      .where("invoiceNumber", "=", invoiceNumber)
      .executeTakeFirstOrThrow();

    return new LmsProviderInvoiceNode(providerInvoice);
  },
};

export const mutations = {
  createLmsProviderInvoice: async (
    payload: LmsProviderInvoicesInsert,
  ) => {
    const parsedPayload = lmsProviderInvoicesInsertSchema.parse(payload);
    const newProviderInvoice = await db
      .insertInto("lmsProviderInvoices")
      .values(parsedPayload)
      .returningAll()
      .executeTakeFirstOrThrow();

    return new LmsProviderInvoiceNode(newProviderInvoice);
  },
  updateLmsProviderInvoice: async (
    id: string,
    payload: LmsProviderInvoicesUpdate,
  ) => {
    const parsedPayload = lmsProviderInvoicesUpdateSchema.parse(payload);
    const updatedProviderInvoice = await db
      .updateTable("lmsProviderInvoices")
      .set(parsedPayload)
      .where("id", "=", id)
      .returningAll()
      .executeTakeFirstOrThrow();

    return new LmsProviderInvoiceNode(updatedProviderInvoice);
  },
  deleteLmsProviderInvoice: async (id: string) => {
    await db.deleteFrom("lmsProviderInvoices").where("id", "=", id).execute();

    return { success: true, message: "Provider invoice deleted successfully." };
  },
};

export default {
  queries,
  mutations,
};
