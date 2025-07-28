import { Insertable, Selectable, Updateable } from "kysely";
import { db } from "../../db";
import { DB } from "../../db/types";
import { LmsShipmentNode } from "./shipments";
import {
  LmsPackagesInsert,
  lmsPackagesInsertSchema,
  LmsPackagesUpdate,
  lmsPackagesUpdateSchema,
} from "../../db/schemas";

export class LmsPackageNode {
  constructor(private model: Selectable<DB["lmsPackages"]>) {}

  id() {
    return this.model.id;
  }

  packageNumber() {
    return this.model.packageNumber;
  }

  packageType() {
    return this.model.packageType;
  }

  weight() {
    return this.model.weight;
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

  declaredValue() {
    return this.model.declaredValue;
  }

  contentsDescription() {
    return this.model.contentsDescription;
  }

  async shipment() {
    const shipment = await db
      .selectFrom("lmsShipments")
      .selectAll()
      .where("id", "=", this.model.shipmentId)
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
    const packages = await db
      .selectFrom("lmsPackages")
      .selectAll()
      .offset((page - 1) * limit)
      .limit(limit)
      .execute();

    return packages.map((pkg) => new LmsPackageNode(pkg));
  },
  view: async (id: string) => {
    const pkg = await db
      .selectFrom("lmsPackages")
      .selectAll()
      .where("id", "=", id)
      .executeTakeFirstOrThrow();

    return new LmsPackageNode(pkg);
  },
  listByShipment: async (shipmentId: string) => {
    const packages = await db
      .selectFrom("lmsPackages")
      .selectAll()
      .where("shipmentId", "=", shipmentId)
      .execute();

    return packages.map((pkg) => new LmsPackageNode(pkg));
  },
  listByType: async (packageType: string) => {
    const packages = await db
      .selectFrom("lmsPackages")
      .selectAll()
      .where("packageType", "=", packageType as any)
      .execute();

    return packages.map((pkg) => new LmsPackageNode(pkg));
  },
};

export const mutations = {
  createLmsPackage: async (payload: LmsPackagesInsert) => {
    const parsedPayload = lmsPackagesInsertSchema.parse(payload);

    const newPackage = await db
      .insertInto("lmsPackages")
      .values(parsedPayload)
      .returningAll()
      .executeTakeFirstOrThrow();

    return new LmsPackageNode(newPackage);
  },
  updateLmsPackage: async (
    id: string,
    payload: LmsPackagesUpdate,
  ) => {
    const parsedPayload = lmsPackagesUpdateSchema.parse(payload);

    const updatedPackage = await db
      .updateTable("lmsPackages")
      .set(parsedPayload)
      .where("id", "=", id)
      .returningAll()
      .executeTakeFirstOrThrow();

    return new LmsPackageNode(updatedPackage);
  },
  deleteLmsPackage: async (id: string) => {
    await db.deleteFrom("lmsPackages").where("id", "=", id).execute();

    return { success: true, message: "Package deleted successfully." };
  },
};

export default {
  queries,
  mutations,
};
