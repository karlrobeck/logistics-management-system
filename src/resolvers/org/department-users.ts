import { Insertable, Selectable, Updateable } from 'kysely';
import { db } from '../../db';
import {
  OrgDepartmentUsersInsert,
  OrgDepartmentUsersUpdate,
  orgDepartmentUsersInsertSchema,
  orgDepartmentUsersUpdateSchema,
} from '../../db/schemas';
import { DB } from '../../db/types';
import { AuthUserNode } from '../auth';
import { OrgDepartmentNode } from './departments';

export class OrgDepartmentUserNode {
  constructor(private model: Selectable<DB['orgDepartmentUsers']>) {}

  id() {
    return this.model.id;
  }

  role() {
    return this.model.role;
  }

  assignedDate() {
    return this.model.assignedDate;
  }

  isActive() {
    return this.model.isActive;
  }

  async department() {
    const department = await db
      .selectFrom('orgDepartments')
      .selectAll()
      .where('id', '=', this.model.departmentId)
      .executeTakeFirst();

    return department ? new OrgDepartmentNode(department) : null;
  }

  async user() {
    const user = await db
      .selectFrom('authUsers')
      .selectAll()
      .where('id', '=', this.model.userId)
      .executeTakeFirst();

    return user ? new AuthUserNode(user) : null;
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
    const departmentUsers = await db
      .selectFrom('orgDepartmentUsers')
      .selectAll()
      .offset((page - 1) * limit)
      .limit(limit)
      .execute();

    return departmentUsers.map((user) => new OrgDepartmentUserNode(user));
  },
  view: async (id: string) => {
    const departmentUser = await db
      .selectFrom('orgDepartmentUsers')
      .selectAll()
      .where('id', '=', id)
      .executeTakeFirstOrThrow();

    return new OrgDepartmentUserNode(departmentUser);
  },
  listByDepartment: async (departmentId: string) => {
    const departmentUsers = await db
      .selectFrom('orgDepartmentUsers')
      .selectAll()
      .where('departmentId', '=', departmentId)
      .execute();

    return departmentUsers.map((user) => new OrgDepartmentUserNode(user));
  },
  listByUser: async (userId: string) => {
    const departmentUsers = await db
      .selectFrom('orgDepartmentUsers')
      .selectAll()
      .where('userId', '=', userId)
      .execute();

    return departmentUsers.map((user) => new OrgDepartmentUserNode(user));
  },
  listActiveDepartmentUsers: async (departmentId: string) => {
    const departmentUsers = await db
      .selectFrom('orgDepartmentUsers')
      .selectAll()
      .where('departmentId', '=', departmentId)
      .where('isActive', '=', true)
      .execute();

    return departmentUsers.map((user) => new OrgDepartmentUserNode(user));
  },
};

export const mutations = {
  createOrgDepartmentUser: async (payload: OrgDepartmentUsersInsert) => {
    const parsedPayload = orgDepartmentUsersInsertSchema.parse(payload);

    const newDepartmentUser = await db
      .insertInto('orgDepartmentUsers')
      .values(parsedPayload)
      .returningAll()
      .executeTakeFirstOrThrow();

    return new OrgDepartmentUserNode(newDepartmentUser);
  },
  updateOrgDepartmentUser: async (
    id: string,
    payload: OrgDepartmentUsersUpdate,
  ) => {
    const parsedPayload = orgDepartmentUsersUpdateSchema.parse(payload);

    const updatedDepartmentUser = await db
      .updateTable('orgDepartmentUsers')
      .set(parsedPayload)
      .where('id', '=', id)
      .returningAll()
      .executeTakeFirstOrThrow();

    return new OrgDepartmentUserNode(updatedDepartmentUser);
  },
  deleteOrgDepartmentUser: async (id: string) => {
    await db.deleteFrom('orgDepartmentUsers').where('id', '=', id).execute();

    return { success: true, message: 'Department user deleted successfully.' };
  },
};

export default {
  queries,
  mutations,
};
