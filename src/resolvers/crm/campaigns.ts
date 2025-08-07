import { Insertable, Selectable, Updateable } from "kysely";
import { db } from "../../db";
import {
  CrmCampaignsInsert,
  crmCampaignsInsertSchema,
  CrmCampaignsUpdate,
  crmCampaignsUpdateSchema,
} from "../../db/schemas";
import { DB } from "../../db/types";

export class CrmCampaignNode {
  constructor(private model: Selectable<DB["crmCampaigns"]>) {}

  id() {
    return this.model.id;
  }

  name() {
    return this.model.name;
  }

  description() {
    return this.model.description;
  }

  budget() {
    return this.model.budget;
  }

  startDate() {
    return this.model.startDate;
  }

  endDate() {
    return this.model.endDate;
  }

  status() {
    return this.model.status;
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
    const campaigns = await db
      .selectFrom("crmCampaigns")
      .selectAll()
      .offset((page - 1) * limit)
      .limit(limit)
      .execute();

    return campaigns.map((campaign) => new CrmCampaignNode(campaign));
  },
  view: async (id: string) => {
    const campaign = await db
      .selectFrom("crmCampaigns")
      .selectAll()
      .where("id", "=", id)
      .executeTakeFirstOrThrow();

    return new CrmCampaignNode(campaign);
  },
};

export const mutations = {
  createCrmCampaign: async (createCrmCampaign: CrmCampaignsInsert) => {
    const parsedPayload = crmCampaignsInsertSchema.parse(createCrmCampaign);

    const newCampaign = await db
      .insertInto("crmCampaigns")
      .values(parsedPayload)
      .returningAll()
      .executeTakeFirstOrThrow();

    return new CrmCampaignNode(newCampaign);
  },
  updateCrmCampaign: async (id: string, payload: CrmCampaignsUpdate) => {
    const parsedPayload = crmCampaignsUpdateSchema.parse(payload);

    const updatedCampaign = await db
      .updateTable("crmCampaigns")
      .set(parsedPayload)
      .where("id", "=", id)
      .returningAll()
      .executeTakeFirstOrThrow();

    return new CrmCampaignNode(updatedCampaign);
  },
  deleteCrmCampaign: async (id: string) => {
    await db.deleteFrom("crmCampaigns").where("id", "=", id).execute();

    return { success: true, message: "Campaign deleted successfully." };
  },
};

export default {
  queries,
  mutations,
};
