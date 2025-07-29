import { z } from 'zod';
import { CrmOpportunityStage } from '../../types.js';
import {
  baseEntitySchema,
  idSchema,
  numericSchema,
  optionalBaseEntitySchema,
  timestampSchema,
} from '../base.js';

// CRM Opportunities Schema
export const crmOpportunitiesSchema = baseEntitySchema.extend({
  amount: numericSchema.default('0'),
  closeDate: timestampSchema.nullable().optional(),
  companyId: idSchema.nullable().optional(),
  name: z.string().min(1, 'Opportunity name is required'),
  primaryContactId: idSchema.nullable().optional(),
  probability: numericSchema.default('0'),
  stage: z.enum(CrmOpportunityStage),
});

export const crmOpportunitiesInsertSchema = optionalBaseEntitySchema.extend({
  amount: numericSchema.optional().default('0'),
  closeDate: timestampSchema.nullable().optional(),
  companyId: idSchema.nullable().optional(),
  name: z.string().min(1, 'Opportunity name is required'),
  primaryContactId: idSchema.nullable().optional(),
  probability: numericSchema.optional().default('0'),
  stage: z.enum(CrmOpportunityStage),
});

export const crmOpportunitiesUpdateSchema =
  crmOpportunitiesInsertSchema.partial();

// CRM Opportunity Products Schema
export const crmOpportunityProductsSchema = baseEntitySchema.extend({
  opportunityId: idSchema,
  productId: idSchema,
  quantity: numericSchema.default('1'),
  totalPrice: numericSchema.nullable().optional(),
  unitPrice: numericSchema,
});

export const crmOpportunityProductsInsertSchema =
  optionalBaseEntitySchema.extend({
    opportunityId: idSchema,
    productId: idSchema,
    quantity: numericSchema.optional().default('1'),
    totalPrice: numericSchema.nullable().optional(),
    unitPrice: numericSchema,
  });

export const crmOpportunityProductsUpdateSchema =
  crmOpportunityProductsInsertSchema.partial();

export type CrmOpportunities = z.infer<typeof crmOpportunitiesSchema>;
export type CrmOpportunitiesInsert = z.infer<
  typeof crmOpportunitiesInsertSchema
>;
export type CrmOpportunitiesUpdate = z.infer<
  typeof crmOpportunitiesUpdateSchema
>;

export type CrmOpportunityProducts = z.infer<
  typeof crmOpportunityProductsSchema
>;
export type CrmOpportunityProductsInsert = z.infer<
  typeof crmOpportunityProductsInsertSchema
>;
export type CrmOpportunityProductsUpdate = z.infer<
  typeof crmOpportunityProductsUpdateSchema
>;
