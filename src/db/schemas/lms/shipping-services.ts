import { z } from 'zod';
import { LmsServiceType } from '../../types.js';
import {
  baseEntitySchema,
  idSchema,
  numericSchema,
  optionalBaseEntitySchema,
} from '../base.js';

// LMS Shipping Services Schema
export const lmsShippingServicesSchema = baseEntitySchema.extend({
  deliveryTimeMax: z.number().int().positive().nullable().optional(),
  deliveryTimeMin: z.number().int().positive().nullable().optional(),
  description: z.string().nullable().optional(),
  isActive: z.boolean().default(true),
  maxWeight: numericSchema.nullable().optional(),
  name: z.string().min(1, 'Service name is required'),
  serviceType: z.enum(LmsServiceType),
});

export const lmsShippingServicesInsertSchema = optionalBaseEntitySchema.extend({
  deliveryTimeMax: z.number().int().positive().nullable().optional(),
  deliveryTimeMin: z.number().int().positive().nullable().optional(),
  description: z.string().nullable().optional(),
  isActive: z.boolean().optional().default(true),
  maxWeight: numericSchema.nullable().optional(),
  name: z.string().min(1, 'Service name is required'),
  serviceType: z.enum(LmsServiceType),
});

export const lmsShippingServicesUpdateSchema =
  lmsShippingServicesInsertSchema.partial();

export type LmsShippingServices = z.infer<typeof lmsShippingServicesSchema>;
export type LmsShippingServicesInsert = z.infer<
  typeof lmsShippingServicesInsertSchema
>;
export type LmsShippingServicesUpdate = z.infer<
  typeof lmsShippingServicesUpdateSchema
>;
