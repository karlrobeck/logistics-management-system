import { z } from 'zod';
import { OrgDriverStatus } from '../../types.js';
import {
  baseEntitySchema,
  emailSchema,
  optionalBaseEntitySchema,
  phoneSchema,
  timestampSchema,
} from '../base.js';

// ORG Drivers Schema
export const orgDriversSchema = baseEntitySchema.extend({
  email: emailSchema,
  employeeId: z.string().min(1, 'Employee ID is required'),
  firstName: z.string().min(1, 'First name is required'),
  hireDate: timestampSchema,
  lastName: z.string().min(1, 'Last name is required'),
  licenseNumber: z.string().min(1, 'License number is required'),
  phoneNumber: z.string().min(1, 'Phone number is required'),
  status: z.enum(OrgDriverStatus),
});

export const orgDriversInsertSchema = optionalBaseEntitySchema.extend({
  email: emailSchema,
  employeeId: z.string().min(1, 'Employee ID is required'),
  firstName: z.string().min(1, 'First name is required'),
  hireDate: timestampSchema,
  lastName: z.string().min(1, 'Last name is required'),
  licenseNumber: z.string().min(1, 'License number is required'),
  phoneNumber: z.string().min(1, 'Phone number is required'),
  status: z.enum(OrgDriverStatus),
});

export const orgDriversUpdateSchema = orgDriversInsertSchema.partial();

export type OrgDrivers = z.infer<typeof orgDriversSchema>;
export type OrgDriversInsert = z.infer<typeof orgDriversInsertSchema>;
export type OrgDriversUpdate = z.infer<typeof orgDriversUpdateSchema>;
