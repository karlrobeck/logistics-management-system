import { z } from "zod";
import {
  baseEntitySchema,
  numericSchema,
  optionalBaseEntitySchema,
} from "../base.js";

// CRM Products Schema
export const crmProductsSchema = baseEntitySchema.extend({
  description: z.string().nullable().optional(),
  name: z.string().min(1, "Product name is required"),
  price: numericSchema,
  sku: z.string().nullable().optional(),
});

export const crmProductsInsertSchema = optionalBaseEntitySchema.extend({
  description: z.string().nullable().optional(),
  name: z.string().min(1, "Product name is required"),
  price: numericSchema,
  sku: z.string().nullable().optional(),
});

export const crmProductsUpdateSchema = crmProductsInsertSchema.partial();

export type CrmProducts = z.infer<typeof crmProductsSchema>;
export type CrmProductsInsert = z.infer<typeof crmProductsInsertSchema>;
export type CrmProductsUpdate = z.infer<typeof crmProductsUpdateSchema>;
