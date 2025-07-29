import { z } from 'zod';
import { LmsDeliveryStatus } from '../../types.js';
import {
  baseEntitySchema,
  idSchema,
  optionalBaseEntitySchema,
  timestampSchema,
} from '../base.js';

// LMS Route Shipments Schema
export const lmsRouteShipmentsSchema = baseEntitySchema.extend({
  actualDelivery: timestampSchema.nullable().optional(),
  deliveryDate: timestampSchema,
  deliveryStatus: z.enum(LmsDeliveryStatus),
  estimatedDelivery: timestampSchema.nullable().optional(),
  recipientSignature: z.string().nullable().optional(),
  routeId: idSchema,
  sequenceNumber: z.number().int().positive(),
  shipmentId: idSchema,
  signatureRequired: z.boolean().default(false),
});

export const lmsRouteShipmentsInsertSchema = optionalBaseEntitySchema.extend({
  actualDelivery: timestampSchema.nullable().optional(),
  deliveryDate: timestampSchema,
  deliveryStatus: z.enum(LmsDeliveryStatus),
  estimatedDelivery: timestampSchema.nullable().optional(),
  recipientSignature: z.string().nullable().optional(),
  routeId: idSchema,
  sequenceNumber: z.number().int().positive(),
  shipmentId: idSchema,
  signatureRequired: z.boolean().optional().default(false),
});

export const lmsRouteShipmentsUpdateSchema =
  lmsRouteShipmentsInsertSchema.partial();

export type LmsRouteShipments = z.infer<typeof lmsRouteShipmentsSchema>;
export type LmsRouteShipmentsInsert = z.infer<
  typeof lmsRouteShipmentsInsertSchema
>;
export type LmsRouteShipmentsUpdate = z.infer<
  typeof lmsRouteShipmentsUpdateSchema
>;
