import { Insertable, Selectable, Updateable } from 'kysely';
import { db } from '../../db';
import { DB } from '../../db/types';

class LmsProviderServiceDestinationCountryNode {
  constructor(
    private model: Selectable<DB['lmsProviderServiceDestinationCountries']>,
  ) {}

  id() {
    return this.model.id;
  }

  providerServiceId() {
    return this.model.providerServiceId;
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
    const countries = await db
      .selectFrom('lmsProviderServiceDestinationCountries')
      .selectAll()
      .offset((page - 1) * limit)
      .limit(limit)
      .execute();

    return countries.map(
      (country) => new LmsProviderServiceDestinationCountryNode(country),
    );
  },
  view: async (id: string) => {
    const country = await db
      .selectFrom('lmsProviderServiceDestinationCountries')
      .selectAll()
      .where('id', '=', id)
      .executeTakeFirstOrThrow();

    return new LmsProviderServiceDestinationCountryNode(country);
  },
  listByProviderService: async (providerServiceId: string) => {
    const countries = await db
      .selectFrom('lmsProviderServiceDestinationCountries')
      .selectAll()
      .where('providerServiceId', '=', providerServiceId)
      .execute();

    return countries.map(
      (country) => new LmsProviderServiceDestinationCountryNode(country),
    );
  },
  listByCountryCode: async (countryCode: string) => {
    const countries = await db
      .selectFrom('lmsProviderServiceDestinationCountries')
      .selectAll()
      .where('countryCode', '=', countryCode)
      .execute();

    return countries.map(
      (country) => new LmsProviderServiceDestinationCountryNode(country),
    );
  },
};

export const mutations = {
  createLmsProviderServiceDestinationCountry: async (
    payload: Insertable<DB['lmsProviderServiceDestinationCountries']>,
  ) => {
    const newCountry = await db
      .insertInto('lmsProviderServiceDestinationCountries')
      .values(payload)
      .returningAll()
      .executeTakeFirstOrThrow();

    return new LmsProviderServiceDestinationCountryNode(newCountry);
  },
  updateLmsProviderServiceDestinationCountry: async (
    id: string,
    payload: Updateable<DB['lmsProviderServiceDestinationCountries']>,
  ) => {
    const updatedCountry = await db
      .updateTable('lmsProviderServiceDestinationCountries')
      .set(payload)
      .where('id', '=', id)
      .returningAll()
      .executeTakeFirstOrThrow();

    return new LmsProviderServiceDestinationCountryNode(updatedCountry);
  },
  deleteLmsProviderServiceDestinationCountry: async (id: string) => {
    await db
      .deleteFrom('lmsProviderServiceDestinationCountries')
      .where('id', '=', id)
      .execute();

    return {
      success: true,
      message: 'Provider service destination country deleted successfully.',
    };
  },
};

export default {
  queries,
  mutations,
};
