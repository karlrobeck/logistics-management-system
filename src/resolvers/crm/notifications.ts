import { Insertable, Selectable, Updateable } from "kysely";
import { db } from "../../db";
import { DB } from "../../db/types";
import { LmsShipmentNode } from "../lms/shipments";
import { CrmContactNode } from "./contacts";
import {
  CrmNotificationsInsert,
  crmNotificationsInsertSchema,
  CrmNotificationsUpdate,
  crmNotificationsUpdateSchema,
} from "../../db/schemas";

export class CrmNotificationNode {
  constructor(private model: Selectable<DB["crmNotifications"]>) {}

  id() {
    return this.model.id;
  }

  notificationType() {
    return this.model.notificationType;
  }

  channel() {
    return this.model.channel;
  }

  recipient() {
    return this.model.recipient;
  }

  subject() {
    return this.model.subject;
  }

  message() {
    return this.model.message;
  }

  deliveryStatus() {
    return this.model.deliveryStatus;
  }

  sentAt() {
    return this.model.sentAt;
  }

  async contact() {
    const contact = await db
      .selectFrom("crmContacts")
      .selectAll()
      .where("id", "=", this.model.contactId)
      .executeTakeFirst();

    return contact ? new CrmContactNode(contact) : null;
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
    const notifications = await db
      .selectFrom("crmNotifications")
      .selectAll()
      .offset((page - 1) * limit)
      .limit(limit)
      .execute();

    return notifications.map(
      (notification) => new CrmNotificationNode(notification),
    );
  },
  view: async (id: string) => {
    const notification = await db
      .selectFrom("crmNotifications")
      .selectAll()
      .where("id", "=", id)
      .executeTakeFirstOrThrow();

    return new CrmNotificationNode(notification);
  },
  listByContact: async (contactId: string) => {
    const notifications = await db
      .selectFrom("crmNotifications")
      .selectAll()
      .where("contactId", "=", contactId)
      .execute();

    return notifications.map(
      (notification) => new CrmNotificationNode(notification),
    );
  },
  listByShipment: async (shipmentId: string) => {
    const notifications = await db
      .selectFrom("crmNotifications")
      .selectAll()
      .where("shipmentId", "=", shipmentId)
      .execute();

    return notifications.map(
      (notification) => new CrmNotificationNode(notification),
    );
  },
};

export const mutations = {
  createCrmNotification: async (
    payload: CrmNotificationsInsert,
  ) => {
    const parsedPayload = crmNotificationsInsertSchema.parse(payload);

    const newNotification = await db
      .insertInto("crmNotifications")
      .values(parsedPayload)
      .returningAll()
      .executeTakeFirstOrThrow();

    return new CrmNotificationNode(newNotification);
  },
  updateCrmNotification: async (
    id: string,
    payload: CrmNotificationsUpdate,
  ) => {
    const parsedPayload = crmNotificationsUpdateSchema.parse(payload);

    const updatedNotification = await db
      .updateTable("crmNotifications")
      .set(parsedPayload)
      .where("id", "=", id)
      .returningAll()
      .executeTakeFirstOrThrow();

    return new CrmNotificationNode(updatedNotification);
  },
  deleteCrmNotification: async (id: string) => {
    await db.deleteFrom("crmNotifications").where("id", "=", id).execute();

    return { success: true, message: "Notification deleted successfully." };
  },
};

export default {
  queries,
  mutations,
};
