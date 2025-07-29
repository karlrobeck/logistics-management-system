import { Insertable, Selectable, Updateable } from 'kysely';
import { db } from '../../db';
import {
  OrgVehiclesInsert,
  OrgVehiclesUpdate,
  orgVehiclesInsertSchema,
  orgVehiclesUpdateSchema,
} from '../../db/schemas';
import { DB } from '../../db/types';
import { LmsWarehouseNode } from '../lms/warehouses';
import { OrgDepartmentNode } from './departments';

export class OrgVehicleNode {
  constructor(private _model: Selectable<DB['orgVehicles']>) {}

  id() {
    return this._model.id;
  }

  vehicleNumber() {
    return this._model.vehicleNumber;
  }

  licensePlate() {
    return this._model.licensePlate;
  }

  vehicleType() {
    return this._model.vehicleType;
  }

  make() {
    return this._model.make;
  }

  model() {
    return this._model.model;
  }

  year() {
    return this._model.year;
  }

  capacityWeight() {
    return this._model.capacityWeight;
  }

  capacityVolume() {
    return this._model.capacityVolume;
  }

  status() {
    return this._model.status;
  }

  async department() {
    if (!this._model.departmentId) return null;

    const department = await db
      .selectFrom('orgDepartments')
      .selectAll()
      .where('id', '=', this._model.departmentId)
      .executeTakeFirst();

    return department ? new OrgDepartmentNode(department) : null;
  }

  async warehouse() {
    if (!this._model.warehouseId) return null;

    const warehouse = await db
      .selectFrom('lmsWarehouses')
      .selectAll()
      .where('id', '=', this._model.warehouseId)
      .executeTakeFirst();

    return warehouse ? new LmsWarehouseNode(warehouse) : null;
  }

  created() {
    return this._model.created;
  }

  updated() {
    return this._model.updated;
  }
}

export const queries = {
  list: async (page: number, limit: number) => {
    const vehicles = await db
      .selectFrom('orgVehicles')
      .selectAll()
      .offset((page - 1) * limit)
      .limit(limit)
      .execute();

    return vehicles.map((vehicle) => new OrgVehicleNode(vehicle));
  },
  view: async (id: string) => {
    const vehicle = await db
      .selectFrom('orgVehicles')
      .selectAll()
      .where('id', '=', id)
      .executeTakeFirstOrThrow();

    return new OrgVehicleNode(vehicle);
  },
  listByStatus: async (status: string) => {
    const vehicles = await db
      .selectFrom('orgVehicles')
      .selectAll()
      .where('status', '=', status as any)
      .execute();

    return vehicles.map((vehicle) => new OrgVehicleNode(vehicle));
  },
  listByDepartment: async (departmentId: string) => {
    const vehicles = await db
      .selectFrom('orgVehicles')
      .selectAll()
      .where('departmentId', '=', departmentId)
      .execute();

    return vehicles.map((vehicle) => new OrgVehicleNode(vehicle));
  },
  listByWarehouse: async (warehouseId: string) => {
    const vehicles = await db
      .selectFrom('orgVehicles')
      .selectAll()
      .where('warehouseId', '=', warehouseId)
      .execute();

    return vehicles.map((vehicle) => new OrgVehicleNode(vehicle));
  },
  viewByLicensePlate: async (licensePlate: string) => {
    const vehicle = await db
      .selectFrom('orgVehicles')
      .selectAll()
      .where('licensePlate', '=', licensePlate)
      .executeTakeFirstOrThrow();

    return new OrgVehicleNode(vehicle);
  },
  viewByVehicleNumber: async (vehicleNumber: string) => {
    const vehicle = await db
      .selectFrom('orgVehicles')
      .selectAll()
      .where('vehicleNumber', '=', vehicleNumber)
      .executeTakeFirstOrThrow();

    return new OrgVehicleNode(vehicle);
  },
};

export const mutations = {
  createOrgVehicle: async (payload: OrgVehiclesInsert) => {
    const parsedPayload = orgVehiclesInsertSchema.parse(payload);

    const newVehicle = await db
      .insertInto('orgVehicles')
      .values(parsedPayload)
      .returningAll()
      .executeTakeFirstOrThrow();

    return new OrgVehicleNode(newVehicle);
  },
  updateOrgVehicle: async (id: string, payload: OrgVehiclesUpdate) => {
    const parsedPayload = orgVehiclesUpdateSchema.parse(payload);

    const updatedVehicle = await db
      .updateTable('orgVehicles')
      .set(parsedPayload)
      .where('id', '=', id)
      .returningAll()
      .executeTakeFirstOrThrow();

    return new OrgVehicleNode(updatedVehicle);
  },
  deleteOrgVehicle: async (id: string) => {
    await db.deleteFrom('orgVehicles').where('id', '=', id).execute();

    return { success: true, message: 'Vehicle deleted successfully.' };
  },
};

export default {
  queries,
  mutations,
};
