import { z } from "zod";
import {
  baseEntitySchema,
  idSchema,
  numericSchema,
  optionalBaseEntitySchema,
} from "../base.js";
import { LmsServiceType, LmsTransportMode } from "../../types.js";

// LMS Provider Services Schema
export const lmsProviderServicesSchema = baseEntitySchema.extend({
  cutoffTime: z.string().nullable().optional(),
  insuranceAvailable: z.boolean().default(false),
  isActive: z.boolean().default(true),
  maxWeight: numericSchema.nullable().optional(),
  providerId: idSchema,
  serviceName: z.string().min(1, "Service name is required"),
  serviceType: z.enum(LmsServiceType),
  trackingAvailable: z.boolean().default(false),
  transitTimeMax: z.number().int().positive().nullable().optional(),
  transitTimeMin: z.number().int().positive().nullable().optional(),
  transportMode: z.enum(LmsTransportMode),
});

export const lmsProviderServicesInsertSchema = optionalBaseEntitySchema.extend({
  cutoffTime: z.string().nullable().optional(),
  insuranceAvailable: z.boolean().optional().default(false),
  isActive: z.boolean().optional().default(true),
  maxWeight: numericSchema.nullable().optional(),
  providerId: idSchema,
  serviceName: z.string().min(1, "Service name is required"),
  serviceType: z.enum(LmsServiceType),
  trackingAvailable: z.boolean().optional().default(false),
  transitTimeMax: z.number().int().positive().nullable().optional(),
  transitTimeMin: z.number().int().positive().nullable().optional(),
  transportMode: z.enum(LmsTransportMode),
});

export const lmsProviderServicesUpdateSchema = lmsProviderServicesInsertSchema
  .partial();

export type LmsProviderServices = z.infer<typeof lmsProviderServicesSchema>;
export type LmsProviderServicesInsert = z.infer<
  typeof lmsProviderServicesInsertSchema
>;
export type LmsProviderServicesUpdate = z.infer<
  typeof lmsProviderServicesUpdateSchema
>;
