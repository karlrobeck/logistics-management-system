import { Insertable, Selectable, Updateable } from 'kysely';
import { db } from '../../db';
import { DB } from '../../db/types';

class LmsProviderPerformanceNode {
  constructor(private model: Selectable<DB['lmsProviderPerformance']>) {}

  id() {
    return this.model.id;
  }

  providerId() {
    return this.model.providerId;
  }

  shipmentId() {
    return this.model.shipmentId;
  }

  transportLegId() {
    return this.model.transportLegId;
  }

  metricType() {
    return this.model.metricType;
  }

  metricValue() {
    return this.model.metricValue;
  }

  measurementDate() {
    return this.model.measurementDate;
  }

  notes() {
    return this.model.notes;
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
    const performances = await db
      .selectFrom('lmsProviderPerformance')
      .selectAll()
      .offset((page - 1) * limit)
      .limit(limit)
      .execute();

    return performances.map(
      (performance) => new LmsProviderPerformanceNode(performance),
    );
  },
  view: async (id: string) => {
    const performance = await db
      .selectFrom('lmsProviderPerformance')
      .selectAll()
      .where('id', '=', id)
      .executeTakeFirstOrThrow();

    return new LmsProviderPerformanceNode(performance);
  },
  listByProvider: async (providerId: string) => {
    const performances = await db
      .selectFrom('lmsProviderPerformance')
      .selectAll()
      .where('providerId', '=', providerId)
      .execute();

    return performances.map(
      (performance) => new LmsProviderPerformanceNode(performance),
    );
  },
  listByShipment: async (shipmentId: string) => {
    const performances = await db
      .selectFrom('lmsProviderPerformance')
      .selectAll()
      .where('shipmentId', '=', shipmentId)
      .execute();

    return performances.map(
      (performance) => new LmsProviderPerformanceNode(performance),
    );
  },
  listByMetricType: async (metricType: string) => {
    const performances = await db
      .selectFrom('lmsProviderPerformance')
      .selectAll()
      .where('metricType', '=', metricType as any)
      .execute();

    return performances.map(
      (performance) => new LmsProviderPerformanceNode(performance),
    );
  },
};

export const mutations = {
  createLmsProviderPerformance: async (
    payload: Insertable<DB['lmsProviderPerformance']>,
  ) => {
    const newPerformance = await db
      .insertInto('lmsProviderPerformance')
      .values(payload)
      .returningAll()
      .executeTakeFirstOrThrow();

    return new LmsProviderPerformanceNode(newPerformance);
  },
  updateLmsProviderPerformance: async (
    id: string,
    payload: Updateable<DB['lmsProviderPerformance']>,
  ) => {
    const updatedPerformance = await db
      .updateTable('lmsProviderPerformance')
      .set(payload)
      .where('id', '=', id)
      .returningAll()
      .executeTakeFirstOrThrow();

    return new LmsProviderPerformanceNode(updatedPerformance);
  },
  deleteLmsProviderPerformance: async (id: string) => {
    await db
      .deleteFrom('lmsProviderPerformance')
      .where('id', '=', id)
      .execute();

    return {
      success: true,
      message: 'Provider performance deleted successfully.',
    };
  },
};

export default {
  queries,
  mutations,
};
