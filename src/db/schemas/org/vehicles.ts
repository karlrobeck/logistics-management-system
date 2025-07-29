import { z } from 'zod';
import { OrgVehicleStatus, OrgVehicleType } from '../../types.js';
import {
  baseEntitySchema,
  idSchema,
  numericSchema,
  optionalBaseEntitySchema,
} from '../base.js';

// ORG Vehicles Schema
export const orgVehiclesSchema = baseEntitySchema.extend({
  capacityVolume: numericSchema.nullable().optional(),
  capacityWeight: numericSchema.nullable().optional(),
  departmentId: idSchema.nullable().optional(),
  licensePlate: z.string().min(1, 'License plate is required'),
  make: z.string().min(1, 'Vehicle make is required'),
  model: z.string().min(1, 'Vehicle model is required'),
  status: z.enum(OrgVehicleStatus),
  vehicleNumber: z.string().min(1, 'Vehicle number is required'),
  vehicleType: z.enum(OrgVehicleType),
  warehouseId: idSchema.nullable().optional(),
  year: z
    .number()
    .int()
    .min(1900)
    .max(new Date().getFullYear() + 2),
});

export const orgVehiclesInsertSchema = optionalBaseEntitySchema.extend({
  capacityVolume: numericSchema.nullable().optional(),
  capacityWeight: numericSchema.nullable().optional(),
  departmentId: idSchema.nullable().optional(),
  licensePlate: z.string().min(1, 'License plate is required'),
  make: z.string().min(1, 'Vehicle make is required'),
  model: z.string().min(1, 'Vehicle model is required'),
  status: z.enum(OrgVehicleStatus),
  vehicleNumber: z.string().min(1, 'Vehicle number is required'),
  vehicleType: z.enum(OrgVehicleType),
  warehouseId: idSchema.nullable().optional(),
  year: z
    .number()
    .int()
    .min(1900)
    .max(new Date().getFullYear() + 2),
});

export const orgVehiclesUpdateSchema = orgVehiclesInsertSchema.partial();

export type OrgVehicles = z.infer<typeof orgVehiclesSchema>;
export type OrgVehiclesInsert = z.infer<typeof orgVehiclesInsertSchema>;
export type OrgVehiclesUpdate = z.infer<typeof orgVehiclesUpdateSchema>;
