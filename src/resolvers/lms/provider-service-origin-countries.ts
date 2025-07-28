import { Insertable, Selectable, Updateable } from "kysely";
import { db } from "../../db";
import { DB } from "../../db/types";
import {
  LmsProviderServiceOriginCountriesInsert,
  lmsProviderServiceOriginCountriesInsertSchema,
  LmsProviderServiceOriginCountriesUpdate,
  lmsProviderServiceOriginCountriesUpdateSchema,
} from "../../db/schemas";

class LmsProviderServiceOriginCountryNode {
  constructor(
    private model: Selectable<DB["lmsProviderServiceOriginCountries"]>,
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
      .selectFrom("lmsProviderServiceOriginCountries")
      .selectAll()
      .offset((page - 1) * limit)
      .limit(limit)
      .execute();

    return countries.map(
      (country) => new LmsProviderServiceOriginCountryNode(country),
    );
  },
  view: async (id: string) => {
    const country = await db
      .selectFrom("lmsProviderServiceOriginCountries")
      .selectAll()
      .where("id", "=", id)
      .executeTakeFirstOrThrow();

    return new LmsProviderServiceOriginCountryNode(country);
  },
  listByProviderService: async (providerServiceId: string) => {
    const countries = await db
      .selectFrom("lmsProviderServiceOriginCountries")
      .selectAll()
      .where("providerServiceId", "=", providerServiceId)
      .execute();

    return countries.map(
      (country) => new LmsProviderServiceOriginCountryNode(country),
    );
  },
  listByCountryCode: async (countryCode: string) => {
    const countries = await db
      .selectFrom("lmsProviderServiceOriginCountries")
      .selectAll()
      .where("countryCode", "=", countryCode)
      .execute();

    return countries.map(
      (country) => new LmsProviderServiceOriginCountryNode(country),
    );
  },
};

export const mutations = {
  createLmsProviderServiceOriginCountry: async (
    payload: LmsProviderServiceOriginCountriesInsert,
  ) => {
    const parsedPayload = lmsProviderServiceOriginCountriesInsertSchema.parse(
      payload,
    );
    const newCountry = await db
      .insertInto("lmsProviderServiceOriginCountries")
      .values(parsedPayload)
      .returningAll()
      .executeTakeFirstOrThrow();

    return new LmsProviderServiceOriginCountryNode(newCountry);
  },
  updateLmsProviderServiceOriginCountry: async (
    id: string,
    payload: LmsProviderServiceOriginCountriesUpdate,
  ) => {
    const parsedPayload = lmsProviderServiceOriginCountriesUpdateSchema.parse(
      payload,
    );
    const updatedCountry = await db
      .updateTable("lmsProviderServiceOriginCountries")
      .set(parsedPayload)
      .where("id", "=", id)
      .returningAll()
      .executeTakeFirstOrThrow();

    return new LmsProviderServiceOriginCountryNode(updatedCountry);
  },
  deleteLmsProviderServiceOriginCountry: async (id: string) => {
    await db
      .deleteFrom("lmsProviderServiceOriginCountries")
      .where("id", "=", id)
      .execute();

    return {
      success: true,
      message: "Provider service origin country deleted successfully.",
    };
  },
};

export default {
  queries,
  mutations,
};
