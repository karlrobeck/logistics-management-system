import { z } from "zod";
import {
  baseEntitySchema,
  idSchema,
  optionalBaseEntitySchema,
} from "../base.js";

// ORG Department Transport Modes Schema
export const orgDepartmentTransportModesSchema = baseEntitySchema.extend({
  departmentId: idSchema,
  transportMode: z.string().min(1, "Transport mode is required"),
});

export const orgDepartmentTransportModesInsertSchema = optionalBaseEntitySchema
  .extend({
    departmentId: idSchema,
    transportMode: z.string().min(1, "Transport mode is required"),
  });

export const orgDepartmentTransportModesUpdateSchema =
  orgDepartmentTransportModesInsertSchema.partial();

export type OrgDepartmentTransportModes = z.infer<
  typeof orgDepartmentTransportModesSchema
>;
export type OrgDepartmentTransportModesInsert = z.infer<
  typeof orgDepartmentTransportModesInsertSchema
>;
export type OrgDepartmentTransportModesUpdate = z.infer<
  typeof orgDepartmentTransportModesUpdateSchema
>;
