import { z } from "zod";
import {
  baseEntitySchema,
  idSchema,
  numericSchema,
  optionalBaseEntitySchema,
} from "../base.js";

// LMS Provider Invoice Line Items Schema
export const lmsProviderInvoiceLineItemsSchema = baseEntitySchema.extend({
  description: z.string().min(1, "Description is required"),
  lineTotal: numericSchema.nullable().optional(),
  providerInvoiceId: idSchema,
  quantity: z.number().int().positive().default(1),
  transportLegId: idSchema,
  unitPrice: numericSchema,
});

export const lmsProviderInvoiceLineItemsInsertSchema = optionalBaseEntitySchema
  .extend({
    description: z.string().min(1, "Description is required"),
    lineTotal: numericSchema.nullable().optional(),
    providerInvoiceId: idSchema,
    quantity: z.number().int().positive().optional().default(1),
    transportLegId: idSchema,
    unitPrice: numericSchema,
  });

export const lmsProviderInvoiceLineItemsUpdateSchema =
  lmsProviderInvoiceLineItemsInsertSchema.partial();

export type LmsProviderInvoiceLineItems = z.infer<
  typeof lmsProviderInvoiceLineItemsSchema
>;
export type LmsProviderInvoiceLineItemsInsert = z.infer<
  typeof lmsProviderInvoiceLineItemsInsertSchema
>;
export type LmsProviderInvoiceLineItemsUpdate = z.infer<
  typeof lmsProviderInvoiceLineItemsUpdateSchema
>;
