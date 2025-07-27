import { Insertable, Selectable, Updateable } from 'kysely';
import { db } from '../../db';
import { DB } from '../../db/types';

class LmsPricingZoneCountryNode {
  constructor(private model: Selectable<DB['lmsPricingZoneCountries']>) {}

  id() {
    return this.model.id;
  }

  pricingZoneId() {
    return this.model.pricingZoneId;
  }

  countryCode() {
    return this.model.countryCode;
  }

  created() {
    return this.model.created;
  }
}

export const queries = {
  list: async (page: number, limit: number) => {
    const pricingZoneCountries = await db
      .selectFrom('lmsPricingZoneCountries')
      .selectAll()
      .offset((page - 1) * limit)
      .limit(limit)
      .execute();

    return pricingZoneCountries.map(
      (item) => new LmsPricingZoneCountryNode(item),
    );
  },
  view: async (id: string) => {
    const pricingZoneCountry = await db
      .selectFrom('lmsPricingZoneCountries')
      .selectAll()
      .where('id', '=', id)
      .executeTakeFirstOrThrow();

    return new LmsPricingZoneCountryNode(pricingZoneCountry);
  },
  listByZone: async (pricingZoneId: string) => {
    const pricingZoneCountries = await db
      .selectFrom('lmsPricingZoneCountries')
      .selectAll()
      .where('pricingZoneId', '=', pricingZoneId)
      .execute();

    return pricingZoneCountries.map(
      (item) => new LmsPricingZoneCountryNode(item),
    );
  },
  listByCountry: async (countryCode: string) => {
    const pricingZoneCountries = await db
      .selectFrom('lmsPricingZoneCountries')
      .selectAll()
      .where('countryCode', '=', countryCode)
      .execute();

    return pricingZoneCountries.map(
      (item) => new LmsPricingZoneCountryNode(item),
    );
  },
};

export const mutations = {
  createLmsPricingZoneCountry: async (
    payload: Insertable<DB['lmsPricingZoneCountries']>,
  ) => {
    const newPricingZoneCountry = await db
      .insertInto('lmsPricingZoneCountries')
      .values(payload)
      .returningAll()
      .executeTakeFirstOrThrow();

    return new LmsPricingZoneCountryNode(newPricingZoneCountry);
  },
  updateLmsPricingZoneCountry: async (
    id: string,
    payload: Updateable<DB['lmsPricingZoneCountries']>,
  ) => {
    const updatedPricingZoneCountry = await db
      .updateTable('lmsPricingZoneCountries')
      .set(payload)
      .where('id', '=', id)
      .returningAll()
      .executeTakeFirstOrThrow();

    return new LmsPricingZoneCountryNode(updatedPricingZoneCountry);
  },
  deleteLmsPricingZoneCountry: async (id: string) => {
    await db
      .deleteFrom('lmsPricingZoneCountries')
      .where('id', '=', id)
      .execute();

    return {
      success: true,
      message: 'Pricing zone country deleted successfully.',
    };
  },
};

export default {
  queries,
  mutations,
};
