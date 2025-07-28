import { z } from "zod";
import {
  baseEntitySchema,
  idSchema,
  numericSchema,
  optionalBaseEntitySchema,
  timestampSchema,
} from "../base.js";
import { LmsPerformanceMetricType } from "../../types.js";

// LMS Provider Performance Schema
export const lmsProviderPerformanceSchema = baseEntitySchema.extend({
  measurementDate: timestampSchema,
  metricType: z.enum(LmsPerformanceMetricType),
  metricValue: numericSchema.nullable().optional(),
  notes: z.string().nullable().optional(),
  providerId: idSchema,
  shipmentId: idSchema,
  transportLegId: idSchema.nullable().optional(),
});

export const lmsProviderPerformanceInsertSchema = optionalBaseEntitySchema
  .extend({
    measurementDate: timestampSchema,
    metricType: z.enum(LmsPerformanceMetricType),
    metricValue: numericSchema.nullable().optional(),
    notes: z.string().nullable().optional(),
    providerId: idSchema,
    shipmentId: idSchema,
    transportLegId: idSchema.nullable().optional(),
  });

export const lmsProviderPerformanceUpdateSchema =
  lmsProviderPerformanceInsertSchema.partial();

export type LmsProviderPerformance = z.infer<
  typeof lmsProviderPerformanceSchema
>;
export type LmsProviderPerformanceInsert = z.infer<
  typeof lmsProviderPerformanceInsertSchema
>;
export type LmsProviderPerformanceUpdate = z.infer<
  typeof lmsProviderPerformanceUpdateSchema
>;
