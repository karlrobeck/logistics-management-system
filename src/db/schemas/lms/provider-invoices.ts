import { z } from 'zod';
import { LmsProviderInvoiceStatus } from '../../types.js';
import {
  baseEntitySchema,
  idSchema,
  numericSchema,
  optionalBaseEntitySchema,
  timestampSchema,
} from '../base.js';

// LMS Provider Invoices Schema
export const lmsProviderInvoicesSchema = baseEntitySchema.extend({
  currency: z.string().default('USD'),
  dueDate: timestampSchema,
  invoiceDate: timestampSchema,
  invoiceNumber: z.string().min(1, 'Invoice number is required'),
  paymentDate: timestampSchema.nullable().optional(),
  providerId: idSchema,
  status: z.enum(LmsProviderInvoiceStatus),
  subtotal: numericSchema,
  taxAmount: numericSchema.nullable().optional(),
  totalAmount: numericSchema.nullable().optional(),
});

export const lmsProviderInvoicesInsertSchema = optionalBaseEntitySchema.extend({
  currency: z.string().optional().default('USD'),
  dueDate: timestampSchema,
  invoiceDate: timestampSchema,
  invoiceNumber: z.string().min(1, 'Invoice number is required'),
  paymentDate: timestampSchema.nullable().optional(),
  providerId: idSchema,
  status: z.enum(LmsProviderInvoiceStatus),
  subtotal: numericSchema,
  taxAmount: numericSchema.nullable().optional(),
  totalAmount: numericSchema.nullable().optional(),
});

export const lmsProviderInvoicesUpdateSchema =
  lmsProviderInvoicesInsertSchema.partial();

export type LmsProviderInvoices = z.infer<typeof lmsProviderInvoicesSchema>;
export type LmsProviderInvoicesInsert = z.infer<
  typeof lmsProviderInvoicesInsertSchema
>;
export type LmsProviderInvoicesUpdate = z.infer<
  typeof lmsProviderInvoicesUpdateSchema
>;
