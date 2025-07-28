import { Insertable, Selectable, Updateable } from "kysely";
import { db } from "../../db";
import { DB } from "../../db/types";
import { LmsShipmentNode } from "./shipments";
import {
  LmsTrackingEventsInsert,
  lmsTrackingEventsInsertSchema,
  LmsTrackingEventsUpdate,
  lmsTrackingEventsUpdateSchema,
} from "../../db/schemas";

export class LmsTrackingEventNode {
  constructor(private model: Selectable<DB["lmsTrackingEvents"]>) {}

  id() {
    return this.model.id;
  }

  eventType() {
    return this.model.eventType;
  }

  eventDescription() {
    return this.model.eventDescription;
  }

  eventLocation() {
    return this.model.eventLocation;
  }

  eventTimestamp() {
    return this.model.eventTimestamp;
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
    const trackingEvents = await db
      .selectFrom("lmsTrackingEvents")
      .selectAll()
      .offset((page - 1) * limit)
      .limit(limit)
      .execute();

    return trackingEvents.map((event) => new LmsTrackingEventNode(event));
  },
  view: async (id: string) => {
    const trackingEvent = await db
      .selectFrom("lmsTrackingEvents")
      .selectAll()
      .where("id", "=", id)
      .executeTakeFirstOrThrow();

    return new LmsTrackingEventNode(trackingEvent);
  },
  listByShipment: async (shipmentId: string) => {
    const trackingEvents = await db
      .selectFrom("lmsTrackingEvents")
      .selectAll()
      .where("shipmentId", "=", shipmentId)
      .orderBy("eventTimestamp", "desc")
      .execute();

    return trackingEvents.map((event) => new LmsTrackingEventNode(event));
  },
  listByEventType: async (eventType: string) => {
    const trackingEvents = await db
      .selectFrom("lmsTrackingEvents")
      .selectAll()
      .where("eventType", "=", eventType as any)
      .execute();

    return trackingEvents.map((event) => new LmsTrackingEventNode(event));
  },
};

export const mutations = {
  createLmsTrackingEvent: async (
    payload: LmsTrackingEventsInsert,
  ) => {
    const parsedPayload = lmsTrackingEventsInsertSchema.parse(payload);
    const newTrackingEvent = await db
      .insertInto("lmsTrackingEvents")
      .values(parsedPayload)
      .returningAll()
      .executeTakeFirstOrThrow();

    return new LmsTrackingEventNode(newTrackingEvent);
  },
  updateLmsTrackingEvent: async (
    id: string,
    payload: LmsTrackingEventsUpdate,
  ) => {
    const parsedPayload = lmsTrackingEventsUpdateSchema.parse(payload);
    const updatedTrackingEvent = await db
      .updateTable("lmsTrackingEvents")
      .set(parsedPayload)
      .where("id", "=", id)
      .returningAll()
      .executeTakeFirstOrThrow();

    return new LmsTrackingEventNode(updatedTrackingEvent);
  },
  deleteLmsTrackingEvent: async (id: string) => {
    await db.deleteFrom("lmsTrackingEvents").where("id", "=", id).execute();

    return { success: true, message: "Tracking event deleted successfully." };
  },
};

export default {
  queries,
  mutations,
};
