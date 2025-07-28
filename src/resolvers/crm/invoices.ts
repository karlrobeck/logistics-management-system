import { Insertable, Selectable, Updateable } from "kysely";
import { db } from "../../db";
import { DB } from "../../db/types";
import { CrmCompanyNode } from "./companies";
import { CrmContactNode } from "./contacts";
import {
  CrmInvoicesInsert,
  crmInvoicesInsertSchema,
  CrmInvoicesUpdate,
  crmInvoicesUpdateSchema,
} from "../../db/schemas";

export class CrmInvoiceNode {
  constructor(private model: Selectable<DB["crmInvoices"]>) {}

  id() {
    return this.model.id;
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

  paymentTerms() {
    return this.model.paymentTerms;
  }

  async contact() {
    if (!this.model.contactId) return null;

    const contact = await db
      .selectFrom("crmContacts")
      .selectAll()
      .where("id", "=", this.model.contactId)
      .executeTakeFirst();

    return contact ? new CrmContactNode(contact) : null;
  }

  async company() {
    if (!this.model.companyId) return null;

    const company = await db
      .selectFrom("crmCompanies")
      .selectAll()
      .where("id", "=", this.model.companyId)
      .executeTakeFirst();

    return company ? new CrmCompanyNode(company) : null;
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
    const invoices = await db
      .selectFrom("crmInvoices")
      .selectAll()
      .offset((page - 1) * limit)
      .limit(limit)
      .execute();

    return invoices.map((invoice) => new CrmInvoiceNode(invoice));
  },
  view: async (id: string) => {
    const invoice = await db
      .selectFrom("crmInvoices")
      .selectAll()
      .where("id", "=", id)
      .executeTakeFirstOrThrow();

    return new CrmInvoiceNode(invoice);
  },
};

export const mutations = {
  createCrmInvoice: async (payload: CrmInvoicesInsert) => {
    const parsedPayload = crmInvoicesInsertSchema.parse(payload);

    const newInvoice = await db
      .insertInto("crmInvoices")
      .values(parsedPayload)
      .returningAll()
      .executeTakeFirstOrThrow();

    return new CrmInvoiceNode(newInvoice);
  },
  updateCrmInvoice: async (
    id: string,
    payload: CrmInvoicesUpdate,
  ) => {
    const parsedPayload = crmInvoicesUpdateSchema.parse(payload);

    const updatedInvoice = await db
      .updateTable("crmInvoices")
      .set(parsedPayload)
      .where("id", "=", id)
      .returningAll()
      .executeTakeFirstOrThrow();

    return new CrmInvoiceNode(updatedInvoice);
  },
  deleteCrmInvoice: async (id: string) => {
    await db.deleteFrom("crmInvoices").where("id", "=", id).execute();

    return { success: true, message: "Invoice deleted successfully." };
  },
};

export default {
  queries,
  mutations,
};
