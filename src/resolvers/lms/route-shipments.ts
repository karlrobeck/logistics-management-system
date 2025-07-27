import { Insertable, Selectable, Updateable } from 'kysely';
import { db } from '../../db';
import { DB } from '../../db/types';
import { LmsRouteNode } from './routes';
import { LmsShipmentNode } from './shipments';

export class LmsRouteShipmentNode {
  constructor(private model: Selectable<DB['lmsRouteShipments']>) {}

  id() {
    return this.model.id;
  }

  sequenceNumber() {
    return this.model.sequenceNumber;
  }

  deliveryDate() {
    return this.model.deliveryDate;
  }

  estimatedDelivery() {
    return this.model.estimatedDelivery;
  }

  actualDelivery() {
    return this.model.actualDelivery;
  }

  deliveryStatus() {
    return this.model.deliveryStatus;
  }

  signatureRequired() {
    return this.model.signatureRequired;
  }

  recipientSignature() {
    return this.model.recipientSignature;
  }

  async route() {
    const route = await db
      .selectFrom('lmsRoutes')
      .selectAll()
      .where('id', '=', this.model.routeId)
      .executeTakeFirst();

    return route ? new LmsRouteNode(route) : null;
  }

  async shipment() {
    const shipment = await db
      .selectFrom('lmsShipments')
      .selectAll()
      .where('id', '=', this.model.shipmentId)
      .executeTakeFirst();

    return shipment ? new LmsShipmentNode(shipment) : null;
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
    const routeShipments = await db
      .selectFrom('lmsRouteShipments')
      .selectAll()
      .offset((page - 1) * limit)
      .limit(limit)
      .execute();

    return routeShipments.map((item) => new LmsRouteShipmentNode(item));
  },
  view: async (id: string) => {
    const routeShipment = await db
      .selectFrom('lmsRouteShipments')
      .selectAll()
      .where('id', '=', id)
      .executeTakeFirstOrThrow();

    return new LmsRouteShipmentNode(routeShipment);
  },
  listByRoute: async (routeId: string) => {
    const routeShipments = await db
      .selectFrom('lmsRouteShipments')
      .selectAll()
      .where('routeId', '=', routeId)
      .orderBy('sequenceNumber', 'asc')
      .execute();

    return routeShipments.map((item) => new LmsRouteShipmentNode(item));
  },
  listByShipment: async (shipmentId: string) => {
    const routeShipments = await db
      .selectFrom('lmsRouteShipments')
      .selectAll()
      .where('shipmentId', '=', shipmentId)
      .execute();

    return routeShipments.map((item) => new LmsRouteShipmentNode(item));
  },
  listByStatus: async (deliveryStatus: string) => {
    const routeShipments = await db
      .selectFrom('lmsRouteShipments')
      .selectAll()
      .where('deliveryStatus', '=', deliveryStatus as any)
      .execute();

    return routeShipments.map((item) => new LmsRouteShipmentNode(item));
  },
};

export const mutations = {
  createLmsRouteShipment: async (
    payload: Insertable<DB['lmsRouteShipments']>,
  ) => {
    const newRouteShipment = await db
      .insertInto('lmsRouteShipments')
      .values(payload)
      .returningAll()
      .executeTakeFirstOrThrow();

    return new LmsRouteShipmentNode(newRouteShipment);
  },
  updateLmsRouteShipment: async (
    id: string,
    payload: Updateable<DB['lmsRouteShipments']>,
  ) => {
    const updatedRouteShipment = await db
      .updateTable('lmsRouteShipments')
      .set(payload)
      .where('id', '=', id)
      .returningAll()
      .executeTakeFirstOrThrow();

    return new LmsRouteShipmentNode(updatedRouteShipment);
  },
  deleteLmsRouteShipment: async (id: string) => {
    await db.deleteFrom('lmsRouteShipments').where('id', '=', id).execute();

    return { success: true, message: 'Route shipment deleted successfully.' };
  },
};

export default {
  queries,
  mutations,
};
