import { z } from 'zod';
import { CrmInteractionType } from '../../types.js';
import {
  baseEntitySchema,
  idSchema,
  optionalBaseEntitySchema,
  timestampSchema,
} from '../base.js';

// CRM Interactions Schema
export const crmInteractionsSchema = baseEntitySchema.extend({
  contactId: idSchema.nullable().optional(),
  description: z.string().nullable().optional(),
  interactionDate: timestampSchema,
  opportunityId: idSchema.nullable().optional(),
  subject: z.string().nullable().optional(),
  type: z.enum(CrmInteractionType),
});

export const crmInteractionsInsertSchema = optionalBaseEntitySchema.extend({
  contactId: idSchema.nullable().optional(),
  description: z.string().nullable().optional(),
  interactionDate: timestampSchema,
  opportunityId: idSchema.nullable().optional(),
  subject: z.string().nullable().optional(),
  type: z.enum(CrmInteractionType),
});

export const crmInteractionsUpdateSchema =
  crmInteractionsInsertSchema.partial();

export type CrmInteractions = z.infer<typeof crmInteractionsSchema>;
export type CrmInteractionsInsert = z.infer<typeof crmInteractionsInsertSchema>;
export type CrmInteractionsUpdate = z.infer<typeof crmInteractionsUpdateSchema>;
