import { Insertable, Selectable, Updateable } from 'kysely';
import { db } from '../../db';
import {
  OrgDepartmentUserPermissionsInsert,
  OrgDepartmentUserPermissionsUpdate,
  orgDepartmentUserPermissionsInsertSchema,
  orgDepartmentUserPermissionsUpdateSchema,
} from '../../db/schemas';
import { DB } from '../../db/types';
import { AuthUserNode } from '../auth';
import { OrgDepartmentPermissionNode } from './department-permissions';

export class OrgDepartmentUserPermissionNode {
  constructor(private model: Selectable<DB['orgDepartmentUserPermissions']>) {}

  id() {
    return this.model.id;
  }

  async user() {
    const user = await db
      .selectFrom('authUsers')
      .selectAll()
      .where('id', '=', this.model.userId)
      .executeTakeFirst();

    return user ? new AuthUserNode(user) : null;
  }

  async permission() {
    const permission = await db
      .selectFrom('orgDepartmentPermissions')
      .selectAll()
      .where('id', '=', this.model.permissionId)
      .executeTakeFirst();

    return permission ? new OrgDepartmentPermissionNode(permission) : null;
  }

  created() {
    return this.model.created;
  }
}

export const queries = {
  list: async (page: number, limit: number) => {
    const permissions = await db
      .selectFrom('orgDepartmentUserPermissions')
      .selectAll()
      .offset((page - 1) * limit)
      .limit(limit)
      .execute();

    return permissions.map(
      (permission) => new OrgDepartmentUserPermissionNode(permission),
    );
  },
  view: async (id: string) => {
    const permission = await db
      .selectFrom('orgDepartmentUserPermissions')
      .selectAll()
      .where('id', '=', id)
      .executeTakeFirstOrThrow();

    return new OrgDepartmentUserPermissionNode(permission);
  },
  listByUser: async (userId: string) => {
    const permissions = await db
      .selectFrom('orgDepartmentUserPermissions')
      .selectAll()
      .where('userId', '=', userId)
      .execute();

    return permissions.map(
      (permission) => new OrgDepartmentUserPermissionNode(permission),
    );
  },
};

export const mutations = {
  createOrgDepartmentUserPermission: async (
    payload: OrgDepartmentUserPermissionsInsert,
  ) => {
    const parsedPayload =
      orgDepartmentUserPermissionsInsertSchema.parse(payload);

    const newPermission = await db
      .insertInto('orgDepartmentUserPermissions')
      .values(parsedPayload)
      .returningAll()
      .executeTakeFirstOrThrow();

    return new OrgDepartmentUserPermissionNode(newPermission);
  },
  updateOrgDepartmentUserPermission: async (
    id: string,
    payload: OrgDepartmentUserPermissionsUpdate,
  ) => {
    const parsedPayload =
      orgDepartmentUserPermissionsUpdateSchema.parse(payload);

    const updatedPermission = await db
      .updateTable('orgDepartmentUserPermissions')
      .set(parsedPayload)
      .where('id', '=', id)
      .returningAll()
      .executeTakeFirstOrThrow();

    return new OrgDepartmentUserPermissionNode(updatedPermission);
  },
  deleteOrgDepartmentUserPermission: async (id: string) => {
    await db
      .deleteFrom('orgDepartmentUserPermissions')
      .where('id', '=', id)
      .execute();

    return {
      success: true,
      message: 'Department user permission deleted successfully.',
    };
  },
};

export default {
  queries,
  mutations,
};
