import { z } from "zod";
import {
  baseEntitySchema,
  idSchema,
  numericSchema,
  optionalBaseEntitySchema,
  timestampSchema,
} from "../base.js";

// LMS Pricing Rates Schema
export const lmsPricingRatesSchema = baseEntitySchema.extend({
  baseRate: numericSchema,
  destinationZoneId: idSchema,
  effectiveDate: timestampSchema,
  expiryDate: timestampSchema.nullable().optional(),
  fuelSurchargeRate: numericSchema.nullable().optional(),
  originZoneId: idSchema,
  perKgRate: numericSchema,
  serviceId: idSchema,
  weightMax: numericSchema,
  weightMin: numericSchema,
});

export const lmsPricingRatesInsertSchema = optionalBaseEntitySchema.extend({
  baseRate: numericSchema,
  destinationZoneId: idSchema,
  effectiveDate: timestampSchema,
  expiryDate: timestampSchema.nullable().optional(),
  fuelSurchargeRate: numericSchema.nullable().optional(),
  originZoneId: idSchema,
  perKgRate: numericSchema,
  serviceId: idSchema,
  weightMax: numericSchema,
  weightMin: numericSchema,
});

export const lmsPricingRatesUpdateSchema = lmsPricingRatesInsertSchema
  .partial();

export type LmsPricingRates = z.infer<typeof lmsPricingRatesSchema>;
export type LmsPricingRatesInsert = z.infer<typeof lmsPricingRatesInsertSchema>;
export type LmsPricingRatesUpdate = z.infer<typeof lmsPricingRatesUpdateSchema>;
