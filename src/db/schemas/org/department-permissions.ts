import { z } from 'zod';
import { OrgPermissionStatus } from '../../types.js';
import {
  baseEntitySchema,
  idSchema,
  optionalBaseEntitySchema,
} from '../base.js';

// ORG Department Permissions Schema
export const orgDepartmentPermissionsSchema = baseEntitySchema.extend({
  action: z.enum(OrgPermissionStatus),
  departmentId: idSchema,
  resource: z.string().min(1, 'Resource is required'),
});

export const orgDepartmentPermissionsInsertSchema =
  optionalBaseEntitySchema.extend({
    action: z.enum(OrgPermissionStatus),
    departmentId: idSchema,
    resource: z.string().min(1, 'Resource is required'),
  });

export const orgDepartmentPermissionsUpdateSchema =
  orgDepartmentPermissionsInsertSchema.partial();

export type OrgDepartmentPermissions = z.infer<
  typeof orgDepartmentPermissionsSchema
>;
export type OrgDepartmentPermissionsInsert = z.infer<
  typeof orgDepartmentPermissionsInsertSchema
>;
export type OrgDepartmentPermissionsUpdate = z.infer<
  typeof orgDepartmentPermissionsUpdateSchema
>;
