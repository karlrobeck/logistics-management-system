import { Insertable, Selectable, Updateable } from "kysely";
import { db } from "../../db";
import { DB } from "../../db/types";
import {
  LmsProviderServiceMaxDimensionsInsert,
  lmsProviderServiceMaxDimensionsInsertSchema,
  LmsProviderServiceMaxDimensionsUpdate,
  lmsProviderServiceMaxDimensionsUpdateSchema,
} from "../../db/schemas";

class LmsProviderServiceMaxDimensionNode {
  constructor(
    private model: Selectable<DB["lmsProviderServiceMaxDimensions"]>,
  ) {}

  id() {
    return this.model.id;
  }

  providerServiceId() {
    return this.model.providerServiceId;
  }

  length() {
    return this.model.length;
  }

  width() {
    return this.model.width;
  }

  height() {
    return this.model.height;
  }

  created() {
    return this.model.created;
  }
}

export const queries = {
  list: async (page: number, limit: number) => {
    const dimensions = await db
      .selectFrom("lmsProviderServiceMaxDimensions")
      .selectAll()
      .offset((page - 1) * limit)
      .limit(limit)
      .execute();

    return dimensions.map(
      (dimension) => new LmsProviderServiceMaxDimensionNode(dimension),
    );
  },
  view: async (id: string) => {
    const dimension = await db
      .selectFrom("lmsProviderServiceMaxDimensions")
      .selectAll()
      .where("id", "=", id)
      .executeTakeFirstOrThrow();

    return new LmsProviderServiceMaxDimensionNode(dimension);
  },
  listByProviderService: async (providerServiceId: string) => {
    const dimensions = await db
      .selectFrom("lmsProviderServiceMaxDimensions")
      .selectAll()
      .where("providerServiceId", "=", providerServiceId)
      .execute();

    return dimensions.map(
      (dimension) => new LmsProviderServiceMaxDimensionNode(dimension),
    );
  },
  findByProviderService: async (providerServiceId: string) => {
    const dimension = await db
      .selectFrom("lmsProviderServiceMaxDimensions")
      .selectAll()
      .where("providerServiceId", "=", providerServiceId)
      .executeTakeFirst();

    return dimension ? new LmsProviderServiceMaxDimensionNode(dimension) : null;
  },
};

export const mutations = {
  createLmsProviderServiceMaxDimension: async (
    payload: LmsProviderServiceMaxDimensionsInsert,
  ) => {
    const parsedPayload = lmsProviderServiceMaxDimensionsInsertSchema.parse(
      payload,
    );
    const newDimension = await db
      .insertInto("lmsProviderServiceMaxDimensions")
      .values(parsedPayload)
      .returningAll()
      .executeTakeFirstOrThrow();

    return new LmsProviderServiceMaxDimensionNode(newDimension);
  },
  updateLmsProviderServiceMaxDimension: async (
    id: string,
    payload: LmsProviderServiceMaxDimensionsUpdate,
  ) => {
    const parsedPayload = lmsProviderServiceMaxDimensionsUpdateSchema.parse(
      payload,
    );
    const updatedDimension = await db
      .updateTable("lmsProviderServiceMaxDimensions")
      .set(parsedPayload)
      .where("id", "=", id)
      .returningAll()
      .executeTakeFirstOrThrow();

    return new LmsProviderServiceMaxDimensionNode(updatedDimension);
  },
  deleteLmsProviderServiceMaxDimension: async (id: string) => {
    await db
      .deleteFrom("lmsProviderServiceMaxDimensions")
      .where("id", "=", id)
      .execute();

    return {
      success: true,
      message: "Provider service max dimension deleted successfully.",
    };
  },
};

export default {
  queries,
  mutations,
};
