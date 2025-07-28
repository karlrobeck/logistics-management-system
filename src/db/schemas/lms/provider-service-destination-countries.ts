import { z } from "zod";
import {
  baseEntitySchema,
  idSchema,
  optionalBaseEntitySchema,
} from "../base.js";

// LMS Provider Service Destination Countries Schema
export const lmsProviderServiceDestinationCountriesSchema = baseEntitySchema
  .extend({
    countryCode: z.string().length(3, "Country code must be 3 characters"),
    providerServiceId: idSchema,
  });

export const lmsProviderServiceDestinationCountriesInsertSchema =
  optionalBaseEntitySchema
    .extend({
      countryCode: z.string().length(3, "Country code must be 3 characters"),
      providerServiceId: idSchema,
    });

export const lmsProviderServiceDestinationCountriesUpdateSchema =
  lmsProviderServiceDestinationCountriesInsertSchema.partial();

export type LmsProviderServiceDestinationCountries = z.infer<
  typeof lmsProviderServiceDestinationCountriesSchema
>;
export type LmsProviderServiceDestinationCountriesInsert = z.infer<
  typeof lmsProviderServiceDestinationCountriesInsertSchema
>;
export type LmsProviderServiceDestinationCountriesUpdate = z.infer<
  typeof lmsProviderServiceDestinationCountriesUpdateSchema
>;
