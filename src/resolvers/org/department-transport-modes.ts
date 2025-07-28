import { Insertable, Selectable, Updateable } from "kysely";
import { db } from "../../db";
import { DB } from "../../db/types";
import { OrgDepartmentNode } from "./departments";
import {
  OrgDepartmentTransportModesInsert,
  orgDepartmentTransportModesInsertSchema,
  OrgDepartmentTransportModesUpdate,
  orgDepartmentTransportModesUpdateSchema,
} from "../../db/schemas";

export class OrgDepartmentTransportModeNode {
  constructor(private model: Selectable<DB["orgDepartmentTransportModes"]>) {}

  id() {
    return this.model.id;
  }

  transportMode() {
    return this.model.transportMode;
  }

  isPrimary() {
    return this.model.isPrimary;
  }

  async department() {
    const department = await db
      .selectFrom("orgDepartments")
      .selectAll()
      .where("id", "=", this.model.departmentId)
      .executeTakeFirst();

    return department ? new OrgDepartmentNode(department) : null;
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
    const transportModes = await db
      .selectFrom("orgDepartmentTransportModes")
      .selectAll()
      .offset((page - 1) * limit)
      .limit(limit)
      .execute();

    return transportModes.map(
      (mode) => new OrgDepartmentTransportModeNode(mode),
    );
  },
  view: async (id: string) => {
    const transportMode = await db
      .selectFrom("orgDepartmentTransportModes")
      .selectAll()
      .where("id", "=", id)
      .executeTakeFirstOrThrow();

    return new OrgDepartmentTransportModeNode(transportMode);
  },
  listByDepartment: async (departmentId: string) => {
    const transportModes = await db
      .selectFrom("orgDepartmentTransportModes")
      .selectAll()
      .where("departmentId", "=", departmentId)
      .execute();

    return transportModes.map(
      (mode) => new OrgDepartmentTransportModeNode(mode),
    );
  },
  listPrimaryByDepartment: async (departmentId: string) => {
    const transportModes = await db
      .selectFrom("orgDepartmentTransportModes")
      .selectAll()
      .where("departmentId", "=", departmentId)
      .where("isPrimary", "=", true)
      .execute();

    return transportModes.map(
      (mode) => new OrgDepartmentTransportModeNode(mode),
    );
  },
};

export const mutations = {
  createOrgDepartmentTransportMode: async (
    payload: OrgDepartmentTransportModesInsert,
  ) => {
    const parsedPayload = orgDepartmentTransportModesInsertSchema.parse(
      payload,
    );

    const newTransportMode = await db
      .insertInto("orgDepartmentTransportModes")
      .values(parsedPayload)
      .returningAll()
      .executeTakeFirstOrThrow();

    return new OrgDepartmentTransportModeNode(newTransportMode);
  },
  updateOrgDepartmentTransportMode: async (
    id: string,
    payload: OrgDepartmentTransportModesUpdate,
  ) => {
    const parsedPayload = orgDepartmentTransportModesUpdateSchema.parse(
      payload,
    );

    const updatedTransportMode = await db
      .updateTable("orgDepartmentTransportModes")
      .set(parsedPayload)
      .where("id", "=", id)
      .returningAll()
      .executeTakeFirstOrThrow();

    return new OrgDepartmentTransportModeNode(updatedTransportMode);
  },
  deleteOrgDepartmentTransportMode: async (id: string) => {
    await db
      .deleteFrom("orgDepartmentTransportModes")
      .where("id", "=", id)
      .execute();

    return {
      success: true,
      message: "Department transport mode deleted successfully.",
    };
  },
};

export default {
  queries,
  mutations,
};
