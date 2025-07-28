import { z } from "zod";
import {
  baseEntitySchema,
  idSchema,
  optionalBaseEntitySchema,
  timestampSchema,
} from "../base.js";

// ORG Department Users Schema
export const orgDepartmentUsersSchema = baseEntitySchema.extend({
  assignedDate: timestampSchema,
  departmentId: idSchema,
  isActive: z.boolean().default(true),
  role: z.string().min(1, "Role is required"),
  userId: idSchema,
});

export const orgDepartmentUsersInsertSchema = optionalBaseEntitySchema.extend({
  assignedDate: timestampSchema,
  departmentId: idSchema,
  isActive: z.boolean().optional().default(true),
  role: z.string().min(1, "Role is required"),
  userId: idSchema,
});

export const orgDepartmentUsersUpdateSchema = orgDepartmentUsersInsertSchema
  .partial();

export type OrgDepartmentUsers = z.infer<typeof orgDepartmentUsersSchema>;
export type OrgDepartmentUsersInsert = z.infer<
  typeof orgDepartmentUsersInsertSchema
>;
export type OrgDepartmentUsersUpdate = z.infer<
  typeof orgDepartmentUsersUpdateSchema
>;
