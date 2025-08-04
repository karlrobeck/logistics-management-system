import { z } from 'zod';
import {
  baseEntitySchema,
  emailSchema,
  optionalBaseEntitySchema,
} from '../base.js';

// Auth Users Schema
export const authUsersSchema = baseEntitySchema.extend({
  email: emailSchema,
  emailVerified: z.boolean().default(false),
  name: z.string().min(1, 'Name is required'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

export const authUsersInsertSchema = optionalBaseEntitySchema.extend({
  email: emailSchema,
  name: z.string().min(1, 'Name is required'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

export const authUsersUpdateSchema = authUsersInsertSchema.partial();

export type AuthUsers = z.infer<typeof authUsersSchema>;
export type AuthUsersInsert = z.infer<typeof authUsersInsertSchema>;
export type AuthUsersUpdate = z.infer<typeof authUsersUpdateSchema>;
