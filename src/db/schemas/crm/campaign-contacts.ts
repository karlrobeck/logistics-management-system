import { z } from 'zod';
import { CrmCampaignContactsStatus } from '../../types.js';
import {
  baseEntitySchema,
  idSchema,
  optionalBaseEntitySchema,
  timestampSchema,
} from '../base.js';

// CRM Campaign Contacts Schema
export const crmCampaignContactsSchema = baseEntitySchema.extend({
  campaignId: idSchema,
  contactId: idSchema,
  interactionDate: timestampSchema.nullable().optional(),
  status: z.enum(CrmCampaignContactsStatus),
});

export const crmCampaignContactsInsertSchema = optionalBaseEntitySchema.extend({
  campaignId: idSchema,
  contactId: idSchema,
  interactionDate: timestampSchema.nullable().optional(),
  status: z.enum(CrmCampaignContactsStatus),
});

export const crmCampaignContactsUpdateSchema =
  crmCampaignContactsInsertSchema.partial();

export type CrmCampaignContacts = z.infer<typeof crmCampaignContactsSchema>;
export type CrmCampaignContactsInsert = z.infer<
  typeof crmCampaignContactsInsertSchema
>;
export type CrmCampaignContactsUpdate = z.infer<
  typeof crmCampaignContactsUpdateSchema
>;
