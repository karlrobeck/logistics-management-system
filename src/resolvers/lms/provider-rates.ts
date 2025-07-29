import { Insertable, Selectable, Updateable } from 'kysely';
import { db } from '../../db';
import {
  LmsProviderRatesInsert,
  LmsProviderRatesUpdate,
  lmsProviderRatesInsertSchema,
  lmsProviderRatesUpdateSchema,
} from '../../db/schemas';
import { DB } from '../../db/types';

class LmsProviderRateNode {
  constructor(private model: Selectable<DB['lmsProviderRates']>) {}

  id() {
    return this.model.id;
  }

  providerServiceId() {
    return this.model.providerServiceId;
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

  currency() {
    return this.model.currency;
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
    const providerRates = await db
      .selectFrom('lmsProviderRates')
      .selectAll()
      .offset((page - 1) * limit)
      .limit(limit)
      .execute();

    return providerRates.map((rate) => new LmsProviderRateNode(rate));
  },
  view: async (id: string) => {
    const providerRate = await db
      .selectFrom('lmsProviderRates')
      .selectAll()
      .where('id', '=', id)
      .executeTakeFirstOrThrow();

    return new LmsProviderRateNode(providerRate);
  },
  listByService: async (providerServiceId: string) => {
    const providerRates = await db
      .selectFrom('lmsProviderRates')
      .selectAll()
      .where('providerServiceId', '=', providerServiceId)
      .execute();

    return providerRates.map((rate) => new LmsProviderRateNode(rate));
  },
  listByRoute: async (originZoneId: string, destinationZoneId: string) => {
    const providerRates = await db
      .selectFrom('lmsProviderRates')
      .selectAll()
      .where('originZoneId', '=', originZoneId)
      .where('destinationZoneId', '=', destinationZoneId)
      .execute();

    return providerRates.map((rate) => new LmsProviderRateNode(rate));
  },
  listActive: async () => {
    const currentDate = new Date();
    const providerRates = await db
      .selectFrom('lmsProviderRates')
      .selectAll()
      .where('effectiveDate', '<=', currentDate)
      .where((eb) =>
        eb.or([
          eb('expiryDate', 'is', null),
          eb('expiryDate', '>', currentDate),
        ]),
      )
      .execute();

    return providerRates.map((rate) => new LmsProviderRateNode(rate));
  },
};

export const mutations = {
  createLmsProviderRate: async (payload: LmsProviderRatesInsert) => {
    const parsedPayload = lmsProviderRatesInsertSchema.parse(payload);
    const newProviderRate = await db
      .insertInto('lmsProviderRates')
      .values(parsedPayload)
      .returningAll()
      .executeTakeFirstOrThrow();

    return new LmsProviderRateNode(newProviderRate);
  },
  updateLmsProviderRate: async (
    id: string,
    payload: LmsProviderRatesUpdate,
  ) => {
    const parsedPayload = lmsProviderRatesUpdateSchema.parse(payload);
    const updatedProviderRate = await db
      .updateTable('lmsProviderRates')
      .set(parsedPayload)
      .where('id', '=', id)
      .returningAll()
      .executeTakeFirstOrThrow();

    return new LmsProviderRateNode(updatedProviderRate);
  },
  deleteLmsProviderRate: async (id: string) => {
    await db.deleteFrom('lmsProviderRates').where('id', '=', id).execute();

    return { success: true, message: 'Provider rate deleted successfully.' };
  },
};

export default {
  queries,
  mutations,
};
