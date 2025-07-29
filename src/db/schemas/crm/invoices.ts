import { z } from 'zod';
import { CrmInvoiceStatus } from '../../types.js';
import {
  baseEntitySchema,
  currencySchema,
  idSchema,
  numericSchema,
  optionalBaseEntitySchema,
  timestampSchema,
} from '../base.js';

// CRM Invoices Schema
export const crmInvoicesSchema = baseEntitySchema.extend({
  companyId: idSchema.nullable().optional(),
  contactId: idSchema.nullable().optional(),
  currency: currencySchema,
  dueDate: timestampSchema,
  invoiceDate: timestampSchema,
  invoiceNumber: z.string().min(1, 'Invoice number is required'),
  paymentTerms: z.string().nullable().optional(),
  status: z.enum(CrmInvoiceStatus),
  subtotal: numericSchema,
  taxAmount: numericSchema.default('0'),
  totalAmount: numericSchema,
});

export const crmInvoicesInsertSchema = optionalBaseEntitySchema.extend({
  companyId: idSchema.nullable().optional(),
  contactId: idSchema.nullable().optional(),
  currency: currencySchema.optional(),
  dueDate: timestampSchema,
  invoiceDate: timestampSchema,
  invoiceNumber: z.string().min(1, 'Invoice number is required'),
  paymentTerms: z.string().nullable().optional(),
  status: z.enum(CrmInvoiceStatus),
  subtotal: numericSchema,
  taxAmount: numericSchema.optional().default('0'),
  totalAmount: numericSchema,
});

export const crmInvoicesUpdateSchema = crmInvoicesInsertSchema.partial();

// CRM Invoice Line Items Schema
export const crmInvoiceLineItemsSchema = baseEntitySchema.extend({
  description: z.string().min(1, 'Description is required'),
  invoiceId: idSchema,
  lineTotal: numericSchema.nullable().optional(),
  quantity: numericSchema.default('1'),
  shipmentId: idSchema.nullable().optional(),
  unitPrice: numericSchema,
});

export const crmInvoiceLineItemsInsertSchema = optionalBaseEntitySchema.extend({
  description: z.string().min(1, 'Description is required'),
  invoiceId: idSchema,
  lineTotal: numericSchema.nullable().optional(),
  quantity: numericSchema.optional().default('1'),
  shipmentId: idSchema.nullable().optional(),
  unitPrice: numericSchema,
});

export const crmInvoiceLineItemsUpdateSchema =
  crmInvoiceLineItemsInsertSchema.partial();

export type CrmInvoices = z.infer<typeof crmInvoicesSchema>;
export type CrmInvoicesInsert = z.infer<typeof crmInvoicesInsertSchema>;
export type CrmInvoicesUpdate = z.infer<typeof crmInvoicesUpdateSchema>;

export type CrmInvoiceLineItems = z.infer<typeof crmInvoiceLineItemsSchema>;
export type CrmInvoiceLineItemsInsert = z.infer<
  typeof crmInvoiceLineItemsInsertSchema
>;
export type CrmInvoiceLineItemsUpdate = z.infer<
  typeof crmInvoiceLineItemsUpdateSchema
>;
