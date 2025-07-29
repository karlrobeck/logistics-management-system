import { z } from 'zod';
import { LmsRouteStatus } from '../../types.js';
import {
  baseEntitySchema,
  idSchema,
  optionalBaseEntitySchema,
  timestampSchema,
} from '../base.js';

// LMS Routes Schema
export const lmsRoutesSchema = baseEntitySchema.extend({
  actualArrival: timestampSchema.nullable().optional(),
  actualDeparture: timestampSchema.nullable().optional(),
  driverId: idSchema.nullable().optional(),
  estimatedArrival: timestampSchema.nullable().optional(),
  estimatedDeparture: timestampSchema.nullable().optional(),
  routeDate: timestampSchema,
  routeName: z.string().min(1, 'Route name is required'),
  status: z.enum(LmsRouteStatus),
  vehicleId: idSchema.nullable().optional(),
});

export const lmsRoutesInsertSchema = optionalBaseEntitySchema.extend({
  actualArrival: timestampSchema.nullable().optional(),
  actualDeparture: timestampSchema.nullable().optional(),
  driverId: idSchema.nullable().optional(),
  estimatedArrival: timestampSchema.nullable().optional(),
  estimatedDeparture: timestampSchema.nullable().optional(),
  routeDate: timestampSchema,
  routeName: z.string().min(1, 'Route name is required'),
  status: z.enum(LmsRouteStatus),
  vehicleId: idSchema.nullable().optional(),
});

export const lmsRoutesUpdateSchema = lmsRoutesInsertSchema.partial();

export type LmsRoutes = z.infer<typeof lmsRoutesSchema>;
export type LmsRoutesInsert = z.infer<typeof lmsRoutesInsertSchema>;
export type LmsRoutesUpdate = z.infer<typeof lmsRoutesUpdateSchema>;
