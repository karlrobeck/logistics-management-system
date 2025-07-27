import { Insertable, Selectable, Updateable } from 'kysely';
import { db } from '../../db';
import { DB } from '../../db/types';
import { OrgDepartmentNode } from '../org/departments';
import { LmsAddressNode } from './addresses';

export class LmsTransportationProviderNode {
  constructor(private model: Selectable<DB['lmsTransportationProviders']>) {}

  id() {
    return this.model.id;
  }

  companyName() {
    return this.model.companyName;
  }

  providerType() {
    return this.model.providerType;
  }

  contactPerson() {
    return this.model.contactPerson;
  }

  email() {
    return this.model.email;
  }

  phoneNumber() {
    return this.model.phoneNumber;
  }

  apiEndpoint() {
    return this.model.apiEndpoint;
  }

  apiKey() {
    return this.model.apiKey;
  }

  isActive() {
    return this.model.isActive;
  }

  performanceRating() {
    return this.model.performanceRating;
  }

  insuranceCoverage() {
    return this.model.insuranceCoverage;
  }

  paymentTerms() {
    return this.model.paymentTerms;
  }

  contractStartDate() {
    return this.model.contractStartDate;
  }

  contractEndDate() {
    return this.model.contractEndDate;
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

  async preferredByDepartment() {
    if (!this.model.preferredByDepartmentId) return null;

    const department = await db
      .selectFrom('orgDepartments')
      .selectAll()
      .where('id', '=', this.model.preferredByDepartmentId)
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
    const providers = await db
      .selectFrom('lmsTransportationProviders')
      .selectAll()
      .offset((page - 1) * limit)
      .limit(limit)
      .execute();

    return providers.map(
      (provider) => new LmsTransportationProviderNode(provider),
    );
  },
  view: async (id: string) => {
    const provider = await db
      .selectFrom('lmsTransportationProviders')
      .selectAll()
      .where('id', '=', id)
      .executeTakeFirstOrThrow();

    return new LmsTransportationProviderNode(provider);
  },
  listActive: async () => {
    const providers = await db
      .selectFrom('lmsTransportationProviders')
      .selectAll()
      .where('isActive', '=', true)
      .execute();

    return providers.map(
      (provider) => new LmsTransportationProviderNode(provider),
    );
  },
  listByType: async (providerType: string) => {
    const providers = await db
      .selectFrom('lmsTransportationProviders')
      .selectAll()
      .where('providerType', '=', providerType as any)
      .execute();

    return providers.map(
      (provider) => new LmsTransportationProviderNode(provider),
    );
  },
  listByDepartment: async (departmentId: string) => {
    const providers = await db
      .selectFrom('lmsTransportationProviders')
      .selectAll()
      .where('preferredByDepartmentId', '=', departmentId)
      .execute();

    return providers.map(
      (provider) => new LmsTransportationProviderNode(provider),
    );
  },
};

export const mutations = {
  createLmsTransportationProvider: async (
    payload: Insertable<DB['lmsTransportationProviders']>,
  ) => {
    const newProvider = await db
      .insertInto('lmsTransportationProviders')
      .values(payload)
      .returningAll()
      .executeTakeFirstOrThrow();

    return new LmsTransportationProviderNode(newProvider);
  },
  updateLmsTransportationProvider: async (
    id: string,
    payload: Updateable<DB['lmsTransportationProviders']>,
  ) => {
    const updatedProvider = await db
      .updateTable('lmsTransportationProviders')
      .set(payload)
      .where('id', '=', id)
      .returningAll()
      .executeTakeFirstOrThrow();

    return new LmsTransportationProviderNode(updatedProvider);
  },
  deleteLmsTransportationProvider: async (id: string) => {
    await db
      .deleteFrom('lmsTransportationProviders')
      .where('id', '=', id)
      .execute();

    return {
      success: true,
      message: 'Transportation provider deleted successfully.',
    };
  },
};

export default {
  queries,
  mutations,
};
