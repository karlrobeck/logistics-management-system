import { Insertable, Selectable, Updateable } from "kysely";
import { db } from "../../db";
import { DB } from "../../db/types";
import { CrmContactNode } from "./contacts";
import {
  CrmCasesInsert,
  crmCasesInsertSchema,
  CrmCasesUpdate,
  crmCasesUpdateSchema,
} from "../../db/schemas";

export class CrmCaseNode {
  constructor(private model: Selectable<DB["crmCases"]>) {}

  id() {
    return this.model.id;
  }

  subject() {
    return this.model.subject;
  }

  description() {
    return this.model.description;
  }

  priority() {
    return this.model.priority;
  }

  status() {
    return this.model.status;
  }

  closedAt() {
    return this.model.closedAt;
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

  created() {
    return this.model.created;
  }

  updated() {
    return this.model.updated;
  }
}

export const queries = {
  list: async (page: number, limit: number) => {
    const cases = await db
      .selectFrom("crmCases")
      .selectAll()
      .offset((page - 1) * limit)
      .limit(limit)
      .execute();

    return cases.map((caseItem) => new CrmCaseNode(caseItem));
  },
  view: async (id: string) => {
    const caseItem = await db
      .selectFrom("crmCases")
      .selectAll()
      .where("id", "=", id)
      .executeTakeFirstOrThrow();

    return new CrmCaseNode(caseItem);
  },
};

export const mutations = {
  createCrmCase: async (payload: CrmCasesInsert) => {
    const parsedPayload = crmCasesInsertSchema.parse(payload);

    const newCase = await db
      .insertInto("crmCases")
      .values(parsedPayload)
      .returningAll()
      .executeTakeFirstOrThrow();

    return new CrmCaseNode(newCase);
  },
  updateCrmCase: async (id: string, payload: CrmCasesUpdate) => {
    const parsedPayload = crmCasesUpdateSchema.parse(payload);

    const updatedCase = await db
      .updateTable("crmCases")
      .set(parsedPayload)
      .where("id", "=", id)
      .returningAll()
      .executeTakeFirstOrThrow();

    return new CrmCaseNode(updatedCase);
  },
  deleteCrmCase: async (id: string) => {
    await db.deleteFrom("crmCases").where("id", "=", id).execute();

    return { success: true, message: "Case deleted successfully." };
  },
};

export default {
  queries,
  mutations,
};
