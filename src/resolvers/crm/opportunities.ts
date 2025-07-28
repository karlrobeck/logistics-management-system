import { Insertable, Selectable, Updateable } from "kysely";
import { db } from "../../db";
import { DB } from "../../db/types";
import { CrmCompanyNode } from "./companies";
import { CrmContactNode } from "./contacts";
import {
  CrmOpportunitiesInsert,
  crmOpportunitiesInsertSchema,
  CrmOpportunitiesUpdate,
  crmOpportunitiesUpdateSchema,
} from "../../db/schemas";

export class CrmOpportunityNode {
  constructor(private model: Selectable<DB["crmOpportunities"]>) {}

  id() {
    return this.model.id;
  }

  name() {
    return this.model.name;
  }

  amount() {
    return this.model.amount;
  }

  probability() {
    return this.model.probability;
  }

  stage() {
    return this.model.stage;
  }

  closeDate() {
    return this.model.closeDate;
  }

  async primaryContact() {
    if (!this.model.primaryContactId) return null;

    const contact = await db
      .selectFrom("crmContacts")
      .selectAll()
      .where("id", "=", this.model.primaryContactId)
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
    const opportunities = await db
      .selectFrom("crmOpportunities")
      .selectAll()
      .offset((page - 1) * limit)
      .limit(limit)
      .execute();

    return opportunities.map(
      (opportunity) => new CrmOpportunityNode(opportunity),
    );
  },
  view: async (id: string) => {
    const opportunity = await db
      .selectFrom("crmOpportunities")
      .selectAll()
      .where("id", "=", id)
      .executeTakeFirstOrThrow();

    return new CrmOpportunityNode(opportunity);
  },
};

export const mutations = {
  createCrmOpportunity: async (payload: CrmOpportunitiesInsert) => {
    const parsedPayload = crmOpportunitiesInsertSchema.parse(payload);

    const newOpportunity = await db
      .insertInto("crmOpportunities")
      .values(parsedPayload)
      .returningAll()
      .executeTakeFirstOrThrow();

    return new CrmOpportunityNode(newOpportunity);
  },
  updateCrmOpportunity: async (
    id: string,
    payload: CrmOpportunitiesUpdate,
  ) => {
    const parsedPayload = crmOpportunitiesUpdateSchema.parse(payload);

    const updatedOpportunity = await db
      .updateTable("crmOpportunities")
      .set(parsedPayload)
      .where("id", "=", id)
      .returningAll()
      .executeTakeFirstOrThrow();

    return new CrmOpportunityNode(updatedOpportunity);
  },
  deleteCrmOpportunity: async (id: string) => {
    await db.deleteFrom("crmOpportunities").where("id", "=", id).execute();

    return { success: true, message: "Opportunity deleted successfully." };
  },
};

export default {
  queries,
  mutations,
};
