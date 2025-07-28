import { z } from "zod";
import {
  baseEntitySchema,
  idSchema,
  optionalBaseEntitySchema,
} from "../base.js";
import { LmsWarehouseType } from "../../types.js";

// LMS Warehouses Schema
export const lmsWarehousesSchema = baseEntitySchema.extend({
  addressId: idSchema,
  capacity: z.number().positive().nullable().optional(),
  code: z.string().min(1, "Warehouse code is required"),
  departmentId: idSchema.nullable().optional(),
  isActive: z.boolean().default(true),
  managerId: idSchema.nullable().optional(),
  name: z.string().min(1, "Warehouse name is required"),
  warehouseType: z.enum(LmsWarehouseType),
});

export const lmsWarehousesInsertSchema = optionalBaseEntitySchema.extend({
  addressId: idSchema,
  capacity: z.number().positive().nullable().optional(),
  code: z.string().min(1, "Warehouse code is required"),
  departmentId: idSchema.nullable().optional(),
  isActive: z.boolean().optional().default(true),
  managerId: idSchema.nullable().optional(),
  name: z.string().min(1, "Warehouse name is required"),
  warehouseType: z.enum(LmsWarehouseType),
});

export const lmsWarehousesUpdateSchema = lmsWarehousesInsertSchema.partial();

export type LmsWarehouses = z.infer<typeof lmsWarehousesSchema>;
export type LmsWarehousesInsert = z.infer<typeof lmsWarehousesInsertSchema>;
export type LmsWarehousesUpdate = z.infer<typeof lmsWarehousesUpdateSchema>;
