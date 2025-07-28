import { z } from "zod";
import { baseEntitySchema, optionalBaseEntitySchema } from "../base.js";

// LMS Pricing Zones Schema
export const lmsPricingZonesSchema = baseEntitySchema.extend({
  name: z.string().min(1, "Zone name is required"),
  zoneCode: z.string().min(1, "Zone code is required"),
});

export const lmsPricingZonesInsertSchema = optionalBaseEntitySchema.extend({
  name: z.string().min(1, "Zone name is required"),
  zoneCode: z.string().min(1, "Zone code is required"),
});

export const lmsPricingZonesUpdateSchema = lmsPricingZonesInsertSchema
  .partial();

export type LmsPricingZones = z.infer<typeof lmsPricingZonesSchema>;
export type LmsPricingZonesInsert = z.infer<typeof lmsPricingZonesInsertSchema>;
export type LmsPricingZonesUpdate = z.infer<typeof lmsPricingZonesUpdateSchema>;
