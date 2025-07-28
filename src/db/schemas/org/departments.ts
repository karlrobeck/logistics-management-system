import { z } from "zod";
import {
  baseEntitySchema,
  emailSchema,
  idSchema,
  numericSchema,
  optionalBaseEntitySchema,
  phoneSchema,
} from "../base.js";

// ORG Departments Schema
export const orgDepartmentsSchema = baseEntitySchema.extend({
  budget: numericSchema.nullable().optional(),
  code: z.string().min(1, "Department code is required"),
  departmentType: z.string().min(1, "Department type is required"),
  description: z.string().nullable().optional(),
  email: emailSchema.nullable().optional(),
  isActive: z.boolean().default(true),
  managerId: idSchema.nullable().optional(),
  name: z.string().min(1, "Department name is required"),
  phoneNumber: z.string().nullable().optional(),
});

export const orgDepartmentsInsertSchema = optionalBaseEntitySchema.extend({
  budget: numericSchema.nullable().optional(),
  code: z.string().min(1, "Department code is required"),
  departmentType: z.string().min(1, "Department type is required"),
  description: z.string().nullable().optional(),
  email: emailSchema.nullable().optional(),
  isActive: z.boolean().optional().default(true),
  managerId: idSchema.nullable().optional(),
  name: z.string().min(1, "Department name is required"),
  phoneNumber: z.string().nullable().optional(),
});

export const orgDepartmentsUpdateSchema = orgDepartmentsInsertSchema.partial();

export type OrgDepartments = z.infer<typeof orgDepartmentsSchema>;
export type OrgDepartmentsInsert = z.infer<typeof orgDepartmentsInsertSchema>;
export type OrgDepartmentsUpdate = z.infer<typeof orgDepartmentsUpdateSchema>;
