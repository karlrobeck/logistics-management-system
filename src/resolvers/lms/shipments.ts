import { Insertable, Selectable, Updateable } from 'kysely';
import { db } from '../../db';
import {
  LmsShipmentsInsert,
  LmsShipmentsUpdate,
  lmsShipmentsInsertSchema,
  lmsShipmentsUpdateSchema,
} from '../../db/schemas';
import { DB } from '../../db/types';
import { AuthUserNode } from '../auth';
import { CrmCompanyNode } from '../crm/companies';
import { CrmContactNode } from '../crm/contacts';
import { OrgDepartmentNode } from '../org/departments';
import { LmsAddressNode } from './addresses';

export class LmsShipmentNode {
  constructor(private model: Selectable<DB['lmsShipments']>) {}

  id() {
    return this.model.id;
  }

  trackingNumber() {
    return this.model.trackingNumber;
  }

  status() {
    return this.model.status;
  }

  primaryTransportMode() {
    return this.model.primaryTransportMode;
  }

  totalWeight() {
    return this.model.totalWeight;
  }

  totalValue() {
    return this.model.totalValue;
  }

  shippingCost() {
    return this.model.shippingCost;
  }

  insuranceAmount() {
    return this.model.insuranceAmount;
  }

  currency() {
    return this.model.currency;
  }

  pickupDate() {
    return this.model.pickupDate;
  }

  deliveryDate() {
    return this.model.deliveryDate;
  }

  estimatedDeliveryDate() {
    return this.model.estimatedDeliveryDate;
  }

  specialInstructions() {
    return this.model.specialInstructions;
  }

  async senderAddress() {
    const address = await db
      .selectFrom('lmsAddresses')
      .selectAll()
      .where('id', '=', this.model.senderAddressId)
      .executeTakeFirst();

    return address ? new LmsAddressNode(address) : null;
  }

  async receiverAddress() {
    const address = await db
      .selectFrom('lmsAddresses')
      .selectAll()
      .where('id', '=', this.model.receiverAddressId)
      .executeTakeFirst();

    return address ? new LmsAddressNode(address) : null;
  }

  async senderCompany() {
    if (!this.model.senderCompanyId) return null;

    const company = await db
      .selectFrom('crmCompanies')
      .selectAll()
      .where('id', '=', this.model.senderCompanyId)
      .executeTakeFirst();

    return company ? new CrmCompanyNode(company) : null;
  }

  async receiverCompany() {
    if (!this.model.receiverCompanyId) return null;

    const company = await db
      .selectFrom('crmCompanies')
      .selectAll()
      .where('id', '=', this.model.receiverCompanyId)
      .executeTakeFirst();

    return company ? new CrmCompanyNode(company) : null;
  }

  async senderContact() {
    if (!this.model.senderContactId) return null;

    const contact = await db
      .selectFrom('crmContacts')
      .selectAll()
      .where('id', '=', this.model.senderContactId)
      .executeTakeFirst();

    return contact ? new CrmContactNode(contact) : null;
  }

  async receiverContact() {
    if (!this.model.receiverContactId) return null;

    const contact = await db
      .selectFrom('crmContacts')
      .selectAll()
      .where('id', '=', this.model.receiverContactId)
      .executeTakeFirst();

    return contact ? new CrmContactNode(contact) : null;
  }

  async assignedDepartment() {
    if (!this.model.assignedDepartmentId) return null;

    const department = await db
      .selectFrom('orgDepartments')
      .selectAll()
      .where('id', '=', this.model.assignedDepartmentId)
      .executeTakeFirst();

    return department ? new OrgDepartmentNode(department) : null;
  }

  async createdByUser() {
    if (!this.model.createdBy) return null;

    const user = await db
      .selectFrom('authUsers')
      .selectAll()
      .where('id', '=', this.model.createdBy)
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
    const shipments = await db
      .selectFrom('lmsShipments')
      .selectAll()
      .offset((page - 1) * limit)
      .limit(limit)
      .execute();

    return shipments.map((shipment) => new LmsShipmentNode(shipment));
  },
  view: async (id: string) => {
    const shipment = await db
      .selectFrom('lmsShipments')
      .selectAll()
      .where('id', '=', id)
      .executeTakeFirstOrThrow();

    return new LmsShipmentNode(shipment);
  },
  viewByTrackingNumber: async (trackingNumber: string) => {
    const shipment = await db
      .selectFrom('lmsShipments')
      .selectAll()
      .where('trackingNumber', '=', trackingNumber)
      .executeTakeFirstOrThrow();

    return new LmsShipmentNode(shipment);
  },
  listByStatus: async (status: string) => {
    const shipments = await db
      .selectFrom('lmsShipments')
      .selectAll()
      .where('status', '=', status as any)
      .execute();

    return shipments.map((shipment) => new LmsShipmentNode(shipment));
  },
  listByDepartment: async (departmentId: string) => {
    const shipments = await db
      .selectFrom('lmsShipments')
      .selectAll()
      .where('assignedDepartmentId', '=', departmentId)
      .execute();

    return shipments.map((shipment) => new LmsShipmentNode(shipment));
  },
  listByService: async (serviceId: string) => {
    const shipments = await db
      .selectFrom('lmsShipments')
      .selectAll()
      .where('serviceId', '=', serviceId)
      .execute();

    return shipments.map((shipment) => new LmsShipmentNode(shipment));
  },
};

export const mutations = {
  createLmsShipment: async (payload: LmsShipmentsInsert) => {
    const parsedPayload = lmsShipmentsInsertSchema.parse(payload);

    const newShipment = await db
      .insertInto('lmsShipments')
      .values(parsedPayload)
      .returningAll()
      .executeTakeFirstOrThrow();

    return new LmsShipmentNode(newShipment);
  },
  updateLmsShipment: async (id: string, payload: LmsShipmentsUpdate) => {
    const parsedPayload = lmsShipmentsUpdateSchema.parse(payload);

    const updatedShipment = await db
      .updateTable('lmsShipments')
      .set(parsedPayload)
      .where('id', '=', id)
      .returningAll()
      .executeTakeFirstOrThrow();

    return new LmsShipmentNode(updatedShipment);
  },
  deleteLmsShipment: async (id: string) => {
    await db.deleteFrom('lmsShipments').where('id', '=', id).execute();

    return { success: true, message: 'Shipment deleted successfully.' };
  },
};

export default {
  queries,
  mutations,
};
