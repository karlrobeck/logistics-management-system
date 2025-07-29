import { z } from 'zod';
import { CrmCasePriority, CrmCaseStatus } from '../../types.js';
import {
  baseEntitySchema,
  idSchema,
  optionalBaseEntitySchema,
  timestampSchema,
} from '../base.js';

// CRM Cases Schema
export const crmCasesSchema = baseEntitySchema.extend({
  closedAt: timestampSchema.nullable().optional(),
  contactId: idSchema.nullable().optional(),
  description: z.string().min(1, 'Case description is required'),
  priority: z.enum(CrmCasePriority),
  status: z.enum(CrmCaseStatus),
  subject: z.string().min(1, 'Case subject is required'),
});

export const crmCasesInsertSchema = optionalBaseEntitySchema.extend({
  closedAt: timestampSchema.nullable().optional(),
  contactId: idSchema.nullable().optional(),
  description: z.string().min(1, 'Case description is required'),
  priority: z.enum(CrmCasePriority),
  status: z.enum(CrmCaseStatus),
  subject: z.string().min(1, 'Case subject is required'),
});

export const crmCasesUpdateSchema = crmCasesInsertSchema.partial();

export type CrmCases = z.infer<typeof crmCasesSchema>;
export type CrmCasesInsert = z.infer<typeof crmCasesInsertSchema>;
export type CrmCasesUpdate = z.infer<typeof crmCasesUpdateSchema>;
