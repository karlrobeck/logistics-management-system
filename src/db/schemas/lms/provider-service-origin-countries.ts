import { z } from "zod";
import {
  baseEntitySchema,
  idSchema,
  optionalBaseEntitySchema,
} from "../base.js";

// LMS Provider Service Origin Countries Schema
export const lmsProviderServiceOriginCountriesSchema = baseEntitySchema.extend({
  countryCode: z.string().length(3, "Country code must be 3 characters"),
  providerServiceId: idSchema,
});

export const lmsProviderServiceOriginCountriesInsertSchema =
  optionalBaseEntitySchema
    .extend({
      countryCode: z.string().length(3, "Country code must be 3 characters"),
      providerServiceId: idSchema,
    });

export const lmsProviderServiceOriginCountriesUpdateSchema =
  lmsProviderServiceOriginCountriesInsertSchema.partial();

export type LmsProviderServiceOriginCountries = z.infer<
  typeof lmsProviderServiceOriginCountriesSchema
>;
export type LmsProviderServiceOriginCountriesInsert = z.infer<
  typeof lmsProviderServiceOriginCountriesInsertSchema
>;
export type LmsProviderServiceOriginCountriesUpdate = z.infer<
  typeof lmsProviderServiceOriginCountriesUpdateSchema
>;
