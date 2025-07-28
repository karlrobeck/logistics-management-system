import { z } from "zod";
import {
  baseEntitySchema,
  emailSchema,
  idSchema,
  numericSchema,
  optionalBaseEntitySchema,
  phoneSchema,
  timestampSchema,
} from "../base.js";
import { LmsProviderType } from "../../types.js";

// LMS Transportation Providers Schema
export const lmsTransportationProvidersSchema = baseEntitySchema.extend({
  addressId: idSchema.nullable().optional(),
  apiEndpoint: z.string().url().nullable().optional(),
  apiKey: z.string().nullable().optional(),
  companyName: z.string().min(1, "Company name is required"),
  contactPerson: z.string().nullable().optional(),
  contractEndDate: timestampSchema.nullable().optional(),
  contractStartDate: timestampSchema.nullable().optional(),
  email: emailSchema.nullable().optional(),
  insuranceCoverage: numericSchema.nullable().optional(),
  isActive: z.boolean().default(true),
  paymentTerms: z.string().nullable().optional(),
  performanceRating: numericSchema.nullable().optional(),
  phoneNumber: phoneSchema.nullable().optional(),
  preferredByDepartmentId: idSchema.nullable().optional(),
  providerType: z.enum(LmsProviderType),
});

export const lmsTransportationProvidersInsertSchema = optionalBaseEntitySchema
  .extend({
    addressId: idSchema.nullable().optional(),
    apiEndpoint: z.string().url().nullable().optional(),
    apiKey: z.string().nullable().optional(),
    companyName: z.string().min(1, "Company name is required"),
    contactPerson: z.string().nullable().optional(),
    contractEndDate: timestampSchema.nullable().optional(),
    contractStartDate: timestampSchema.nullable().optional(),
    email: emailSchema.nullable().optional(),
    insuranceCoverage: numericSchema.nullable().optional(),
    isActive: z.boolean().optional().default(true),
    paymentTerms: z.string().nullable().optional(),
    performanceRating: numericSchema.nullable().optional(),
    phoneNumber: phoneSchema.nullable().optional(),
    preferredByDepartmentId: idSchema.nullable().optional(),
    providerType: z.enum(LmsProviderType),
  });

export const lmsTransportationProvidersUpdateSchema =
  lmsTransportationProvidersInsertSchema.partial();

export type LmsTransportationProviders = z.infer<
  typeof lmsTransportationProvidersSchema
>;
export type LmsTransportationProvidersInsert = z.infer<
  typeof lmsTransportationProvidersInsertSchema
>;
export type LmsTransportationProvidersUpdate = z.infer<
  typeof lmsTransportationProvidersUpdateSchema
>;
