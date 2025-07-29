import { z } from 'zod';
import {
  baseEntitySchema,
  idSchema,
  numericSchema,
  optionalBaseEntitySchema,
} from '../base.js';

// LMS Provider Service Max Dimensions Schema
export const lmsProviderServiceMaxDimensionsSchema = baseEntitySchema.extend({
  height: numericSchema.nullable().optional(),
  length: numericSchema.nullable().optional(),
  providerServiceId: idSchema,
  width: numericSchema.nullable().optional(),
});

export const lmsProviderServiceMaxDimensionsInsertSchema =
  optionalBaseEntitySchema.extend({
    height: numericSchema.nullable().optional(),
    length: numericSchema.nullable().optional(),
    providerServiceId: idSchema,
    width: numericSchema.nullable().optional(),
  });

export const lmsProviderServiceMaxDimensionsUpdateSchema =
  lmsProviderServiceMaxDimensionsInsertSchema.partial();

export type LmsProviderServiceMaxDimensions = z.infer<
  typeof lmsProviderServiceMaxDimensionsSchema
>;
export type LmsProviderServiceMaxDimensionsInsert = z.infer<
  typeof lmsProviderServiceMaxDimensionsInsertSchema
>;
export type LmsProviderServiceMaxDimensionsUpdate = z.infer<
  typeof lmsProviderServiceMaxDimensionsUpdateSchema
>;
