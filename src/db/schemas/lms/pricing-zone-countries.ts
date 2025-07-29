import { z } from 'zod';
import {
  baseEntitySchema,
  idSchema,
  optionalBaseEntitySchema,
} from '../base.js';

// LMS Pricing Zone Countries Schema
export const lmsPricingZoneCountriesSchema = baseEntitySchema.extend({
  countryCode: z.string().length(3, 'Country code must be 3 characters'),
  pricingZoneId: idSchema,
});

export const lmsPricingZoneCountriesInsertSchema =
  optionalBaseEntitySchema.extend({
    countryCode: z.string().length(3, 'Country code must be 3 characters'),
    pricingZoneId: idSchema,
  });

export const lmsPricingZoneCountriesUpdateSchema =
  lmsPricingZoneCountriesInsertSchema.partial();

export type LmsPricingZoneCountries = z.infer<
  typeof lmsPricingZoneCountriesSchema
>;
export type LmsPricingZoneCountriesInsert = z.infer<
  typeof lmsPricingZoneCountriesInsertSchema
>;
export type LmsPricingZoneCountriesUpdate = z.infer<
  typeof lmsPricingZoneCountriesUpdateSchema
>;
