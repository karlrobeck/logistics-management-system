import { Insertable, Selectable, Updateable } from "kysely";
import { db } from "../../db";
import { DB } from "../../db/types";
import {
  LmsPricingRatesInsert,
  lmsPricingRatesInsertSchema,
  LmsPricingRatesUpdate,
  lmsPricingRatesUpdateSchema,
} from "../../db/schemas";

class LmsPricingRateNode {
  constructor(private model: Selectable<DB["lmsPricingRates"]>) {}

  id() {
    return this.model.id;
  }

  serviceId() {
    return this.model.serviceId;
  }

  originZoneId() {
    return this.model.originZoneId;
  }

  destinationZoneId() {
    return this.model.destinationZoneId;
  }

  baseRate() {
    return this.model.baseRate;
  }

  perKgRate() {
    return this.model.perKgRate;
  }

  fuelSurchargeRate() {
    return this.model.fuelSurchargeRate;
  }

  weightMin() {
    return this.model.weightMin;
  }

  weightMax() {
    return this.model.weightMax;
  }

  effectiveDate() {
    return this.model.effectiveDate;
  }

  expiryDate() {
    return this.model.expiryDate;
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
    const pricingRates = await db
      .selectFrom("lmsPricingRates")
      .selectAll()
      .offset((page - 1) * limit)
      .limit(limit)
      .execute();

    return pricingRates.map((rate) => new LmsPricingRateNode(rate));
  },
  view: async (id: string) => {
    const pricingRate = await db
      .selectFrom("lmsPricingRates")
      .selectAll()
      .where("id", "=", id)
      .executeTakeFirstOrThrow();

    return new LmsPricingRateNode(pricingRate);
  },
  listByService: async (serviceId: string) => {
    const pricingRates = await db
      .selectFrom("lmsPricingRates")
      .selectAll()
      .where("serviceId", "=", serviceId)
      .execute();

    return pricingRates.map((rate) => new LmsPricingRateNode(rate));
  },
  listByRoute: async (originZoneId: string, destinationZoneId: string) => {
    const pricingRates = await db
      .selectFrom("lmsPricingRates")
      .selectAll()
      .where("originZoneId", "=", originZoneId)
      .where("destinationZoneId", "=", destinationZoneId)
      .execute();

    return pricingRates.map((rate) => new LmsPricingRateNode(rate));
  },
  listActive: async () => {
    const currentDate = new Date();
    const pricingRates = await db
      .selectFrom("lmsPricingRates")
      .selectAll()
      .where("effectiveDate", "<=", currentDate)
      .where((eb) =>
        eb.or([
          eb("expiryDate", "is", null),
          eb("expiryDate", ">", currentDate),
        ])
      )
      .execute();

    return pricingRates.map((rate) => new LmsPricingRateNode(rate));
  },
};

export const mutations = {
  createLmsPricingRate: async (payload: LmsPricingRatesInsert) => {
    const parsedPayload = lmsPricingRatesInsertSchema.parse(payload);
    const newPricingRate = await db
      .insertInto("lmsPricingRates")
      .values(parsedPayload)
      .returningAll()
      .executeTakeFirstOrThrow();

    return new LmsPricingRateNode(newPricingRate);
  },
  updateLmsPricingRate: async (
    id: string,
    payload: LmsPricingRatesUpdate,
  ) => {
    const parsedPayload = lmsPricingRatesUpdateSchema.parse(payload);
    const updatedPricingRate = await db
      .updateTable("lmsPricingRates")
      .set(parsedPayload)
      .where("id", "=", id)
      .returningAll()
      .executeTakeFirstOrThrow();

    return new LmsPricingRateNode(updatedPricingRate);
  },
  deleteLmsPricingRate: async (id: string) => {
    await db.deleteFrom("lmsPricingRates").where("id", "=", id).execute();

    return { success: true, message: "Pricing rate deleted successfully." };
  },
};

export default {
  queries,
  mutations,
};
