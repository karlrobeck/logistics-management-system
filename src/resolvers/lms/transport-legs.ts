import { Insertable, Selectable, Updateable } from "kysely";
import { db } from "../../db";
import { DB } from "../../db/types";
import { OrgDriverNode } from "../org/drivers";
import { OrgVehicleNode } from "../org/vehicles";
import { LmsAddressNode } from "./addresses";
import { LmsShipmentNode } from "./shipments";
import { LmsTransportationProviderNode } from "./transportation-providers";
import { LmsWarehouseNode } from "./warehouses";
import {
  LmsTransportLegsInsert,
  lmsTransportLegsInsertSchema,
  LmsTransportLegsUpdate,
  lmsTransportLegsUpdateSchema,
} from "../../db/schemas";

export class LmsTransportLegNode {
  constructor(private model: Selectable<DB["lmsTransportLegs"]>) {}

  id() {
    return this.model.id;
  }

  legSequence() {
    return this.model.legSequence;
  }

  transportType() {
    return this.model.transportType;
  }

  status() {
    return this.model.status;
  }

  cost() {
    return this.model.cost;
  }

  currency() {
    return this.model.currency;
  }

  scheduledPickup() {
    return this.model.scheduledPickup;
  }

  actualPickup() {
    return this.model.actualPickup;
  }

  scheduledDelivery() {
    return this.model.scheduledDelivery;
  }

  actualDelivery() {
    return this.model.actualDelivery;
  }

  providerTrackingNumber() {
    return this.model.providerTrackingNumber;
  }

  specialInstructions() {
    return this.model.specialInstructions;
  }

  async shipment() {
    const shipment = await db
      .selectFrom("lmsShipments")
      .selectAll()
      .where("id", "=", this.model.shipmentId)
      .executeTakeFirst();

    return shipment ? new LmsShipmentNode(shipment) : null;
  }

  async originAddress() {
    if (!this.model.originAddressId) return null;

    const address = await db
      .selectFrom("lmsAddresses")
      .selectAll()
      .where("id", "=", this.model.originAddressId)
      .executeTakeFirst();

    return address ? new LmsAddressNode(address) : null;
  }

  async destinationAddress() {
    if (!this.model.destinationAddressId) return null;

    const address = await db
      .selectFrom("lmsAddresses")
      .selectAll()
      .where("id", "=", this.model.destinationAddressId)
      .executeTakeFirst();

    return address ? new LmsAddressNode(address) : null;
  }

  async originWarehouse() {
    if (!this.model.originWarehouseId) return null;

    const warehouse = await db
      .selectFrom("lmsWarehouses")
      .selectAll()
      .where("id", "=", this.model.originWarehouseId)
      .executeTakeFirst();

    return warehouse ? new LmsWarehouseNode(warehouse) : null;
  }

  async destinationWarehouse() {
    if (!this.model.destinationWarehouseId) return null;

    const warehouse = await db
      .selectFrom("lmsWarehouses")
      .selectAll()
      .where("id", "=", this.model.destinationWarehouseId)
      .executeTakeFirst();

    return warehouse ? new LmsWarehouseNode(warehouse) : null;
  }

  async provider() {
    if (!this.model.providerId) return null;

    const provider = await db
      .selectFrom("lmsTransportationProviders")
      .selectAll()
      .where("id", "=", this.model.providerId)
      .executeTakeFirst();

    return provider ? new LmsTransportationProviderNode(provider) : null;
  }

  async driver() {
    if (!this.model.driverId) return null;

    const driver = await db
      .selectFrom("orgDrivers")
      .selectAll()
      .where("id", "=", this.model.driverId)
      .executeTakeFirst();

    return driver ? new OrgDriverNode(driver) : null;
  }

  async vehicle() {
    if (!this.model.vehicleId) return null;

    const vehicle = await db
      .selectFrom("orgVehicles")
      .selectAll()
      .where("id", "=", this.model.vehicleId)
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
    const transportLegs = await db
      .selectFrom("lmsTransportLegs")
      .selectAll()
      .offset((page - 1) * limit)
      .limit(limit)
      .execute();

    return transportLegs.map((leg) => new LmsTransportLegNode(leg));
  },
  view: async (id: string) => {
    const transportLeg = await db
      .selectFrom("lmsTransportLegs")
      .selectAll()
      .where("id", "=", id)
      .executeTakeFirstOrThrow();

    return new LmsTransportLegNode(transportLeg);
  },
  listByShipment: async (shipmentId: string) => {
    const transportLegs = await db
      .selectFrom("lmsTransportLegs")
      .selectAll()
      .where("shipmentId", "=", shipmentId)
      .orderBy("legSequence", "asc")
      .execute();

    return transportLegs.map((leg) => new LmsTransportLegNode(leg));
  },
  listByStatus: async (status: string) => {
    const transportLegs = await db
      .selectFrom("lmsTransportLegs")
      .selectAll()
      .where("status", "=", status as any)
      .execute();

    return transportLegs.map((leg) => new LmsTransportLegNode(leg));
  },
  listByProvider: async (providerId: string) => {
    const transportLegs = await db
      .selectFrom("lmsTransportLegs")
      .selectAll()
      .where("providerId", "=", providerId)
      .execute();

    return transportLegs.map((leg) => new LmsTransportLegNode(leg));
  },
  listByDriver: async (driverId: string) => {
    const transportLegs = await db
      .selectFrom("lmsTransportLegs")
      .selectAll()
      .where("driverId", "=", driverId)
      .execute();

    return transportLegs.map((leg) => new LmsTransportLegNode(leg));
  },
};

export const mutations = {
  createLmsTransportLeg: async (
    payload: LmsTransportLegsInsert,
  ) => {
    const parsedPayload = lmsTransportLegsInsertSchema.parse(payload);
    const newTransportLeg = await db
      .insertInto("lmsTransportLegs")
      .values(parsedPayload)
      .returningAll()
      .executeTakeFirstOrThrow();

    return new LmsTransportLegNode(newTransportLeg);
  },
  updateLmsTransportLeg: async (
    id: string,
    payload: LmsTransportLegsUpdate,
  ) => {
    const parsedPayload = lmsTransportLegsUpdateSchema.parse(payload);
    const updatedTransportLeg = await db
      .updateTable("lmsTransportLegs")
      .set(parsedPayload)
      .where("id", "=", id)
      .returningAll()
      .executeTakeFirstOrThrow();

    return new LmsTransportLegNode(updatedTransportLeg);
  },
  deleteLmsTransportLeg: async (id: string) => {
    await db.deleteFrom("lmsTransportLegs").where("id", "=", id).execute();

    return { success: true, message: "Transport leg deleted successfully." };
  },
};

export default {
  queries,
  mutations,
};
