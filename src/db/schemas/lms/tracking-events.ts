import { z } from "zod";
import {
  baseEntitySchema,
  idSchema,
  optionalBaseEntitySchema,
  timestampSchema,
} from "../base.js";
import { LmsTrackingEventType } from "../../types.js";

// LMS Tracking Events Schema
export const lmsTrackingEventsSchema = baseEntitySchema.extend({
  eventDescription: z.string().min(1, "Event description is required"),
  eventLocation: z.string().nullable().optional(),
  eventTimestamp: timestampSchema,
  eventType: z.enum(LmsTrackingEventType),
  shipmentId: idSchema,
});

export const lmsTrackingEventsInsertSchema = optionalBaseEntitySchema.extend({
  eventDescription: z.string().min(1, "Event description is required"),
  eventLocation: z.string().nullable().optional(),
  eventTimestamp: timestampSchema,
  eventType: z.enum(LmsTrackingEventType),
  shipmentId: idSchema,
});

export const lmsTrackingEventsUpdateSchema = lmsTrackingEventsInsertSchema
  .partial();

export type LmsTrackingEvents = z.infer<typeof lmsTrackingEventsSchema>;
export type LmsTrackingEventsInsert = z.infer<
  typeof lmsTrackingEventsInsertSchema
>;
export type LmsTrackingEventsUpdate = z.infer<
  typeof lmsTrackingEventsUpdateSchema
>;
