import { Insertable, Selectable, Updateable } from "kysely";
import { db } from "../../db";
import { DB } from "../../db/types";
import {
  LmsShippingServicesInsert,
  lmsShippingServicesInsertSchema,
  LmsShippingServicesUpdate,
  lmsShippingServicesUpdateSchema,
} from "../../db/schemas";

class LmsShippingServiceNode {
  constructor(private model: Selectable<DB["lmsShippingServices"]>) {}

  id() {
    return this.model.id;
  }

  name() {
    return this.model.name;
  }

  description() {
    return this.model.description;
  }

  serviceType() {
    return this.model.serviceType;
  }

  deliveryTimeMin() {
    return this.model.deliveryTimeMin;
  }

  deliveryTimeMax() {
    return this.model.deliveryTimeMax;
  }

  maxWeight() {
    return this.model.maxWeight;
  }

  isActive() {
    return this.model.isActive;
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
    const services = await db
      .selectFrom("lmsShippingServices")
      .selectAll()
      .offset((page - 1) * limit)
      .limit(limit)
      .execute();

    return services.map((service) => new LmsShippingServiceNode(service));
  },
  view: async (id: string) => {
    const service = await db
      .selectFrom("lmsShippingServices")
      .selectAll()
      .where("id", "=", id)
      .executeTakeFirstOrThrow();

    return new LmsShippingServiceNode(service);
  },
  listActive: async () => {
    const services = await db
      .selectFrom("lmsShippingServices")
      .selectAll()
      .where("isActive", "=", true)
      .execute();

    return services.map((service) => new LmsShippingServiceNode(service));
  },
  listByType: async (serviceType: string) => {
    const services = await db
      .selectFrom("lmsShippingServices")
      .selectAll()
      .where("serviceType", "=", serviceType as any)
      .execute();

    return services.map((service) => new LmsShippingServiceNode(service));
  },
};

export const mutations = {
  createLmsShippingService: async (
    payload: LmsShippingServicesInsert,
  ) => {
    const parsedPayload = lmsShippingServicesInsertSchema.parse(payload);
    const newService = await db
      .insertInto("lmsShippingServices")
      .values(parsedPayload)
      .returningAll()
      .executeTakeFirstOrThrow();

    return new LmsShippingServiceNode(newService);
  },
  updateLmsShippingService: async (
    id: string,
    payload: LmsShippingServicesUpdate,
  ) => {
    const parsedPayload = lmsShippingServicesUpdateSchema.parse(payload);
    const updatedService = await db
      .updateTable("lmsShippingServices")
      .set(parsedPayload)
      .where("id", "=", id)
      .returningAll()
      .executeTakeFirstOrThrow();

    return new LmsShippingServiceNode(updatedService);
  },
  deleteLmsShippingService: async (id: string) => {
    await db.deleteFrom("lmsShippingServices").where("id", "=", id).execute();

    return { success: true, message: "Shipping service deleted successfully." };
  },
};

export default {
  queries,
  mutations,
};
