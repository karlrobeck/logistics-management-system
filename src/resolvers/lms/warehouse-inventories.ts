import { Insertable, Selectable, Updateable } from "kysely";
import { db } from "../../db";
import { DB } from "../../db/types";
import { LmsPackageNode } from "./packages";
import { LmsShipmentNode } from "./shipments";
import { LmsWarehouseNode } from "./warehouses";
import {
  LmsWarehouseInventoriesInsert,
  lmsWarehouseInventoriesInsertSchema,
  LmsWarehouseInventoriesUpdate,
  lmsWarehouseInventoriesUpdateSchema,
} from "../../db/schemas";

export class LmsWarehouseInventoryNode {
  constructor(private model: Selectable<DB["lmsWarehouseInventories"]>) {}

  id() {
    return this.model.id;
  }

  status() {
    return this.model.status;
  }

  locationCode() {
    return this.model.locationCode;
  }

  arrivedAt() {
    return this.model.arrivedAt;
  }

  departedAt() {
    return this.model.departedAt;
  }

  async warehouse() {
    const warehouse = await db
      .selectFrom("lmsWarehouses")
      .selectAll()
      .where("id", "=", this.model.warehouseId)
      .executeTakeFirst();

    return warehouse ? new LmsWarehouseNode(warehouse) : null;
  }

  async shipment() {
    const shipment = await db
      .selectFrom("lmsShipments")
      .selectAll()
      .where("id", "=", this.model.shipmentId)
      .executeTakeFirst();

    return shipment ? new LmsShipmentNode(shipment) : null;
  }

  async package() {
    const packageItem = await db
      .selectFrom("lmsPackages")
      .selectAll()
      .where("id", "=", this.model.packageId)
      .executeTakeFirst();

    return packageItem ? new LmsPackageNode(packageItem) : null;
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
    const inventories = await db
      .selectFrom("lmsWarehouseInventories")
      .selectAll()
      .offset((page - 1) * limit)
      .limit(limit)
      .execute();

    return inventories.map(
      (inventory) => new LmsWarehouseInventoryNode(inventory),
    );
  },
  view: async (id: string) => {
    const inventory = await db
      .selectFrom("lmsWarehouseInventories")
      .selectAll()
      .where("id", "=", id)
      .executeTakeFirstOrThrow();

    return new LmsWarehouseInventoryNode(inventory);
  },
  listByWarehouse: async (warehouseId: string) => {
    const inventories = await db
      .selectFrom("lmsWarehouseInventories")
      .selectAll()
      .where("warehouseId", "=", warehouseId)
      .execute();

    return inventories.map(
      (inventory) => new LmsWarehouseInventoryNode(inventory),
    );
  },
  listByShipment: async (shipmentId: string) => {
    const inventories = await db
      .selectFrom("lmsWarehouseInventories")
      .selectAll()
      .where("shipmentId", "=", shipmentId)
      .execute();

    return inventories.map(
      (inventory) => new LmsWarehouseInventoryNode(inventory),
    );
  },
  listByPackage: async (packageId: string) => {
    const inventories = await db
      .selectFrom("lmsWarehouseInventories")
      .selectAll()
      .where("packageId", "=", packageId)
      .execute();

    return inventories.map(
      (inventory) => new LmsWarehouseInventoryNode(inventory),
    );
  },
  listByStatus: async (status: string) => {
    const inventories = await db
      .selectFrom("lmsWarehouseInventories")
      .selectAll()
      .where("status", "=", status as any)
      .execute();

    return inventories.map(
      (inventory) => new LmsWarehouseInventoryNode(inventory),
    );
  },
};

export const mutations = {
  createLmsWarehouseInventory: async (
    payload: LmsWarehouseInventoriesInsert,
  ) => {
    const parsedPayload = lmsWarehouseInventoriesInsertSchema.parse(payload);
    const newInventory = await db
      .insertInto("lmsWarehouseInventories")
      .values(parsedPayload)
      .returningAll()
      .executeTakeFirstOrThrow();

    return new LmsWarehouseInventoryNode(newInventory);
  },
  updateLmsWarehouseInventory: async (
    id: string,
    payload: LmsWarehouseInventoriesUpdate,
  ) => {
    const parsedPayload = lmsWarehouseInventoriesUpdateSchema.parse(payload);
    const updatedInventory = await db
      .updateTable("lmsWarehouseInventories")
      .set(parsedPayload)
      .where("id", "=", id)
      .returningAll()
      .executeTakeFirstOrThrow();

    return new LmsWarehouseInventoryNode(updatedInventory);
  },
  deleteLmsWarehouseInventory: async (id: string) => {
    await db
      .deleteFrom("lmsWarehouseInventories")
      .where("id", "=", id)
      .execute();

    return {
      success: true,
      message: "Warehouse inventory deleted successfully.",
    };
  },
};

export default {
  queries,
  mutations,
};
