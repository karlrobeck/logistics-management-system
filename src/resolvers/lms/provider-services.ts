import { Insertable, Selectable, Updateable } from 'kysely';
import { db } from '../../db';
import {
  LmsProviderServicesInsert,
  LmsProviderServicesUpdate,
  lmsProviderServicesInsertSchema,
  lmsProviderServicesUpdateSchema,
} from '../../db/schemas';
import { DB } from '../../db/types';
import { LmsTransportationProviderNode } from './transportation-providers';

export class LmsProviderServiceNode {
  constructor(private model: Selectable<DB['lmsProviderServices']>) {}

  id() {
    return this.model.id;
  }

  serviceName() {
    return this.model.serviceName;
  }

  serviceType() {
    return this.model.serviceType;
  }

  transportMode() {
    return this.model.transportMode;
  }

  isActive() {
    return this.model.isActive;
  }

  maxWeight() {
    return this.model.maxWeight;
  }

  cutoffTime() {
    return this.model.cutoffTime;
  }

  transitTimeMin() {
    return this.model.transitTimeMin;
  }

  transitTimeMax() {
    return this.model.transitTimeMax;
  }

  insuranceAvailable() {
    return this.model.insuranceAvailable;
  }

  trackingAvailable() {
    return this.model.trackingAvailable;
  }

  async provider() {
    const provider = await db
      .selectFrom('lmsTransportationProviders')
      .selectAll()
      .where('id', '=', this.model.providerId)
      .executeTakeFirst();

    return provider ? new LmsTransportationProviderNode(provider) : null;
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
      .selectFrom('lmsProviderServices')
      .selectAll()
      .offset((page - 1) * limit)
      .limit(limit)
      .execute();

    return services.map((service) => new LmsProviderServiceNode(service));
  },
  view: async (id: string) => {
    const service = await db
      .selectFrom('lmsProviderServices')
      .selectAll()
      .where('id', '=', id)
      .executeTakeFirstOrThrow();

    return new LmsProviderServiceNode(service);
  },
  listByProvider: async (providerId: string) => {
    const services = await db
      .selectFrom('lmsProviderServices')
      .selectAll()
      .where('providerId', '=', providerId)
      .execute();

    return services.map((service) => new LmsProviderServiceNode(service));
  },
  listByServiceType: async (serviceType: string) => {
    const services = await db
      .selectFrom('lmsProviderServices')
      .selectAll()
      .where('serviceType', '=', serviceType as any)
      .execute();

    return services.map((service) => new LmsProviderServiceNode(service));
  },
  listByTransportMode: async (transportMode: string) => {
    const services = await db
      .selectFrom('lmsProviderServices')
      .selectAll()
      .where('transportMode', '=', transportMode as any)
      .execute();

    return services.map((service) => new LmsProviderServiceNode(service));
  },
  listActive: async () => {
    const services = await db
      .selectFrom('lmsProviderServices')
      .selectAll()
      .where('isActive', '=', true)
      .execute();

    return services.map((service) => new LmsProviderServiceNode(service));
  },
};

export const mutations = {
  createLmsProviderService: async (payload: LmsProviderServicesInsert) => {
    const parsedPayload = lmsProviderServicesInsertSchema.parse(payload);
    const newService = await db
      .insertInto('lmsProviderServices')
      .values(parsedPayload)
      .returningAll()
      .executeTakeFirstOrThrow();

    return new LmsProviderServiceNode(newService);
  },
  updateLmsProviderService: async (
    id: string,
    payload: LmsProviderServicesUpdate,
  ) => {
    const parsedPayload = lmsProviderServicesUpdateSchema.parse(payload);
    const updatedService = await db
      .updateTable('lmsProviderServices')
      .set(parsedPayload)
      .where('id', '=', id)
      .returningAll()
      .executeTakeFirstOrThrow();

    return new LmsProviderServiceNode(updatedService);
  },
  deleteLmsProviderService: async (id: string) => {
    await db.deleteFrom('lmsProviderServices').where('id', '=', id).execute();

    return { success: true, message: 'Provider service deleted successfully.' };
  },
};

export default {
  queries,
  mutations,
};
