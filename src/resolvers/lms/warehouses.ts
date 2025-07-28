import { Insertable, Selectable, Updateable } from "kysely";
import { db } from "../../db";
import { DB } from "../../db/types";
import { AuthUserNode } from "../auth";
import { OrgDepartmentNode } from "../org/departments";
import { LmsAddressNode } from "./addresses";
import {
  LmsWarehousesInsert,
  lmsWarehousesInsertSchema,
  LmsWarehousesUpdate,
  lmsWarehousesUpdateSchema,
} from "../../db/schemas";

export class LmsWarehouseNode {
  constructor(private model: Selectable<DB["lmsWarehouses"]>) {}

  id() {
    return this.model.id;
  }

  name() {
    return this.model.name;
  }

  code() {
    return this.model.code;
  }

  warehouseType() {
    return this.model.warehouseType;
  }

  capacity() {
    return this.model.capacity;
  }

  isActive() {
    return this.model.isActive;
  }

  async address() {
    const address = await db
      .selectFrom("lmsAddresses")
      .selectAll()
      .where("id", "=", this.model.addressId)
      .executeTakeFirst();

    return address ? new LmsAddressNode(address) : null;
  }

  async department() {
    if (!this.model.departmentId) return null;

    const department = await db
      .selectFrom("orgDepartments")
      .selectAll()
      .where("id", "=", this.model.departmentId)
      .executeTakeFirst();

    return department ? new OrgDepartmentNode(department) : null;
  }

  async manager() {
    if (!this.model.managerId) return null;

    const manager = await db
      .selectFrom("authUsers")
      .selectAll()
      .where("id", "=", this.model.managerId)
      .executeTakeFirst();

    return manager ? new AuthUserNode(manager) : null;
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
    const warehouses = await db
      .selectFrom("lmsWarehouses")
      .selectAll()
      .offset((page - 1) * limit)
      .limit(limit)
      .execute();

    return warehouses.map((warehouse) => new LmsWarehouseNode(warehouse));
  },
  view: async (id: string) => {
    const warehouse = await db
      .selectFrom("lmsWarehouses")
      .selectAll()
      .where("id", "=", id)
      .executeTakeFirstOrThrow();

    return new LmsWarehouseNode(warehouse);
  },
  listActive: async () => {
    const warehouses = await db
      .selectFrom("lmsWarehouses")
      .selectAll()
      .where("isActive", "=", true)
      .execute();

    return warehouses.map((warehouse) => new LmsWarehouseNode(warehouse));
  },
  listByType: async (warehouseType: string) => {
    const warehouses = await db
      .selectFrom("lmsWarehouses")
      .selectAll()
      .where("warehouseType", "=", warehouseType as any)
      .execute();

    return warehouses.map((warehouse) => new LmsWarehouseNode(warehouse));
  },
  listByDepartment: async (departmentId: string) => {
    const warehouses = await db
      .selectFrom("lmsWarehouses")
      .selectAll()
      .where("departmentId", "=", departmentId)
      .execute();

    return warehouses.map((warehouse) => new LmsWarehouseNode(warehouse));
  },
  viewByCode: async (code: string) => {
    const warehouse = await db
      .selectFrom("lmsWarehouses")
      .selectAll()
      .where("code", "=", code)
      .executeTakeFirstOrThrow();

    return new LmsWarehouseNode(warehouse);
  },
};

export const mutations = {
  createLmsWarehouse: async (payload: LmsWarehousesInsert) => {
    const parsedPayload = lmsWarehousesInsertSchema.parse(payload);
    const newWarehouse = await db
      .insertInto("lmsWarehouses")
      .values(parsedPayload)
      .returningAll()
      .executeTakeFirstOrThrow();

    return new LmsWarehouseNode(newWarehouse);
  },
  updateLmsWarehouse: async (
    id: string,
    payload: LmsWarehousesUpdate,
  ) => {
    const parsedPayload = lmsWarehousesUpdateSchema.parse(payload);
    const updatedWarehouse = await db
      .updateTable("lmsWarehouses")
      .set(parsedPayload)
      .where("id", "=", id)
      .returningAll()
      .executeTakeFirstOrThrow();

    return new LmsWarehouseNode(updatedWarehouse);
  },
  deleteLmsWarehouse: async (id: string) => {
    await db.deleteFrom("lmsWarehouses").where("id", "=", id).execute();

    return { success: true, message: "Warehouse deleted successfully." };
  },
};

export default {
  queries,
  mutations,
};
