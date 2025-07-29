import { z } from 'zod';
import {
  CrmNotificationChannel,
  CrmNotificationDeliveryStatus,
  CrmNotificationType,
} from '../../types.js';
import {
  baseEntitySchema,
  idSchema,
  optionalBaseEntitySchema,
  timestampSchema,
} from '../base.js';

// CRM Notifications Schema
export const crmNotificationsSchema = baseEntitySchema.extend({
  channel: z.enum(CrmNotificationChannel),
  contactId: idSchema,
  deliveryStatus: z.enum(CrmNotificationDeliveryStatus),
  message: z.string().min(1, 'Message is required'),
  notificationType: z.enum(CrmNotificationType),
  recipient: z.string().min(1, 'Recipient is required'),
  sentAt: timestampSchema.nullable().optional(),
  shipmentId: idSchema,
  subject: z.string().nullable().optional(),
});

export const crmNotificationsInsertSchema = optionalBaseEntitySchema.extend({
  channel: z.enum(CrmNotificationChannel),
  contactId: idSchema,
  deliveryStatus: z.enum(CrmNotificationDeliveryStatus),
  message: z.string().min(1, 'Message is required'),
  notificationType: z.enum(CrmNotificationType),
  recipient: z.string().min(1, 'Recipient is required'),
  sentAt: timestampSchema.nullable().optional(),
  shipmentId: idSchema,
  subject: z.string().nullable().optional(),
});

export const crmNotificationsUpdateSchema =
  crmNotificationsInsertSchema.partial();

export type CrmNotifications = z.infer<typeof crmNotificationsSchema>;
export type CrmNotificationsInsert = z.infer<
  typeof crmNotificationsInsertSchema
>;
export type CrmNotificationsUpdate = z.infer<
  typeof crmNotificationsUpdateSchema
>;
