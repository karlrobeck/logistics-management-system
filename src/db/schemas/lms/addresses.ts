import { z } from "zod";
import {
  baseEntitySchema,
  numericSchema,
  optionalBaseEntitySchema,
} from "../base.js";
import { LmsAddressType } from "../../types.js";

// LMS Addresses Schema
export const lmsAddressesSchema = baseEntitySchema.extend({
  addressLine1: z.string().min(1, "Address line 1 is required"),
  addressLine2: z.string().nullable().optional(),
  addressType: z.enum(LmsAddressType),
  city: z.string().min(1, "City is required"),
  country: z.string().length(3, "Country must be ISO 3166-1 alpha-3 code"),
  isValidated: z.boolean().default(false),
  latitude: numericSchema.nullable().optional(),
  longitude: numericSchema.nullable().optional(),
  postalCode: z.string().min(1, "Postal code is required"),
  state: z.string().min(1, "State is required"),
});

export const lmsAddressesInsertSchema = optionalBaseEntitySchema.extend({
  addressLine1: z.string().min(1, "Address line 1 is required"),
  addressLine2: z.string().nullable().optional(),
  addressType: z.enum(LmsAddressType),
  city: z.string().min(1, "City is required"),
  country: z.string().length(3, "Country must be ISO 3166-1 alpha-3 code"),
  isValidated: z.boolean().optional().default(false),
  latitude: numericSchema.nullable().optional(),
  longitude: numericSchema.nullable().optional(),
  postalCode: z.string().min(1, "Postal code is required"),
  state: z.string().min(1, "State is required"),
});

export const lmsAddressesUpdateSchema = lmsAddressesInsertSchema.partial();

export type LmsAddresses = z.infer<typeof lmsAddressesSchema>;
export type LmsAddressesInsert = z.infer<typeof lmsAddressesInsertSchema>;
export type LmsAddressesUpdate = z.infer<typeof lmsAddressesUpdateSchema>;
