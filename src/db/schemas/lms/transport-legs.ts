import { z } from "zod";
import {
  baseEntitySchema,
  idSchema,
  numericSchema,
  optionalBaseEntitySchema,
  timestampSchema,
} from "../base.js";
import { LmsLegStatus, LmsTransportLegType } from "../../types.js";

// LMS Transport Legs Schema
export const lmsTransportLegsSchema = baseEntitySchema.extend({
  actualDelivery: timestampSchema.nullable().optional(),
  actualPickup: timestampSchema.nullable().optional(),
  cost: numericSchema.nullable().optional(),
  currency: z.string().nullable().optional(),
  destinationAddressId: idSchema.nullable().optional(),
  destinationWarehouseId: idSchema.nullable().optional(),
  driverId: idSchema.nullable().optional(),
  legSequence: z.number().int().positive(),
  originAddressId: idSchema.nullable().optional(),
  originWarehouseId: idSchema.nullable().optional(),
  providerId: idSchema.nullable().optional(),
  providerServiceId: idSchema.nullable().optional(),
  providerTrackingNumber: z.string().nullable().optional(),
  scheduledDelivery: timestampSchema.nullable().optional(),
  scheduledPickup: timestampSchema.nullable().optional(),
  shipmentId: idSchema,
  specialInstructions: z.string().nullable().optional(),
  status: z.enum(LmsLegStatus),
  transportType: z.enum(LmsTransportLegType),
  vehicleId: idSchema.nullable().optional(),
});

export const lmsTransportLegsInsertSchema = optionalBaseEntitySchema.extend({
  actualDelivery: timestampSchema.nullable().optional(),
  actualPickup: timestampSchema.nullable().optional(),
  cost: numericSchema.nullable().optional(),
  currency: z.string().nullable().optional(),
  destinationAddressId: idSchema.nullable().optional(),
  destinationWarehouseId: idSchema.nullable().optional(),
  driverId: idSchema.nullable().optional(),
  legSequence: z.number().int().positive(),
  originAddressId: idSchema.nullable().optional(),
  originWarehouseId: idSchema.nullable().optional(),
  providerId: idSchema.nullable().optional(),
  providerServiceId: idSchema.nullable().optional(),
  providerTrackingNumber: z.string().nullable().optional(),
  scheduledDelivery: timestampSchema.nullable().optional(),
  scheduledPickup: timestampSchema.nullable().optional(),
  shipmentId: idSchema,
  specialInstructions: z.string().nullable().optional(),
  status: z.enum(LmsLegStatus),
  transportType: z.enum(LmsTransportLegType),
  vehicleId: idSchema.nullable().optional(),
});

export const lmsTransportLegsUpdateSchema = lmsTransportLegsInsertSchema
  .partial();

export type LmsTransportLegs = z.infer<typeof lmsTransportLegsSchema>;
export type LmsTransportLegsInsert = z.infer<
  typeof lmsTransportLegsInsertSchema
>;
export type LmsTransportLegsUpdate = z.infer<
  typeof lmsTransportLegsUpdateSchema
>;
