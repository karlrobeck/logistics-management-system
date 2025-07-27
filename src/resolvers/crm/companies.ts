import { Insertable, Selectable, Updateable } from 'kysely';
import { db } from '../../db';
import { DB } from '../../db/types';
import { LmsAddressNode } from '../lms/addresses';

export class CrmCompanyNode {
  constructor(private model: Selectable<DB['crmCompanies']>) {}

  id() {
    return this.model.id;
  }

  name() {
    return this.model.name;
  }

  description() {
    return this.model.description;
  }

  email() {
    return this.model.email;
  }

  phoneNumber() {
    return this.model.phoneNumber;
  }

  website() {
    return this.model.website;
  }

  industry() {
    return this.model.industry;
  }

  async address() {
    if (!this.model.addressId) return null;

    const address = await db
      .selectFrom('lmsAddresses')
      .selectAll()
      .where('id', '=', this.model.addressId)
      .executeTakeFirst();

    return address ? new LmsAddressNode(address) : null;
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
    const companies = await db
      .selectFrom('crmCompanies')
      .selectAll()
      .offset((page - 1) * limit)
      .limit(limit)
      .execute();

    return companies.map((company) => new CrmCompanyNode(company));
  },
  view: async (id: string) => {
    const company = await db
      .selectFrom('crmCompanies')
      .selectAll()
      .where('id', '=', id)
      .executeTakeFirstOrThrow();

    return new CrmCompanyNode(company);
  },
};

export const mutations = {
  createCrmCompany: async (payload: Insertable<DB['crmCompanies']>) => {
    const newCompany = await db
      .insertInto('crmCompanies')
      .values(payload)
      .returningAll()
      .executeTakeFirstOrThrow();

    return new CrmCompanyNode(newCompany);
  },
  updateCrmCompany: async (
    id: string,
    payload: Updateable<DB['crmCompanies']>,
  ) => {
    const updatedCompany = await db
      .updateTable('crmCompanies')
      .set(payload)
      .where('id', '=', id)
      .returningAll()
      .executeTakeFirstOrThrow();

    return new CrmCompanyNode(updatedCompany);
  },
  deleteCrmCompany: async (id: string) => {
    await db.deleteFrom('crmCompanies').where('id', '=', id).execute();

    return { success: true, message: 'Company deleted successfully.' };
  },
};

export default {
  queries,
  mutations,
};
