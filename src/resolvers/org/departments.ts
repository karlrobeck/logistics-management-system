import { Insertable, Selectable, Updateable } from 'kysely';
import { db } from '../../db';
import {
  OrgDepartmentsInsert,
  OrgDepartmentsUpdate,
  orgDepartmentsInsertSchema,
  orgDepartmentsUpdateSchema,
} from '../../db/schemas';
import { DB } from '../../db/types';
import { AuthUserNode } from '../auth';

export class OrgDepartmentNode {
  constructor(private model: Selectable<DB['orgDepartments']>) {}

  id() {
    return this.model.id;
  }

  name() {
    return this.model.name;
  }

  code() {
    return this.model.code;
  }

  description() {
    return this.model.description;
  }

  departmentType() {
    return this.model.departmentType;
  }

  budget() {
    return this.model.budget;
  }

  email() {
    return this.model.email;
  }

  phoneNumber() {
    return this.model.phoneNumber;
  }

  isActive() {
    return this.model.isActive;
  }

  async manager() {
    if (!this.model.managerId) return null;

    const manager = await db
      .selectFrom('authUsers')
      .selectAll()
      .where('id', '=', this.model.managerId)
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
    const departments = await db
      .selectFrom('orgDepartments')
      .selectAll()
      .offset((page - 1) * limit)
      .limit(limit)
      .execute();

    return departments.map((department) => new OrgDepartmentNode(department));
  },
  view: async (id: string) => {
    const department = await db
      .selectFrom('orgDepartments')
      .selectAll()
      .where('id', '=', id)
      .executeTakeFirstOrThrow();

    return new OrgDepartmentNode(department);
  },
  listActive: async () => {
    const departments = await db
      .selectFrom('orgDepartments')
      .selectAll()
      .where('isActive', '=', true)
      .execute();

    return departments.map((department) => new OrgDepartmentNode(department));
  },
};

export const mutations = {
  createOrgDepartment: async (payload: OrgDepartmentsInsert) => {
    const parsedPayload = orgDepartmentsInsertSchema.parse(payload);

    const newDepartment = await db
      .insertInto('orgDepartments')
      .values(parsedPayload)
      .returningAll()
      .executeTakeFirstOrThrow();

    return new OrgDepartmentNode(newDepartment);
  },
  updateOrgDepartment: async (id: string, payload: OrgDepartmentsUpdate) => {
    const parsedPayload = orgDepartmentsUpdateSchema.parse(payload);

    const updatedDepartment = await db
      .updateTable('orgDepartments')
      .set(parsedPayload)
      .where('id', '=', id)
      .returningAll()
      .executeTakeFirstOrThrow();

    return new OrgDepartmentNode(updatedDepartment);
  },
  deleteOrgDepartment: async (id: string) => {
    await db.deleteFrom('orgDepartments').where('id', '=', id).execute();

    return { success: true, message: 'Department deleted successfully.' };
  },
};

export default {
  queries,
  mutations,
};
