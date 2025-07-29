import { z } from 'zod';
import { CrmContactStatus } from '../../types.js';
import {
  baseEntitySchema,
  emailSchema,
  idSchema,
  optionalBaseEntitySchema,
  phoneSchema,
  timestampSchema,
} from '../base.js';

// CRM Contacts Schema
export const crmContactsSchema = baseEntitySchema.extend({
  addressId: idSchema.nullable().optional(),
  birthDate: timestampSchema.nullable().optional(),
  companyId: idSchema.nullable().optional(),
  email: emailSchema,
  firstName: z.string().min(1, 'First name is required'),
  jobTitle: z.string().nullable().optional(),
  lastName: z.string().min(1, 'Last name is required'),
  leadSource: z.string().nullable().optional(),
  phoneNumber: phoneSchema.nullable().optional(),
  status: z.enum(CrmContactStatus),
});

export const crmContactsInsertSchema = optionalBaseEntitySchema.extend({
  addressId: idSchema.nullable().optional(),
  birthDate: timestampSchema.nullable().optional(),
  companyId: idSchema.nullable().optional(),
  email: emailSchema,
  firstName: z.string().min(1, 'First name is required'),
  jobTitle: z.string().nullable().optional(),
  lastName: z.string().min(1, 'Last name is required'),
  leadSource: z.string().nullable().optional(),
  phoneNumber: phoneSchema.nullable().optional(),
  status: z.enum(CrmContactStatus),
});

export const crmContactsUpdateSchema = crmContactsInsertSchema.partial();

export type CrmContacts = z.infer<typeof crmContactsSchema>;
export type CrmContactsInsert = z.infer<typeof crmContactsInsertSchema>;
export type CrmContactsUpdate = z.infer<typeof crmContactsUpdateSchema>;
