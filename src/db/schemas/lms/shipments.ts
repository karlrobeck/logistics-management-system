import { z } from 'zod';
import { LmsShipmentStatus, LmsTransportMode } from '../../types.js';
import {
  baseEntitySchema,
  currencySchema,
  idSchema,
  numericSchema,
  optionalBaseEntitySchema,
  timestampSchema,
} from '../base.js';

// LMS Shipments Schema
export const lmsShipmentsSchema = baseEntitySchema.extend({
  assignedDepartmentId: idSchema.nullable().optional(),
  createdBy: idSchema.nullable().optional(),
  currency: currencySchema,
  deliveryDate: timestampSchema.nullable().optional(),
  estimatedDeliveryDate: timestampSchema.nullable().optional(),
  insuranceAmount: numericSchema.nullable().optional(),
  pickupDate: timestampSchema.nullable().optional(),
  primaryTransportMode: z.enum(LmsTransportMode),
  receiverAddressId: idSchema,
  receiverCompanyId: idSchema.nullable().optional(),
  receiverContactId: idSchema.nullable().optional(),
  senderAddressId: idSchema,
  senderCompanyId: idSchema.nullable().optional(),
  senderContactId: idSchema.nullable().optional(),
  serviceId: idSchema,
  shippingCost: numericSchema.nullable().optional(),
  specialInstructions: z.string().nullable().optional(),
  status: z.enum(LmsShipmentStatus),
  totalValue: numericSchema.nullable().optional(),
  totalWeight: numericSchema,
  trackingNumber: z.string().min(1, 'Tracking number is required'),
});

export const lmsShipmentsInsertSchema = optionalBaseEntitySchema.extend({
  assignedDepartmentId: idSchema.nullable().optional(),
  createdBy: idSchema.nullable().optional(),
  currency: currencySchema.optional(),
  deliveryDate: timestampSchema.nullable().optional(),
  estimatedDeliveryDate: timestampSchema.nullable().optional(),
  insuranceAmount: numericSchema.nullable().optional(),
  pickupDate: timestampSchema.nullable().optional(),
  primaryTransportMode: z.enum(LmsTransportMode),
  receiverAddressId: idSchema,
  receiverCompanyId: idSchema.nullable().optional(),
  receiverContactId: idSchema.nullable().optional(),
  senderAddressId: idSchema,
  senderCompanyId: idSchema.nullable().optional(),
  senderContactId: idSchema.nullable().optional(),
  serviceId: idSchema,
  shippingCost: numericSchema.nullable().optional(),
  specialInstructions: z.string().nullable().optional(),
  status: z.enum(LmsShipmentStatus),
  totalValue: numericSchema.nullable().optional(),
  totalWeight: numericSchema,
  trackingNumber: z.string().min(1, 'Tracking number is required'),
});

export const lmsShipmentsUpdateSchema = lmsShipmentsInsertSchema.partial();

export type LmsShipments = z.infer<typeof lmsShipmentsSchema>;
export type LmsShipmentsInsert = z.infer<typeof lmsShipmentsInsertSchema>;
export type LmsShipmentsUpdate = z.infer<typeof lmsShipmentsUpdateSchema>;
