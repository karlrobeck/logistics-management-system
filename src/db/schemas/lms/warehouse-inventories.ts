import { z } from "zod";
import {
  baseEntitySchema,
  idSchema,
  optionalBaseEntitySchema,
  timestampSchema,
} from "../base.js";
import { LmsWarehouseInventoryStatus } from "../../types.js";

// LMS Warehouse Inventories Schema
export const lmsWarehouseInventoriesSchema = baseEntitySchema.extend({
  arrivedAt: timestampSchema.nullable().optional(),
  departedAt: timestampSchema.nullable().optional(),
  locationCode: z.string().nullable().optional(),
  packageId: idSchema,
  shipmentId: idSchema,
  status: z.enum(LmsWarehouseInventoryStatus),
  warehouseId: idSchema,
});

export const lmsWarehouseInventoriesInsertSchema = optionalBaseEntitySchema
  .extend({
    arrivedAt: timestampSchema.nullable().optional(),
    departedAt: timestampSchema.nullable().optional(),
    locationCode: z.string().nullable().optional(),
    packageId: idSchema,
    shipmentId: idSchema,
    status: z.enum(LmsWarehouseInventoryStatus),
    warehouseId: idSchema,
  });

export const lmsWarehouseInventoriesUpdateSchema =
  lmsWarehouseInventoriesInsertSchema.partial();

export type LmsWarehouseInventories = z.infer<
  typeof lmsWarehouseInventoriesSchema
>;
export type LmsWarehouseInventoriesInsert = z.infer<
  typeof lmsWarehouseInventoriesInsertSchema
>;
export type LmsWarehouseInventoriesUpdate = z.infer<
  typeof lmsWarehouseInventoriesUpdateSchema
>;
