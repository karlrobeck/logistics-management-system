import { z } from "zod";
import {
  baseEntitySchema,
  idSchema,
  numericSchema,
  optionalBaseEntitySchema,
} from "../base.js";

// LMS Shipping Service Max Dimensions Schema
export const lmsShippingServiceMaxDimensionsSchema = baseEntitySchema.extend({
  height: numericSchema.nullable().optional(),
  length: numericSchema.nullable().optional(),
  shippingServiceId: idSchema,
  width: numericSchema.nullable().optional(),
});

export const lmsShippingServiceMaxDimensionsInsertSchema =
  optionalBaseEntitySchema
    .extend({
      height: numericSchema.nullable().optional(),
      length: numericSchema.nullable().optional(),
      shippingServiceId: idSchema,
      width: numericSchema.nullable().optional(),
    });

export const lmsShippingServiceMaxDimensionsUpdateSchema =
  lmsShippingServiceMaxDimensionsInsertSchema.partial();

export type LmsShippingServiceMaxDimensions = z.infer<
  typeof lmsShippingServiceMaxDimensionsSchema
>;
export type LmsShippingServiceMaxDimensionsInsert = z.infer<
  typeof lmsShippingServiceMaxDimensionsInsertSchema
>;
export type LmsShippingServiceMaxDimensionsUpdate = z.infer<
  typeof lmsShippingServiceMaxDimensionsUpdateSchema
>;
