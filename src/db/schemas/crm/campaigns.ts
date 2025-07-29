import { z } from 'zod';
import { CrmCampaignStatus } from '../../types.js';
import {
  baseEntitySchema,
  numericSchema,
  optionalBaseEntitySchema,
  timestampSchema,
} from '../base.js';

// CRM Campaigns Schema
export const crmCampaignsSchema = baseEntitySchema.extend({
  budget: numericSchema.nullable().optional(),
  description: z.string().nullable().optional(),
  endDate: timestampSchema.nullable().optional(),
  name: z.string().min(1, 'Campaign name is required'),
  startDate: timestampSchema,
  status: z.enum(CrmCampaignStatus),
});

export const crmCampaignsInsertSchema = optionalBaseEntitySchema.extend({
  budget: numericSchema.nullable().optional(),
  description: z.string().nullable().optional(),
  endDate: timestampSchema.nullable().optional(),
  name: z.string().min(1, 'Campaign name is required'),
  startDate: timestampSchema,
  status: z.enum(CrmCampaignStatus),
});

export const crmCampaignsUpdateSchema = crmCampaignsInsertSchema.partial();

export type CrmCampaigns = z.infer<typeof crmCampaignsSchema>;
export type CrmCampaignsInsert = z.infer<typeof crmCampaignsInsertSchema>;
export type CrmCampaignsUpdate = z.infer<typeof crmCampaignsUpdateSchema>;
