import { z } from "zod";
import {
  baseEntitySchema,
  idSchema,
  optionalBaseEntitySchema,
} from "../base.js";

// ORG Department User Permissions Schema
export const orgDepartmentUserPermissionsSchema = baseEntitySchema.extend({
  permissionId: idSchema,
  userId: idSchema,
});

export const orgDepartmentUserPermissionsInsertSchema = optionalBaseEntitySchema
  .extend({
    permissionId: idSchema,
    userId: idSchema,
  });

export const orgDepartmentUserPermissionsUpdateSchema =
  orgDepartmentUserPermissionsInsertSchema.partial();

export type OrgDepartmentUserPermissions = z.infer<
  typeof orgDepartmentUserPermissionsSchema
>;
export type OrgDepartmentUserPermissionsInsert = z.infer<
  typeof orgDepartmentUserPermissionsInsertSchema
>;
export type OrgDepartmentUserPermissionsUpdate = z.infer<
  typeof orgDepartmentUserPermissionsUpdateSchema
>;
