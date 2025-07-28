import { Insertable, Selectable, Updateable } from "kysely";
import { db } from "../../db";
import { DB } from "../../db/types";
import {
  OrgDriversInsert,
  orgDriversInsertSchema,
  OrgDriversUpdate,
  orgDriversUpdateSchema,
} from "../../db/schemas";

export class OrgDriverNode {
  constructor(private model: Selectable<DB["orgDrivers"]>) {}

  id() {
    return this.model.id;
  }

  employeeId() {
    return this.model.employeeId;
  }

  firstName() {
    return this.model.firstName;
  }

  lastName() {
    return this.model.lastName;
  }

  email() {
    return this.model.email;
  }

  phoneNumber() {
    return this.model.phoneNumber;
  }

  licenseNumber() {
    return this.model.licenseNumber;
  }

  hireDate() {
    return this.model.hireDate;
  }

  status() {
    return this.model.status;
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
    const drivers = await db
      .selectFrom("orgDrivers")
      .selectAll()
      .offset((page - 1) * limit)
      .limit(limit)
      .execute();

    return drivers.map((driver) => new OrgDriverNode(driver));
  },
  view: async (id: string) => {
    const driver = await db
      .selectFrom("orgDrivers")
      .selectAll()
      .where("id", "=", id)
      .executeTakeFirstOrThrow();

    return new OrgDriverNode(driver);
  },
  listByStatus: async (status: string) => {
    const drivers = await db
      .selectFrom("orgDrivers")
      .selectAll()
      .where("status", "=", status as any)
      .execute();

    return drivers.map((driver) => new OrgDriverNode(driver));
  },
  viewByEmployeeId: async (employeeId: string) => {
    const driver = await db
      .selectFrom("orgDrivers")
      .selectAll()
      .where("employeeId", "=", employeeId)
      .executeTakeFirstOrThrow();

    return new OrgDriverNode(driver);
  },
  viewByLicenseNumber: async (licenseNumber: string) => {
    const driver = await db
      .selectFrom("orgDrivers")
      .selectAll()
      .where("licenseNumber", "=", licenseNumber)
      .executeTakeFirstOrThrow();

    return new OrgDriverNode(driver);
  },
};

export const mutations = {
  createOrgDriver: async (payload: OrgDriversInsert) => {
    const parsedPayload = orgDriversInsertSchema.parse(payload);

    const newDriver = await db
      .insertInto("orgDrivers")
      .values(parsedPayload)
      .returningAll()
      .executeTakeFirstOrThrow();

    return new OrgDriverNode(newDriver);
  },
  updateOrgDriver: async (
    id: string,
    payload: OrgDriversUpdate,
  ) => {
    const parsedPayload = orgDriversUpdateSchema.parse(payload);

    const updatedDriver = await db
      .updateTable("orgDrivers")
      .set(parsedPayload)
      .where("id", "=", id)
      .returningAll()
      .executeTakeFirstOrThrow();

    return new OrgDriverNode(updatedDriver);
  },
  deleteOrgDriver: async (id: string) => {
    await db.deleteFrom("orgDrivers").where("id", "=", id).execute();

    return { success: true, message: "Driver deleted successfully." };
  },
};

export default {
  queries,
  mutations,
};
