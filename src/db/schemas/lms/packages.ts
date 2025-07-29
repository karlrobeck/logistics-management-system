import { z } from 'zod';
import { LmsPackageType } from '../../types.js';
import {
  baseEntitySchema,
  idSchema,
  numericSchema,
  optionalBaseEntitySchema,
} from '../base.js';

// LMS Packages Schema
export const lmsPackagesSchema = baseEntitySchema.extend({
  contentsDescription: z.string().nullable().optional(),
  declaredValue: numericSchema.nullable().optional(),
  height: numericSchema.nullable().optional(),
  length: numericSchema.nullable().optional(),
  packageNumber: z.string().min(1, 'Package number is required'),
  packageType: z.enum(LmsPackageType),
  shipmentId: idSchema,
  weight: numericSchema,
  width: numericSchema.nullable().optional(),
});

export const lmsPackagesInsertSchema = optionalBaseEntitySchema.extend({
  contentsDescription: z.string().nullable().optional(),
  declaredValue: numericSchema.nullable().optional(),
  height: numericSchema.nullable().optional(),
  length: numericSchema.nullable().optional(),
  packageNumber: z.string().min(1, 'Package number is required'),
  packageType: z.enum(LmsPackageType),
  shipmentId: idSchema,
  weight: numericSchema,
  width: numericSchema.nullable().optional(),
});

export const lmsPackagesUpdateSchema = lmsPackagesInsertSchema.partial();

export type LmsPackages = z.infer<typeof lmsPackagesSchema>;
export type LmsPackagesInsert = z.infer<typeof lmsPackagesInsertSchema>;
export type LmsPackagesUpdate = z.infer<typeof lmsPackagesUpdateSchema>;
