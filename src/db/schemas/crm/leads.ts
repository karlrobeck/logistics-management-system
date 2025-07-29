import { z } from 'zod';
import { CrmLeadStatus } from '../../types.js';
import {
  baseEntitySchema,
  emailSchema,
  idSchema,
  optionalBaseEntitySchema,
  phoneSchema,
} from '../base.js';

// CRM Leads Schema
export const crmLeadsSchema = baseEntitySchema.extend({
  companyName: z.string().nullable().optional(),
  convertedToContactId: idSchema.nullable().optional(),
  email: emailSchema,
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  leadScore: z.number().min(0).max(100).default(0),
  leadSource: z.string().nullable().optional(),
  leadStatus: z.enum(CrmLeadStatus),
  phoneNumber: phoneSchema.nullable().optional(),
});

export const crmLeadsInsertSchema = optionalBaseEntitySchema.extend({
  companyName: z.string().nullable().optional(),
  convertedToContactId: idSchema.nullable().optional(),
  email: emailSchema,
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  leadScore: z.number().min(0).max(100).optional().default(0),
  leadSource: z.string().nullable().optional(),
  leadStatus: z.enum(CrmLeadStatus),
  phoneNumber: phoneSchema.nullable().optional(),
});

export const crmLeadsUpdateSchema = crmLeadsInsertSchema.partial();

export type CrmLeads = z.infer<typeof crmLeadsSchema>;
export type CrmLeadsInsert = z.infer<typeof crmLeadsInsertSchema>;
export type CrmLeadsUpdate = z.infer<typeof crmLeadsUpdateSchema>;
