import { z } from 'zod';
import {
  baseEntitySchema,
  emailSchema,
  idSchema,
  optionalBaseEntitySchema,
  phoneSchema,
  urlSchema,
} from '../base.js';

// CRM Companies Schema
export const crmCompaniesSchema = baseEntitySchema.extend({
  addressId: idSchema.nullable().optional(),
  description: z.string().nullable().optional(),
  email: emailSchema.nullable().optional(),
  industry: z.string().nullable().optional(),
  name: z.string().min(1, 'Company name is required'),
  phoneNumber: phoneSchema.nullable().optional(),
  website: urlSchema.nullable().optional(),
});

export const crmCompaniesInsertSchema = optionalBaseEntitySchema.extend({
  addressId: idSchema.nullable().optional(),
  description: z.string().nullable().optional(),
  email: emailSchema.nullable().optional(),
  industry: z.string().nullable().optional(),
  name: z.string().min(1, 'Company name is required'),
  phoneNumber: phoneSchema.nullable().optional(),
  website: urlSchema.nullable().optional(),
});

export const crmCompaniesUpdateSchema = crmCompaniesInsertSchema.partial();

export type CrmCompanies = z.infer<typeof crmCompaniesSchema>;
export type CrmCompaniesInsert = z.infer<typeof crmCompaniesInsertSchema>;
export type CrmCompaniesUpdate = z.infer<typeof crmCompaniesUpdateSchema>;
