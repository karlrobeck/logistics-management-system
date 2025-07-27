import { Insertable, Selectable, Updateable } from 'kysely';
import { db } from '../../db';
import { DB } from '../../db/types';
import { OrgDriverNode } from '../org/drivers';
import { OrgVehicleNode } from '../org/vehicles';

export class LmsRouteNode {
  constructor(private model: Selectable<DB['lmsRoutes']>) {}

  id() {
    return this.model.id;
  }

  routeName() {
    return this.model.routeName;
  }

  routeDate() {
    return this.model.routeDate;
  }

  status() {
    return this.model.status;
  }

  estimatedDeparture() {
    return this.model.estimatedDeparture;
  }

  actualDeparture() {
    return this.model.actualDeparture;
  }

  estimatedArrival() {
    return this.model.estimatedArrival;
  }

  actualArrival() {
    return this.model.actualArrival;
  }

  async driver() {
    if (!this.model.driverId) return null;

    const driver = await db
      .selectFrom('orgDrivers')
      .selectAll()
      .where('id', '=', this.model.driverId)
      .executeTakeFirst();

    return driver ? new OrgDriverNode(driver) : null;
  }

  async vehicle() {
    if (!this.model.vehicleId) return null;

    const vehicle = await db
      .selectFrom('orgVehicles')
      .selectAll()
      .where('id', '=', this.model.vehicleId)
      .executeTakeFirst();

    return vehicle ? new OrgVehicleNode(vehicle) : null;
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
    const routes = await db
      .selectFrom('lmsRoutes')
      .selectAll()
      .offset((page - 1) * limit)
      .limit(limit)
      .execute();

    return routes.map((route) => new LmsRouteNode(route));
  },
  view: async (id: string) => {
    const route = await db
      .selectFrom('lmsRoutes')
      .selectAll()
      .where('id', '=', id)
      .executeTakeFirstOrThrow();

    return new LmsRouteNode(route);
  },
  listByStatus: async (status: string) => {
    const routes = await db
      .selectFrom('lmsRoutes')
      .selectAll()
      .where('status', '=', status as any)
      .execute();

    return routes.map((route) => new LmsRouteNode(route));
  },
  listByDriver: async (driverId: string) => {
    const routes = await db
      .selectFrom('lmsRoutes')
      .selectAll()
      .where('driverId', '=', driverId)
      .execute();

    return routes.map((route) => new LmsRouteNode(route));
  },
  listByVehicle: async (vehicleId: string) => {
    const routes = await db
      .selectFrom('lmsRoutes')
      .selectAll()
      .where('vehicleId', '=', vehicleId)
      .execute();

    return routes.map((route) => new LmsRouteNode(route));
  },
};

export const mutations = {
  createLmsRoute: async (payload: Insertable<DB['lmsRoutes']>) => {
    const newRoute = await db
      .insertInto('lmsRoutes')
      .values(payload)
      .returningAll()
      .executeTakeFirstOrThrow();

    return new LmsRouteNode(newRoute);
  },
  updateLmsRoute: async (id: string, payload: Updateable<DB['lmsRoutes']>) => {
    const updatedRoute = await db
      .updateTable('lmsRoutes')
      .set(payload)
      .where('id', '=', id)
      .returningAll()
      .executeTakeFirstOrThrow();

    return new LmsRouteNode(updatedRoute);
  },
  deleteLmsRoute: async (id: string) => {
    await db.deleteFrom('lmsRoutes').where('id', '=', id).execute();

    return { success: true, message: 'Route deleted successfully.' };
  },
};

export default {
  queries,
  mutations,
};
