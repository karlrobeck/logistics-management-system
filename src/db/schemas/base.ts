import { z } from "zod";

// Base schemas for common types
export const timestampSchema = z.coerce.date();
export const numericSchema = z
  .union([z.string(), z.number()])
  .transform((val) => String(val));
export const int8Schema = z
  .union([z.string(), z.number(), z.bigint()])
  .transform((val) => String(val));
export const idSchema = z.string().uuid();
export const emailSchema = z.string().email();
export const phoneSchema = z.string().optional();
export const urlSchema = z.string().url().optional();
export const currencySchema = z.string().default("PHP");

// Common field schemas
export const baseEntitySchema = z.object({
  id: idSchema,
  created: timestampSchema,
  updated: timestampSchema,
});

export const optionalBaseEntitySchema = z.object({
  id: idSchema.optional(),
  created: timestampSchema.optional(),
  updated: timestampSchema.optional(),
});
