import { z } from "zod";
import {
  baseEntitySchema,
  idSchema,
  numericSchema,
  optionalBaseEntitySchema,
  timestampSchema,
} from "../base.js";

// LMS Provider Rates Schema
export const lmsProviderRatesSchema = baseEntitySchema.extend({
  baseRate: numericSchema,
  currency: z.string().default("USD"),
  destinationZoneId: idSchema,
  effectiveDate: timestampSchema,
  expiryDate: timestampSchema.nullable().optional(),
  fuelSurchargeRate: numericSchema.nullable().optional(),
  originZoneId: idSchema,
  perKgRate: numericSchema,
  providerServiceId: idSchema,
  weightMax: numericSchema,
  weightMin: numericSchema,
});

export const lmsProviderRatesInsertSchema = optionalBaseEntitySchema.extend({
  baseRate: numericSchema,
  currency: z.string().optional().default("USD"),
  destinationZoneId: idSchema,
  effectiveDate: timestampSchema,
  expiryDate: timestampSchema.nullable().optional(),
  fuelSurchargeRate: numericSchema.nullable().optional(),
  originZoneId: idSchema,
  perKgRate: numericSchema,
  providerServiceId: idSchema,
  weightMax: numericSchema,
  weightMin: numericSchema,
});

export const lmsProviderRatesUpdateSchema = lmsProviderRatesInsertSchema
  .partial();

export type LmsProviderRates = z.infer<typeof lmsProviderRatesSchema>;
export type LmsProviderRatesInsert = z.infer<
  typeof lmsProviderRatesInsertSchema
>;
export type LmsProviderRatesUpdate = z.infer<
  typeof lmsProviderRatesUpdateSchema
>;
