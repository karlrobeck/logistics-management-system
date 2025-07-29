import { Insertable, Selectable, Updateable } from 'kysely';
import { db } from '../../db';
import {
  LmsShippingServiceMaxDimensionsInsert,
  LmsShippingServiceMaxDimensionsUpdate,
  lmsShippingServiceMaxDimensionsInsertSchema,
  lmsShippingServiceMaxDimensionsUpdateSchema,
} from '../../db/schemas';
import { DB } from '../../db/types';

class LmsShippingServiceMaxDimensionNode {
  constructor(
    private model: Selectable<DB['lmsShippingServiceMaxDimensions']>,
  ) {}

  id() {
    return this.model.id;
  }

  shippingServiceId() {
    return this.model.shippingServiceId;
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
      .selectFrom('lmsShippingServiceMaxDimensions')
      .selectAll()
      .offset((page - 1) * limit)
      .limit(limit)
      .execute();

    return dimensions.map(
      (dimension) => new LmsShippingServiceMaxDimensionNode(dimension),
    );
  },
  view: async (id: string) => {
    const dimension = await db
      .selectFrom('lmsShippingServiceMaxDimensions')
      .selectAll()
      .where('id', '=', id)
      .executeTakeFirstOrThrow();

    return new LmsShippingServiceMaxDimensionNode(dimension);
  },
  listByShippingService: async (shippingServiceId: string) => {
    const dimensions = await db
      .selectFrom('lmsShippingServiceMaxDimensions')
      .selectAll()
      .where('shippingServiceId', '=', shippingServiceId)
      .execute();

    return dimensions.map(
      (dimension) => new LmsShippingServiceMaxDimensionNode(dimension),
    );
  },
  findByShippingService: async (shippingServiceId: string) => {
    const dimension = await db
      .selectFrom('lmsShippingServiceMaxDimensions')
      .selectAll()
      .where('shippingServiceId', '=', shippingServiceId)
      .executeTakeFirst();

    return dimension ? new LmsShippingServiceMaxDimensionNode(dimension) : null;
  },
};

export const mutations = {
  createLmsShippingServiceMaxDimension: async (
    payload: LmsShippingServiceMaxDimensionsInsert,
  ) => {
    const parsedPayload =
      lmsShippingServiceMaxDimensionsInsertSchema.parse(payload);
    const newDimension = await db
      .insertInto('lmsShippingServiceMaxDimensions')
      .values(parsedPayload)
      .returningAll()
      .executeTakeFirstOrThrow();

    return new LmsShippingServiceMaxDimensionNode(newDimension);
  },
  updateLmsShippingServiceMaxDimension: async (
    id: string,
    payload: LmsShippingServiceMaxDimensionsUpdate,
  ) => {
    const parsedPayload =
      lmsShippingServiceMaxDimensionsUpdateSchema.parse(payload);
    const updatedDimension = await db
      .updateTable('lmsShippingServiceMaxDimensions')
      .set(parsedPayload)
      .where('id', '=', id)
      .returningAll()
      .executeTakeFirstOrThrow();

    return new LmsShippingServiceMaxDimensionNode(updatedDimension);
  },
  deleteLmsShippingServiceMaxDimension: async (id: string) => {
    await db
      .deleteFrom('lmsShippingServiceMaxDimensions')
      .where('id', '=', id)
      .execute();

    return {
      success: true,
      message: 'Shipping service max dimension deleted successfully.',
    };
  },
};

export default {
  queries,
  mutations,
};
