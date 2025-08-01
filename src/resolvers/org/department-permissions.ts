import { Insertable, Selectable, Updateable } from 'kysely';
import { db } from '../../db';
import {
  OrgDepartmentPermissionsInsert,
  OrgDepartmentPermissionsUpdate,
  orgDepartmentPermissionsInsertSchema,
  orgDepartmentPermissionsUpdateSchema,
} from '../../db/schemas';
import { DB } from '../../db/types';
import { OrgDepartmentNode } from './departments';

export class OrgDepartmentPermissionNode {
  constructor(private model: Selectable<DB['orgDepartmentPermissions']>) {}

  id() {
    return this.model.id;
  }

  resource() {
    return this.model.resource;
  }

  action() {
    return this.model.action;
  }

  async department() {
    const department = await db
      .selectFrom('orgDepartments')
      .selectAll()
      .where('id', '=', this.model.departmentId)
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
    const permissions = await db
      .selectFrom('orgDepartmentPermissions')
      .selectAll()
      .offset((page - 1) * limit)
      .limit(limit)
      .execute();

    return permissions.map(
      (permission) => new OrgDepartmentPermissionNode(permission),
    );
  },
  view: async (id: string) => {
    const permission = await db
      .selectFrom('orgDepartmentPermissions')
      .selectAll()
      .where('id', '=', id)
      .executeTakeFirstOrThrow();

    return new OrgDepartmentPermissionNode(permission);
  },
  listByDepartment: async (departmentId: string) => {
    const permissions = await db
      .selectFrom('orgDepartmentPermissions')
      .selectAll()
      .where('departmentId', '=', departmentId)
      .execute();

    return permissions.map(
      (permission) => new OrgDepartmentPermissionNode(permission),
    );
  },
};

export const mutations = {
  createOrgDepartmentPermission: async (
    payload: OrgDepartmentPermissionsInsert,
  ) => {
    const parsedPayload = orgDepartmentPermissionsInsertSchema.parse(payload);

    const newPermission = await db
      .insertInto('orgDepartmentPermissions')
      .values(parsedPayload)
      .returningAll()
      .executeTakeFirstOrThrow();

    return new OrgDepartmentPermissionNode(newPermission);
  },
  updateOrgDepartmentPermission: async (
    id: string,
    payload: OrgDepartmentPermissionsUpdate,
  ) => {
    const parsedPayload = orgDepartmentPermissionsUpdateSchema.parse(payload);

    const updatedPermission = await db
      .updateTable('orgDepartmentPermissions')
      .set(parsedPayload)
      .where('id', '=', id)
      .returningAll()
      .executeTakeFirstOrThrow();

    return new OrgDepartmentPermissionNode(updatedPermission);
  },
  deleteOrgDepartmentPermission: async (id: string) => {
    await db
      .deleteFrom('orgDepartmentPermissions')
      .where('id', '=', id)
      .execute();

    return {
      success: true,
      message: 'Department permission deleted successfully.',
    };
  },
};

export default {
  queries,
  mutations,
};
