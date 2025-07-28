/**
 * GQty AUTO-GENERATED CODE: PLEASE DO NOT MODIFY MANUALLY
 */

import { type ScalarsEnumsHash } from "gqty";

export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never;
    };
/** All built-in and custom scalars, mapped to their actual values */
export interface Scalars {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  Any: { input: any; output: any };
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar.This scalar is serialized to a string in ISO 8601 format and parsed from a string in ISO 8601 format. */
  DateTimeISO: { input: any; output: any };
  File: { input: any; output: any };
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: { input: any; output: any };
  /** The `JSONObject` scalar type represents JSON objects as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSONObject: { input: any; output: any };
  /** Custom scalar that handles both integers and floats */
  Number: { input: number; output: number };
  /** Represents NULL values */
  Void: { input: any; output: any };
}

export enum ASC_DESCInput {
  asc = "asc",
  desc = "desc",
}

export enum CREATED_EMAIL_ID_UPDATED_ADDRESSID_BIRTHDATE_COMPANYID_FIRSTNAME_JOBTITLE_LASTNAME_LEADSOURCE_PHONENUMBER_STATUSInput {
  addressId = "addressId",
  birthDate = "birthDate",
  companyId = "companyId",
  created = "created",
  email = "email",
  firstName = "firstName",
  id = "id",
  jobTitle = "jobTitle",
  lastName = "lastName",
  leadSource = "leadSource",
  phoneNumber = "phoneNumber",
  status = "status",
  updated = "updated",
}

export enum CrmCampaignContactsStatus {
  clicked = "clicked",
  opened = "opened",
  responded = "responded",
  sent = "sent",
  unsubscribe = "unsubscribe",
}

export enum CrmCampaignContactsStatusInput {
  clicked = "clicked",
  opened = "opened",
  responded = "responded",
  sent = "sent",
  unsubscribe = "unsubscribe",
}

export enum CrmCampaignStatus {
  active = "active",
  completed = "completed",
  paused = "paused",
  planned = "planned",
}

export enum CrmCampaignStatusInput {
  active = "active",
  completed = "completed",
  paused = "paused",
  planned = "planned",
}

export enum CrmCasePriority {
  critical = "critical",
  high = "high",
  low = "low",
  medium = "medium",
}

export enum CrmCasePriorityInput {
  critical = "critical",
  high = "high",
  low = "low",
  medium = "medium",
}

export enum CrmCaseStatus {
  closed = "closed",
  in_progress = "in_progress",
  open = "open",
  pending_customer = "pending_customer",
}

export enum CrmCaseStatusInput {
  closed = "closed",
  in_progress = "in_progress",
  open = "open",
  pending_customer = "pending_customer",
}

export enum CrmContactStatus {
  customer = "customer",
  inactive = "inactive",
  lead = "lead",
  prospect = "prospect",
}

export enum CrmContactStatusInput {
  customer = "customer",
  inactive = "inactive",
  lead = "lead",
  prospect = "prospect",
}

export enum CrmInteractionType {
  call = "call",
  chat = "chat",
  email = "email",
  meeting = "meeting",
  note = "note",
}

export enum CrmInteractionTypeInput {
  call = "call",
  chat = "chat",
  email = "email",
  meeting = "meeting",
  note = "note",
}

export enum CrmInvoiceStatus {
  cancelled = "cancelled",
  draft = "draft",
  overdue = "overdue",
  paid = "paid",
  sent = "sent",
}

export enum CrmInvoiceStatusInput {
  cancelled = "cancelled",
  draft = "draft",
  overdue = "overdue",
  paid = "paid",
  sent = "sent",
}

export enum CrmLeadStatus {
  contacted = "contacted",
  new = "new",
  qualified = "qualified",
  unqualified = "unqualified",
}

export enum CrmLeadStatusInput {
  contacted = "contacted",
  new = "new",
  qualified = "qualified",
  unqualified = "unqualified",
}

export enum CrmNotificationChannel {
  email = "email",
  push = "push",
  sms = "sms",
  webhook = "webhook",
}

export enum CrmNotificationChannelInput {
  email = "email",
  push = "push",
  sms = "sms",
  webhook = "webhook",
}

export enum CrmNotificationDeliveryStatus {
  bounced = "bounced",
  delivered = "delivered",
  failed = "failed",
  pending = "pending",
  sent = "sent",
}

export enum CrmNotificationDeliveryStatusInput {
  bounced = "bounced",
  delivered = "delivered",
  failed = "failed",
  pending = "pending",
  sent = "sent",
}

export enum CrmNotificationType {
  delayed = "delayed",
  delivered = "delivered",
  exception = "exception",
  in_transit = "in_transit",
  out_for_delivery = "out_for_delivery",
  pickup_scheduled = "pickup_scheduled",
}

export enum CrmNotificationTypeInput {
  delayed = "delayed",
  delivered = "delivered",
  exception = "exception",
  in_transit = "in_transit",
  out_for_delivery = "out_for_delivery",
  pickup_scheduled = "pickup_scheduled",
}

export enum CrmOpportunityStage {
  closed_lost = "closed_lost",
  closed_won = "closed_won",
  proposal = "proposal",
  prospecting = "prospecting",
  qualification = "qualification",
}

export enum CrmOpportunityStageInput {
  closed_lost = "closed_lost",
  closed_won = "closed_won",
  proposal = "proposal",
  prospecting = "prospecting",
  qualification = "qualification",
}

export interface FilterInput {
  key: CREATED_EMAIL_ID_UPDATED_ADDRESSID_BIRTHDATE_COMPANYID_FIRSTNAME_JOBTITLE_LASTNAME_LEADSOURCE_PHONENUMBER_STATUSInput;
  operator: Scalars["String"]["input"];
  value: Scalars["String"]["input"];
}

export enum LmsAddressType {
  billing = "billing",
  office = "office",
  shipping = "shipping",
  warehouse = "warehouse",
}

export enum LmsAddressTypeInput {
  billing = "billing",
  office = "office",
  shipping = "shipping",
  warehouse = "warehouse",
}

export enum LmsDeliveryStatus {
  attempted = "attempted",
  delivered = "delivered",
  failed = "failed",
  pending = "pending",
  rescheduled = "rescheduled",
}

export enum LmsDeliveryStatusInput {
  attempted = "attempted",
  delivered = "delivered",
  failed = "failed",
  pending = "pending",
  rescheduled = "rescheduled",
}

export enum LmsLegStatus {
  cancelled = "cancelled",
  completed = "completed",
  in_progress = "in_progress",
  planned = "planned",
}

export enum LmsLegStatusInput {
  cancelled = "cancelled",
  completed = "completed",
  in_progress = "in_progress",
  planned = "planned",
}

export enum LmsPackageType {
  bag = "bag",
  box = "box",
  crate = "crate",
  envelope = "envelope",
  pallet = "pallet",
  tube = "tube",
}

export enum LmsPackageTypeInput {
  bag = "bag",
  box = "box",
  crate = "crate",
  envelope = "envelope",
  pallet = "pallet",
  tube = "tube",
}

export enum LmsPerformanceMetricType {
  cost_efficiency = "cost_efficiency",
  customer_satisfaction = "customer_satisfaction",
  damage_rate = "damage_rate",
  on_time_delivery = "on_time_delivery",
}

export enum LmsPerformanceMetricTypeInput {
  cost_efficiency = "cost_efficiency",
  customer_satisfaction = "customer_satisfaction",
  damage_rate = "damage_rate",
  on_time_delivery = "on_time_delivery",
}

export enum LmsProviderInvoiceStatus {
  cancelled = "cancelled",
  draft = "draft",
  overdue = "overdue",
  paid = "paid",
  sent = "sent",
}

export enum LmsProviderInvoiceStatusInput {
  cancelled = "cancelled",
  draft = "draft",
  overdue = "overdue",
  paid = "paid",
  sent = "sent",
}

export enum LmsProviderType {
  courier = "courier",
  express = "express",
  freight = "freight",
  ftl = "ftl",
  ltl = "ltl",
  postal = "postal",
}

export enum LmsProviderTypeInput {
  courier = "courier",
  express = "express",
  freight = "freight",
  ftl = "ftl",
  ltl = "ltl",
  postal = "postal",
}

export enum LmsRouteStatus {
  cancelled = "cancelled",
  completed = "completed",
  in_progress = "in_progress",
  planned = "planned",
}

export enum LmsRouteStatusInput {
  cancelled = "cancelled",
  completed = "completed",
  in_progress = "in_progress",
  planned = "planned",
}

export enum LmsServiceType {
  economy = "economy",
  express = "express",
  freight = "freight",
  overnight = "overnight",
  standard = "standard",
}

export enum LmsServiceTypeInput {
  economy = "economy",
  express = "express",
  freight = "freight",
  overnight = "overnight",
  standard = "standard",
}

export enum LmsShipmentStatus {
  cancelled = "cancelled",
  created = "created",
  delivered = "delivered",
  exception = "exception",
  in_transit = "in_transit",
  out_for_delivery = "out_for_delivery",
  picked_up = "picked_up",
}

export enum LmsShipmentStatusInput {
  cancelled = "cancelled",
  created = "created",
  delivered = "delivered",
  exception = "exception",
  in_transit = "in_transit",
  out_for_delivery = "out_for_delivery",
  picked_up = "picked_up",
}

export enum LmsTrackingEventType {
  arrived = "arrived",
  cancelled = "cancelled",
  created = "created",
  delivered = "delivered",
  departed = "departed",
  exception = "exception",
  out_for_delivery = "out_for_delivery",
  picked_up = "picked_up",
}

export enum LmsTrackingEventTypeInput {
  arrived = "arrived",
  cancelled = "cancelled",
  created = "created",
  delivered = "delivered",
  departed = "departed",
  exception = "exception",
  out_for_delivery = "out_for_delivery",
  picked_up = "picked_up",
}

export enum LmsTransportLegType {
  delivery = "delivery",
  linehaul = "linehaul",
  pickup = "pickup",
  transfer = "transfer",
}

export enum LmsTransportLegTypeInput {
  delivery = "delivery",
  linehaul = "linehaul",
  pickup = "pickup",
  transfer = "transfer",
}

export enum LmsTransportMode {
  air = "air",
  rail = "rail",
  road = "road",
  sea = "sea",
}

export enum LmsTransportModeInput {
  air = "air",
  rail = "rail",
  road = "road",
  sea = "sea",
}

export enum LmsWarehouseInventoryStatus {
  picked = "picked",
  received = "received",
  shipped = "shipped",
  stored = "stored",
}

export enum LmsWarehouseInventoryStatusInput {
  picked = "picked",
  received = "received",
  shipped = "shipped",
  stored = "stored",
}

export enum LmsWarehouseType {
  bonded = "bonded",
  cold_storage = "cold_storage",
  cross_dock = "cross_dock",
  distribution = "distribution",
  fulfillment = "fulfillment",
}

export enum LmsWarehouseTypeInput {
  bonded = "bonded",
  cold_storage = "cold_storage",
  cross_dock = "cross_dock",
  distribution = "distribution",
  fulfillment = "fulfillment",
}

export enum OrgDriverStatus {
  active = "active",
  inactive = "inactive",
  on_leave = "on_leave",
  terminated = "terminated",
}

export enum OrgDriverStatusInput {
  active = "active",
  inactive = "inactive",
  on_leave = "on_leave",
  terminated = "terminated",
}

export enum OrgPermissionStatus {
  create = "create",
  delete = "delete",
  read = "read",
  update = "update",
}

export enum OrgPermissionStatusInput {
  create = "create",
  delete = "delete",
  read = "read",
  update = "update",
}

export enum OrgVehicleStatus {
  active = "active",
  maintenance = "maintenance",
  out_of_service = "out_of_service",
  retired = "retired",
}

export enum OrgVehicleStatusInput {
  active = "active",
  maintenance = "maintenance",
  out_of_service = "out_of_service",
  retired = "retired",
}

export enum OrgVehicleType {
  car = "car",
  motorcycle = "motorcycle",
  trailer = "trailer",
  truck = "truck",
  van = "van",
}

export enum OrgVehicleTypeInput {
  car = "car",
  motorcycle = "motorcycle",
  trailer = "trailer",
  truck = "truck",
  van = "van",
}

export interface PayloadInputAndPayloadInput_1 {
  arrivedAt?: InputMaybe<Scalars["String"]["input"]>;
  created?: InputMaybe<Scalars["String"]["input"]>;
  departedAt?: InputMaybe<Scalars["String"]["input"]>;
  id?: InputMaybe<Scalars["String"]["input"]>;
  locationCode?: InputMaybe<Scalars["String"]["input"]>;
  packageId: Scalars["String"]["input"];
  shipmentId: Scalars["String"]["input"];
  status: LmsWarehouseInventoryStatusInput;
  updated?: InputMaybe<Scalars["String"]["input"]>;
  warehouseId: Scalars["String"]["input"];
}

export interface PayloadInput_2 {
  arrivedAt?: InputMaybe<Scalars["String"]["input"]>;
  created?: InputMaybe<Scalars["String"]["input"]>;
  departedAt?: InputMaybe<Scalars["String"]["input"]>;
  id?: InputMaybe<Scalars["String"]["input"]>;
  locationCode?: InputMaybe<Scalars["String"]["input"]>;
  packageId?: InputMaybe<Scalars["String"]["input"]>;
  shipmentId?: InputMaybe<Scalars["String"]["input"]>;
  status?: InputMaybe<LmsWarehouseInventoryStatusInput>;
  updated?: InputMaybe<Scalars["String"]["input"]>;
  warehouseId?: InputMaybe<Scalars["String"]["input"]>;
}

export interface PayloadInput_3AndPayloadInput_4 {
  created?: InputMaybe<Scalars["String"]["input"]>;
  height?: InputMaybe<Scalars["String"]["input"]>;
  id?: InputMaybe<Scalars["String"]["input"]>;
  length?: InputMaybe<Scalars["String"]["input"]>;
  shippingServiceId: Scalars["String"]["input"];
  width?: InputMaybe<Scalars["String"]["input"]>;
}

export interface PayloadInput_5 {
  created?: InputMaybe<Scalars["String"]["input"]>;
  height?: InputMaybe<Scalars["String"]["input"]>;
  id?: InputMaybe<Scalars["String"]["input"]>;
  length?: InputMaybe<Scalars["String"]["input"]>;
  shippingServiceId?: InputMaybe<Scalars["String"]["input"]>;
  width?: InputMaybe<Scalars["String"]["input"]>;
}

export interface PayloadInput_6AndPayloadInput_7 {
  actualDelivery?: InputMaybe<Scalars["String"]["input"]>;
  actualPickup?: InputMaybe<Scalars["String"]["input"]>;
  cost?: InputMaybe<Scalars["String"]["input"]>;
  created?: InputMaybe<Scalars["String"]["input"]>;
  currency?: InputMaybe<Scalars["String"]["input"]>;
  destinationAddressId?: InputMaybe<Scalars["String"]["input"]>;
  destinationWarehouseId?: InputMaybe<Scalars["String"]["input"]>;
  driverId?: InputMaybe<Scalars["String"]["input"]>;
  id?: InputMaybe<Scalars["String"]["input"]>;
  legSequence: Scalars["Number"]["input"];
  originAddressId?: InputMaybe<Scalars["String"]["input"]>;
  originWarehouseId?: InputMaybe<Scalars["String"]["input"]>;
  providerId?: InputMaybe<Scalars["String"]["input"]>;
  providerServiceId?: InputMaybe<Scalars["String"]["input"]>;
  providerTrackingNumber?: InputMaybe<Scalars["String"]["input"]>;
  scheduledDelivery?: InputMaybe<Scalars["String"]["input"]>;
  scheduledPickup?: InputMaybe<Scalars["String"]["input"]>;
  shipmentId: Scalars["String"]["input"];
  specialInstructions?: InputMaybe<Scalars["String"]["input"]>;
  status: LmsLegStatusInput;
  transportType: LmsTransportLegTypeInput;
  updated?: InputMaybe<Scalars["String"]["input"]>;
  vehicleId?: InputMaybe<Scalars["String"]["input"]>;
}

export interface PayloadInput_8 {
  actualDelivery?: InputMaybe<Scalars["String"]["input"]>;
  actualPickup?: InputMaybe<Scalars["String"]["input"]>;
  cost?: InputMaybe<Scalars["String"]["input"]>;
  created?: InputMaybe<Scalars["String"]["input"]>;
  currency?: InputMaybe<Scalars["String"]["input"]>;
  destinationAddressId?: InputMaybe<Scalars["String"]["input"]>;
  destinationWarehouseId?: InputMaybe<Scalars["String"]["input"]>;
  driverId?: InputMaybe<Scalars["String"]["input"]>;
  id?: InputMaybe<Scalars["String"]["input"]>;
  legSequence?: InputMaybe<Scalars["Number"]["input"]>;
  originAddressId?: InputMaybe<Scalars["String"]["input"]>;
  originWarehouseId?: InputMaybe<Scalars["String"]["input"]>;
  providerId?: InputMaybe<Scalars["String"]["input"]>;
  providerServiceId?: InputMaybe<Scalars["String"]["input"]>;
  providerTrackingNumber?: InputMaybe<Scalars["String"]["input"]>;
  scheduledDelivery?: InputMaybe<Scalars["String"]["input"]>;
  scheduledPickup?: InputMaybe<Scalars["String"]["input"]>;
  shipmentId?: InputMaybe<Scalars["String"]["input"]>;
  specialInstructions?: InputMaybe<Scalars["String"]["input"]>;
  status?: InputMaybe<LmsLegStatusInput>;
  transportType?: InputMaybe<LmsTransportLegTypeInput>;
  updated?: InputMaybe<Scalars["String"]["input"]>;
  vehicleId?: InputMaybe<Scalars["String"]["input"]>;
}

export interface PayloadInput_9AndPayloadInput_10 {
  actualDelivery?: InputMaybe<Scalars["String"]["input"]>;
  created?: InputMaybe<Scalars["String"]["input"]>;
  deliveryDate: Scalars["String"]["input"];
  deliveryStatus: LmsDeliveryStatusInput;
  estimatedDelivery?: InputMaybe<Scalars["String"]["input"]>;
  id?: InputMaybe<Scalars["String"]["input"]>;
  recipientSignature?: InputMaybe<Scalars["String"]["input"]>;
  routeId: Scalars["String"]["input"];
  sequenceNumber: Scalars["Number"]["input"];
  shipmentId: Scalars["String"]["input"];
  signatureRequired?: InputMaybe<Scalars["Boolean"]["input"]>;
  updated?: InputMaybe<Scalars["String"]["input"]>;
}

export interface PayloadInput_11 {
  actualDelivery?: InputMaybe<Scalars["String"]["input"]>;
  created?: InputMaybe<Scalars["String"]["input"]>;
  deliveryDate?: InputMaybe<Scalars["String"]["input"]>;
  deliveryStatus?: InputMaybe<LmsDeliveryStatusInput>;
  estimatedDelivery?: InputMaybe<Scalars["String"]["input"]>;
  id?: InputMaybe<Scalars["String"]["input"]>;
  recipientSignature?: InputMaybe<Scalars["String"]["input"]>;
  routeId?: InputMaybe<Scalars["String"]["input"]>;
  sequenceNumber?: InputMaybe<Scalars["Number"]["input"]>;
  shipmentId?: InputMaybe<Scalars["String"]["input"]>;
  signatureRequired?: InputMaybe<Scalars["Boolean"]["input"]>;
  updated?: InputMaybe<Scalars["String"]["input"]>;
}

export interface PayloadInput_12AndPayloadInput_13 {
  countryCode: Scalars["String"]["input"];
  created?: InputMaybe<Scalars["String"]["input"]>;
  id?: InputMaybe<Scalars["String"]["input"]>;
  providerServiceId: Scalars["String"]["input"];
}

export interface PayloadInput_14 {
  countryCode?: InputMaybe<Scalars["String"]["input"]>;
  created?: InputMaybe<Scalars["String"]["input"]>;
  id?: InputMaybe<Scalars["String"]["input"]>;
  providerServiceId?: InputMaybe<Scalars["String"]["input"]>;
}

export interface PayloadInput_15AndPayloadInput_16 {
  created?: InputMaybe<Scalars["String"]["input"]>;
  height?: InputMaybe<Scalars["String"]["input"]>;
  id?: InputMaybe<Scalars["String"]["input"]>;
  length?: InputMaybe<Scalars["String"]["input"]>;
  providerServiceId: Scalars["String"]["input"];
  width?: InputMaybe<Scalars["String"]["input"]>;
}

export interface PayloadInput_17 {
  created?: InputMaybe<Scalars["String"]["input"]>;
  height?: InputMaybe<Scalars["String"]["input"]>;
  id?: InputMaybe<Scalars["String"]["input"]>;
  length?: InputMaybe<Scalars["String"]["input"]>;
  providerServiceId?: InputMaybe<Scalars["String"]["input"]>;
  width?: InputMaybe<Scalars["String"]["input"]>;
}

export interface PayloadInput_18AndPayloadInput_19 {
  countryCode: Scalars["String"]["input"];
  created?: InputMaybe<Scalars["String"]["input"]>;
  id?: InputMaybe<Scalars["String"]["input"]>;
  providerServiceId: Scalars["String"]["input"];
}

export interface PayloadInput_20 {
  countryCode?: InputMaybe<Scalars["String"]["input"]>;
  created?: InputMaybe<Scalars["String"]["input"]>;
  id?: InputMaybe<Scalars["String"]["input"]>;
  providerServiceId?: InputMaybe<Scalars["String"]["input"]>;
}

export interface PayloadInput_21AndPayloadInput_22 {
  created?: InputMaybe<Scalars["String"]["input"]>;
  cutoffTime?: InputMaybe<Scalars["String"]["input"]>;
  id?: InputMaybe<Scalars["String"]["input"]>;
  insuranceAvailable?: InputMaybe<Scalars["Boolean"]["input"]>;
  isActive?: InputMaybe<Scalars["Boolean"]["input"]>;
  maxWeight?: InputMaybe<Scalars["String"]["input"]>;
  providerId: Scalars["String"]["input"];
  serviceName: Scalars["String"]["input"];
  serviceType: LmsServiceTypeInput;
  trackingAvailable?: InputMaybe<Scalars["Boolean"]["input"]>;
  transitTimeMax?: InputMaybe<Scalars["Number"]["input"]>;
  transitTimeMin?: InputMaybe<Scalars["Number"]["input"]>;
  transportMode: LmsTransportModeInput;
  updated?: InputMaybe<Scalars["String"]["input"]>;
}

export interface PayloadInput_23 {
  created?: InputMaybe<Scalars["String"]["input"]>;
  cutoffTime?: InputMaybe<Scalars["String"]["input"]>;
  id?: InputMaybe<Scalars["String"]["input"]>;
  insuranceAvailable?: InputMaybe<Scalars["Boolean"]["input"]>;
  isActive?: InputMaybe<Scalars["Boolean"]["input"]>;
  maxWeight?: InputMaybe<Scalars["String"]["input"]>;
  providerId?: InputMaybe<Scalars["String"]["input"]>;
  serviceName?: InputMaybe<Scalars["String"]["input"]>;
  serviceType?: InputMaybe<LmsServiceTypeInput>;
  trackingAvailable?: InputMaybe<Scalars["Boolean"]["input"]>;
  transitTimeMax?: InputMaybe<Scalars["Number"]["input"]>;
  transitTimeMin?: InputMaybe<Scalars["Number"]["input"]>;
  transportMode?: InputMaybe<LmsTransportModeInput>;
  updated?: InputMaybe<Scalars["String"]["input"]>;
}

export interface PayloadInput_24AndPayloadInput_25 {
  baseRate: Scalars["String"]["input"];
  created?: InputMaybe<Scalars["String"]["input"]>;
  currency?: InputMaybe<Scalars["String"]["input"]>;
  destinationZoneId: Scalars["String"]["input"];
  effectiveDate: Scalars["String"]["input"];
  expiryDate?: InputMaybe<Scalars["String"]["input"]>;
  fuelSurchargeRate?: InputMaybe<Scalars["String"]["input"]>;
  id?: InputMaybe<Scalars["String"]["input"]>;
  originZoneId: Scalars["String"]["input"];
  perKgRate: Scalars["String"]["input"];
  providerServiceId: Scalars["String"]["input"];
  updated?: InputMaybe<Scalars["String"]["input"]>;
  weightMax: Scalars["String"]["input"];
  weightMin: Scalars["String"]["input"];
}

export interface PayloadInput_26 {
  baseRate?: InputMaybe<Scalars["String"]["input"]>;
  created?: InputMaybe<Scalars["String"]["input"]>;
  currency?: InputMaybe<Scalars["String"]["input"]>;
  destinationZoneId?: InputMaybe<Scalars["String"]["input"]>;
  effectiveDate?: InputMaybe<Scalars["String"]["input"]>;
  expiryDate?: InputMaybe<Scalars["String"]["input"]>;
  fuelSurchargeRate?: InputMaybe<Scalars["String"]["input"]>;
  id?: InputMaybe<Scalars["String"]["input"]>;
  originZoneId?: InputMaybe<Scalars["String"]["input"]>;
  perKgRate?: InputMaybe<Scalars["String"]["input"]>;
  providerServiceId?: InputMaybe<Scalars["String"]["input"]>;
  updated?: InputMaybe<Scalars["String"]["input"]>;
  weightMax?: InputMaybe<Scalars["String"]["input"]>;
  weightMin?: InputMaybe<Scalars["String"]["input"]>;
}

export interface PayloadInput_27AndPayloadInput_28 {
  created?: InputMaybe<Scalars["String"]["input"]>;
  id?: InputMaybe<Scalars["String"]["input"]>;
  measurementDate: Scalars["String"]["input"];
  metricType: LmsPerformanceMetricTypeInput;
  metricValue?: InputMaybe<Scalars["String"]["input"]>;
  notes?: InputMaybe<Scalars["String"]["input"]>;
  providerId: Scalars["String"]["input"];
  shipmentId: Scalars["String"]["input"];
  transportLegId?: InputMaybe<Scalars["String"]["input"]>;
  updated?: InputMaybe<Scalars["String"]["input"]>;
}

export interface PayloadInput_29 {
  created?: InputMaybe<Scalars["String"]["input"]>;
  id?: InputMaybe<Scalars["String"]["input"]>;
  measurementDate?: InputMaybe<Scalars["String"]["input"]>;
  metricType?: InputMaybe<LmsPerformanceMetricTypeInput>;
  metricValue?: InputMaybe<Scalars["String"]["input"]>;
  notes?: InputMaybe<Scalars["String"]["input"]>;
  providerId?: InputMaybe<Scalars["String"]["input"]>;
  shipmentId?: InputMaybe<Scalars["String"]["input"]>;
  transportLegId?: InputMaybe<Scalars["String"]["input"]>;
  updated?: InputMaybe<Scalars["String"]["input"]>;
}

export interface PayloadInput_30AndPayloadInput_31 {
  created?: InputMaybe<Scalars["String"]["input"]>;
  description: Scalars["String"]["input"];
  id?: InputMaybe<Scalars["String"]["input"]>;
  lineTotal?: InputMaybe<Scalars["String"]["input"]>;
  providerInvoiceId: Scalars["String"]["input"];
  quantity?: InputMaybe<Scalars["Number"]["input"]>;
  transportLegId: Scalars["String"]["input"];
  unitPrice: Scalars["String"]["input"];
  updated?: InputMaybe<Scalars["String"]["input"]>;
}

export interface PayloadInput_32 {
  created?: InputMaybe<Scalars["String"]["input"]>;
  description?: InputMaybe<Scalars["String"]["input"]>;
  id?: InputMaybe<Scalars["String"]["input"]>;
  lineTotal?: InputMaybe<Scalars["String"]["input"]>;
  providerInvoiceId?: InputMaybe<Scalars["String"]["input"]>;
  quantity?: InputMaybe<Scalars["Number"]["input"]>;
  transportLegId?: InputMaybe<Scalars["String"]["input"]>;
  unitPrice?: InputMaybe<Scalars["String"]["input"]>;
  updated?: InputMaybe<Scalars["String"]["input"]>;
}

export interface PayloadInput_33AndPayloadInput_34 {
  created?: InputMaybe<Scalars["String"]["input"]>;
  currency?: InputMaybe<Scalars["String"]["input"]>;
  dueDate: Scalars["String"]["input"];
  id?: InputMaybe<Scalars["String"]["input"]>;
  invoiceDate: Scalars["String"]["input"];
  invoiceNumber: Scalars["String"]["input"];
  paymentDate?: InputMaybe<Scalars["String"]["input"]>;
  providerId: Scalars["String"]["input"];
  status: LmsProviderInvoiceStatusInput;
  subtotal: Scalars["String"]["input"];
  taxAmount?: InputMaybe<Scalars["String"]["input"]>;
  totalAmount?: InputMaybe<Scalars["String"]["input"]>;
  updated?: InputMaybe<Scalars["String"]["input"]>;
}

export interface PayloadInput_35 {
  created?: InputMaybe<Scalars["String"]["input"]>;
  currency?: InputMaybe<Scalars["String"]["input"]>;
  dueDate?: InputMaybe<Scalars["String"]["input"]>;
  id?: InputMaybe<Scalars["String"]["input"]>;
  invoiceDate?: InputMaybe<Scalars["String"]["input"]>;
  invoiceNumber?: InputMaybe<Scalars["String"]["input"]>;
  paymentDate?: InputMaybe<Scalars["String"]["input"]>;
  providerId?: InputMaybe<Scalars["String"]["input"]>;
  status?: InputMaybe<LmsProviderInvoiceStatusInput>;
  subtotal?: InputMaybe<Scalars["String"]["input"]>;
  taxAmount?: InputMaybe<Scalars["String"]["input"]>;
  totalAmount?: InputMaybe<Scalars["String"]["input"]>;
  updated?: InputMaybe<Scalars["String"]["input"]>;
}

export interface PayloadInput_36AndPayloadInput_37 {
  countryCode: Scalars["String"]["input"];
  created?: InputMaybe<Scalars["String"]["input"]>;
  id?: InputMaybe<Scalars["String"]["input"]>;
  pricingZoneId: Scalars["String"]["input"];
}

export interface PayloadInput_38 {
  countryCode?: InputMaybe<Scalars["String"]["input"]>;
  created?: InputMaybe<Scalars["String"]["input"]>;
  id?: InputMaybe<Scalars["String"]["input"]>;
  pricingZoneId?: InputMaybe<Scalars["String"]["input"]>;
}

export interface PayloadInput_39AndPayloadInput_40 {
  created?: InputMaybe<Scalars["String"]["input"]>;
  id?: InputMaybe<Scalars["String"]["input"]>;
  name: Scalars["String"]["input"];
  updated?: InputMaybe<Scalars["String"]["input"]>;
  zoneCode: Scalars["String"]["input"];
}

export interface PayloadInput_41 {
  created?: InputMaybe<Scalars["String"]["input"]>;
  id?: InputMaybe<Scalars["String"]["input"]>;
  name?: InputMaybe<Scalars["String"]["input"]>;
  updated?: InputMaybe<Scalars["String"]["input"]>;
  zoneCode?: InputMaybe<Scalars["String"]["input"]>;
}

export interface PayloadInput_42AndPayloadInput_43 {
  baseRate: Scalars["String"]["input"];
  created?: InputMaybe<Scalars["String"]["input"]>;
  destinationZoneId: Scalars["String"]["input"];
  effectiveDate: Scalars["String"]["input"];
  expiryDate?: InputMaybe<Scalars["String"]["input"]>;
  fuelSurchargeRate?: InputMaybe<Scalars["String"]["input"]>;
  id?: InputMaybe<Scalars["String"]["input"]>;
  originZoneId: Scalars["String"]["input"];
  perKgRate: Scalars["String"]["input"];
  serviceId: Scalars["String"]["input"];
  updated?: InputMaybe<Scalars["String"]["input"]>;
  weightMax: Scalars["String"]["input"];
  weightMin: Scalars["String"]["input"];
}

export interface PayloadInput_44 {
  baseRate?: InputMaybe<Scalars["String"]["input"]>;
  created?: InputMaybe<Scalars["String"]["input"]>;
  destinationZoneId?: InputMaybe<Scalars["String"]["input"]>;
  effectiveDate?: InputMaybe<Scalars["String"]["input"]>;
  expiryDate?: InputMaybe<Scalars["String"]["input"]>;
  fuelSurchargeRate?: InputMaybe<Scalars["String"]["input"]>;
  id?: InputMaybe<Scalars["String"]["input"]>;
  originZoneId?: InputMaybe<Scalars["String"]["input"]>;
  perKgRate?: InputMaybe<Scalars["String"]["input"]>;
  serviceId?: InputMaybe<Scalars["String"]["input"]>;
  updated?: InputMaybe<Scalars["String"]["input"]>;
  weightMax?: InputMaybe<Scalars["String"]["input"]>;
  weightMin?: InputMaybe<Scalars["String"]["input"]>;
}

export interface PayloadInput_45AndPayloadInput_46 {
  addressId?: InputMaybe<Scalars["String"]["input"]>;
  apiEndpoint?: InputMaybe<Scalars["String"]["input"]>;
  apiKey?: InputMaybe<Scalars["String"]["input"]>;
  companyName: Scalars["String"]["input"];
  contactPerson?: InputMaybe<Scalars["String"]["input"]>;
  contractEndDate?: InputMaybe<Scalars["String"]["input"]>;
  contractStartDate?: InputMaybe<Scalars["String"]["input"]>;
  created?: InputMaybe<Scalars["String"]["input"]>;
  email?: InputMaybe<Scalars["String"]["input"]>;
  id?: InputMaybe<Scalars["String"]["input"]>;
  insuranceCoverage?: InputMaybe<Scalars["String"]["input"]>;
  isActive?: InputMaybe<Scalars["Boolean"]["input"]>;
  paymentTerms?: InputMaybe<Scalars["String"]["input"]>;
  performanceRating?: InputMaybe<Scalars["String"]["input"]>;
  phoneNumber?: InputMaybe<Scalars["String"]["input"]>;
  preferredByDepartmentId?: InputMaybe<Scalars["String"]["input"]>;
  providerType: LmsProviderTypeInput;
  updated?: InputMaybe<Scalars["String"]["input"]>;
}

export interface PayloadInput_47 {
  addressId?: InputMaybe<Scalars["String"]["input"]>;
  apiEndpoint?: InputMaybe<Scalars["String"]["input"]>;
  apiKey?: InputMaybe<Scalars["String"]["input"]>;
  companyName?: InputMaybe<Scalars["String"]["input"]>;
  contactPerson?: InputMaybe<Scalars["String"]["input"]>;
  contractEndDate?: InputMaybe<Scalars["String"]["input"]>;
  contractStartDate?: InputMaybe<Scalars["String"]["input"]>;
  created?: InputMaybe<Scalars["String"]["input"]>;
  email?: InputMaybe<Scalars["String"]["input"]>;
  id?: InputMaybe<Scalars["String"]["input"]>;
  insuranceCoverage?: InputMaybe<Scalars["String"]["input"]>;
  isActive?: InputMaybe<Scalars["Boolean"]["input"]>;
  paymentTerms?: InputMaybe<Scalars["String"]["input"]>;
  performanceRating?: InputMaybe<Scalars["String"]["input"]>;
  phoneNumber?: InputMaybe<Scalars["String"]["input"]>;
  preferredByDepartmentId?: InputMaybe<Scalars["String"]["input"]>;
  providerType?: InputMaybe<LmsProviderTypeInput>;
  updated?: InputMaybe<Scalars["String"]["input"]>;
}

export interface PayloadInput_48AndPayloadInput_49 {
  created?: InputMaybe<Scalars["String"]["input"]>;
  deliveryTimeMax?: InputMaybe<Scalars["Number"]["input"]>;
  deliveryTimeMin?: InputMaybe<Scalars["Number"]["input"]>;
  description?: InputMaybe<Scalars["String"]["input"]>;
  id?: InputMaybe<Scalars["String"]["input"]>;
  isActive?: InputMaybe<Scalars["Boolean"]["input"]>;
  maxWeight?: InputMaybe<Scalars["String"]["input"]>;
  name: Scalars["String"]["input"];
  serviceType: LmsServiceTypeInput;
  updated?: InputMaybe<Scalars["String"]["input"]>;
}

export interface PayloadInput_50 {
  created?: InputMaybe<Scalars["String"]["input"]>;
  deliveryTimeMax?: InputMaybe<Scalars["Number"]["input"]>;
  deliveryTimeMin?: InputMaybe<Scalars["Number"]["input"]>;
  description?: InputMaybe<Scalars["String"]["input"]>;
  id?: InputMaybe<Scalars["String"]["input"]>;
  isActive?: InputMaybe<Scalars["Boolean"]["input"]>;
  maxWeight?: InputMaybe<Scalars["String"]["input"]>;
  name?: InputMaybe<Scalars["String"]["input"]>;
  serviceType?: InputMaybe<LmsServiceTypeInput>;
  updated?: InputMaybe<Scalars["String"]["input"]>;
}

export interface PayloadInput_51AndPayloadInput_52 {
  addressId: Scalars["String"]["input"];
  capacity?: InputMaybe<Scalars["Number"]["input"]>;
  code: Scalars["String"]["input"];
  created?: InputMaybe<Scalars["String"]["input"]>;
  departmentId?: InputMaybe<Scalars["String"]["input"]>;
  id?: InputMaybe<Scalars["String"]["input"]>;
  isActive?: InputMaybe<Scalars["Boolean"]["input"]>;
  managerId?: InputMaybe<Scalars["String"]["input"]>;
  name: Scalars["String"]["input"];
  updated?: InputMaybe<Scalars["String"]["input"]>;
  warehouseType: LmsWarehouseTypeInput;
}

export interface PayloadInput_53 {
  addressId?: InputMaybe<Scalars["String"]["input"]>;
  capacity?: InputMaybe<Scalars["Number"]["input"]>;
  code?: InputMaybe<Scalars["String"]["input"]>;
  created?: InputMaybe<Scalars["String"]["input"]>;
  departmentId?: InputMaybe<Scalars["String"]["input"]>;
  id?: InputMaybe<Scalars["String"]["input"]>;
  isActive?: InputMaybe<Scalars["Boolean"]["input"]>;
  managerId?: InputMaybe<Scalars["String"]["input"]>;
  name?: InputMaybe<Scalars["String"]["input"]>;
  updated?: InputMaybe<Scalars["String"]["input"]>;
  warehouseType?: InputMaybe<LmsWarehouseTypeInput>;
}

export interface PayloadInput_54AndPayloadInput_55 {
  actualArrival?: InputMaybe<Scalars["String"]["input"]>;
  actualDeparture?: InputMaybe<Scalars["String"]["input"]>;
  created?: InputMaybe<Scalars["String"]["input"]>;
  driverId?: InputMaybe<Scalars["String"]["input"]>;
  estimatedArrival?: InputMaybe<Scalars["String"]["input"]>;
  estimatedDeparture?: InputMaybe<Scalars["String"]["input"]>;
  id?: InputMaybe<Scalars["String"]["input"]>;
  routeDate: Scalars["String"]["input"];
  routeName: Scalars["String"]["input"];
  status: LmsRouteStatusInput;
  updated?: InputMaybe<Scalars["String"]["input"]>;
  vehicleId?: InputMaybe<Scalars["String"]["input"]>;
}

export interface PayloadInput_56 {
  actualArrival?: InputMaybe<Scalars["String"]["input"]>;
  actualDeparture?: InputMaybe<Scalars["String"]["input"]>;
  created?: InputMaybe<Scalars["String"]["input"]>;
  driverId?: InputMaybe<Scalars["String"]["input"]>;
  estimatedArrival?: InputMaybe<Scalars["String"]["input"]>;
  estimatedDeparture?: InputMaybe<Scalars["String"]["input"]>;
  id?: InputMaybe<Scalars["String"]["input"]>;
  routeDate?: InputMaybe<Scalars["String"]["input"]>;
  routeName?: InputMaybe<Scalars["String"]["input"]>;
  status?: InputMaybe<LmsRouteStatusInput>;
  updated?: InputMaybe<Scalars["String"]["input"]>;
  vehicleId?: InputMaybe<Scalars["String"]["input"]>;
}

export interface PayloadInput_57AndPayloadInput_58 {
  created?: InputMaybe<Scalars["String"]["input"]>;
  eventDescription: Scalars["String"]["input"];
  eventLocation?: InputMaybe<Scalars["String"]["input"]>;
  eventTimestamp: Scalars["String"]["input"];
  eventType: LmsTrackingEventTypeInput;
  id?: InputMaybe<Scalars["String"]["input"]>;
  shipmentId: Scalars["String"]["input"];
  updated?: InputMaybe<Scalars["String"]["input"]>;
}

export interface PayloadInput_59 {
  created?: InputMaybe<Scalars["String"]["input"]>;
  eventDescription?: InputMaybe<Scalars["String"]["input"]>;
  eventLocation?: InputMaybe<Scalars["String"]["input"]>;
  eventTimestamp?: InputMaybe<Scalars["String"]["input"]>;
  eventType?: InputMaybe<LmsTrackingEventTypeInput>;
  id?: InputMaybe<Scalars["String"]["input"]>;
  shipmentId?: InputMaybe<Scalars["String"]["input"]>;
  updated?: InputMaybe<Scalars["String"]["input"]>;
}

export interface PayloadInput_60AndPayloadInput_61 {
  contentsDescription?: InputMaybe<Scalars["String"]["input"]>;
  created?: InputMaybe<Scalars["String"]["input"]>;
  declaredValue?: InputMaybe<Scalars["String"]["input"]>;
  height?: InputMaybe<Scalars["String"]["input"]>;
  id?: InputMaybe<Scalars["String"]["input"]>;
  length?: InputMaybe<Scalars["String"]["input"]>;
  packageNumber: Scalars["String"]["input"];
  packageType: LmsPackageTypeInput;
  shipmentId: Scalars["String"]["input"];
  updated?: InputMaybe<Scalars["String"]["input"]>;
  weight: Scalars["String"]["input"];
  width?: InputMaybe<Scalars["String"]["input"]>;
}

export interface PayloadInput_62 {
  contentsDescription?: InputMaybe<Scalars["String"]["input"]>;
  created?: InputMaybe<Scalars["String"]["input"]>;
  declaredValue?: InputMaybe<Scalars["String"]["input"]>;
  height?: InputMaybe<Scalars["String"]["input"]>;
  id?: InputMaybe<Scalars["String"]["input"]>;
  length?: InputMaybe<Scalars["String"]["input"]>;
  packageNumber?: InputMaybe<Scalars["String"]["input"]>;
  packageType?: InputMaybe<LmsPackageTypeInput>;
  shipmentId?: InputMaybe<Scalars["String"]["input"]>;
  updated?: InputMaybe<Scalars["String"]["input"]>;
  weight?: InputMaybe<Scalars["String"]["input"]>;
  width?: InputMaybe<Scalars["String"]["input"]>;
}

export interface PayloadInput_63AndPayloadInput_64 {
  assignedDepartmentId?: InputMaybe<Scalars["String"]["input"]>;
  created?: InputMaybe<Scalars["String"]["input"]>;
  createdBy?: InputMaybe<Scalars["String"]["input"]>;
  currency?: InputMaybe<Scalars["String"]["input"]>;
  deliveryDate?: InputMaybe<Scalars["String"]["input"]>;
  estimatedDeliveryDate?: InputMaybe<Scalars["String"]["input"]>;
  id?: InputMaybe<Scalars["String"]["input"]>;
  insuranceAmount?: InputMaybe<Scalars["String"]["input"]>;
  pickupDate?: InputMaybe<Scalars["String"]["input"]>;
  primaryTransportMode: LmsTransportModeInput;
  receiverAddressId: Scalars["String"]["input"];
  receiverCompanyId?: InputMaybe<Scalars["String"]["input"]>;
  receiverContactId?: InputMaybe<Scalars["String"]["input"]>;
  senderAddressId: Scalars["String"]["input"];
  senderCompanyId?: InputMaybe<Scalars["String"]["input"]>;
  senderContactId?: InputMaybe<Scalars["String"]["input"]>;
  serviceId: Scalars["String"]["input"];
  shippingCost?: InputMaybe<Scalars["String"]["input"]>;
  specialInstructions?: InputMaybe<Scalars["String"]["input"]>;
  status: LmsShipmentStatusInput;
  totalValue?: InputMaybe<Scalars["String"]["input"]>;
  totalWeight: Scalars["String"]["input"];
  trackingNumber: Scalars["String"]["input"];
  updated?: InputMaybe<Scalars["String"]["input"]>;
}

export interface PayloadInput_65 {
  assignedDepartmentId?: InputMaybe<Scalars["String"]["input"]>;
  created?: InputMaybe<Scalars["String"]["input"]>;
  createdBy?: InputMaybe<Scalars["String"]["input"]>;
  currency?: InputMaybe<Scalars["String"]["input"]>;
  deliveryDate?: InputMaybe<Scalars["String"]["input"]>;
  estimatedDeliveryDate?: InputMaybe<Scalars["String"]["input"]>;
  id?: InputMaybe<Scalars["String"]["input"]>;
  insuranceAmount?: InputMaybe<Scalars["String"]["input"]>;
  pickupDate?: InputMaybe<Scalars["String"]["input"]>;
  primaryTransportMode?: InputMaybe<LmsTransportModeInput>;
  receiverAddressId?: InputMaybe<Scalars["String"]["input"]>;
  receiverCompanyId?: InputMaybe<Scalars["String"]["input"]>;
  receiverContactId?: InputMaybe<Scalars["String"]["input"]>;
  senderAddressId?: InputMaybe<Scalars["String"]["input"]>;
  senderCompanyId?: InputMaybe<Scalars["String"]["input"]>;
  senderContactId?: InputMaybe<Scalars["String"]["input"]>;
  serviceId?: InputMaybe<Scalars["String"]["input"]>;
  shippingCost?: InputMaybe<Scalars["String"]["input"]>;
  specialInstructions?: InputMaybe<Scalars["String"]["input"]>;
  status?: InputMaybe<LmsShipmentStatusInput>;
  totalValue?: InputMaybe<Scalars["String"]["input"]>;
  totalWeight?: InputMaybe<Scalars["String"]["input"]>;
  trackingNumber?: InputMaybe<Scalars["String"]["input"]>;
  updated?: InputMaybe<Scalars["String"]["input"]>;
}

export interface PayloadInput_66AndPayloadInput_67 {
  addressLine1: Scalars["String"]["input"];
  addressLine2?: InputMaybe<Scalars["String"]["input"]>;
  addressType: LmsAddressTypeInput;
  city: Scalars["String"]["input"];
  country: Scalars["String"]["input"];
  created?: InputMaybe<Scalars["String"]["input"]>;
  id?: InputMaybe<Scalars["String"]["input"]>;
  isValidated?: InputMaybe<Scalars["Boolean"]["input"]>;
  latitude?: InputMaybe<Scalars["String"]["input"]>;
  longitude?: InputMaybe<Scalars["String"]["input"]>;
  postalCode: Scalars["String"]["input"];
  state: Scalars["String"]["input"];
  updated?: InputMaybe<Scalars["String"]["input"]>;
}

export interface PayloadInput_68 {
  addressLine1?: InputMaybe<Scalars["String"]["input"]>;
  addressLine2?: InputMaybe<Scalars["String"]["input"]>;
  addressType?: InputMaybe<LmsAddressTypeInput>;
  city?: InputMaybe<Scalars["String"]["input"]>;
  country?: InputMaybe<Scalars["String"]["input"]>;
  created?: InputMaybe<Scalars["String"]["input"]>;
  id?: InputMaybe<Scalars["String"]["input"]>;
  isValidated?: InputMaybe<Scalars["Boolean"]["input"]>;
  latitude?: InputMaybe<Scalars["String"]["input"]>;
  longitude?: InputMaybe<Scalars["String"]["input"]>;
  postalCode?: InputMaybe<Scalars["String"]["input"]>;
  state?: InputMaybe<Scalars["String"]["input"]>;
  updated?: InputMaybe<Scalars["String"]["input"]>;
}

export interface PayloadInput_69AndPayloadInput_70 {
  capacityVolume?: InputMaybe<Scalars["String"]["input"]>;
  capacityWeight?: InputMaybe<Scalars["String"]["input"]>;
  created?: InputMaybe<Scalars["String"]["input"]>;
  departmentId?: InputMaybe<Scalars["String"]["input"]>;
  id?: InputMaybe<Scalars["String"]["input"]>;
  licensePlate: Scalars["String"]["input"];
  make: Scalars["String"]["input"];
  model: Scalars["String"]["input"];
  status: OrgVehicleStatusInput;
  updated?: InputMaybe<Scalars["String"]["input"]>;
  vehicleNumber: Scalars["String"]["input"];
  vehicleType: OrgVehicleTypeInput;
  warehouseId?: InputMaybe<Scalars["String"]["input"]>;
  year: Scalars["Number"]["input"];
}

export interface PayloadInput_71 {
  capacityVolume?: InputMaybe<Scalars["String"]["input"]>;
  capacityWeight?: InputMaybe<Scalars["String"]["input"]>;
  created?: InputMaybe<Scalars["String"]["input"]>;
  departmentId?: InputMaybe<Scalars["String"]["input"]>;
  id?: InputMaybe<Scalars["String"]["input"]>;
  licensePlate?: InputMaybe<Scalars["String"]["input"]>;
  make?: InputMaybe<Scalars["String"]["input"]>;
  model?: InputMaybe<Scalars["String"]["input"]>;
  status?: InputMaybe<OrgVehicleStatusInput>;
  updated?: InputMaybe<Scalars["String"]["input"]>;
  vehicleNumber?: InputMaybe<Scalars["String"]["input"]>;
  vehicleType?: InputMaybe<OrgVehicleTypeInput>;
  warehouseId?: InputMaybe<Scalars["String"]["input"]>;
  year?: InputMaybe<Scalars["Number"]["input"]>;
}

export interface PayloadInput_72AndPayloadInput_73 {
  created?: InputMaybe<Scalars["String"]["input"]>;
  email: Scalars["String"]["input"];
  employeeId: Scalars["String"]["input"];
  firstName: Scalars["String"]["input"];
  hireDate: Scalars["String"]["input"];
  id?: InputMaybe<Scalars["String"]["input"]>;
  lastName: Scalars["String"]["input"];
  licenseNumber: Scalars["String"]["input"];
  phoneNumber: Scalars["String"]["input"];
  status: OrgDriverStatusInput;
  updated?: InputMaybe<Scalars["String"]["input"]>;
}

export interface PayloadInput_74 {
  created?: InputMaybe<Scalars["String"]["input"]>;
  email?: InputMaybe<Scalars["String"]["input"]>;
  employeeId?: InputMaybe<Scalars["String"]["input"]>;
  firstName?: InputMaybe<Scalars["String"]["input"]>;
  hireDate?: InputMaybe<Scalars["String"]["input"]>;
  id?: InputMaybe<Scalars["String"]["input"]>;
  lastName?: InputMaybe<Scalars["String"]["input"]>;
  licenseNumber?: InputMaybe<Scalars["String"]["input"]>;
  phoneNumber?: InputMaybe<Scalars["String"]["input"]>;
  status?: InputMaybe<OrgDriverStatusInput>;
  updated?: InputMaybe<Scalars["String"]["input"]>;
}

export interface PayloadInput_75AndPayloadInput_76 {
  assignedDate?: InputMaybe<Scalars["String"]["input"]>;
  created?: InputMaybe<Scalars["String"]["input"]>;
  departmentId: Scalars["String"]["input"];
  id?: InputMaybe<Scalars["String"]["input"]>;
  isActive?: InputMaybe<Scalars["Boolean"]["input"]>;
  role: Scalars["String"]["input"];
  updated?: InputMaybe<Scalars["String"]["input"]>;
  userId: Scalars["String"]["input"];
}

export interface PayloadInput_77 {
  assignedDate?: InputMaybe<Scalars["String"]["input"]>;
  created?: InputMaybe<Scalars["String"]["input"]>;
  departmentId?: InputMaybe<Scalars["String"]["input"]>;
  id?: InputMaybe<Scalars["String"]["input"]>;
  isActive?: InputMaybe<Scalars["Boolean"]["input"]>;
  role?: InputMaybe<Scalars["String"]["input"]>;
  updated?: InputMaybe<Scalars["String"]["input"]>;
  userId?: InputMaybe<Scalars["String"]["input"]>;
}

export interface PayloadInput_78AndPayloadInput_79 {
  created?: InputMaybe<Scalars["String"]["input"]>;
  id?: InputMaybe<Scalars["String"]["input"]>;
  permissionId: Scalars["String"]["input"];
  userId: Scalars["String"]["input"];
}

export interface PayloadInput_80 {
  created?: InputMaybe<Scalars["String"]["input"]>;
  id?: InputMaybe<Scalars["String"]["input"]>;
  permissionId?: InputMaybe<Scalars["String"]["input"]>;
  userId?: InputMaybe<Scalars["String"]["input"]>;
}

export interface PayloadInput_81AndPayloadInput_82 {
  created?: InputMaybe<Scalars["String"]["input"]>;
  departmentId: Scalars["String"]["input"];
  id?: InputMaybe<Scalars["String"]["input"]>;
  isPrimary?: InputMaybe<Scalars["Boolean"]["input"]>;
  transportMode: Scalars["String"]["input"];
  updated?: InputMaybe<Scalars["String"]["input"]>;
}

export interface PayloadInput_83 {
  created?: InputMaybe<Scalars["String"]["input"]>;
  departmentId?: InputMaybe<Scalars["String"]["input"]>;
  id?: InputMaybe<Scalars["String"]["input"]>;
  isPrimary?: InputMaybe<Scalars["Boolean"]["input"]>;
  transportMode?: InputMaybe<Scalars["String"]["input"]>;
  updated?: InputMaybe<Scalars["String"]["input"]>;
}

export interface PayloadInput_84AndPayloadInput_85 {
  action: OrgPermissionStatusInput;
  created?: InputMaybe<Scalars["String"]["input"]>;
  departmentId: Scalars["String"]["input"];
  id?: InputMaybe<Scalars["String"]["input"]>;
  resource: Scalars["String"]["input"];
  updated?: InputMaybe<Scalars["String"]["input"]>;
}

export interface PayloadInput_86 {
  action?: InputMaybe<OrgPermissionStatusInput>;
  created?: InputMaybe<Scalars["String"]["input"]>;
  departmentId?: InputMaybe<Scalars["String"]["input"]>;
  id?: InputMaybe<Scalars["String"]["input"]>;
  resource?: InputMaybe<Scalars["String"]["input"]>;
  updated?: InputMaybe<Scalars["String"]["input"]>;
}

export interface PayloadInput_87AndPayloadInput_88 {
  budget?: InputMaybe<Scalars["String"]["input"]>;
  code: Scalars["String"]["input"];
  created?: InputMaybe<Scalars["String"]["input"]>;
  departmentType: Scalars["String"]["input"];
  description?: InputMaybe<Scalars["String"]["input"]>;
  email?: InputMaybe<Scalars["String"]["input"]>;
  id?: InputMaybe<Scalars["String"]["input"]>;
  isActive?: InputMaybe<Scalars["Boolean"]["input"]>;
  managerId?: InputMaybe<Scalars["String"]["input"]>;
  name: Scalars["String"]["input"];
  phoneNumber?: InputMaybe<Scalars["String"]["input"]>;
  updated?: InputMaybe<Scalars["String"]["input"]>;
}

export interface PayloadInput_89 {
  budget?: InputMaybe<Scalars["String"]["input"]>;
  code?: InputMaybe<Scalars["String"]["input"]>;
  created?: InputMaybe<Scalars["String"]["input"]>;
  departmentType?: InputMaybe<Scalars["String"]["input"]>;
  description?: InputMaybe<Scalars["String"]["input"]>;
  email?: InputMaybe<Scalars["String"]["input"]>;
  id?: InputMaybe<Scalars["String"]["input"]>;
  isActive?: InputMaybe<Scalars["Boolean"]["input"]>;
  managerId?: InputMaybe<Scalars["String"]["input"]>;
  name?: InputMaybe<Scalars["String"]["input"]>;
  phoneNumber?: InputMaybe<Scalars["String"]["input"]>;
  updated?: InputMaybe<Scalars["String"]["input"]>;
}

export interface PayloadInput_90AndPayloadInput_91 {
  campaignId: Scalars["String"]["input"];
  contactId: Scalars["String"]["input"];
  created?: InputMaybe<Scalars["String"]["input"]>;
  id?: InputMaybe<Scalars["String"]["input"]>;
  interactionDate?: InputMaybe<Scalars["String"]["input"]>;
  status: CrmCampaignContactsStatusInput;
  updated?: InputMaybe<Scalars["String"]["input"]>;
}

export interface PayloadInput_92 {
  campaignId?: InputMaybe<Scalars["String"]["input"]>;
  contactId?: InputMaybe<Scalars["String"]["input"]>;
  created?: InputMaybe<Scalars["String"]["input"]>;
  id?: InputMaybe<Scalars["String"]["input"]>;
  interactionDate?: InputMaybe<Scalars["String"]["input"]>;
  status?: InputMaybe<CrmCampaignContactsStatusInput>;
  updated?: InputMaybe<Scalars["String"]["input"]>;
}

export interface PayloadInput_93AndPayloadInput_94 {
  created?: InputMaybe<Scalars["String"]["input"]>;
  id?: InputMaybe<Scalars["String"]["input"]>;
  opportunityId: Scalars["String"]["input"];
  productId: Scalars["String"]["input"];
  quantity?: InputMaybe<Scalars["String"]["input"]>;
  totalPrice?: InputMaybe<Scalars["String"]["input"]>;
  unitPrice: Scalars["String"]["input"];
  updated?: InputMaybe<Scalars["String"]["input"]>;
}

export interface PayloadInput_95 {
  created?: InputMaybe<Scalars["String"]["input"]>;
  id?: InputMaybe<Scalars["String"]["input"]>;
  opportunityId?: InputMaybe<Scalars["String"]["input"]>;
  productId?: InputMaybe<Scalars["String"]["input"]>;
  quantity?: InputMaybe<Scalars["String"]["input"]>;
  totalPrice?: InputMaybe<Scalars["String"]["input"]>;
  unitPrice?: InputMaybe<Scalars["String"]["input"]>;
  updated?: InputMaybe<Scalars["String"]["input"]>;
}

export interface PayloadInput_96AndPayloadInput_97 {
  channel: CrmNotificationChannelInput;
  contactId: Scalars["String"]["input"];
  created?: InputMaybe<Scalars["String"]["input"]>;
  deliveryStatus: CrmNotificationDeliveryStatusInput;
  id?: InputMaybe<Scalars["String"]["input"]>;
  message: Scalars["String"]["input"];
  notificationType: CrmNotificationTypeInput;
  recipient: Scalars["String"]["input"];
  sentAt?: InputMaybe<Scalars["String"]["input"]>;
  shipmentId: Scalars["String"]["input"];
  subject?: InputMaybe<Scalars["String"]["input"]>;
  updated?: InputMaybe<Scalars["String"]["input"]>;
}

export interface PayloadInput_98 {
  channel?: InputMaybe<CrmNotificationChannelInput>;
  contactId?: InputMaybe<Scalars["String"]["input"]>;
  created?: InputMaybe<Scalars["String"]["input"]>;
  deliveryStatus?: InputMaybe<CrmNotificationDeliveryStatusInput>;
  id?: InputMaybe<Scalars["String"]["input"]>;
  message?: InputMaybe<Scalars["String"]["input"]>;
  notificationType?: InputMaybe<CrmNotificationTypeInput>;
  recipient?: InputMaybe<Scalars["String"]["input"]>;
  sentAt?: InputMaybe<Scalars["String"]["input"]>;
  shipmentId?: InputMaybe<Scalars["String"]["input"]>;
  subject?: InputMaybe<Scalars["String"]["input"]>;
  updated?: InputMaybe<Scalars["String"]["input"]>;
}

export interface PayloadInput_99AndPayloadInput_100 {
  created?: InputMaybe<Scalars["String"]["input"]>;
  description: Scalars["String"]["input"];
  id?: InputMaybe<Scalars["String"]["input"]>;
  invoiceId: Scalars["String"]["input"];
  lineTotal?: InputMaybe<Scalars["String"]["input"]>;
  quantity?: InputMaybe<Scalars["String"]["input"]>;
  shipmentId?: InputMaybe<Scalars["String"]["input"]>;
  unitPrice: Scalars["String"]["input"];
  updated?: InputMaybe<Scalars["String"]["input"]>;
}

export interface PayloadInput_101 {
  created?: InputMaybe<Scalars["String"]["input"]>;
  description?: InputMaybe<Scalars["String"]["input"]>;
  id?: InputMaybe<Scalars["String"]["input"]>;
  invoiceId?: InputMaybe<Scalars["String"]["input"]>;
  lineTotal?: InputMaybe<Scalars["String"]["input"]>;
  quantity?: InputMaybe<Scalars["String"]["input"]>;
  shipmentId?: InputMaybe<Scalars["String"]["input"]>;
  unitPrice?: InputMaybe<Scalars["String"]["input"]>;
  updated?: InputMaybe<Scalars["String"]["input"]>;
}

export interface PayloadInput_102AndPayloadInput_103 {
  companyId?: InputMaybe<Scalars["String"]["input"]>;
  contactId?: InputMaybe<Scalars["String"]["input"]>;
  created?: InputMaybe<Scalars["String"]["input"]>;
  currency?: InputMaybe<Scalars["String"]["input"]>;
  dueDate: Scalars["String"]["input"];
  id?: InputMaybe<Scalars["String"]["input"]>;
  invoiceDate: Scalars["String"]["input"];
  invoiceNumber: Scalars["String"]["input"];
  paymentTerms?: InputMaybe<Scalars["String"]["input"]>;
  status: CrmInvoiceStatusInput;
  subtotal: Scalars["String"]["input"];
  taxAmount?: InputMaybe<Scalars["String"]["input"]>;
  totalAmount: Scalars["String"]["input"];
  updated?: InputMaybe<Scalars["String"]["input"]>;
}

export interface PayloadInput_104 {
  companyId?: InputMaybe<Scalars["String"]["input"]>;
  contactId?: InputMaybe<Scalars["String"]["input"]>;
  created?: InputMaybe<Scalars["String"]["input"]>;
  currency?: InputMaybe<Scalars["String"]["input"]>;
  dueDate?: InputMaybe<Scalars["String"]["input"]>;
  id?: InputMaybe<Scalars["String"]["input"]>;
  invoiceDate?: InputMaybe<Scalars["String"]["input"]>;
  invoiceNumber?: InputMaybe<Scalars["String"]["input"]>;
  paymentTerms?: InputMaybe<Scalars["String"]["input"]>;
  status?: InputMaybe<CrmInvoiceStatusInput>;
  subtotal?: InputMaybe<Scalars["String"]["input"]>;
  taxAmount?: InputMaybe<Scalars["String"]["input"]>;
  totalAmount?: InputMaybe<Scalars["String"]["input"]>;
  updated?: InputMaybe<Scalars["String"]["input"]>;
}

export interface PayloadInput_105AndPayloadInput_106 {
  created?: InputMaybe<Scalars["String"]["input"]>;
  description?: InputMaybe<Scalars["String"]["input"]>;
  id?: InputMaybe<Scalars["String"]["input"]>;
  name: Scalars["String"]["input"];
  price: Scalars["String"]["input"];
  sku?: InputMaybe<Scalars["String"]["input"]>;
  updated?: InputMaybe<Scalars["String"]["input"]>;
}

export interface PayloadInput_107 {
  created?: InputMaybe<Scalars["String"]["input"]>;
  description?: InputMaybe<Scalars["String"]["input"]>;
  id?: InputMaybe<Scalars["String"]["input"]>;
  name?: InputMaybe<Scalars["String"]["input"]>;
  price?: InputMaybe<Scalars["String"]["input"]>;
  sku?: InputMaybe<Scalars["String"]["input"]>;
  updated?: InputMaybe<Scalars["String"]["input"]>;
}

export interface PayloadInput_108AndPayloadInput_109 {
  amount?: InputMaybe<Scalars["String"]["input"]>;
  closeDate?: InputMaybe<Scalars["String"]["input"]>;
  companyId?: InputMaybe<Scalars["String"]["input"]>;
  created?: InputMaybe<Scalars["String"]["input"]>;
  id?: InputMaybe<Scalars["String"]["input"]>;
  name: Scalars["String"]["input"];
  primaryContactId?: InputMaybe<Scalars["String"]["input"]>;
  probability?: InputMaybe<Scalars["String"]["input"]>;
  stage: CrmOpportunityStageInput;
  updated?: InputMaybe<Scalars["String"]["input"]>;
}

export interface PayloadInput_110 {
  amount?: InputMaybe<Scalars["String"]["input"]>;
  closeDate?: InputMaybe<Scalars["String"]["input"]>;
  companyId?: InputMaybe<Scalars["String"]["input"]>;
  created?: InputMaybe<Scalars["String"]["input"]>;
  id?: InputMaybe<Scalars["String"]["input"]>;
  name?: InputMaybe<Scalars["String"]["input"]>;
  primaryContactId?: InputMaybe<Scalars["String"]["input"]>;
  probability?: InputMaybe<Scalars["String"]["input"]>;
  stage?: InputMaybe<CrmOpportunityStageInput>;
  updated?: InputMaybe<Scalars["String"]["input"]>;
}

export interface PayloadInput_111AndPayloadInput_112 {
  companyName?: InputMaybe<Scalars["String"]["input"]>;
  convertedToContactId?: InputMaybe<Scalars["String"]["input"]>;
  created?: InputMaybe<Scalars["String"]["input"]>;
  email: Scalars["String"]["input"];
  firstName: Scalars["String"]["input"];
  id?: InputMaybe<Scalars["String"]["input"]>;
  lastName: Scalars["String"]["input"];
  leadScore?: InputMaybe<Scalars["Number"]["input"]>;
  leadSource?: InputMaybe<Scalars["String"]["input"]>;
  leadStatus: CrmLeadStatusInput;
  phoneNumber?: InputMaybe<Scalars["String"]["input"]>;
  updated?: InputMaybe<Scalars["String"]["input"]>;
}

export interface PayloadInput_113 {
  companyName?: InputMaybe<Scalars["String"]["input"]>;
  convertedToContactId?: InputMaybe<Scalars["String"]["input"]>;
  created?: InputMaybe<Scalars["String"]["input"]>;
  email?: InputMaybe<Scalars["String"]["input"]>;
  firstName?: InputMaybe<Scalars["String"]["input"]>;
  id?: InputMaybe<Scalars["String"]["input"]>;
  lastName?: InputMaybe<Scalars["String"]["input"]>;
  leadScore?: InputMaybe<Scalars["Number"]["input"]>;
  leadSource?: InputMaybe<Scalars["String"]["input"]>;
  leadStatus?: InputMaybe<CrmLeadStatusInput>;
  phoneNumber?: InputMaybe<Scalars["String"]["input"]>;
  updated?: InputMaybe<Scalars["String"]["input"]>;
}

export interface PayloadInput_114AndPayloadInput_115 {
  contactId?: InputMaybe<Scalars["String"]["input"]>;
  created?: InputMaybe<Scalars["String"]["input"]>;
  description?: InputMaybe<Scalars["String"]["input"]>;
  id?: InputMaybe<Scalars["String"]["input"]>;
  interactionDate: Scalars["String"]["input"];
  opportunityId?: InputMaybe<Scalars["String"]["input"]>;
  subject?: InputMaybe<Scalars["String"]["input"]>;
  type: CrmInteractionTypeInput;
  updated?: InputMaybe<Scalars["String"]["input"]>;
}

export interface PayloadInput_116 {
  contactId?: InputMaybe<Scalars["String"]["input"]>;
  created?: InputMaybe<Scalars["String"]["input"]>;
  description?: InputMaybe<Scalars["String"]["input"]>;
  id?: InputMaybe<Scalars["String"]["input"]>;
  interactionDate?: InputMaybe<Scalars["String"]["input"]>;
  opportunityId?: InputMaybe<Scalars["String"]["input"]>;
  subject?: InputMaybe<Scalars["String"]["input"]>;
  type?: InputMaybe<CrmInteractionTypeInput>;
  updated?: InputMaybe<Scalars["String"]["input"]>;
}

export interface PayloadInput_117AndPayloadInput_118 {
  closedAt?: InputMaybe<Scalars["String"]["input"]>;
  contactId?: InputMaybe<Scalars["String"]["input"]>;
  created?: InputMaybe<Scalars["String"]["input"]>;
  description: Scalars["String"]["input"];
  id?: InputMaybe<Scalars["String"]["input"]>;
  priority: CrmCasePriorityInput;
  status: CrmCaseStatusInput;
  subject: Scalars["String"]["input"];
  updated?: InputMaybe<Scalars["String"]["input"]>;
}

export interface PayloadInput_119 {
  closedAt?: InputMaybe<Scalars["String"]["input"]>;
  contactId?: InputMaybe<Scalars["String"]["input"]>;
  created?: InputMaybe<Scalars["String"]["input"]>;
  description?: InputMaybe<Scalars["String"]["input"]>;
  id?: InputMaybe<Scalars["String"]["input"]>;
  priority?: InputMaybe<CrmCasePriorityInput>;
  status?: InputMaybe<CrmCaseStatusInput>;
  subject?: InputMaybe<Scalars["String"]["input"]>;
  updated?: InputMaybe<Scalars["String"]["input"]>;
}

export interface PayloadInput_120AndPayloadInput_121 {
  budget?: InputMaybe<Scalars["String"]["input"]>;
  created?: InputMaybe<Scalars["String"]["input"]>;
  description?: InputMaybe<Scalars["String"]["input"]>;
  endDate?: InputMaybe<Scalars["String"]["input"]>;
  id?: InputMaybe<Scalars["String"]["input"]>;
  name: Scalars["String"]["input"];
  startDate: Scalars["String"]["input"];
  status: CrmCampaignStatusInput;
  updated?: InputMaybe<Scalars["String"]["input"]>;
}

export interface PayloadInput_122 {
  budget?: InputMaybe<Scalars["String"]["input"]>;
  created?: InputMaybe<Scalars["String"]["input"]>;
  description?: InputMaybe<Scalars["String"]["input"]>;
  endDate?: InputMaybe<Scalars["String"]["input"]>;
  id?: InputMaybe<Scalars["String"]["input"]>;
  name?: InputMaybe<Scalars["String"]["input"]>;
  startDate?: InputMaybe<Scalars["String"]["input"]>;
  status?: InputMaybe<CrmCampaignStatusInput>;
  updated?: InputMaybe<Scalars["String"]["input"]>;
}

export interface PayloadInput_123AndPayloadInput_124 {
  addressId?: InputMaybe<Scalars["String"]["input"]>;
  created?: InputMaybe<Scalars["String"]["input"]>;
  description?: InputMaybe<Scalars["String"]["input"]>;
  email?: InputMaybe<Scalars["String"]["input"]>;
  id?: InputMaybe<Scalars["String"]["input"]>;
  industry?: InputMaybe<Scalars["String"]["input"]>;
  name: Scalars["String"]["input"];
  phoneNumber?: InputMaybe<Scalars["String"]["input"]>;
  updated?: InputMaybe<Scalars["String"]["input"]>;
  website?: InputMaybe<Scalars["String"]["input"]>;
}

export interface PayloadInput_125 {
  addressId?: InputMaybe<Scalars["String"]["input"]>;
  created?: InputMaybe<Scalars["String"]["input"]>;
  description?: InputMaybe<Scalars["String"]["input"]>;
  email?: InputMaybe<Scalars["String"]["input"]>;
  id?: InputMaybe<Scalars["String"]["input"]>;
  industry?: InputMaybe<Scalars["String"]["input"]>;
  name?: InputMaybe<Scalars["String"]["input"]>;
  phoneNumber?: InputMaybe<Scalars["String"]["input"]>;
  updated?: InputMaybe<Scalars["String"]["input"]>;
  website?: InputMaybe<Scalars["String"]["input"]>;
}

export interface PayloadInput_126AndPayloadInput_127 {
  addressId?: InputMaybe<Scalars["String"]["input"]>;
  birthDate?: InputMaybe<Scalars["String"]["input"]>;
  companyId?: InputMaybe<Scalars["String"]["input"]>;
  created?: InputMaybe<Scalars["String"]["input"]>;
  email: Scalars["String"]["input"];
  firstName: Scalars["String"]["input"];
  id?: InputMaybe<Scalars["String"]["input"]>;
  jobTitle?: InputMaybe<Scalars["String"]["input"]>;
  lastName: Scalars["String"]["input"];
  leadSource?: InputMaybe<Scalars["String"]["input"]>;
  phoneNumber?: InputMaybe<Scalars["String"]["input"]>;
  status: CrmContactStatusInput;
  updated?: InputMaybe<Scalars["String"]["input"]>;
}

export interface PayloadInput_128 {
  addressId?: InputMaybe<Scalars["String"]["input"]>;
  birthDate?: InputMaybe<Scalars["String"]["input"]>;
  companyId?: InputMaybe<Scalars["String"]["input"]>;
  created?: InputMaybe<Scalars["String"]["input"]>;
  email?: InputMaybe<Scalars["String"]["input"]>;
  firstName?: InputMaybe<Scalars["String"]["input"]>;
  id?: InputMaybe<Scalars["String"]["input"]>;
  jobTitle?: InputMaybe<Scalars["String"]["input"]>;
  lastName?: InputMaybe<Scalars["String"]["input"]>;
  leadSource?: InputMaybe<Scalars["String"]["input"]>;
  phoneNumber?: InputMaybe<Scalars["String"]["input"]>;
  status?: InputMaybe<CrmContactStatusInput>;
  updated?: InputMaybe<Scalars["String"]["input"]>;
}

export interface PayloadInput_129AndPayloadInput_130 {
  created?: InputMaybe<Scalars["String"]["input"]>;
  email: Scalars["String"]["input"];
  emailVerified?: InputMaybe<Scalars["Boolean"]["input"]>;
  id?: InputMaybe<Scalars["String"]["input"]>;
  name: Scalars["String"]["input"];
  password: Scalars["String"]["input"];
  updated?: InputMaybe<Scalars["String"]["input"]>;
}

export interface SortInput {
  key: CREATED_EMAIL_ID_UPDATED_ADDRESSID_BIRTHDATE_COMPANYID_FIRSTNAME_JOBTITLE_LASTNAME_LEADSOURCE_PHONENUMBER_STATUSInput;
  order: ASC_DESCInput;
}

export const scalarsEnumsHash: ScalarsEnumsHash = {
  ASC_DESCInput: true,
  Any: true,
  Boolean: true,
  CREATED_EMAIL_ID_UPDATED_ADDRESSID_BIRTHDATE_COMPANYID_FIRSTNAME_JOBTITLE_LASTNAME_LEADSOURCE_PHONENUMBER_STATUSInput:
    true,
  CrmCampaignContactsStatus: true,
  CrmCampaignContactsStatusInput: true,
  CrmCampaignStatus: true,
  CrmCampaignStatusInput: true,
  CrmCasePriority: true,
  CrmCasePriorityInput: true,
  CrmCaseStatus: true,
  CrmCaseStatusInput: true,
  CrmContactStatus: true,
  CrmContactStatusInput: true,
  CrmInteractionType: true,
  CrmInteractionTypeInput: true,
  CrmInvoiceStatus: true,
  CrmInvoiceStatusInput: true,
  CrmLeadStatus: true,
  CrmLeadStatusInput: true,
  CrmNotificationChannel: true,
  CrmNotificationChannelInput: true,
  CrmNotificationDeliveryStatus: true,
  CrmNotificationDeliveryStatusInput: true,
  CrmNotificationType: true,
  CrmNotificationTypeInput: true,
  CrmOpportunityStage: true,
  CrmOpportunityStageInput: true,
  DateTimeISO: true,
  File: true,
  JSON: true,
  JSONObject: true,
  LmsAddressType: true,
  LmsAddressTypeInput: true,
  LmsDeliveryStatus: true,
  LmsDeliveryStatusInput: true,
  LmsLegStatus: true,
  LmsLegStatusInput: true,
  LmsPackageType: true,
  LmsPackageTypeInput: true,
  LmsPerformanceMetricType: true,
  LmsPerformanceMetricTypeInput: true,
  LmsProviderInvoiceStatus: true,
  LmsProviderInvoiceStatusInput: true,
  LmsProviderType: true,
  LmsProviderTypeInput: true,
  LmsRouteStatus: true,
  LmsRouteStatusInput: true,
  LmsServiceType: true,
  LmsServiceTypeInput: true,
  LmsShipmentStatus: true,
  LmsShipmentStatusInput: true,
  LmsTrackingEventType: true,
  LmsTrackingEventTypeInput: true,
  LmsTransportLegType: true,
  LmsTransportLegTypeInput: true,
  LmsTransportMode: true,
  LmsTransportModeInput: true,
  LmsWarehouseInventoryStatus: true,
  LmsWarehouseInventoryStatusInput: true,
  LmsWarehouseType: true,
  LmsWarehouseTypeInput: true,
  Number: true,
  OrgDriverStatus: true,
  OrgDriverStatusInput: true,
  OrgPermissionStatus: true,
  OrgPermissionStatusInput: true,
  OrgVehicleStatus: true,
  OrgVehicleStatusInput: true,
  OrgVehicleType: true,
  OrgVehicleTypeInput: true,
  String: true,
  Void: true,
};
export const generatedSchema = {
  Addresses: {
    __typename: { __type: "String!" },
    list: {
      __type: "[LmsAddressNode!]!",
      __args: { limit: "Number!", page: "Number!" },
    },
    listByCountry: {
      __type: "[LmsAddressNode!]!",
      __args: { country: "String!" },
    },
    listByType: {
      __type: "[LmsAddressNode!]!",
      __args: { addressType: "String!" },
    },
    listValidated: { __type: "[LmsAddressNode!]!" },
    view: { __type: "LmsAddressNode!", __args: { id: "String!" } },
  },
  Auth: { __typename: { __type: "String!" }, me: { __type: "AuthUserNode!" } },
  AuthUserNode: {
    __typename: { __type: "String!" },
    created: { __type: "DateTimeISO!" },
    email: { __type: "String!" },
    emailVerified: { __type: "Boolean!" },
    id: { __type: "String!" },
    name: { __type: "String!" },
    updated: { __type: "DateTimeISO!" },
  },
  CampaignContacts: {
    __typename: { __type: "String!" },
    list: {
      __type: "[CrmCampaignContactNode!]!",
      __args: { limit: "Number!", page: "Number!" },
    },
    listByCampaign: {
      __type: "[CrmCampaignContactNode!]!",
      __args: { campaignId: "String!" },
    },
    listByContact: {
      __type: "[CrmCampaignContactNode!]!",
      __args: { contactId: "String!" },
    },
    view: { __type: "CrmCampaignContactNode!", __args: { id: "String!" } },
  },
  Campaigns: {
    __typename: { __type: "String!" },
    list: {
      __type: "[CrmCampaignNode!]!",
      __args: { limit: "Number!", page: "Number!" },
    },
    view: { __type: "CrmCampaignNode!", __args: { id: "String!" } },
  },
  Cases: {
    __typename: { __type: "String!" },
    list: {
      __type: "[CrmCaseNode!]!",
      __args: { limit: "Number!", page: "Number!" },
    },
    view: { __type: "CrmCaseNode!", __args: { id: "String!" } },
  },
  Companies: {
    __typename: { __type: "String!" },
    list: {
      __type: "[CrmCompanyNode!]!",
      __args: { limit: "Number!", page: "Number!" },
    },
    view: { __type: "CrmCompanyNode!", __args: { id: "String!" } },
  },
  Contacts: {
    __typename: { __type: "String!" },
    list: {
      __type: "[CrmContactNode!]!",
      __args: {
        filter: "[FilterInput!]",
        limit: "Number!",
        page: "Number!",
        sort: "[SortInput!]",
      },
    },
    view: { __type: "CrmContactNode!", __args: { id: "String!" } },
  },
  Crm: {
    __typename: { __type: "String!" },
    campaignContacts: { __type: "CampaignContacts!" },
    campaigns: { __type: "Campaigns!" },
    cases: { __type: "Cases!" },
    companies: { __type: "Companies!" },
    contacts: { __type: "Contacts!" },
    interactions: { __type: "Interactions!" },
    invoiceLineItems: { __type: "InvoiceLineItems!" },
    invoices: { __type: "Invoices!" },
    leads: { __type: "Leads!" },
    notifications: { __type: "Notifications!" },
    opportunities: { __type: "Opportunities!" },
    opportunityProducts: { __type: "OpportunityProducts!" },
    products: { __type: "Products!" },
  },
  CrmCampaignContactNode: {
    __typename: { __type: "String!" },
    campaign: { __type: "CrmCampaignNode" },
    contact: { __type: "CrmContactNode" },
    created: { __type: "DateTimeISO!" },
    id: { __type: "String!" },
    interactionDate: { __type: "DateTimeISO" },
    status: { __type: "CrmCampaignContactsStatus!" },
    updated: { __type: "DateTimeISO!" },
  },
  CrmCampaignNode: {
    __typename: { __type: "String!" },
    budget: { __type: "String" },
    created: { __type: "DateTimeISO!" },
    description: { __type: "String" },
    endDate: { __type: "DateTimeISO" },
    id: { __type: "String!" },
    name: { __type: "String!" },
    startDate: { __type: "DateTimeISO!" },
    status: { __type: "CrmCampaignStatus!" },
    updated: { __type: "DateTimeISO!" },
  },
  CrmCaseNode: {
    __typename: { __type: "String!" },
    closedAt: { __type: "DateTimeISO" },
    contact: { __type: "CrmContactNode" },
    created: { __type: "DateTimeISO!" },
    description: { __type: "String!" },
    id: { __type: "String!" },
    priority: { __type: "CrmCasePriority!" },
    status: { __type: "CrmCaseStatus!" },
    subject: { __type: "String!" },
    updated: { __type: "DateTimeISO!" },
  },
  CrmCompanyNode: {
    __typename: { __type: "String!" },
    address: { __type: "LmsAddressNode" },
    created: { __type: "DateTimeISO!" },
    description: { __type: "String" },
    email: { __type: "String" },
    id: { __type: "String!" },
    industry: { __type: "String" },
    name: { __type: "String!" },
    phoneNumber: { __type: "String" },
    updated: { __type: "DateTimeISO!" },
    website: { __type: "String" },
  },
  CrmContactNode: {
    __typename: { __type: "String!" },
    address: { __type: "LmsAddressNode" },
    birthDate: { __type: "DateTimeISO" },
    company: { __type: "CrmCompanyNode" },
    created: { __type: "DateTimeISO!" },
    email: { __type: "String!" },
    firstName: { __type: "String!" },
    id: { __type: "String!" },
    jobTitle: { __type: "String" },
    lastName: { __type: "String!" },
    leadSource: { __type: "String" },
    phoneNumber: { __type: "String" },
    status: { __type: "CrmContactStatus!" },
    updated: { __type: "DateTimeISO!" },
  },
  CrmInteractionNode: {
    __typename: { __type: "String!" },
    contact: { __type: "CrmContactNode" },
    created: { __type: "DateTimeISO!" },
    description: { __type: "String" },
    id: { __type: "String!" },
    interactionDate: { __type: "DateTimeISO!" },
    opportunity: { __type: "CrmOpportunityNode" },
    subject: { __type: "String" },
    type: { __type: "CrmInteractionType!" },
    updated: { __type: "DateTimeISO!" },
  },
  CrmInvoiceLineItemNode: {
    __typename: { __type: "String!" },
    created: { __type: "DateTimeISO!" },
    description: { __type: "String!" },
    id: { __type: "String!" },
    invoice: { __type: "CrmInvoiceNode" },
    lineTotal: { __type: "String" },
    quantity: { __type: "String!" },
    shipment: { __type: "LmsShipmentNode" },
    unitPrice: { __type: "String!" },
    updated: { __type: "DateTimeISO!" },
  },
  CrmInvoiceNode: {
    __typename: { __type: "String!" },
    company: { __type: "CrmCompanyNode" },
    contact: { __type: "CrmContactNode" },
    created: { __type: "DateTimeISO!" },
    currency: { __type: "String!" },
    dueDate: { __type: "DateTimeISO!" },
    id: { __type: "String!" },
    invoiceDate: { __type: "DateTimeISO!" },
    invoiceNumber: { __type: "String!" },
    paymentTerms: { __type: "String" },
    status: { __type: "CrmInvoiceStatus!" },
    subtotal: { __type: "String!" },
    taxAmount: { __type: "String!" },
    totalAmount: { __type: "String!" },
    updated: { __type: "DateTimeISO!" },
  },
  CrmLeadNode: {
    __typename: { __type: "String!" },
    companyName: { __type: "String" },
    convertedToContact: { __type: "CrmContactNode" },
    created: { __type: "DateTimeISO!" },
    email: { __type: "String!" },
    firstName: { __type: "String!" },
    id: { __type: "String!" },
    lastName: { __type: "String!" },
    leadScore: { __type: "Number!" },
    leadSource: { __type: "String" },
    leadStatus: { __type: "CrmLeadStatus!" },
    phoneNumber: { __type: "String" },
    updated: { __type: "DateTimeISO!" },
  },
  CrmNotificationNode: {
    __typename: { __type: "String!" },
    channel: { __type: "CrmNotificationChannel!" },
    contact: { __type: "CrmContactNode" },
    created: { __type: "DateTimeISO!" },
    deliveryStatus: { __type: "CrmNotificationDeliveryStatus!" },
    id: { __type: "String!" },
    message: { __type: "String!" },
    notificationType: { __type: "CrmNotificationType!" },
    recipient: { __type: "String!" },
    sentAt: { __type: "DateTimeISO" },
    shipment: { __type: "LmsShipmentNode" },
    subject: { __type: "String" },
    updated: { __type: "DateTimeISO!" },
  },
  CrmOpportunityNode: {
    __typename: { __type: "String!" },
    amount: { __type: "String!" },
    closeDate: { __type: "DateTimeISO" },
    company: { __type: "CrmCompanyNode" },
    created: { __type: "DateTimeISO!" },
    id: { __type: "String!" },
    name: { __type: "String!" },
    primaryContact: { __type: "CrmContactNode" },
    probability: { __type: "String!" },
    stage: { __type: "CrmOpportunityStage!" },
    updated: { __type: "DateTimeISO!" },
  },
  CrmOpportunityProductNode: {
    __typename: { __type: "String!" },
    created: { __type: "DateTimeISO!" },
    id: { __type: "String!" },
    opportunity: { __type: "CrmOpportunityNode" },
    product: { __type: "CrmProductNode" },
    quantity: { __type: "String!" },
    totalPrice: { __type: "String" },
    unitPrice: { __type: "String!" },
    updated: { __type: "DateTimeISO!" },
  },
  CrmProductNode: {
    __typename: { __type: "String!" },
    created: { __type: "DateTimeISO!" },
    description: { __type: "String" },
    id: { __type: "String!" },
    name: { __type: "String!" },
    price: { __type: "String!" },
    sku: { __type: "String" },
    updated: { __type: "DateTimeISO!" },
  },
  DeleteCrmCampaign: {
    __typename: { __type: "String!" },
    message: { __type: "String!" },
    success: { __type: "Boolean!" },
  },
  DeleteCrmCampaignContact: {
    __typename: { __type: "String!" },
    message: { __type: "String!" },
    success: { __type: "Boolean!" },
  },
  DeleteCrmCase: {
    __typename: { __type: "String!" },
    message: { __type: "String!" },
    success: { __type: "Boolean!" },
  },
  DeleteCrmCompany: {
    __typename: { __type: "String!" },
    message: { __type: "String!" },
    success: { __type: "Boolean!" },
  },
  DeleteCrmContact: {
    __typename: { __type: "String!" },
    message: { __type: "String!" },
    success: { __type: "Boolean!" },
  },
  DeleteCrmInteraction: {
    __typename: { __type: "String!" },
    message: { __type: "String!" },
    success: { __type: "Boolean!" },
  },
  DeleteCrmInvoice: {
    __typename: { __type: "String!" },
    message: { __type: "String!" },
    success: { __type: "Boolean!" },
  },
  DeleteCrmInvoiceLineItem: {
    __typename: { __type: "String!" },
    message: { __type: "String!" },
    success: { __type: "Boolean!" },
  },
  DeleteCrmLead: {
    __typename: { __type: "String!" },
    message: { __type: "String!" },
    success: { __type: "Boolean!" },
  },
  DeleteCrmNotification: {
    __typename: { __type: "String!" },
    message: { __type: "String!" },
    success: { __type: "Boolean!" },
  },
  DeleteCrmOpportunity: {
    __typename: { __type: "String!" },
    message: { __type: "String!" },
    success: { __type: "Boolean!" },
  },
  DeleteCrmOpportunityProduct: {
    __typename: { __type: "String!" },
    message: { __type: "String!" },
    success: { __type: "Boolean!" },
  },
  DeleteCrmProduct: {
    __typename: { __type: "String!" },
    message: { __type: "String!" },
    success: { __type: "Boolean!" },
  },
  DeleteLmsAddress: {
    __typename: { __type: "String!" },
    message: { __type: "String!" },
    success: { __type: "Boolean!" },
  },
  DeleteLmsPackage: {
    __typename: { __type: "String!" },
    message: { __type: "String!" },
    success: { __type: "Boolean!" },
  },
  DeleteLmsPricingRate: {
    __typename: { __type: "String!" },
    message: { __type: "String!" },
    success: { __type: "Boolean!" },
  },
  DeleteLmsPricingZone: {
    __typename: { __type: "String!" },
    message: { __type: "String!" },
    success: { __type: "Boolean!" },
  },
  DeleteLmsPricingZoneCountry: {
    __typename: { __type: "String!" },
    message: { __type: "String!" },
    success: { __type: "Boolean!" },
  },
  DeleteLmsProviderInvoice: {
    __typename: { __type: "String!" },
    message: { __type: "String!" },
    success: { __type: "Boolean!" },
  },
  DeleteLmsProviderInvoiceLineItem: {
    __typename: { __type: "String!" },
    message: { __type: "String!" },
    success: { __type: "Boolean!" },
  },
  DeleteLmsProviderPerformance: {
    __typename: { __type: "String!" },
    message: { __type: "String!" },
    success: { __type: "Boolean!" },
  },
  DeleteLmsProviderRate: {
    __typename: { __type: "String!" },
    message: { __type: "String!" },
    success: { __type: "Boolean!" },
  },
  DeleteLmsProviderService: {
    __typename: { __type: "String!" },
    message: { __type: "String!" },
    success: { __type: "Boolean!" },
  },
  DeleteLmsProviderServiceDestinationCountry: {
    __typename: { __type: "String!" },
    message: { __type: "String!" },
    success: { __type: "Boolean!" },
  },
  DeleteLmsProviderServiceMaxDimension: {
    __typename: { __type: "String!" },
    message: { __type: "String!" },
    success: { __type: "Boolean!" },
  },
  DeleteLmsProviderServiceOriginCountry: {
    __typename: { __type: "String!" },
    message: { __type: "String!" },
    success: { __type: "Boolean!" },
  },
  DeleteLmsRoute: {
    __typename: { __type: "String!" },
    message: { __type: "String!" },
    success: { __type: "Boolean!" },
  },
  DeleteLmsRouteShipment: {
    __typename: { __type: "String!" },
    message: { __type: "String!" },
    success: { __type: "Boolean!" },
  },
  DeleteLmsShipment: {
    __typename: { __type: "String!" },
    message: { __type: "String!" },
    success: { __type: "Boolean!" },
  },
  DeleteLmsShippingService: {
    __typename: { __type: "String!" },
    message: { __type: "String!" },
    success: { __type: "Boolean!" },
  },
  DeleteLmsShippingServiceMaxDimension: {
    __typename: { __type: "String!" },
    message: { __type: "String!" },
    success: { __type: "Boolean!" },
  },
  DeleteLmsTrackingEvent: {
    __typename: { __type: "String!" },
    message: { __type: "String!" },
    success: { __type: "Boolean!" },
  },
  DeleteLmsTransportLeg: {
    __typename: { __type: "String!" },
    message: { __type: "String!" },
    success: { __type: "Boolean!" },
  },
  DeleteLmsTransportationProvider: {
    __typename: { __type: "String!" },
    message: { __type: "String!" },
    success: { __type: "Boolean!" },
  },
  DeleteLmsWarehouse: {
    __typename: { __type: "String!" },
    message: { __type: "String!" },
    success: { __type: "Boolean!" },
  },
  DeleteLmsWarehouseInventory: {
    __typename: { __type: "String!" },
    message: { __type: "String!" },
    success: { __type: "Boolean!" },
  },
  DeleteOrgDepartment: {
    __typename: { __type: "String!" },
    message: { __type: "String!" },
    success: { __type: "Boolean!" },
  },
  DeleteOrgDepartmentPermission: {
    __typename: { __type: "String!" },
    message: { __type: "String!" },
    success: { __type: "Boolean!" },
  },
  DeleteOrgDepartmentTransportMode: {
    __typename: { __type: "String!" },
    message: { __type: "String!" },
    success: { __type: "Boolean!" },
  },
  DeleteOrgDepartmentUser: {
    __typename: { __type: "String!" },
    message: { __type: "String!" },
    success: { __type: "Boolean!" },
  },
  DeleteOrgDepartmentUserPermission: {
    __typename: { __type: "String!" },
    message: { __type: "String!" },
    success: { __type: "Boolean!" },
  },
  DeleteOrgDriver: {
    __typename: { __type: "String!" },
    message: { __type: "String!" },
    success: { __type: "Boolean!" },
  },
  DeleteOrgVehicle: {
    __typename: { __type: "String!" },
    message: { __type: "String!" },
    success: { __type: "Boolean!" },
  },
  DepartmentPermissions: {
    __typename: { __type: "String!" },
    list: {
      __type: "[OrgDepartmentPermissionNode!]!",
      __args: { limit: "Number!", page: "Number!" },
    },
    listByDepartment: {
      __type: "[OrgDepartmentPermissionNode!]!",
      __args: { departmentId: "String!" },
    },
    view: { __type: "OrgDepartmentPermissionNode!", __args: { id: "String!" } },
  },
  DepartmentTransportModes: {
    __typename: { __type: "String!" },
    list: {
      __type: "[OrgDepartmentTransportModeNode!]!",
      __args: { limit: "Number!", page: "Number!" },
    },
    listByDepartment: {
      __type: "[OrgDepartmentTransportModeNode!]!",
      __args: { departmentId: "String!" },
    },
    listPrimaryByDepartment: {
      __type: "[OrgDepartmentTransportModeNode!]!",
      __args: { departmentId: "String!" },
    },
    view: {
      __type: "OrgDepartmentTransportModeNode!",
      __args: { id: "String!" },
    },
  },
  DepartmentUserPermissions: {
    __typename: { __type: "String!" },
    list: {
      __type: "[OrgDepartmentUserPermissionNode!]!",
      __args: { limit: "Number!", page: "Number!" },
    },
    listByUser: {
      __type: "[OrgDepartmentUserPermissionNode!]!",
      __args: { userId: "String!" },
    },
    view: {
      __type: "OrgDepartmentUserPermissionNode!",
      __args: { id: "String!" },
    },
  },
  DepartmentUsers: {
    __typename: { __type: "String!" },
    list: {
      __type: "[OrgDepartmentUserNode!]!",
      __args: { limit: "Number!", page: "Number!" },
    },
    listActiveDepartmentUsers: {
      __type: "[OrgDepartmentUserNode!]!",
      __args: { departmentId: "String!" },
    },
    listByDepartment: {
      __type: "[OrgDepartmentUserNode!]!",
      __args: { departmentId: "String!" },
    },
    listByUser: {
      __type: "[OrgDepartmentUserNode!]!",
      __args: { userId: "String!" },
    },
    view: { __type: "OrgDepartmentUserNode!", __args: { id: "String!" } },
  },
  Departments: {
    __typename: { __type: "String!" },
    list: {
      __type: "[OrgDepartmentNode!]!",
      __args: { limit: "Number!", page: "Number!" },
    },
    listActive: { __type: "[OrgDepartmentNode!]!" },
    view: { __type: "OrgDepartmentNode!", __args: { id: "String!" } },
  },
  Drivers: {
    __typename: { __type: "String!" },
    list: {
      __type: "[OrgDriverNode!]!",
      __args: { limit: "Number!", page: "Number!" },
    },
    listByStatus: {
      __type: "[OrgDriverNode!]!",
      __args: { status: "String!" },
    },
    view: { __type: "OrgDriverNode!", __args: { id: "String!" } },
    viewByEmployeeId: {
      __type: "OrgDriverNode!",
      __args: { employeeId: "String!" },
    },
    viewByLicenseNumber: {
      __type: "OrgDriverNode!",
      __args: { licenseNumber: "String!" },
    },
  },
  FilterInput: {
    key: {
      __type:
        "CREATED_EMAIL_ID_UPDATED_ADDRESSID_BIRTHDATE_COMPANYID_FIRSTNAME_JOBTITLE_LASTNAME_LEADSOURCE_PHONENUMBER_STATUSInput!",
    },
    operator: { __type: "String!" },
    value: { __type: "String!" },
  },
  Interactions: {
    __typename: { __type: "String!" },
    list: {
      __type: "[CrmInteractionNode!]!",
      __args: { limit: "Number!", page: "Number!" },
    },
    view: { __type: "CrmInteractionNode!", __args: { id: "String!" } },
  },
  InvoiceLineItems: {
    __typename: { __type: "String!" },
    list: {
      __type: "[CrmInvoiceLineItemNode!]!",
      __args: { limit: "Number!", page: "Number!" },
    },
    listByInvoice: {
      __type: "[CrmInvoiceLineItemNode!]!",
      __args: { invoiceId: "String!" },
    },
    view: { __type: "CrmInvoiceLineItemNode!", __args: { id: "String!" } },
  },
  Invoices: {
    __typename: { __type: "String!" },
    list: {
      __type: "[CrmInvoiceNode!]!",
      __args: { limit: "Number!", page: "Number!" },
    },
    view: { __type: "CrmInvoiceNode!", __args: { id: "String!" } },
  },
  Leads: {
    __typename: { __type: "String!" },
    list: {
      __type: "[CrmLeadNode!]!",
      __args: { limit: "Number!", page: "Number!" },
    },
    view: { __type: "CrmLeadNode!", __args: { id: "String!" } },
  },
  Lms: {
    __typename: { __type: "String!" },
    addresses: { __type: "Addresses!" },
    packages: { __type: "Packages!" },
    pricingRates: { __type: "PricingRates!" },
    pricingZoneCountries: { __type: "PricingZoneCountries!" },
    pricingZones: { __type: "PricingZones!" },
    providerInvoiceLineItems: { __type: "ProviderInvoiceLineItems!" },
    providerInvoices: { __type: "ProviderInvoices!" },
    providerPerformance: { __type: "ProviderPerformance!" },
    providerRates: { __type: "ProviderRates!" },
    providerServiceDestinationCountries: {
      __type: "ProviderServiceDestinationCountries!",
    },
    providerServiceMaxDimensions: { __type: "ProviderServiceMaxDimensions!" },
    providerServiceOriginCountries: {
      __type: "ProviderServiceOriginCountries!",
    },
    providerServices: { __type: "ProviderServices!" },
    routeShipments: { __type: "RouteShipments!" },
    routes: { __type: "Routes!" },
    shipments: { __type: "Shipments!" },
    shippingServiceMaxDimensions: { __type: "ShippingServiceMaxDimensions!" },
    shippingServices: { __type: "ShippingServices!" },
    trackingEvents: { __type: "TrackingEvents!" },
    transportLegs: { __type: "TransportLegs!" },
    transportationProviders: { __type: "TransportationProviders!" },
    warehouseInventories: { __type: "WarehouseInventories!" },
    warehouses: { __type: "Warehouses!" },
  },
  LmsAddressNode: {
    __typename: { __type: "String!" },
    addressLine1: { __type: "String!" },
    addressLine2: { __type: "String" },
    addressType: { __type: "LmsAddressType!" },
    city: { __type: "String!" },
    country: { __type: "String!" },
    created: { __type: "DateTimeISO!" },
    id: { __type: "String!" },
    isValidated: { __type: "Boolean!" },
    latitude: { __type: "String" },
    longitude: { __type: "String" },
    postalCode: { __type: "String!" },
    state: { __type: "String!" },
    updated: { __type: "DateTimeISO!" },
  },
  LmsPackageNode: {
    __typename: { __type: "String!" },
    contentsDescription: { __type: "String" },
    created: { __type: "DateTimeISO!" },
    declaredValue: { __type: "String" },
    height: { __type: "String" },
    id: { __type: "String!" },
    length: { __type: "String" },
    packageNumber: { __type: "String!" },
    packageType: { __type: "LmsPackageType!" },
    shipment: { __type: "LmsShipmentNode" },
    updated: { __type: "DateTimeISO!" },
    weight: { __type: "String!" },
    width: { __type: "String" },
  },
  LmsPricingRateNode: {
    __typename: { __type: "String!" },
    baseRate: { __type: "String!" },
    created: { __type: "DateTimeISO!" },
    destinationZoneId: { __type: "String!" },
    effectiveDate: { __type: "DateTimeISO!" },
    expiryDate: { __type: "DateTimeISO" },
    fuelSurchargeRate: { __type: "String" },
    id: { __type: "String!" },
    originZoneId: { __type: "String!" },
    perKgRate: { __type: "String!" },
    serviceId: { __type: "String!" },
    updated: { __type: "DateTimeISO!" },
    weightMax: { __type: "String!" },
    weightMin: { __type: "String!" },
  },
  LmsPricingZoneCountryNode: {
    __typename: { __type: "String!" },
    countryCode: { __type: "String!" },
    created: { __type: "DateTimeISO!" },
    id: { __type: "String!" },
    pricingZoneId: { __type: "String!" },
  },
  LmsPricingZoneNode: {
    __typename: { __type: "String!" },
    created: { __type: "DateTimeISO!" },
    id: { __type: "String!" },
    name: { __type: "String!" },
    updated: { __type: "DateTimeISO!" },
    zoneCode: { __type: "String!" },
  },
  LmsProviderInvoiceLineItemNode: {
    __typename: { __type: "String!" },
    created: { __type: "DateTimeISO!" },
    description: { __type: "String!" },
    id: { __type: "String!" },
    lineTotal: { __type: "String" },
    providerInvoiceId: { __type: "String!" },
    quantity: { __type: "Number!" },
    transportLegId: { __type: "String!" },
    unitPrice: { __type: "String!" },
    updated: { __type: "DateTimeISO!" },
  },
  LmsProviderInvoiceNode: {
    __typename: { __type: "String!" },
    created: { __type: "DateTimeISO!" },
    currency: { __type: "String!" },
    dueDate: { __type: "DateTimeISO!" },
    id: { __type: "String!" },
    invoiceDate: { __type: "DateTimeISO!" },
    invoiceNumber: { __type: "String!" },
    paymentDate: { __type: "DateTimeISO" },
    providerId: { __type: "String!" },
    status: { __type: "LmsProviderInvoiceStatus!" },
    subtotal: { __type: "String!" },
    taxAmount: { __type: "String" },
    totalAmount: { __type: "String" },
    updated: { __type: "DateTimeISO!" },
  },
  LmsProviderPerformanceNode: {
    __typename: { __type: "String!" },
    created: { __type: "DateTimeISO!" },
    id: { __type: "String!" },
    measurementDate: { __type: "DateTimeISO!" },
    metricType: { __type: "LmsPerformanceMetricType!" },
    metricValue: { __type: "String" },
    notes: { __type: "String" },
    providerId: { __type: "String!" },
    shipmentId: { __type: "String!" },
    transportLegId: { __type: "String" },
    updated: { __type: "DateTimeISO!" },
  },
  LmsProviderRateNode: {
    __typename: { __type: "String!" },
    baseRate: { __type: "String!" },
    created: { __type: "DateTimeISO!" },
    currency: { __type: "String!" },
    destinationZoneId: { __type: "String!" },
    effectiveDate: { __type: "DateTimeISO!" },
    expiryDate: { __type: "DateTimeISO" },
    fuelSurchargeRate: { __type: "String" },
    id: { __type: "String!" },
    originZoneId: { __type: "String!" },
    perKgRate: { __type: "String!" },
    providerServiceId: { __type: "String!" },
    updated: { __type: "DateTimeISO!" },
    weightMax: { __type: "String!" },
    weightMin: { __type: "String!" },
  },
  LmsProviderServiceDestinationCountryNode: {
    __typename: { __type: "String!" },
    countryCode: { __type: "String!" },
    created: { __type: "DateTimeISO!" },
    id: { __type: "String!" },
    providerServiceId: { __type: "String!" },
  },
  LmsProviderServiceMaxDimensionNode: {
    __typename: { __type: "String!" },
    created: { __type: "DateTimeISO!" },
    height: { __type: "String" },
    id: { __type: "String!" },
    length: { __type: "String" },
    providerServiceId: { __type: "String!" },
    width: { __type: "String" },
  },
  LmsProviderServiceNode: {
    __typename: { __type: "String!" },
    created: { __type: "DateTimeISO!" },
    cutoffTime: { __type: "String" },
    id: { __type: "String!" },
    insuranceAvailable: { __type: "Boolean!" },
    isActive: { __type: "Boolean!" },
    maxWeight: { __type: "String" },
    provider: { __type: "LmsTransportationProviderNode" },
    serviceName: { __type: "String!" },
    serviceType: { __type: "LmsServiceType!" },
    trackingAvailable: { __type: "Boolean!" },
    transitTimeMax: { __type: "Number" },
    transitTimeMin: { __type: "Number" },
    transportMode: { __type: "LmsTransportMode!" },
    updated: { __type: "DateTimeISO!" },
  },
  LmsProviderServiceOriginCountryNode: {
    __typename: { __type: "String!" },
    countryCode: { __type: "String!" },
    created: { __type: "DateTimeISO!" },
    id: { __type: "String!" },
    providerServiceId: { __type: "String!" },
  },
  LmsRouteNode: {
    __typename: { __type: "String!" },
    actualArrival: { __type: "DateTimeISO" },
    actualDeparture: { __type: "DateTimeISO" },
    created: { __type: "DateTimeISO!" },
    driver: { __type: "OrgDriverNode" },
    estimatedArrival: { __type: "DateTimeISO" },
    estimatedDeparture: { __type: "DateTimeISO" },
    id: { __type: "String!" },
    routeDate: { __type: "DateTimeISO!" },
    routeName: { __type: "String!" },
    status: { __type: "LmsRouteStatus!" },
    updated: { __type: "DateTimeISO!" },
    vehicle: { __type: "OrgVehicleNode" },
  },
  LmsRouteShipmentNode: {
    __typename: { __type: "String!" },
    actualDelivery: { __type: "DateTimeISO" },
    created: { __type: "DateTimeISO!" },
    deliveryDate: { __type: "DateTimeISO!" },
    deliveryStatus: { __type: "LmsDeliveryStatus!" },
    estimatedDelivery: { __type: "DateTimeISO" },
    id: { __type: "String!" },
    recipientSignature: { __type: "String" },
    route: { __type: "LmsRouteNode" },
    sequenceNumber: { __type: "Number!" },
    shipment: { __type: "LmsShipmentNode" },
    signatureRequired: { __type: "Boolean!" },
    updated: { __type: "DateTimeISO!" },
  },
  LmsShipmentNode: {
    __typename: { __type: "String!" },
    assignedDepartment: { __type: "OrgDepartmentNode" },
    created: { __type: "DateTimeISO!" },
    createdByUser: { __type: "AuthUserNode" },
    currency: { __type: "String!" },
    deliveryDate: { __type: "DateTimeISO" },
    estimatedDeliveryDate: { __type: "DateTimeISO" },
    id: { __type: "String!" },
    insuranceAmount: { __type: "String" },
    pickupDate: { __type: "DateTimeISO" },
    primaryTransportMode: { __type: "LmsTransportMode!" },
    receiverAddress: { __type: "LmsAddressNode" },
    receiverCompany: { __type: "CrmCompanyNode" },
    receiverContact: { __type: "CrmContactNode" },
    senderAddress: { __type: "LmsAddressNode" },
    senderCompany: { __type: "CrmCompanyNode" },
    senderContact: { __type: "CrmContactNode" },
    shippingCost: { __type: "String" },
    specialInstructions: { __type: "String" },
    status: { __type: "LmsShipmentStatus!" },
    totalValue: { __type: "String" },
    totalWeight: { __type: "String!" },
    trackingNumber: { __type: "String!" },
    updated: { __type: "DateTimeISO!" },
  },
  LmsShippingServiceMaxDimensionNode: {
    __typename: { __type: "String!" },
    created: { __type: "DateTimeISO!" },
    height: { __type: "String" },
    id: { __type: "String!" },
    length: { __type: "String" },
    shippingServiceId: { __type: "String!" },
    width: { __type: "String" },
  },
  LmsShippingServiceNode: {
    __typename: { __type: "String!" },
    created: { __type: "DateTimeISO!" },
    deliveryTimeMax: { __type: "Number" },
    deliveryTimeMin: { __type: "Number" },
    description: { __type: "String" },
    id: { __type: "String!" },
    isActive: { __type: "Boolean!" },
    maxWeight: { __type: "String" },
    name: { __type: "String!" },
    serviceType: { __type: "LmsServiceType!" },
    updated: { __type: "DateTimeISO!" },
  },
  LmsTrackingEventNode: {
    __typename: { __type: "String!" },
    created: { __type: "DateTimeISO!" },
    eventDescription: { __type: "String!" },
    eventLocation: { __type: "String" },
    eventTimestamp: { __type: "DateTimeISO!" },
    eventType: { __type: "LmsTrackingEventType!" },
    id: { __type: "String!" },
    shipment: { __type: "LmsShipmentNode" },
    updated: { __type: "DateTimeISO!" },
  },
  LmsTransportLegNode: {
    __typename: { __type: "String!" },
    actualDelivery: { __type: "DateTimeISO" },
    actualPickup: { __type: "DateTimeISO" },
    cost: { __type: "String" },
    created: { __type: "DateTimeISO!" },
    currency: { __type: "String" },
    destinationAddress: { __type: "LmsAddressNode" },
    destinationWarehouse: { __type: "LmsWarehouseNode" },
    driver: { __type: "OrgDriverNode" },
    id: { __type: "String!" },
    legSequence: { __type: "Number!" },
    originAddress: { __type: "LmsAddressNode" },
    originWarehouse: { __type: "LmsWarehouseNode" },
    provider: { __type: "LmsTransportationProviderNode" },
    providerTrackingNumber: { __type: "String" },
    scheduledDelivery: { __type: "DateTimeISO" },
    scheduledPickup: { __type: "DateTimeISO" },
    shipment: { __type: "LmsShipmentNode" },
    specialInstructions: { __type: "String" },
    status: { __type: "LmsLegStatus!" },
    transportType: { __type: "LmsTransportLegType!" },
    updated: { __type: "DateTimeISO!" },
    vehicle: { __type: "OrgVehicleNode" },
  },
  LmsTransportationProviderNode: {
    __typename: { __type: "String!" },
    address: { __type: "LmsAddressNode" },
    apiEndpoint: { __type: "String" },
    apiKey: { __type: "String" },
    companyName: { __type: "String!" },
    contactPerson: { __type: "String" },
    contractEndDate: { __type: "DateTimeISO" },
    contractStartDate: { __type: "DateTimeISO" },
    created: { __type: "DateTimeISO!" },
    email: { __type: "String" },
    id: { __type: "String!" },
    insuranceCoverage: { __type: "String" },
    isActive: { __type: "Boolean!" },
    paymentTerms: { __type: "String" },
    performanceRating: { __type: "String" },
    phoneNumber: { __type: "String" },
    preferredByDepartment: { __type: "OrgDepartmentNode" },
    providerType: { __type: "LmsProviderType!" },
    updated: { __type: "DateTimeISO!" },
  },
  LmsWarehouseInventoryNode: {
    __typename: { __type: "String!" },
    arrivedAt: { __type: "DateTimeISO" },
    created: { __type: "DateTimeISO!" },
    departedAt: { __type: "DateTimeISO" },
    id: { __type: "String!" },
    locationCode: { __type: "String" },
    package: { __type: "LmsPackageNode" },
    shipment: { __type: "LmsShipmentNode" },
    status: { __type: "LmsWarehouseInventoryStatus!" },
    updated: { __type: "DateTimeISO!" },
    warehouse: { __type: "LmsWarehouseNode" },
  },
  LmsWarehouseNode: {
    __typename: { __type: "String!" },
    address: { __type: "LmsAddressNode" },
    capacity: { __type: "Number" },
    code: { __type: "String!" },
    created: { __type: "DateTimeISO!" },
    department: { __type: "OrgDepartmentNode" },
    id: { __type: "String!" },
    isActive: { __type: "Boolean!" },
    manager: { __type: "AuthUserNode" },
    name: { __type: "String!" },
    updated: { __type: "DateTimeISO!" },
    warehouseType: { __type: "LmsWarehouseType!" },
  },
  Login: {
    __typename: { __type: "String!" },
    token: { __type: "String!" },
    user: { __type: "AuthUserNode!" },
  },
  Notifications: {
    __typename: { __type: "String!" },
    list: {
      __type: "[CrmNotificationNode!]!",
      __args: { limit: "Number!", page: "Number!" },
    },
    listByContact: {
      __type: "[CrmNotificationNode!]!",
      __args: { contactId: "String!" },
    },
    listByShipment: {
      __type: "[CrmNotificationNode!]!",
      __args: { shipmentId: "String!" },
    },
    view: { __type: "CrmNotificationNode!", __args: { id: "String!" } },
  },
  Opportunities: {
    __typename: { __type: "String!" },
    list: {
      __type: "[CrmOpportunityNode!]!",
      __args: { limit: "Number!", page: "Number!" },
    },
    view: { __type: "CrmOpportunityNode!", __args: { id: "String!" } },
  },
  OpportunityProducts: {
    __typename: { __type: "String!" },
    list: {
      __type: "[CrmOpportunityProductNode!]!",
      __args: { limit: "Number!", page: "Number!" },
    },
    listByOpportunity: {
      __type: "[CrmOpportunityProductNode!]!",
      __args: { opportunityId: "String!" },
    },
    view: { __type: "CrmOpportunityProductNode!", __args: { id: "String!" } },
  },
  Org: {
    __typename: { __type: "String!" },
    departmentPermissions: { __type: "DepartmentPermissions!" },
    departmentTransportModes: { __type: "DepartmentTransportModes!" },
    departmentUserPermissions: { __type: "DepartmentUserPermissions!" },
    departmentUsers: { __type: "DepartmentUsers!" },
    departments: { __type: "Departments!" },
    drivers: { __type: "Drivers!" },
    vehicles: { __type: "Vehicles!" },
  },
  OrgDepartmentNode: {
    __typename: { __type: "String!" },
    budget: { __type: "String" },
    code: { __type: "String!" },
    created: { __type: "DateTimeISO!" },
    departmentType: { __type: "String!" },
    description: { __type: "String" },
    email: { __type: "String" },
    id: { __type: "String!" },
    isActive: { __type: "Boolean!" },
    manager: { __type: "AuthUserNode" },
    name: { __type: "String!" },
    phoneNumber: { __type: "String" },
    updated: { __type: "DateTimeISO!" },
  },
  OrgDepartmentPermissionNode: {
    __typename: { __type: "String!" },
    action: { __type: "OrgPermissionStatus!" },
    created: { __type: "DateTimeISO!" },
    department: { __type: "OrgDepartmentNode" },
    id: { __type: "String!" },
    resource: { __type: "String!" },
    updated: { __type: "DateTimeISO!" },
  },
  OrgDepartmentTransportModeNode: {
    __typename: { __type: "String!" },
    created: { __type: "DateTimeISO!" },
    department: { __type: "OrgDepartmentNode" },
    id: { __type: "String!" },
    isPrimary: { __type: "Boolean!" },
    transportMode: { __type: "String!" },
    updated: { __type: "DateTimeISO!" },
  },
  OrgDepartmentUserNode: {
    __typename: { __type: "String!" },
    assignedDate: { __type: "DateTimeISO!" },
    created: { __type: "DateTimeISO!" },
    department: { __type: "OrgDepartmentNode" },
    id: { __type: "String!" },
    isActive: { __type: "Boolean!" },
    role: { __type: "String!" },
    updated: { __type: "DateTimeISO!" },
    user: { __type: "AuthUserNode" },
  },
  OrgDepartmentUserPermissionNode: {
    __typename: { __type: "String!" },
    created: { __type: "DateTimeISO!" },
    id: { __type: "String!" },
    permission: { __type: "OrgDepartmentPermissionNode" },
    user: { __type: "AuthUserNode" },
  },
  OrgDriverNode: {
    __typename: { __type: "String!" },
    created: { __type: "DateTimeISO!" },
    email: { __type: "String!" },
    employeeId: { __type: "String!" },
    firstName: { __type: "String!" },
    hireDate: { __type: "DateTimeISO!" },
    id: { __type: "String!" },
    lastName: { __type: "String!" },
    licenseNumber: { __type: "String!" },
    phoneNumber: { __type: "String!" },
    status: { __type: "OrgDriverStatus!" },
    updated: { __type: "DateTimeISO!" },
  },
  OrgVehicleNode: {
    __typename: { __type: "String!" },
    capacityVolume: { __type: "String" },
    capacityWeight: { __type: "String" },
    created: { __type: "DateTimeISO!" },
    department: { __type: "OrgDepartmentNode" },
    id: { __type: "String!" },
    licensePlate: { __type: "String!" },
    make: { __type: "String!" },
    model: { __type: "String!" },
    status: { __type: "OrgVehicleStatus!" },
    updated: { __type: "DateTimeISO!" },
    vehicleNumber: { __type: "String!" },
    vehicleType: { __type: "OrgVehicleType!" },
    warehouse: { __type: "LmsWarehouseNode" },
    year: { __type: "Number!" },
  },
  Packages: {
    __typename: { __type: "String!" },
    list: {
      __type: "[LmsPackageNode!]!",
      __args: { limit: "Number!", page: "Number!" },
    },
    listByShipment: {
      __type: "[LmsPackageNode!]!",
      __args: { shipmentId: "String!" },
    },
    listByType: {
      __type: "[LmsPackageNode!]!",
      __args: { packageType: "String!" },
    },
    view: { __type: "LmsPackageNode!", __args: { id: "String!" } },
  },
  PayloadInputAndPayloadInput_1: {
    arrivedAt: { __type: "String" },
    created: { __type: "String" },
    departedAt: { __type: "String" },
    id: { __type: "String" },
    locationCode: { __type: "String" },
    packageId: { __type: "String!" },
    shipmentId: { __type: "String!" },
    status: { __type: "LmsWarehouseInventoryStatusInput!" },
    updated: { __type: "String" },
    warehouseId: { __type: "String!" },
  },
  PayloadInput_101: {
    created: { __type: "String" },
    description: { __type: "String" },
    id: { __type: "String" },
    invoiceId: { __type: "String" },
    lineTotal: { __type: "String" },
    quantity: { __type: "String" },
    shipmentId: { __type: "String" },
    unitPrice: { __type: "String" },
    updated: { __type: "String" },
  },
  PayloadInput_102AndPayloadInput_103: {
    companyId: { __type: "String" },
    contactId: { __type: "String" },
    created: { __type: "String" },
    currency: { __type: "String" },
    dueDate: { __type: "String!" },
    id: { __type: "String" },
    invoiceDate: { __type: "String!" },
    invoiceNumber: { __type: "String!" },
    paymentTerms: { __type: "String" },
    status: { __type: "CrmInvoiceStatusInput!" },
    subtotal: { __type: "String!" },
    taxAmount: { __type: "String" },
    totalAmount: { __type: "String!" },
    updated: { __type: "String" },
  },
  PayloadInput_104: {
    companyId: { __type: "String" },
    contactId: { __type: "String" },
    created: { __type: "String" },
    currency: { __type: "String" },
    dueDate: { __type: "String" },
    id: { __type: "String" },
    invoiceDate: { __type: "String" },
    invoiceNumber: { __type: "String" },
    paymentTerms: { __type: "String" },
    status: { __type: "CrmInvoiceStatusInput" },
    subtotal: { __type: "String" },
    taxAmount: { __type: "String" },
    totalAmount: { __type: "String" },
    updated: { __type: "String" },
  },
  PayloadInput_105AndPayloadInput_106: {
    created: { __type: "String" },
    description: { __type: "String" },
    id: { __type: "String" },
    name: { __type: "String!" },
    price: { __type: "String!" },
    sku: { __type: "String" },
    updated: { __type: "String" },
  },
  PayloadInput_107: {
    created: { __type: "String" },
    description: { __type: "String" },
    id: { __type: "String" },
    name: { __type: "String" },
    price: { __type: "String" },
    sku: { __type: "String" },
    updated: { __type: "String" },
  },
  PayloadInput_108AndPayloadInput_109: {
    amount: { __type: "String" },
    closeDate: { __type: "String" },
    companyId: { __type: "String" },
    created: { __type: "String" },
    id: { __type: "String" },
    name: { __type: "String!" },
    primaryContactId: { __type: "String" },
    probability: { __type: "String" },
    stage: { __type: "CrmOpportunityStageInput!" },
    updated: { __type: "String" },
  },
  PayloadInput_11: {
    actualDelivery: { __type: "String" },
    created: { __type: "String" },
    deliveryDate: { __type: "String" },
    deliveryStatus: { __type: "LmsDeliveryStatusInput" },
    estimatedDelivery: { __type: "String" },
    id: { __type: "String" },
    recipientSignature: { __type: "String" },
    routeId: { __type: "String" },
    sequenceNumber: { __type: "Number" },
    shipmentId: { __type: "String" },
    signatureRequired: { __type: "Boolean" },
    updated: { __type: "String" },
  },
  PayloadInput_110: {
    amount: { __type: "String" },
    closeDate: { __type: "String" },
    companyId: { __type: "String" },
    created: { __type: "String" },
    id: { __type: "String" },
    name: { __type: "String" },
    primaryContactId: { __type: "String" },
    probability: { __type: "String" },
    stage: { __type: "CrmOpportunityStageInput" },
    updated: { __type: "String" },
  },
  PayloadInput_111AndPayloadInput_112: {
    companyName: { __type: "String" },
    convertedToContactId: { __type: "String" },
    created: { __type: "String" },
    email: { __type: "String!" },
    firstName: { __type: "String!" },
    id: { __type: "String" },
    lastName: { __type: "String!" },
    leadScore: { __type: "Number" },
    leadSource: { __type: "String" },
    leadStatus: { __type: "CrmLeadStatusInput!" },
    phoneNumber: { __type: "String" },
    updated: { __type: "String" },
  },
  PayloadInput_113: {
    companyName: { __type: "String" },
    convertedToContactId: { __type: "String" },
    created: { __type: "String" },
    email: { __type: "String" },
    firstName: { __type: "String" },
    id: { __type: "String" },
    lastName: { __type: "String" },
    leadScore: { __type: "Number" },
    leadSource: { __type: "String" },
    leadStatus: { __type: "CrmLeadStatusInput" },
    phoneNumber: { __type: "String" },
    updated: { __type: "String" },
  },
  PayloadInput_114AndPayloadInput_115: {
    contactId: { __type: "String" },
    created: { __type: "String" },
    description: { __type: "String" },
    id: { __type: "String" },
    interactionDate: { __type: "String!" },
    opportunityId: { __type: "String" },
    subject: { __type: "String" },
    type: { __type: "CrmInteractionTypeInput!" },
    updated: { __type: "String" },
  },
  PayloadInput_116: {
    contactId: { __type: "String" },
    created: { __type: "String" },
    description: { __type: "String" },
    id: { __type: "String" },
    interactionDate: { __type: "String" },
    opportunityId: { __type: "String" },
    subject: { __type: "String" },
    type: { __type: "CrmInteractionTypeInput" },
    updated: { __type: "String" },
  },
  PayloadInput_117AndPayloadInput_118: {
    closedAt: { __type: "String" },
    contactId: { __type: "String" },
    created: { __type: "String" },
    description: { __type: "String!" },
    id: { __type: "String" },
    priority: { __type: "CrmCasePriorityInput!" },
    status: { __type: "CrmCaseStatusInput!" },
    subject: { __type: "String!" },
    updated: { __type: "String" },
  },
  PayloadInput_119: {
    closedAt: { __type: "String" },
    contactId: { __type: "String" },
    created: { __type: "String" },
    description: { __type: "String" },
    id: { __type: "String" },
    priority: { __type: "CrmCasePriorityInput" },
    status: { __type: "CrmCaseStatusInput" },
    subject: { __type: "String" },
    updated: { __type: "String" },
  },
  PayloadInput_120AndPayloadInput_121: {
    budget: { __type: "String" },
    created: { __type: "String" },
    description: { __type: "String" },
    endDate: { __type: "String" },
    id: { __type: "String" },
    name: { __type: "String!" },
    startDate: { __type: "String!" },
    status: { __type: "CrmCampaignStatusInput!" },
    updated: { __type: "String" },
  },
  PayloadInput_122: {
    budget: { __type: "String" },
    created: { __type: "String" },
    description: { __type: "String" },
    endDate: { __type: "String" },
    id: { __type: "String" },
    name: { __type: "String" },
    startDate: { __type: "String" },
    status: { __type: "CrmCampaignStatusInput" },
    updated: { __type: "String" },
  },
  PayloadInput_123AndPayloadInput_124: {
    addressId: { __type: "String" },
    created: { __type: "String" },
    description: { __type: "String" },
    email: { __type: "String" },
    id: { __type: "String" },
    industry: { __type: "String" },
    name: { __type: "String!" },
    phoneNumber: { __type: "String" },
    updated: { __type: "String" },
    website: { __type: "String" },
  },
  PayloadInput_125: {
    addressId: { __type: "String" },
    created: { __type: "String" },
    description: { __type: "String" },
    email: { __type: "String" },
    id: { __type: "String" },
    industry: { __type: "String" },
    name: { __type: "String" },
    phoneNumber: { __type: "String" },
    updated: { __type: "String" },
    website: { __type: "String" },
  },
  PayloadInput_126AndPayloadInput_127: {
    addressId: { __type: "String" },
    birthDate: { __type: "String" },
    companyId: { __type: "String" },
    created: { __type: "String" },
    email: { __type: "String!" },
    firstName: { __type: "String!" },
    id: { __type: "String" },
    jobTitle: { __type: "String" },
    lastName: { __type: "String!" },
    leadSource: { __type: "String" },
    phoneNumber: { __type: "String" },
    status: { __type: "CrmContactStatusInput!" },
    updated: { __type: "String" },
  },
  PayloadInput_128: {
    addressId: { __type: "String" },
    birthDate: { __type: "String" },
    companyId: { __type: "String" },
    created: { __type: "String" },
    email: { __type: "String" },
    firstName: { __type: "String" },
    id: { __type: "String" },
    jobTitle: { __type: "String" },
    lastName: { __type: "String" },
    leadSource: { __type: "String" },
    phoneNumber: { __type: "String" },
    status: { __type: "CrmContactStatusInput" },
    updated: { __type: "String" },
  },
  PayloadInput_129AndPayloadInput_130: {
    created: { __type: "String" },
    email: { __type: "String!" },
    emailVerified: { __type: "Boolean" },
    id: { __type: "String" },
    name: { __type: "String!" },
    password: { __type: "String!" },
    updated: { __type: "String" },
  },
  PayloadInput_12AndPayloadInput_13: {
    countryCode: { __type: "String!" },
    created: { __type: "String" },
    id: { __type: "String" },
    providerServiceId: { __type: "String!" },
  },
  PayloadInput_14: {
    countryCode: { __type: "String" },
    created: { __type: "String" },
    id: { __type: "String" },
    providerServiceId: { __type: "String" },
  },
  PayloadInput_15AndPayloadInput_16: {
    created: { __type: "String" },
    height: { __type: "String" },
    id: { __type: "String" },
    length: { __type: "String" },
    providerServiceId: { __type: "String!" },
    width: { __type: "String" },
  },
  PayloadInput_17: {
    created: { __type: "String" },
    height: { __type: "String" },
    id: { __type: "String" },
    length: { __type: "String" },
    providerServiceId: { __type: "String" },
    width: { __type: "String" },
  },
  PayloadInput_18AndPayloadInput_19: {
    countryCode: { __type: "String!" },
    created: { __type: "String" },
    id: { __type: "String" },
    providerServiceId: { __type: "String!" },
  },
  PayloadInput_2: {
    arrivedAt: { __type: "String" },
    created: { __type: "String" },
    departedAt: { __type: "String" },
    id: { __type: "String" },
    locationCode: { __type: "String" },
    packageId: { __type: "String" },
    shipmentId: { __type: "String" },
    status: { __type: "LmsWarehouseInventoryStatusInput" },
    updated: { __type: "String" },
    warehouseId: { __type: "String" },
  },
  PayloadInput_20: {
    countryCode: { __type: "String" },
    created: { __type: "String" },
    id: { __type: "String" },
    providerServiceId: { __type: "String" },
  },
  PayloadInput_21AndPayloadInput_22: {
    created: { __type: "String" },
    cutoffTime: { __type: "String" },
    id: { __type: "String" },
    insuranceAvailable: { __type: "Boolean" },
    isActive: { __type: "Boolean" },
    maxWeight: { __type: "String" },
    providerId: { __type: "String!" },
    serviceName: { __type: "String!" },
    serviceType: { __type: "LmsServiceTypeInput!" },
    trackingAvailable: { __type: "Boolean" },
    transitTimeMax: { __type: "Number" },
    transitTimeMin: { __type: "Number" },
    transportMode: { __type: "LmsTransportModeInput!" },
    updated: { __type: "String" },
  },
  PayloadInput_23: {
    created: { __type: "String" },
    cutoffTime: { __type: "String" },
    id: { __type: "String" },
    insuranceAvailable: { __type: "Boolean" },
    isActive: { __type: "Boolean" },
    maxWeight: { __type: "String" },
    providerId: { __type: "String" },
    serviceName: { __type: "String" },
    serviceType: { __type: "LmsServiceTypeInput" },
    trackingAvailable: { __type: "Boolean" },
    transitTimeMax: { __type: "Number" },
    transitTimeMin: { __type: "Number" },
    transportMode: { __type: "LmsTransportModeInput" },
    updated: { __type: "String" },
  },
  PayloadInput_24AndPayloadInput_25: {
    baseRate: { __type: "String!" },
    created: { __type: "String" },
    currency: { __type: "String" },
    destinationZoneId: { __type: "String!" },
    effectiveDate: { __type: "String!" },
    expiryDate: { __type: "String" },
    fuelSurchargeRate: { __type: "String" },
    id: { __type: "String" },
    originZoneId: { __type: "String!" },
    perKgRate: { __type: "String!" },
    providerServiceId: { __type: "String!" },
    updated: { __type: "String" },
    weightMax: { __type: "String!" },
    weightMin: { __type: "String!" },
  },
  PayloadInput_26: {
    baseRate: { __type: "String" },
    created: { __type: "String" },
    currency: { __type: "String" },
    destinationZoneId: { __type: "String" },
    effectiveDate: { __type: "String" },
    expiryDate: { __type: "String" },
    fuelSurchargeRate: { __type: "String" },
    id: { __type: "String" },
    originZoneId: { __type: "String" },
    perKgRate: { __type: "String" },
    providerServiceId: { __type: "String" },
    updated: { __type: "String" },
    weightMax: { __type: "String" },
    weightMin: { __type: "String" },
  },
  PayloadInput_27AndPayloadInput_28: {
    created: { __type: "String" },
    id: { __type: "String" },
    measurementDate: { __type: "String!" },
    metricType: { __type: "LmsPerformanceMetricTypeInput!" },
    metricValue: { __type: "String" },
    notes: { __type: "String" },
    providerId: { __type: "String!" },
    shipmentId: { __type: "String!" },
    transportLegId: { __type: "String" },
    updated: { __type: "String" },
  },
  PayloadInput_29: {
    created: { __type: "String" },
    id: { __type: "String" },
    measurementDate: { __type: "String" },
    metricType: { __type: "LmsPerformanceMetricTypeInput" },
    metricValue: { __type: "String" },
    notes: { __type: "String" },
    providerId: { __type: "String" },
    shipmentId: { __type: "String" },
    transportLegId: { __type: "String" },
    updated: { __type: "String" },
  },
  PayloadInput_30AndPayloadInput_31: {
    created: { __type: "String" },
    description: { __type: "String!" },
    id: { __type: "String" },
    lineTotal: { __type: "String" },
    providerInvoiceId: { __type: "String!" },
    quantity: { __type: "Number" },
    transportLegId: { __type: "String!" },
    unitPrice: { __type: "String!" },
    updated: { __type: "String" },
  },
  PayloadInput_32: {
    created: { __type: "String" },
    description: { __type: "String" },
    id: { __type: "String" },
    lineTotal: { __type: "String" },
    providerInvoiceId: { __type: "String" },
    quantity: { __type: "Number" },
    transportLegId: { __type: "String" },
    unitPrice: { __type: "String" },
    updated: { __type: "String" },
  },
  PayloadInput_33AndPayloadInput_34: {
    created: { __type: "String" },
    currency: { __type: "String" },
    dueDate: { __type: "String!" },
    id: { __type: "String" },
    invoiceDate: { __type: "String!" },
    invoiceNumber: { __type: "String!" },
    paymentDate: { __type: "String" },
    providerId: { __type: "String!" },
    status: { __type: "LmsProviderInvoiceStatusInput!" },
    subtotal: { __type: "String!" },
    taxAmount: { __type: "String" },
    totalAmount: { __type: "String" },
    updated: { __type: "String" },
  },
  PayloadInput_35: {
    created: { __type: "String" },
    currency: { __type: "String" },
    dueDate: { __type: "String" },
    id: { __type: "String" },
    invoiceDate: { __type: "String" },
    invoiceNumber: { __type: "String" },
    paymentDate: { __type: "String" },
    providerId: { __type: "String" },
    status: { __type: "LmsProviderInvoiceStatusInput" },
    subtotal: { __type: "String" },
    taxAmount: { __type: "String" },
    totalAmount: { __type: "String" },
    updated: { __type: "String" },
  },
  PayloadInput_36AndPayloadInput_37: {
    countryCode: { __type: "String!" },
    created: { __type: "String" },
    id: { __type: "String" },
    pricingZoneId: { __type: "String!" },
  },
  PayloadInput_38: {
    countryCode: { __type: "String" },
    created: { __type: "String" },
    id: { __type: "String" },
    pricingZoneId: { __type: "String" },
  },
  PayloadInput_39AndPayloadInput_40: {
    created: { __type: "String" },
    id: { __type: "String" },
    name: { __type: "String!" },
    updated: { __type: "String" },
    zoneCode: { __type: "String!" },
  },
  PayloadInput_3AndPayloadInput_4: {
    created: { __type: "String" },
    height: { __type: "String" },
    id: { __type: "String" },
    length: { __type: "String" },
    shippingServiceId: { __type: "String!" },
    width: { __type: "String" },
  },
  PayloadInput_41: {
    created: { __type: "String" },
    id: { __type: "String" },
    name: { __type: "String" },
    updated: { __type: "String" },
    zoneCode: { __type: "String" },
  },
  PayloadInput_42AndPayloadInput_43: {
    baseRate: { __type: "String!" },
    created: { __type: "String" },
    destinationZoneId: { __type: "String!" },
    effectiveDate: { __type: "String!" },
    expiryDate: { __type: "String" },
    fuelSurchargeRate: { __type: "String" },
    id: { __type: "String" },
    originZoneId: { __type: "String!" },
    perKgRate: { __type: "String!" },
    serviceId: { __type: "String!" },
    updated: { __type: "String" },
    weightMax: { __type: "String!" },
    weightMin: { __type: "String!" },
  },
  PayloadInput_44: {
    baseRate: { __type: "String" },
    created: { __type: "String" },
    destinationZoneId: { __type: "String" },
    effectiveDate: { __type: "String" },
    expiryDate: { __type: "String" },
    fuelSurchargeRate: { __type: "String" },
    id: { __type: "String" },
    originZoneId: { __type: "String" },
    perKgRate: { __type: "String" },
    serviceId: { __type: "String" },
    updated: { __type: "String" },
    weightMax: { __type: "String" },
    weightMin: { __type: "String" },
  },
  PayloadInput_45AndPayloadInput_46: {
    addressId: { __type: "String" },
    apiEndpoint: { __type: "String" },
    apiKey: { __type: "String" },
    companyName: { __type: "String!" },
    contactPerson: { __type: "String" },
    contractEndDate: { __type: "String" },
    contractStartDate: { __type: "String" },
    created: { __type: "String" },
    email: { __type: "String" },
    id: { __type: "String" },
    insuranceCoverage: { __type: "String" },
    isActive: { __type: "Boolean" },
    paymentTerms: { __type: "String" },
    performanceRating: { __type: "String" },
    phoneNumber: { __type: "String" },
    preferredByDepartmentId: { __type: "String" },
    providerType: { __type: "LmsProviderTypeInput!" },
    updated: { __type: "String" },
  },
  PayloadInput_47: {
    addressId: { __type: "String" },
    apiEndpoint: { __type: "String" },
    apiKey: { __type: "String" },
    companyName: { __type: "String" },
    contactPerson: { __type: "String" },
    contractEndDate: { __type: "String" },
    contractStartDate: { __type: "String" },
    created: { __type: "String" },
    email: { __type: "String" },
    id: { __type: "String" },
    insuranceCoverage: { __type: "String" },
    isActive: { __type: "Boolean" },
    paymentTerms: { __type: "String" },
    performanceRating: { __type: "String" },
    phoneNumber: { __type: "String" },
    preferredByDepartmentId: { __type: "String" },
    providerType: { __type: "LmsProviderTypeInput" },
    updated: { __type: "String" },
  },
  PayloadInput_48AndPayloadInput_49: {
    created: { __type: "String" },
    deliveryTimeMax: { __type: "Number" },
    deliveryTimeMin: { __type: "Number" },
    description: { __type: "String" },
    id: { __type: "String" },
    isActive: { __type: "Boolean" },
    maxWeight: { __type: "String" },
    name: { __type: "String!" },
    serviceType: { __type: "LmsServiceTypeInput!" },
    updated: { __type: "String" },
  },
  PayloadInput_5: {
    created: { __type: "String" },
    height: { __type: "String" },
    id: { __type: "String" },
    length: { __type: "String" },
    shippingServiceId: { __type: "String" },
    width: { __type: "String" },
  },
  PayloadInput_50: {
    created: { __type: "String" },
    deliveryTimeMax: { __type: "Number" },
    deliveryTimeMin: { __type: "Number" },
    description: { __type: "String" },
    id: { __type: "String" },
    isActive: { __type: "Boolean" },
    maxWeight: { __type: "String" },
    name: { __type: "String" },
    serviceType: { __type: "LmsServiceTypeInput" },
    updated: { __type: "String" },
  },
  PayloadInput_51AndPayloadInput_52: {
    addressId: { __type: "String!" },
    capacity: { __type: "Number" },
    code: { __type: "String!" },
    created: { __type: "String" },
    departmentId: { __type: "String" },
    id: { __type: "String" },
    isActive: { __type: "Boolean" },
    managerId: { __type: "String" },
    name: { __type: "String!" },
    updated: { __type: "String" },
    warehouseType: { __type: "LmsWarehouseTypeInput!" },
  },
  PayloadInput_53: {
    addressId: { __type: "String" },
    capacity: { __type: "Number" },
    code: { __type: "String" },
    created: { __type: "String" },
    departmentId: { __type: "String" },
    id: { __type: "String" },
    isActive: { __type: "Boolean" },
    managerId: { __type: "String" },
    name: { __type: "String" },
    updated: { __type: "String" },
    warehouseType: { __type: "LmsWarehouseTypeInput" },
  },
  PayloadInput_54AndPayloadInput_55: {
    actualArrival: { __type: "String" },
    actualDeparture: { __type: "String" },
    created: { __type: "String" },
    driverId: { __type: "String" },
    estimatedArrival: { __type: "String" },
    estimatedDeparture: { __type: "String" },
    id: { __type: "String" },
    routeDate: { __type: "String!" },
    routeName: { __type: "String!" },
    status: { __type: "LmsRouteStatusInput!" },
    updated: { __type: "String" },
    vehicleId: { __type: "String" },
  },
  PayloadInput_56: {
    actualArrival: { __type: "String" },
    actualDeparture: { __type: "String" },
    created: { __type: "String" },
    driverId: { __type: "String" },
    estimatedArrival: { __type: "String" },
    estimatedDeparture: { __type: "String" },
    id: { __type: "String" },
    routeDate: { __type: "String" },
    routeName: { __type: "String" },
    status: { __type: "LmsRouteStatusInput" },
    updated: { __type: "String" },
    vehicleId: { __type: "String" },
  },
  PayloadInput_57AndPayloadInput_58: {
    created: { __type: "String" },
    eventDescription: { __type: "String!" },
    eventLocation: { __type: "String" },
    eventTimestamp: { __type: "String!" },
    eventType: { __type: "LmsTrackingEventTypeInput!" },
    id: { __type: "String" },
    shipmentId: { __type: "String!" },
    updated: { __type: "String" },
  },
  PayloadInput_59: {
    created: { __type: "String" },
    eventDescription: { __type: "String" },
    eventLocation: { __type: "String" },
    eventTimestamp: { __type: "String" },
    eventType: { __type: "LmsTrackingEventTypeInput" },
    id: { __type: "String" },
    shipmentId: { __type: "String" },
    updated: { __type: "String" },
  },
  PayloadInput_60AndPayloadInput_61: {
    contentsDescription: { __type: "String" },
    created: { __type: "String" },
    declaredValue: { __type: "String" },
    height: { __type: "String" },
    id: { __type: "String" },
    length: { __type: "String" },
    packageNumber: { __type: "String!" },
    packageType: { __type: "LmsPackageTypeInput!" },
    shipmentId: { __type: "String!" },
    updated: { __type: "String" },
    weight: { __type: "String!" },
    width: { __type: "String" },
  },
  PayloadInput_62: {
    contentsDescription: { __type: "String" },
    created: { __type: "String" },
    declaredValue: { __type: "String" },
    height: { __type: "String" },
    id: { __type: "String" },
    length: { __type: "String" },
    packageNumber: { __type: "String" },
    packageType: { __type: "LmsPackageTypeInput" },
    shipmentId: { __type: "String" },
    updated: { __type: "String" },
    weight: { __type: "String" },
    width: { __type: "String" },
  },
  PayloadInput_63AndPayloadInput_64: {
    assignedDepartmentId: { __type: "String" },
    created: { __type: "String" },
    createdBy: { __type: "String" },
    currency: { __type: "String" },
    deliveryDate: { __type: "String" },
    estimatedDeliveryDate: { __type: "String" },
    id: { __type: "String" },
    insuranceAmount: { __type: "String" },
    pickupDate: { __type: "String" },
    primaryTransportMode: { __type: "LmsTransportModeInput!" },
    receiverAddressId: { __type: "String!" },
    receiverCompanyId: { __type: "String" },
    receiverContactId: { __type: "String" },
    senderAddressId: { __type: "String!" },
    senderCompanyId: { __type: "String" },
    senderContactId: { __type: "String" },
    serviceId: { __type: "String!" },
    shippingCost: { __type: "String" },
    specialInstructions: { __type: "String" },
    status: { __type: "LmsShipmentStatusInput!" },
    totalValue: { __type: "String" },
    totalWeight: { __type: "String!" },
    trackingNumber: { __type: "String!" },
    updated: { __type: "String" },
  },
  PayloadInput_65: {
    assignedDepartmentId: { __type: "String" },
    created: { __type: "String" },
    createdBy: { __type: "String" },
    currency: { __type: "String" },
    deliveryDate: { __type: "String" },
    estimatedDeliveryDate: { __type: "String" },
    id: { __type: "String" },
    insuranceAmount: { __type: "String" },
    pickupDate: { __type: "String" },
    primaryTransportMode: { __type: "LmsTransportModeInput" },
    receiverAddressId: { __type: "String" },
    receiverCompanyId: { __type: "String" },
    receiverContactId: { __type: "String" },
    senderAddressId: { __type: "String" },
    senderCompanyId: { __type: "String" },
    senderContactId: { __type: "String" },
    serviceId: { __type: "String" },
    shippingCost: { __type: "String" },
    specialInstructions: { __type: "String" },
    status: { __type: "LmsShipmentStatusInput" },
    totalValue: { __type: "String" },
    totalWeight: { __type: "String" },
    trackingNumber: { __type: "String" },
    updated: { __type: "String" },
  },
  PayloadInput_66AndPayloadInput_67: {
    addressLine1: { __type: "String!" },
    addressLine2: { __type: "String" },
    addressType: { __type: "LmsAddressTypeInput!" },
    city: { __type: "String!" },
    country: { __type: "String!" },
    created: { __type: "String" },
    id: { __type: "String" },
    isValidated: { __type: "Boolean" },
    latitude: { __type: "String" },
    longitude: { __type: "String" },
    postalCode: { __type: "String!" },
    state: { __type: "String!" },
    updated: { __type: "String" },
  },
  PayloadInput_68: {
    addressLine1: { __type: "String" },
    addressLine2: { __type: "String" },
    addressType: { __type: "LmsAddressTypeInput" },
    city: { __type: "String" },
    country: { __type: "String" },
    created: { __type: "String" },
    id: { __type: "String" },
    isValidated: { __type: "Boolean" },
    latitude: { __type: "String" },
    longitude: { __type: "String" },
    postalCode: { __type: "String" },
    state: { __type: "String" },
    updated: { __type: "String" },
  },
  PayloadInput_69AndPayloadInput_70: {
    capacityVolume: { __type: "String" },
    capacityWeight: { __type: "String" },
    created: { __type: "String" },
    departmentId: { __type: "String" },
    id: { __type: "String" },
    licensePlate: { __type: "String!" },
    make: { __type: "String!" },
    model: { __type: "String!" },
    status: { __type: "OrgVehicleStatusInput!" },
    updated: { __type: "String" },
    vehicleNumber: { __type: "String!" },
    vehicleType: { __type: "OrgVehicleTypeInput!" },
    warehouseId: { __type: "String" },
    year: { __type: "Number!" },
  },
  PayloadInput_6AndPayloadInput_7: {
    actualDelivery: { __type: "String" },
    actualPickup: { __type: "String" },
    cost: { __type: "String" },
    created: { __type: "String" },
    currency: { __type: "String" },
    destinationAddressId: { __type: "String" },
    destinationWarehouseId: { __type: "String" },
    driverId: { __type: "String" },
    id: { __type: "String" },
    legSequence: { __type: "Number!" },
    originAddressId: { __type: "String" },
    originWarehouseId: { __type: "String" },
    providerId: { __type: "String" },
    providerServiceId: { __type: "String" },
    providerTrackingNumber: { __type: "String" },
    scheduledDelivery: { __type: "String" },
    scheduledPickup: { __type: "String" },
    shipmentId: { __type: "String!" },
    specialInstructions: { __type: "String" },
    status: { __type: "LmsLegStatusInput!" },
    transportType: { __type: "LmsTransportLegTypeInput!" },
    updated: { __type: "String" },
    vehicleId: { __type: "String" },
  },
  PayloadInput_71: {
    capacityVolume: { __type: "String" },
    capacityWeight: { __type: "String" },
    created: { __type: "String" },
    departmentId: { __type: "String" },
    id: { __type: "String" },
    licensePlate: { __type: "String" },
    make: { __type: "String" },
    model: { __type: "String" },
    status: { __type: "OrgVehicleStatusInput" },
    updated: { __type: "String" },
    vehicleNumber: { __type: "String" },
    vehicleType: { __type: "OrgVehicleTypeInput" },
    warehouseId: { __type: "String" },
    year: { __type: "Number" },
  },
  PayloadInput_72AndPayloadInput_73: {
    created: { __type: "String" },
    email: { __type: "String!" },
    employeeId: { __type: "String!" },
    firstName: { __type: "String!" },
    hireDate: { __type: "String!" },
    id: { __type: "String" },
    lastName: { __type: "String!" },
    licenseNumber: { __type: "String!" },
    phoneNumber: { __type: "String!" },
    status: { __type: "OrgDriverStatusInput!" },
    updated: { __type: "String" },
  },
  PayloadInput_74: {
    created: { __type: "String" },
    email: { __type: "String" },
    employeeId: { __type: "String" },
    firstName: { __type: "String" },
    hireDate: { __type: "String" },
    id: { __type: "String" },
    lastName: { __type: "String" },
    licenseNumber: { __type: "String" },
    phoneNumber: { __type: "String" },
    status: { __type: "OrgDriverStatusInput" },
    updated: { __type: "String" },
  },
  PayloadInput_75AndPayloadInput_76: {
    assignedDate: { __type: "String" },
    created: { __type: "String" },
    departmentId: { __type: "String!" },
    id: { __type: "String" },
    isActive: { __type: "Boolean" },
    role: { __type: "String!" },
    updated: { __type: "String" },
    userId: { __type: "String!" },
  },
  PayloadInput_77: {
    assignedDate: { __type: "String" },
    created: { __type: "String" },
    departmentId: { __type: "String" },
    id: { __type: "String" },
    isActive: { __type: "Boolean" },
    role: { __type: "String" },
    updated: { __type: "String" },
    userId: { __type: "String" },
  },
  PayloadInput_78AndPayloadInput_79: {
    created: { __type: "String" },
    id: { __type: "String" },
    permissionId: { __type: "String!" },
    userId: { __type: "String!" },
  },
  PayloadInput_8: {
    actualDelivery: { __type: "String" },
    actualPickup: { __type: "String" },
    cost: { __type: "String" },
    created: { __type: "String" },
    currency: { __type: "String" },
    destinationAddressId: { __type: "String" },
    destinationWarehouseId: { __type: "String" },
    driverId: { __type: "String" },
    id: { __type: "String" },
    legSequence: { __type: "Number" },
    originAddressId: { __type: "String" },
    originWarehouseId: { __type: "String" },
    providerId: { __type: "String" },
    providerServiceId: { __type: "String" },
    providerTrackingNumber: { __type: "String" },
    scheduledDelivery: { __type: "String" },
    scheduledPickup: { __type: "String" },
    shipmentId: { __type: "String" },
    specialInstructions: { __type: "String" },
    status: { __type: "LmsLegStatusInput" },
    transportType: { __type: "LmsTransportLegTypeInput" },
    updated: { __type: "String" },
    vehicleId: { __type: "String" },
  },
  PayloadInput_80: {
    created: { __type: "String" },
    id: { __type: "String" },
    permissionId: { __type: "String" },
    userId: { __type: "String" },
  },
  PayloadInput_81AndPayloadInput_82: {
    created: { __type: "String" },
    departmentId: { __type: "String!" },
    id: { __type: "String" },
    isPrimary: { __type: "Boolean" },
    transportMode: { __type: "String!" },
    updated: { __type: "String" },
  },
  PayloadInput_83: {
    created: { __type: "String" },
    departmentId: { __type: "String" },
    id: { __type: "String" },
    isPrimary: { __type: "Boolean" },
    transportMode: { __type: "String" },
    updated: { __type: "String" },
  },
  PayloadInput_84AndPayloadInput_85: {
    action: { __type: "OrgPermissionStatusInput!" },
    created: { __type: "String" },
    departmentId: { __type: "String!" },
    id: { __type: "String" },
    resource: { __type: "String!" },
    updated: { __type: "String" },
  },
  PayloadInput_86: {
    action: { __type: "OrgPermissionStatusInput" },
    created: { __type: "String" },
    departmentId: { __type: "String" },
    id: { __type: "String" },
    resource: { __type: "String" },
    updated: { __type: "String" },
  },
  PayloadInput_87AndPayloadInput_88: {
    budget: { __type: "String" },
    code: { __type: "String!" },
    created: { __type: "String" },
    departmentType: { __type: "String!" },
    description: { __type: "String" },
    email: { __type: "String" },
    id: { __type: "String" },
    isActive: { __type: "Boolean" },
    managerId: { __type: "String" },
    name: { __type: "String!" },
    phoneNumber: { __type: "String" },
    updated: { __type: "String" },
  },
  PayloadInput_89: {
    budget: { __type: "String" },
    code: { __type: "String" },
    created: { __type: "String" },
    departmentType: { __type: "String" },
    description: { __type: "String" },
    email: { __type: "String" },
    id: { __type: "String" },
    isActive: { __type: "Boolean" },
    managerId: { __type: "String" },
    name: { __type: "String" },
    phoneNumber: { __type: "String" },
    updated: { __type: "String" },
  },
  PayloadInput_90AndPayloadInput_91: {
    campaignId: { __type: "String!" },
    contactId: { __type: "String!" },
    created: { __type: "String" },
    id: { __type: "String" },
    interactionDate: { __type: "String" },
    status: { __type: "CrmCampaignContactsStatusInput!" },
    updated: { __type: "String" },
  },
  PayloadInput_92: {
    campaignId: { __type: "String" },
    contactId: { __type: "String" },
    created: { __type: "String" },
    id: { __type: "String" },
    interactionDate: { __type: "String" },
    status: { __type: "CrmCampaignContactsStatusInput" },
    updated: { __type: "String" },
  },
  PayloadInput_93AndPayloadInput_94: {
    created: { __type: "String" },
    id: { __type: "String" },
    opportunityId: { __type: "String!" },
    productId: { __type: "String!" },
    quantity: { __type: "String" },
    totalPrice: { __type: "String" },
    unitPrice: { __type: "String!" },
    updated: { __type: "String" },
  },
  PayloadInput_95: {
    created: { __type: "String" },
    id: { __type: "String" },
    opportunityId: { __type: "String" },
    productId: { __type: "String" },
    quantity: { __type: "String" },
    totalPrice: { __type: "String" },
    unitPrice: { __type: "String" },
    updated: { __type: "String" },
  },
  PayloadInput_96AndPayloadInput_97: {
    channel: { __type: "CrmNotificationChannelInput!" },
    contactId: { __type: "String!" },
    created: { __type: "String" },
    deliveryStatus: { __type: "CrmNotificationDeliveryStatusInput!" },
    id: { __type: "String" },
    message: { __type: "String!" },
    notificationType: { __type: "CrmNotificationTypeInput!" },
    recipient: { __type: "String!" },
    sentAt: { __type: "String" },
    shipmentId: { __type: "String!" },
    subject: { __type: "String" },
    updated: { __type: "String" },
  },
  PayloadInput_98: {
    channel: { __type: "CrmNotificationChannelInput" },
    contactId: { __type: "String" },
    created: { __type: "String" },
    deliveryStatus: { __type: "CrmNotificationDeliveryStatusInput" },
    id: { __type: "String" },
    message: { __type: "String" },
    notificationType: { __type: "CrmNotificationTypeInput" },
    recipient: { __type: "String" },
    sentAt: { __type: "String" },
    shipmentId: { __type: "String" },
    subject: { __type: "String" },
    updated: { __type: "String" },
  },
  PayloadInput_99AndPayloadInput_100: {
    created: { __type: "String" },
    description: { __type: "String!" },
    id: { __type: "String" },
    invoiceId: { __type: "String!" },
    lineTotal: { __type: "String" },
    quantity: { __type: "String" },
    shipmentId: { __type: "String" },
    unitPrice: { __type: "String!" },
    updated: { __type: "String" },
  },
  PayloadInput_9AndPayloadInput_10: {
    actualDelivery: { __type: "String" },
    created: { __type: "String" },
    deliveryDate: { __type: "String!" },
    deliveryStatus: { __type: "LmsDeliveryStatusInput!" },
    estimatedDelivery: { __type: "String" },
    id: { __type: "String" },
    recipientSignature: { __type: "String" },
    routeId: { __type: "String!" },
    sequenceNumber: { __type: "Number!" },
    shipmentId: { __type: "String!" },
    signatureRequired: { __type: "Boolean" },
    updated: { __type: "String" },
  },
  PricingRates: {
    __typename: { __type: "String!" },
    list: {
      __type: "[LmsPricingRateNode!]!",
      __args: { limit: "Number!", page: "Number!" },
    },
    listActive: { __type: "[LmsPricingRateNode!]!" },
    listByRoute: {
      __type: "[LmsPricingRateNode!]!",
      __args: { destinationZoneId: "String!", originZoneId: "String!" },
    },
    listByService: {
      __type: "[LmsPricingRateNode!]!",
      __args: { serviceId: "String!" },
    },
    view: { __type: "LmsPricingRateNode!", __args: { id: "String!" } },
  },
  PricingZoneCountries: {
    __typename: { __type: "String!" },
    list: {
      __type: "[LmsPricingZoneCountryNode!]!",
      __args: { limit: "Number!", page: "Number!" },
    },
    listByCountry: {
      __type: "[LmsPricingZoneCountryNode!]!",
      __args: { countryCode: "String!" },
    },
    listByZone: {
      __type: "[LmsPricingZoneCountryNode!]!",
      __args: { pricingZoneId: "String!" },
    },
    view: { __type: "LmsPricingZoneCountryNode!", __args: { id: "String!" } },
  },
  PricingZones: {
    __typename: { __type: "String!" },
    list: {
      __type: "[LmsPricingZoneNode!]!",
      __args: { limit: "Number!", page: "Number!" },
    },
    view: { __type: "LmsPricingZoneNode!", __args: { id: "String!" } },
    viewByCode: {
      __type: "LmsPricingZoneNode!",
      __args: { zoneCode: "String!" },
    },
  },
  Products: {
    __typename: { __type: "String!" },
    list: {
      __type: "[CrmProductNode!]!",
      __args: { limit: "Number!", page: "Number!" },
    },
    view: { __type: "CrmProductNode!", __args: { id: "String!" } },
  },
  ProviderInvoiceLineItems: {
    __typename: { __type: "String!" },
    list: {
      __type: "[LmsProviderInvoiceLineItemNode!]!",
      __args: { limit: "Number!", page: "Number!" },
    },
    listByInvoice: {
      __type: "[LmsProviderInvoiceLineItemNode!]!",
      __args: { providerInvoiceId: "String!" },
    },
    listByTransportLeg: {
      __type: "[LmsProviderInvoiceLineItemNode!]!",
      __args: { transportLegId: "String!" },
    },
    view: {
      __type: "LmsProviderInvoiceLineItemNode!",
      __args: { id: "String!" },
    },
  },
  ProviderInvoices: {
    __typename: { __type: "String!" },
    list: {
      __type: "[LmsProviderInvoiceNode!]!",
      __args: { limit: "Number!", page: "Number!" },
    },
    listByProvider: {
      __type: "[LmsProviderInvoiceNode!]!",
      __args: { providerId: "String!" },
    },
    listByStatus: {
      __type: "[LmsProviderInvoiceNode!]!",
      __args: { status: "String!" },
    },
    view: { __type: "LmsProviderInvoiceNode!", __args: { id: "String!" } },
    viewByInvoiceNumber: {
      __type: "LmsProviderInvoiceNode!",
      __args: { invoiceNumber: "String!" },
    },
  },
  ProviderPerformance: {
    __typename: { __type: "String!" },
    list: {
      __type: "[LmsProviderPerformanceNode!]!",
      __args: { limit: "Number!", page: "Number!" },
    },
    listByMetricType: {
      __type: "[LmsProviderPerformanceNode!]!",
      __args: { metricType: "String!" },
    },
    listByProvider: {
      __type: "[LmsProviderPerformanceNode!]!",
      __args: { providerId: "String!" },
    },
    listByShipment: {
      __type: "[LmsProviderPerformanceNode!]!",
      __args: { shipmentId: "String!" },
    },
    view: { __type: "LmsProviderPerformanceNode!", __args: { id: "String!" } },
  },
  ProviderRates: {
    __typename: { __type: "String!" },
    list: {
      __type: "[LmsProviderRateNode!]!",
      __args: { limit: "Number!", page: "Number!" },
    },
    listActive: { __type: "[LmsProviderRateNode!]!" },
    listByRoute: {
      __type: "[LmsProviderRateNode!]!",
      __args: { destinationZoneId: "String!", originZoneId: "String!" },
    },
    listByService: {
      __type: "[LmsProviderRateNode!]!",
      __args: { providerServiceId: "String!" },
    },
    view: { __type: "LmsProviderRateNode!", __args: { id: "String!" } },
  },
  ProviderServiceDestinationCountries: {
    __typename: { __type: "String!" },
    list: {
      __type: "[LmsProviderServiceDestinationCountryNode!]!",
      __args: { limit: "Number!", page: "Number!" },
    },
    listByCountryCode: {
      __type: "[LmsProviderServiceDestinationCountryNode!]!",
      __args: { countryCode: "String!" },
    },
    listByProviderService: {
      __type: "[LmsProviderServiceDestinationCountryNode!]!",
      __args: { providerServiceId: "String!" },
    },
    view: {
      __type: "LmsProviderServiceDestinationCountryNode!",
      __args: { id: "String!" },
    },
  },
  ProviderServiceMaxDimensions: {
    __typename: { __type: "String!" },
    findByProviderService: {
      __type: "LmsProviderServiceMaxDimensionNode",
      __args: { providerServiceId: "String!" },
    },
    list: {
      __type: "[LmsProviderServiceMaxDimensionNode!]!",
      __args: { limit: "Number!", page: "Number!" },
    },
    listByProviderService: {
      __type: "[LmsProviderServiceMaxDimensionNode!]!",
      __args: { providerServiceId: "String!" },
    },
    view: {
      __type: "LmsProviderServiceMaxDimensionNode!",
      __args: { id: "String!" },
    },
  },
  ProviderServiceOriginCountries: {
    __typename: { __type: "String!" },
    list: {
      __type: "[LmsProviderServiceOriginCountryNode!]!",
      __args: { limit: "Number!", page: "Number!" },
    },
    listByCountryCode: {
      __type: "[LmsProviderServiceOriginCountryNode!]!",
      __args: { countryCode: "String!" },
    },
    listByProviderService: {
      __type: "[LmsProviderServiceOriginCountryNode!]!",
      __args: { providerServiceId: "String!" },
    },
    view: {
      __type: "LmsProviderServiceOriginCountryNode!",
      __args: { id: "String!" },
    },
  },
  ProviderServices: {
    __typename: { __type: "String!" },
    list: {
      __type: "[LmsProviderServiceNode!]!",
      __args: { limit: "Number!", page: "Number!" },
    },
    listActive: { __type: "[LmsProviderServiceNode!]!" },
    listByProvider: {
      __type: "[LmsProviderServiceNode!]!",
      __args: { providerId: "String!" },
    },
    listByServiceType: {
      __type: "[LmsProviderServiceNode!]!",
      __args: { serviceType: "String!" },
    },
    listByTransportMode: {
      __type: "[LmsProviderServiceNode!]!",
      __args: { transportMode: "String!" },
    },
    view: { __type: "LmsProviderServiceNode!", __args: { id: "String!" } },
  },
  Register: {
    __typename: { __type: "String!" },
    token: { __type: "String!" },
    user: { __type: "AuthUserNode!" },
  },
  RouteShipments: {
    __typename: { __type: "String!" },
    list: {
      __type: "[LmsRouteShipmentNode!]!",
      __args: { limit: "Number!", page: "Number!" },
    },
    listByRoute: {
      __type: "[LmsRouteShipmentNode!]!",
      __args: { routeId: "String!" },
    },
    listByShipment: {
      __type: "[LmsRouteShipmentNode!]!",
      __args: { shipmentId: "String!" },
    },
    listByStatus: {
      __type: "[LmsRouteShipmentNode!]!",
      __args: { deliveryStatus: "String!" },
    },
    view: { __type: "LmsRouteShipmentNode!", __args: { id: "String!" } },
  },
  Routes: {
    __typename: { __type: "String!" },
    list: {
      __type: "[LmsRouteNode!]!",
      __args: { limit: "Number!", page: "Number!" },
    },
    listByDriver: {
      __type: "[LmsRouteNode!]!",
      __args: { driverId: "String!" },
    },
    listByStatus: { __type: "[LmsRouteNode!]!", __args: { status: "String!" } },
    listByVehicle: {
      __type: "[LmsRouteNode!]!",
      __args: { vehicleId: "String!" },
    },
    view: { __type: "LmsRouteNode!", __args: { id: "String!" } },
  },
  Shipments: {
    __typename: { __type: "String!" },
    list: {
      __type: "[LmsShipmentNode!]!",
      __args: { limit: "Number!", page: "Number!" },
    },
    listByDepartment: {
      __type: "[LmsShipmentNode!]!",
      __args: { departmentId: "String!" },
    },
    listByService: {
      __type: "[LmsShipmentNode!]!",
      __args: { serviceId: "String!" },
    },
    listByStatus: {
      __type: "[LmsShipmentNode!]!",
      __args: { status: "String!" },
    },
    view: { __type: "LmsShipmentNode!", __args: { id: "String!" } },
    viewByTrackingNumber: {
      __type: "LmsShipmentNode!",
      __args: { trackingNumber: "String!" },
    },
  },
  ShippingServiceMaxDimensions: {
    __typename: { __type: "String!" },
    findByShippingService: {
      __type: "LmsShippingServiceMaxDimensionNode",
      __args: { shippingServiceId: "String!" },
    },
    list: {
      __type: "[LmsShippingServiceMaxDimensionNode!]!",
      __args: { limit: "Number!", page: "Number!" },
    },
    listByShippingService: {
      __type: "[LmsShippingServiceMaxDimensionNode!]!",
      __args: { shippingServiceId: "String!" },
    },
    view: {
      __type: "LmsShippingServiceMaxDimensionNode!",
      __args: { id: "String!" },
    },
  },
  ShippingServices: {
    __typename: { __type: "String!" },
    list: {
      __type: "[LmsShippingServiceNode!]!",
      __args: { limit: "Number!", page: "Number!" },
    },
    listActive: { __type: "[LmsShippingServiceNode!]!" },
    listByType: {
      __type: "[LmsShippingServiceNode!]!",
      __args: { serviceType: "String!" },
    },
    view: { __type: "LmsShippingServiceNode!", __args: { id: "String!" } },
  },
  SortInput: {
    key: {
      __type:
        "CREATED_EMAIL_ID_UPDATED_ADDRESSID_BIRTHDATE_COMPANYID_FIRSTNAME_JOBTITLE_LASTNAME_LEADSOURCE_PHONENUMBER_STATUSInput!",
    },
    order: { __type: "ASC_DESCInput!" },
  },
  TrackingEvents: {
    __typename: { __type: "String!" },
    list: {
      __type: "[LmsTrackingEventNode!]!",
      __args: { limit: "Number!", page: "Number!" },
    },
    listByEventType: {
      __type: "[LmsTrackingEventNode!]!",
      __args: { eventType: "String!" },
    },
    listByShipment: {
      __type: "[LmsTrackingEventNode!]!",
      __args: { shipmentId: "String!" },
    },
    view: { __type: "LmsTrackingEventNode!", __args: { id: "String!" } },
  },
  TransportLegs: {
    __typename: { __type: "String!" },
    list: {
      __type: "[LmsTransportLegNode!]!",
      __args: { limit: "Number!", page: "Number!" },
    },
    listByDriver: {
      __type: "[LmsTransportLegNode!]!",
      __args: { driverId: "String!" },
    },
    listByProvider: {
      __type: "[LmsTransportLegNode!]!",
      __args: { providerId: "String!" },
    },
    listByShipment: {
      __type: "[LmsTransportLegNode!]!",
      __args: { shipmentId: "String!" },
    },
    listByStatus: {
      __type: "[LmsTransportLegNode!]!",
      __args: { status: "String!" },
    },
    view: { __type: "LmsTransportLegNode!", __args: { id: "String!" } },
  },
  TransportationProviders: {
    __typename: { __type: "String!" },
    list: {
      __type: "[LmsTransportationProviderNode!]!",
      __args: { limit: "Number!", page: "Number!" },
    },
    listActive: { __type: "[LmsTransportationProviderNode!]!" },
    listByDepartment: {
      __type: "[LmsTransportationProviderNode!]!",
      __args: { departmentId: "String!" },
    },
    listByType: {
      __type: "[LmsTransportationProviderNode!]!",
      __args: { providerType: "String!" },
    },
    view: {
      __type: "LmsTransportationProviderNode!",
      __args: { id: "String!" },
    },
  },
  Vehicles: {
    __typename: { __type: "String!" },
    list: {
      __type: "[OrgVehicleNode!]!",
      __args: { limit: "Number!", page: "Number!" },
    },
    listByDepartment: {
      __type: "[OrgVehicleNode!]!",
      __args: { departmentId: "String!" },
    },
    listByStatus: {
      __type: "[OrgVehicleNode!]!",
      __args: { status: "String!" },
    },
    listByWarehouse: {
      __type: "[OrgVehicleNode!]!",
      __args: { warehouseId: "String!" },
    },
    view: { __type: "OrgVehicleNode!", __args: { id: "String!" } },
    viewByLicensePlate: {
      __type: "OrgVehicleNode!",
      __args: { licensePlate: "String!" },
    },
    viewByVehicleNumber: {
      __type: "OrgVehicleNode!",
      __args: { vehicleNumber: "String!" },
    },
  },
  WarehouseInventories: {
    __typename: { __type: "String!" },
    list: {
      __type: "[LmsWarehouseInventoryNode!]!",
      __args: { limit: "Number!", page: "Number!" },
    },
    listByPackage: {
      __type: "[LmsWarehouseInventoryNode!]!",
      __args: { packageId: "String!" },
    },
    listByShipment: {
      __type: "[LmsWarehouseInventoryNode!]!",
      __args: { shipmentId: "String!" },
    },
    listByStatus: {
      __type: "[LmsWarehouseInventoryNode!]!",
      __args: { status: "String!" },
    },
    listByWarehouse: {
      __type: "[LmsWarehouseInventoryNode!]!",
      __args: { warehouseId: "String!" },
    },
    view: { __type: "LmsWarehouseInventoryNode!", __args: { id: "String!" } },
  },
  Warehouses: {
    __typename: { __type: "String!" },
    list: {
      __type: "[LmsWarehouseNode!]!",
      __args: { limit: "Number!", page: "Number!" },
    },
    listActive: { __type: "[LmsWarehouseNode!]!" },
    listByDepartment: {
      __type: "[LmsWarehouseNode!]!",
      __args: { departmentId: "String!" },
    },
    listByType: {
      __type: "[LmsWarehouseNode!]!",
      __args: { warehouseType: "String!" },
    },
    view: { __type: "LmsWarehouseNode!", __args: { id: "String!" } },
    viewByCode: { __type: "LmsWarehouseNode!", __args: { code: "String!" } },
  },
  mutation: {
    __typename: { __type: "String!" },
    createCrmCampaign: {
      __type: "CrmCampaignNode!",
      __args: { payload: "PayloadInput_120AndPayloadInput_121!" },
    },
    createCrmCampaignContact: {
      __type: "CrmCampaignContactNode!",
      __args: { payload: "PayloadInput_90AndPayloadInput_91!" },
    },
    createCrmCase: {
      __type: "CrmCaseNode!",
      __args: { payload: "PayloadInput_117AndPayloadInput_118!" },
    },
    createCrmCompany: {
      __type: "CrmCompanyNode!",
      __args: { payload: "PayloadInput_123AndPayloadInput_124!" },
    },
    createCrmContact: {
      __type: "CrmContactNode!",
      __args: { payload: "PayloadInput_126AndPayloadInput_127!" },
    },
    createCrmInteraction: {
      __type: "CrmInteractionNode!",
      __args: { payload: "PayloadInput_114AndPayloadInput_115!" },
    },
    createCrmInvoice: {
      __type: "CrmInvoiceNode!",
      __args: { payload: "PayloadInput_102AndPayloadInput_103!" },
    },
    createCrmInvoiceLineItem: {
      __type: "CrmInvoiceLineItemNode!",
      __args: { payload: "PayloadInput_99AndPayloadInput_100!" },
    },
    createCrmLead: {
      __type: "CrmLeadNode!",
      __args: { payload: "PayloadInput_111AndPayloadInput_112!" },
    },
    createCrmNotification: {
      __type: "CrmNotificationNode!",
      __args: { payload: "PayloadInput_96AndPayloadInput_97!" },
    },
    createCrmOpportunity: {
      __type: "CrmOpportunityNode!",
      __args: { payload: "PayloadInput_108AndPayloadInput_109!" },
    },
    createCrmOpportunityProduct: {
      __type: "CrmOpportunityProductNode!",
      __args: { payload: "PayloadInput_93AndPayloadInput_94!" },
    },
    createCrmProduct: {
      __type: "CrmProductNode!",
      __args: { payload: "PayloadInput_105AndPayloadInput_106!" },
    },
    createLmsAddress: {
      __type: "LmsAddressNode!",
      __args: { payload: "PayloadInput_66AndPayloadInput_67!" },
    },
    createLmsPackage: {
      __type: "LmsPackageNode!",
      __args: { payload: "PayloadInput_60AndPayloadInput_61!" },
    },
    createLmsPricingRate: {
      __type: "LmsPricingRateNode!",
      __args: { payload: "PayloadInput_42AndPayloadInput_43!" },
    },
    createLmsPricingZone: {
      __type: "LmsPricingZoneNode!",
      __args: { payload: "PayloadInput_39AndPayloadInput_40!" },
    },
    createLmsPricingZoneCountry: {
      __type: "LmsPricingZoneCountryNode!",
      __args: { payload: "PayloadInput_36AndPayloadInput_37!" },
    },
    createLmsProviderInvoice: {
      __type: "LmsProviderInvoiceNode!",
      __args: { payload: "PayloadInput_33AndPayloadInput_34!" },
    },
    createLmsProviderInvoiceLineItem: {
      __type: "LmsProviderInvoiceLineItemNode!",
      __args: { payload: "PayloadInput_30AndPayloadInput_31!" },
    },
    createLmsProviderPerformance: {
      __type: "LmsProviderPerformanceNode!",
      __args: { payload: "PayloadInput_27AndPayloadInput_28!" },
    },
    createLmsProviderRate: {
      __type: "LmsProviderRateNode!",
      __args: { payload: "PayloadInput_24AndPayloadInput_25!" },
    },
    createLmsProviderService: {
      __type: "LmsProviderServiceNode!",
      __args: { payload: "PayloadInput_21AndPayloadInput_22!" },
    },
    createLmsProviderServiceDestinationCountry: {
      __type: "LmsProviderServiceDestinationCountryNode!",
      __args: { payload: "PayloadInput_18AndPayloadInput_19!" },
    },
    createLmsProviderServiceMaxDimension: {
      __type: "LmsProviderServiceMaxDimensionNode!",
      __args: { payload: "PayloadInput_15AndPayloadInput_16!" },
    },
    createLmsProviderServiceOriginCountry: {
      __type: "LmsProviderServiceOriginCountryNode!",
      __args: { payload: "PayloadInput_12AndPayloadInput_13!" },
    },
    createLmsRoute: {
      __type: "LmsRouteNode!",
      __args: { payload: "PayloadInput_54AndPayloadInput_55!" },
    },
    createLmsRouteShipment: {
      __type: "LmsRouteShipmentNode!",
      __args: { payload: "PayloadInput_9AndPayloadInput_10!" },
    },
    createLmsShipment: {
      __type: "LmsShipmentNode!",
      __args: { payload: "PayloadInput_63AndPayloadInput_64!" },
    },
    createLmsShippingService: {
      __type: "LmsShippingServiceNode!",
      __args: { payload: "PayloadInput_48AndPayloadInput_49!" },
    },
    createLmsShippingServiceMaxDimension: {
      __type: "LmsShippingServiceMaxDimensionNode!",
      __args: { payload: "PayloadInput_3AndPayloadInput_4!" },
    },
    createLmsTrackingEvent: {
      __type: "LmsTrackingEventNode!",
      __args: { payload: "PayloadInput_57AndPayloadInput_58!" },
    },
    createLmsTransportLeg: {
      __type: "LmsTransportLegNode!",
      __args: { payload: "PayloadInput_6AndPayloadInput_7!" },
    },
    createLmsTransportationProvider: {
      __type: "LmsTransportationProviderNode!",
      __args: { payload: "PayloadInput_45AndPayloadInput_46!" },
    },
    createLmsWarehouse: {
      __type: "LmsWarehouseNode!",
      __args: { payload: "PayloadInput_51AndPayloadInput_52!" },
    },
    createLmsWarehouseInventory: {
      __type: "LmsWarehouseInventoryNode!",
      __args: { payload: "PayloadInputAndPayloadInput_1!" },
    },
    createOrgDepartment: {
      __type: "OrgDepartmentNode!",
      __args: { payload: "PayloadInput_87AndPayloadInput_88!" },
    },
    createOrgDepartmentPermission: {
      __type: "OrgDepartmentPermissionNode!",
      __args: { payload: "PayloadInput_84AndPayloadInput_85!" },
    },
    createOrgDepartmentTransportMode: {
      __type: "OrgDepartmentTransportModeNode!",
      __args: { payload: "PayloadInput_81AndPayloadInput_82!" },
    },
    createOrgDepartmentUser: {
      __type: "OrgDepartmentUserNode!",
      __args: { payload: "PayloadInput_75AndPayloadInput_76!" },
    },
    createOrgDepartmentUserPermission: {
      __type: "OrgDepartmentUserPermissionNode!",
      __args: { payload: "PayloadInput_78AndPayloadInput_79!" },
    },
    createOrgDriver: {
      __type: "OrgDriverNode!",
      __args: { payload: "PayloadInput_72AndPayloadInput_73!" },
    },
    createOrgVehicle: {
      __type: "OrgVehicleNode!",
      __args: { payload: "PayloadInput_69AndPayloadInput_70!" },
    },
    deleteCrmCampaign: {
      __type: "DeleteCrmCampaign!",
      __args: { id: "String!" },
    },
    deleteCrmCampaignContact: {
      __type: "DeleteCrmCampaignContact!",
      __args: { id: "String!" },
    },
    deleteCrmCase: { __type: "DeleteCrmCase!", __args: { id: "String!" } },
    deleteCrmCompany: {
      __type: "DeleteCrmCompany!",
      __args: { id: "String!" },
    },
    deleteCrmContact: {
      __type: "DeleteCrmContact!",
      __args: { id: "String!" },
    },
    deleteCrmInteraction: {
      __type: "DeleteCrmInteraction!",
      __args: { id: "String!" },
    },
    deleteCrmInvoice: {
      __type: "DeleteCrmInvoice!",
      __args: { id: "String!" },
    },
    deleteCrmInvoiceLineItem: {
      __type: "DeleteCrmInvoiceLineItem!",
      __args: { id: "String!" },
    },
    deleteCrmLead: { __type: "DeleteCrmLead!", __args: { id: "String!" } },
    deleteCrmNotification: {
      __type: "DeleteCrmNotification!",
      __args: { id: "String!" },
    },
    deleteCrmOpportunity: {
      __type: "DeleteCrmOpportunity!",
      __args: { id: "String!" },
    },
    deleteCrmOpportunityProduct: {
      __type: "DeleteCrmOpportunityProduct!",
      __args: { id: "String!" },
    },
    deleteCrmProduct: {
      __type: "DeleteCrmProduct!",
      __args: { id: "String!" },
    },
    deleteLmsAddress: {
      __type: "DeleteLmsAddress!",
      __args: { id: "String!" },
    },
    deleteLmsPackage: {
      __type: "DeleteLmsPackage!",
      __args: { id: "String!" },
    },
    deleteLmsPricingRate: {
      __type: "DeleteLmsPricingRate!",
      __args: { id: "String!" },
    },
    deleteLmsPricingZone: {
      __type: "DeleteLmsPricingZone!",
      __args: { id: "String!" },
    },
    deleteLmsPricingZoneCountry: {
      __type: "DeleteLmsPricingZoneCountry!",
      __args: { id: "String!" },
    },
    deleteLmsProviderInvoice: {
      __type: "DeleteLmsProviderInvoice!",
      __args: { id: "String!" },
    },
    deleteLmsProviderInvoiceLineItem: {
      __type: "DeleteLmsProviderInvoiceLineItem!",
      __args: { id: "String!" },
    },
    deleteLmsProviderPerformance: {
      __type: "DeleteLmsProviderPerformance!",
      __args: { id: "String!" },
    },
    deleteLmsProviderRate: {
      __type: "DeleteLmsProviderRate!",
      __args: { id: "String!" },
    },
    deleteLmsProviderService: {
      __type: "DeleteLmsProviderService!",
      __args: { id: "String!" },
    },
    deleteLmsProviderServiceDestinationCountry: {
      __type: "DeleteLmsProviderServiceDestinationCountry!",
      __args: { id: "String!" },
    },
    deleteLmsProviderServiceMaxDimension: {
      __type: "DeleteLmsProviderServiceMaxDimension!",
      __args: { id: "String!" },
    },
    deleteLmsProviderServiceOriginCountry: {
      __type: "DeleteLmsProviderServiceOriginCountry!",
      __args: { id: "String!" },
    },
    deleteLmsRoute: { __type: "DeleteLmsRoute!", __args: { id: "String!" } },
    deleteLmsRouteShipment: {
      __type: "DeleteLmsRouteShipment!",
      __args: { id: "String!" },
    },
    deleteLmsShipment: {
      __type: "DeleteLmsShipment!",
      __args: { id: "String!" },
    },
    deleteLmsShippingService: {
      __type: "DeleteLmsShippingService!",
      __args: { id: "String!" },
    },
    deleteLmsShippingServiceMaxDimension: {
      __type: "DeleteLmsShippingServiceMaxDimension!",
      __args: { id: "String!" },
    },
    deleteLmsTrackingEvent: {
      __type: "DeleteLmsTrackingEvent!",
      __args: { id: "String!" },
    },
    deleteLmsTransportLeg: {
      __type: "DeleteLmsTransportLeg!",
      __args: { id: "String!" },
    },
    deleteLmsTransportationProvider: {
      __type: "DeleteLmsTransportationProvider!",
      __args: { id: "String!" },
    },
    deleteLmsWarehouse: {
      __type: "DeleteLmsWarehouse!",
      __args: { id: "String!" },
    },
    deleteLmsWarehouseInventory: {
      __type: "DeleteLmsWarehouseInventory!",
      __args: { id: "String!" },
    },
    deleteOrgDepartment: {
      __type: "DeleteOrgDepartment!",
      __args: { id: "String!" },
    },
    deleteOrgDepartmentPermission: {
      __type: "DeleteOrgDepartmentPermission!",
      __args: { id: "String!" },
    },
    deleteOrgDepartmentTransportMode: {
      __type: "DeleteOrgDepartmentTransportMode!",
      __args: { id: "String!" },
    },
    deleteOrgDepartmentUser: {
      __type: "DeleteOrgDepartmentUser!",
      __args: { id: "String!" },
    },
    deleteOrgDepartmentUserPermission: {
      __type: "DeleteOrgDepartmentUserPermission!",
      __args: { id: "String!" },
    },
    deleteOrgDriver: { __type: "DeleteOrgDriver!", __args: { id: "String!" } },
    deleteOrgVehicle: {
      __type: "DeleteOrgVehicle!",
      __args: { id: "String!" },
    },
    login: {
      __type: "Login!",
      __args: { email: "String!", password: "String!" },
    },
    register: {
      __type: "Register!",
      __args: { payload: "PayloadInput_129AndPayloadInput_130!" },
    },
    updateCrmCampaign: {
      __type: "CrmCampaignNode!",
      __args: { id: "String!", payload: "PayloadInput_122!" },
    },
    updateCrmCampaignContact: {
      __type: "CrmCampaignContactNode!",
      __args: { id: "String!", payload: "PayloadInput_92!" },
    },
    updateCrmCase: {
      __type: "CrmCaseNode!",
      __args: { id: "String!", payload: "PayloadInput_119!" },
    },
    updateCrmCompany: {
      __type: "CrmCompanyNode!",
      __args: { id: "String!", payload: "PayloadInput_125!" },
    },
    updateCrmContact: {
      __type: "CrmContactNode!",
      __args: { id: "String!", payload: "PayloadInput_128!" },
    },
    updateCrmInteraction: {
      __type: "CrmInteractionNode!",
      __args: { id: "String!", payload: "PayloadInput_116!" },
    },
    updateCrmInvoice: {
      __type: "CrmInvoiceNode!",
      __args: { id: "String!", payload: "PayloadInput_104!" },
    },
    updateCrmInvoiceLineItem: {
      __type: "CrmInvoiceLineItemNode!",
      __args: { id: "String!", payload: "PayloadInput_101!" },
    },
    updateCrmLead: {
      __type: "CrmLeadNode!",
      __args: { id: "String!", payload: "PayloadInput_113!" },
    },
    updateCrmNotification: {
      __type: "CrmNotificationNode!",
      __args: { id: "String!", payload: "PayloadInput_98!" },
    },
    updateCrmOpportunity: {
      __type: "CrmOpportunityNode!",
      __args: { id: "String!", payload: "PayloadInput_110!" },
    },
    updateCrmOpportunityProduct: {
      __type: "CrmOpportunityProductNode!",
      __args: { id: "String!", payload: "PayloadInput_95!" },
    },
    updateCrmProduct: {
      __type: "CrmProductNode!",
      __args: { id: "String!", payload: "PayloadInput_107!" },
    },
    updateLmsAddress: {
      __type: "LmsAddressNode!",
      __args: { id: "String!", payload: "PayloadInput_68!" },
    },
    updateLmsPackage: {
      __type: "LmsPackageNode!",
      __args: { id: "String!", payload: "PayloadInput_62!" },
    },
    updateLmsPricingRate: {
      __type: "LmsPricingRateNode!",
      __args: { id: "String!", payload: "PayloadInput_44!" },
    },
    updateLmsPricingZone: {
      __type: "LmsPricingZoneNode!",
      __args: { id: "String!", payload: "PayloadInput_41!" },
    },
    updateLmsPricingZoneCountry: {
      __type: "LmsPricingZoneCountryNode!",
      __args: { id: "String!", payload: "PayloadInput_38!" },
    },
    updateLmsProviderInvoice: {
      __type: "LmsProviderInvoiceNode!",
      __args: { id: "String!", payload: "PayloadInput_35!" },
    },
    updateLmsProviderInvoiceLineItem: {
      __type: "LmsProviderInvoiceLineItemNode!",
      __args: { id: "String!", payload: "PayloadInput_32!" },
    },
    updateLmsProviderPerformance: {
      __type: "LmsProviderPerformanceNode!",
      __args: { id: "String!", payload: "PayloadInput_29!" },
    },
    updateLmsProviderRate: {
      __type: "LmsProviderRateNode!",
      __args: { id: "String!", payload: "PayloadInput_26!" },
    },
    updateLmsProviderService: {
      __type: "LmsProviderServiceNode!",
      __args: { id: "String!", payload: "PayloadInput_23!" },
    },
    updateLmsProviderServiceDestinationCountry: {
      __type: "LmsProviderServiceDestinationCountryNode!",
      __args: { id: "String!", payload: "PayloadInput_20!" },
    },
    updateLmsProviderServiceMaxDimension: {
      __type: "LmsProviderServiceMaxDimensionNode!",
      __args: { id: "String!", payload: "PayloadInput_17!" },
    },
    updateLmsProviderServiceOriginCountry: {
      __type: "LmsProviderServiceOriginCountryNode!",
      __args: { id: "String!", payload: "PayloadInput_14!" },
    },
    updateLmsRoute: {
      __type: "LmsRouteNode!",
      __args: { id: "String!", payload: "PayloadInput_56!" },
    },
    updateLmsRouteShipment: {
      __type: "LmsRouteShipmentNode!",
      __args: { id: "String!", payload: "PayloadInput_11!" },
    },
    updateLmsShipment: {
      __type: "LmsShipmentNode!",
      __args: { id: "String!", payload: "PayloadInput_65!" },
    },
    updateLmsShippingService: {
      __type: "LmsShippingServiceNode!",
      __args: { id: "String!", payload: "PayloadInput_50!" },
    },
    updateLmsShippingServiceMaxDimension: {
      __type: "LmsShippingServiceMaxDimensionNode!",
      __args: { id: "String!", payload: "PayloadInput_5!" },
    },
    updateLmsTrackingEvent: {
      __type: "LmsTrackingEventNode!",
      __args: { id: "String!", payload: "PayloadInput_59!" },
    },
    updateLmsTransportLeg: {
      __type: "LmsTransportLegNode!",
      __args: { id: "String!", payload: "PayloadInput_8!" },
    },
    updateLmsTransportationProvider: {
      __type: "LmsTransportationProviderNode!",
      __args: { id: "String!", payload: "PayloadInput_47!" },
    },
    updateLmsWarehouse: {
      __type: "LmsWarehouseNode!",
      __args: { id: "String!", payload: "PayloadInput_53!" },
    },
    updateLmsWarehouseInventory: {
      __type: "LmsWarehouseInventoryNode!",
      __args: { id: "String!", payload: "PayloadInput_2!" },
    },
    updateOrgDepartment: {
      __type: "OrgDepartmentNode!",
      __args: { id: "String!", payload: "PayloadInput_89!" },
    },
    updateOrgDepartmentPermission: {
      __type: "OrgDepartmentPermissionNode!",
      __args: { id: "String!", payload: "PayloadInput_86!" },
    },
    updateOrgDepartmentTransportMode: {
      __type: "OrgDepartmentTransportModeNode!",
      __args: { id: "String!", payload: "PayloadInput_83!" },
    },
    updateOrgDepartmentUser: {
      __type: "OrgDepartmentUserNode!",
      __args: { id: "String!", payload: "PayloadInput_77!" },
    },
    updateOrgDepartmentUserPermission: {
      __type: "OrgDepartmentUserPermissionNode!",
      __args: { id: "String!", payload: "PayloadInput_80!" },
    },
    updateOrgDriver: {
      __type: "OrgDriverNode!",
      __args: { id: "String!", payload: "PayloadInput_74!" },
    },
    updateOrgVehicle: {
      __type: "OrgVehicleNode!",
      __args: { id: "String!", payload: "PayloadInput_71!" },
    },
  },
  query: {
    __typename: { __type: "String!" },
    auth: { __type: "Auth!" },
    crm: { __type: "Crm!" },
    lms: { __type: "Lms!" },
    org: { __type: "Org!" },
  },
  subscription: {},
} as const;

export interface Addresses {
  __typename?: "Addresses";
  list: (args: {
    limit: ScalarsEnums["Number"];
    page: ScalarsEnums["Number"];
  }) => Array<LmsAddressNode>;
  listByCountry: (args: {
    country: ScalarsEnums["String"];
  }) => Array<LmsAddressNode>;
  listByType: (args: {
    addressType: ScalarsEnums["String"];
  }) => Array<LmsAddressNode>;
  listValidated: Array<LmsAddressNode>;
  view: (args: { id: ScalarsEnums["String"] }) => LmsAddressNode;
}

export interface Auth {
  __typename?: "Auth";
  me: AuthUserNode;
}

export interface AuthUserNode {
  __typename?: "AuthUserNode";
  created: ScalarsEnums["DateTimeISO"];
  email: ScalarsEnums["String"];
  emailVerified: ScalarsEnums["Boolean"];
  id: ScalarsEnums["String"];
  name: ScalarsEnums["String"];
  updated: ScalarsEnums["DateTimeISO"];
}

export interface CampaignContacts {
  __typename?: "CampaignContacts";
  list: (args: {
    limit: ScalarsEnums["Number"];
    page: ScalarsEnums["Number"];
  }) => Array<CrmCampaignContactNode>;
  listByCampaign: (args: {
    campaignId: ScalarsEnums["String"];
  }) => Array<CrmCampaignContactNode>;
  listByContact: (args: {
    contactId: ScalarsEnums["String"];
  }) => Array<CrmCampaignContactNode>;
  view: (args: { id: ScalarsEnums["String"] }) => CrmCampaignContactNode;
}

export interface Campaigns {
  __typename?: "Campaigns";
  list: (args: {
    limit: ScalarsEnums["Number"];
    page: ScalarsEnums["Number"];
  }) => Array<CrmCampaignNode>;
  view: (args: { id: ScalarsEnums["String"] }) => CrmCampaignNode;
}

export interface Cases {
  __typename?: "Cases";
  list: (args: {
    limit: ScalarsEnums["Number"];
    page: ScalarsEnums["Number"];
  }) => Array<CrmCaseNode>;
  view: (args: { id: ScalarsEnums["String"] }) => CrmCaseNode;
}

export interface Companies {
  __typename?: "Companies";
  list: (args: {
    limit: ScalarsEnums["Number"];
    page: ScalarsEnums["Number"];
  }) => Array<CrmCompanyNode>;
  view: (args: { id: ScalarsEnums["String"] }) => CrmCompanyNode;
}

export interface Contacts {
  __typename?: "Contacts";
  list: (args: {
    filter?: Maybe<Array<FilterInput>>;
    limit: ScalarsEnums["Number"];
    page: ScalarsEnums["Number"];
    sort?: Maybe<Array<SortInput>>;
  }) => Array<CrmContactNode>;
  view: (args: { id: ScalarsEnums["String"] }) => CrmContactNode;
}

export interface Crm {
  __typename?: "Crm";
  campaignContacts: CampaignContacts;
  campaigns: Campaigns;
  cases: Cases;
  companies: Companies;
  contacts: Contacts;
  interactions: Interactions;
  invoiceLineItems: InvoiceLineItems;
  invoices: Invoices;
  leads: Leads;
  notifications: Notifications;
  opportunities: Opportunities;
  opportunityProducts: OpportunityProducts;
  products: Products;
}

export interface CrmCampaignContactNode {
  __typename?: "CrmCampaignContactNode";
  campaign?: Maybe<CrmCampaignNode>;
  contact?: Maybe<CrmContactNode>;
  created: ScalarsEnums["DateTimeISO"];
  id: ScalarsEnums["String"];
  interactionDate?: Maybe<ScalarsEnums["DateTimeISO"]>;
  status: ScalarsEnums["CrmCampaignContactsStatus"];
  updated: ScalarsEnums["DateTimeISO"];
}

export interface CrmCampaignNode {
  __typename?: "CrmCampaignNode";
  budget?: Maybe<ScalarsEnums["String"]>;
  created: ScalarsEnums["DateTimeISO"];
  description?: Maybe<ScalarsEnums["String"]>;
  endDate?: Maybe<ScalarsEnums["DateTimeISO"]>;
  id: ScalarsEnums["String"];
  name: ScalarsEnums["String"];
  startDate: ScalarsEnums["DateTimeISO"];
  status: ScalarsEnums["CrmCampaignStatus"];
  updated: ScalarsEnums["DateTimeISO"];
}

export interface CrmCaseNode {
  __typename?: "CrmCaseNode";
  closedAt?: Maybe<ScalarsEnums["DateTimeISO"]>;
  contact?: Maybe<CrmContactNode>;
  created: ScalarsEnums["DateTimeISO"];
  description: ScalarsEnums["String"];
  id: ScalarsEnums["String"];
  priority: ScalarsEnums["CrmCasePriority"];
  status: ScalarsEnums["CrmCaseStatus"];
  subject: ScalarsEnums["String"];
  updated: ScalarsEnums["DateTimeISO"];
}

export interface CrmCompanyNode {
  __typename?: "CrmCompanyNode";
  address?: Maybe<LmsAddressNode>;
  created: ScalarsEnums["DateTimeISO"];
  description?: Maybe<ScalarsEnums["String"]>;
  email?: Maybe<ScalarsEnums["String"]>;
  id: ScalarsEnums["String"];
  industry?: Maybe<ScalarsEnums["String"]>;
  name: ScalarsEnums["String"];
  phoneNumber?: Maybe<ScalarsEnums["String"]>;
  updated: ScalarsEnums["DateTimeISO"];
  website?: Maybe<ScalarsEnums["String"]>;
}

export interface CrmContactNode {
  __typename?: "CrmContactNode";
  address?: Maybe<LmsAddressNode>;
  birthDate?: Maybe<ScalarsEnums["DateTimeISO"]>;
  company?: Maybe<CrmCompanyNode>;
  created: ScalarsEnums["DateTimeISO"];
  email: ScalarsEnums["String"];
  firstName: ScalarsEnums["String"];
  id: ScalarsEnums["String"];
  jobTitle?: Maybe<ScalarsEnums["String"]>;
  lastName: ScalarsEnums["String"];
  leadSource?: Maybe<ScalarsEnums["String"]>;
  phoneNumber?: Maybe<ScalarsEnums["String"]>;
  status: ScalarsEnums["CrmContactStatus"];
  updated: ScalarsEnums["DateTimeISO"];
}

export interface CrmInteractionNode {
  __typename?: "CrmInteractionNode";
  contact?: Maybe<CrmContactNode>;
  created: ScalarsEnums["DateTimeISO"];
  description?: Maybe<ScalarsEnums["String"]>;
  id: ScalarsEnums["String"];
  interactionDate: ScalarsEnums["DateTimeISO"];
  opportunity?: Maybe<CrmOpportunityNode>;
  subject?: Maybe<ScalarsEnums["String"]>;
  type: ScalarsEnums["CrmInteractionType"];
  updated: ScalarsEnums["DateTimeISO"];
}

export interface CrmInvoiceLineItemNode {
  __typename?: "CrmInvoiceLineItemNode";
  created: ScalarsEnums["DateTimeISO"];
  description: ScalarsEnums["String"];
  id: ScalarsEnums["String"];
  invoice?: Maybe<CrmInvoiceNode>;
  lineTotal?: Maybe<ScalarsEnums["String"]>;
  quantity: ScalarsEnums["String"];
  shipment?: Maybe<LmsShipmentNode>;
  unitPrice: ScalarsEnums["String"];
  updated: ScalarsEnums["DateTimeISO"];
}

export interface CrmInvoiceNode {
  __typename?: "CrmInvoiceNode";
  company?: Maybe<CrmCompanyNode>;
  contact?: Maybe<CrmContactNode>;
  created: ScalarsEnums["DateTimeISO"];
  currency: ScalarsEnums["String"];
  dueDate: ScalarsEnums["DateTimeISO"];
  id: ScalarsEnums["String"];
  invoiceDate: ScalarsEnums["DateTimeISO"];
  invoiceNumber: ScalarsEnums["String"];
  paymentTerms?: Maybe<ScalarsEnums["String"]>;
  status: ScalarsEnums["CrmInvoiceStatus"];
  subtotal: ScalarsEnums["String"];
  taxAmount: ScalarsEnums["String"];
  totalAmount: ScalarsEnums["String"];
  updated: ScalarsEnums["DateTimeISO"];
}

export interface CrmLeadNode {
  __typename?: "CrmLeadNode";
  companyName?: Maybe<ScalarsEnums["String"]>;
  convertedToContact?: Maybe<CrmContactNode>;
  created: ScalarsEnums["DateTimeISO"];
  email: ScalarsEnums["String"];
  firstName: ScalarsEnums["String"];
  id: ScalarsEnums["String"];
  lastName: ScalarsEnums["String"];
  leadScore: ScalarsEnums["Number"];
  leadSource?: Maybe<ScalarsEnums["String"]>;
  leadStatus: ScalarsEnums["CrmLeadStatus"];
  phoneNumber?: Maybe<ScalarsEnums["String"]>;
  updated: ScalarsEnums["DateTimeISO"];
}

export interface CrmNotificationNode {
  __typename?: "CrmNotificationNode";
  channel: ScalarsEnums["CrmNotificationChannel"];
  contact?: Maybe<CrmContactNode>;
  created: ScalarsEnums["DateTimeISO"];
  deliveryStatus: ScalarsEnums["CrmNotificationDeliveryStatus"];
  id: ScalarsEnums["String"];
  message: ScalarsEnums["String"];
  notificationType: ScalarsEnums["CrmNotificationType"];
  recipient: ScalarsEnums["String"];
  sentAt?: Maybe<ScalarsEnums["DateTimeISO"]>;
  shipment?: Maybe<LmsShipmentNode>;
  subject?: Maybe<ScalarsEnums["String"]>;
  updated: ScalarsEnums["DateTimeISO"];
}

export interface CrmOpportunityNode {
  __typename?: "CrmOpportunityNode";
  amount: ScalarsEnums["String"];
  closeDate?: Maybe<ScalarsEnums["DateTimeISO"]>;
  company?: Maybe<CrmCompanyNode>;
  created: ScalarsEnums["DateTimeISO"];
  id: ScalarsEnums["String"];
  name: ScalarsEnums["String"];
  primaryContact?: Maybe<CrmContactNode>;
  probability: ScalarsEnums["String"];
  stage: ScalarsEnums["CrmOpportunityStage"];
  updated: ScalarsEnums["DateTimeISO"];
}

export interface CrmOpportunityProductNode {
  __typename?: "CrmOpportunityProductNode";
  created: ScalarsEnums["DateTimeISO"];
  id: ScalarsEnums["String"];
  opportunity?: Maybe<CrmOpportunityNode>;
  product?: Maybe<CrmProductNode>;
  quantity: ScalarsEnums["String"];
  totalPrice?: Maybe<ScalarsEnums["String"]>;
  unitPrice: ScalarsEnums["String"];
  updated: ScalarsEnums["DateTimeISO"];
}

export interface CrmProductNode {
  __typename?: "CrmProductNode";
  created: ScalarsEnums["DateTimeISO"];
  description?: Maybe<ScalarsEnums["String"]>;
  id: ScalarsEnums["String"];
  name: ScalarsEnums["String"];
  price: ScalarsEnums["String"];
  sku?: Maybe<ScalarsEnums["String"]>;
  updated: ScalarsEnums["DateTimeISO"];
}

export interface DeleteCrmCampaign {
  __typename?: "DeleteCrmCampaign";
  message: ScalarsEnums["String"];
  success: ScalarsEnums["Boolean"];
}

export interface DeleteCrmCampaignContact {
  __typename?: "DeleteCrmCampaignContact";
  message: ScalarsEnums["String"];
  success: ScalarsEnums["Boolean"];
}

export interface DeleteCrmCase {
  __typename?: "DeleteCrmCase";
  message: ScalarsEnums["String"];
  success: ScalarsEnums["Boolean"];
}

export interface DeleteCrmCompany {
  __typename?: "DeleteCrmCompany";
  message: ScalarsEnums["String"];
  success: ScalarsEnums["Boolean"];
}

export interface DeleteCrmContact {
  __typename?: "DeleteCrmContact";
  message: ScalarsEnums["String"];
  success: ScalarsEnums["Boolean"];
}

export interface DeleteCrmInteraction {
  __typename?: "DeleteCrmInteraction";
  message: ScalarsEnums["String"];
  success: ScalarsEnums["Boolean"];
}

export interface DeleteCrmInvoice {
  __typename?: "DeleteCrmInvoice";
  message: ScalarsEnums["String"];
  success: ScalarsEnums["Boolean"];
}

export interface DeleteCrmInvoiceLineItem {
  __typename?: "DeleteCrmInvoiceLineItem";
  message: ScalarsEnums["String"];
  success: ScalarsEnums["Boolean"];
}

export interface DeleteCrmLead {
  __typename?: "DeleteCrmLead";
  message: ScalarsEnums["String"];
  success: ScalarsEnums["Boolean"];
}

export interface DeleteCrmNotification {
  __typename?: "DeleteCrmNotification";
  message: ScalarsEnums["String"];
  success: ScalarsEnums["Boolean"];
}

export interface DeleteCrmOpportunity {
  __typename?: "DeleteCrmOpportunity";
  message: ScalarsEnums["String"];
  success: ScalarsEnums["Boolean"];
}

export interface DeleteCrmOpportunityProduct {
  __typename?: "DeleteCrmOpportunityProduct";
  message: ScalarsEnums["String"];
  success: ScalarsEnums["Boolean"];
}

export interface DeleteCrmProduct {
  __typename?: "DeleteCrmProduct";
  message: ScalarsEnums["String"];
  success: ScalarsEnums["Boolean"];
}

export interface DeleteLmsAddress {
  __typename?: "DeleteLmsAddress";
  message: ScalarsEnums["String"];
  success: ScalarsEnums["Boolean"];
}

export interface DeleteLmsPackage {
  __typename?: "DeleteLmsPackage";
  message: ScalarsEnums["String"];
  success: ScalarsEnums["Boolean"];
}

export interface DeleteLmsPricingRate {
  __typename?: "DeleteLmsPricingRate";
  message: ScalarsEnums["String"];
  success: ScalarsEnums["Boolean"];
}

export interface DeleteLmsPricingZone {
  __typename?: "DeleteLmsPricingZone";
  message: ScalarsEnums["String"];
  success: ScalarsEnums["Boolean"];
}

export interface DeleteLmsPricingZoneCountry {
  __typename?: "DeleteLmsPricingZoneCountry";
  message: ScalarsEnums["String"];
  success: ScalarsEnums["Boolean"];
}

export interface DeleteLmsProviderInvoice {
  __typename?: "DeleteLmsProviderInvoice";
  message: ScalarsEnums["String"];
  success: ScalarsEnums["Boolean"];
}

export interface DeleteLmsProviderInvoiceLineItem {
  __typename?: "DeleteLmsProviderInvoiceLineItem";
  message: ScalarsEnums["String"];
  success: ScalarsEnums["Boolean"];
}

export interface DeleteLmsProviderPerformance {
  __typename?: "DeleteLmsProviderPerformance";
  message: ScalarsEnums["String"];
  success: ScalarsEnums["Boolean"];
}

export interface DeleteLmsProviderRate {
  __typename?: "DeleteLmsProviderRate";
  message: ScalarsEnums["String"];
  success: ScalarsEnums["Boolean"];
}

export interface DeleteLmsProviderService {
  __typename?: "DeleteLmsProviderService";
  message: ScalarsEnums["String"];
  success: ScalarsEnums["Boolean"];
}

export interface DeleteLmsProviderServiceDestinationCountry {
  __typename?: "DeleteLmsProviderServiceDestinationCountry";
  message: ScalarsEnums["String"];
  success: ScalarsEnums["Boolean"];
}

export interface DeleteLmsProviderServiceMaxDimension {
  __typename?: "DeleteLmsProviderServiceMaxDimension";
  message: ScalarsEnums["String"];
  success: ScalarsEnums["Boolean"];
}

export interface DeleteLmsProviderServiceOriginCountry {
  __typename?: "DeleteLmsProviderServiceOriginCountry";
  message: ScalarsEnums["String"];
  success: ScalarsEnums["Boolean"];
}

export interface DeleteLmsRoute {
  __typename?: "DeleteLmsRoute";
  message: ScalarsEnums["String"];
  success: ScalarsEnums["Boolean"];
}

export interface DeleteLmsRouteShipment {
  __typename?: "DeleteLmsRouteShipment";
  message: ScalarsEnums["String"];
  success: ScalarsEnums["Boolean"];
}

export interface DeleteLmsShipment {
  __typename?: "DeleteLmsShipment";
  message: ScalarsEnums["String"];
  success: ScalarsEnums["Boolean"];
}

export interface DeleteLmsShippingService {
  __typename?: "DeleteLmsShippingService";
  message: ScalarsEnums["String"];
  success: ScalarsEnums["Boolean"];
}

export interface DeleteLmsShippingServiceMaxDimension {
  __typename?: "DeleteLmsShippingServiceMaxDimension";
  message: ScalarsEnums["String"];
  success: ScalarsEnums["Boolean"];
}

export interface DeleteLmsTrackingEvent {
  __typename?: "DeleteLmsTrackingEvent";
  message: ScalarsEnums["String"];
  success: ScalarsEnums["Boolean"];
}

export interface DeleteLmsTransportLeg {
  __typename?: "DeleteLmsTransportLeg";
  message: ScalarsEnums["String"];
  success: ScalarsEnums["Boolean"];
}

export interface DeleteLmsTransportationProvider {
  __typename?: "DeleteLmsTransportationProvider";
  message: ScalarsEnums["String"];
  success: ScalarsEnums["Boolean"];
}

export interface DeleteLmsWarehouse {
  __typename?: "DeleteLmsWarehouse";
  message: ScalarsEnums["String"];
  success: ScalarsEnums["Boolean"];
}

export interface DeleteLmsWarehouseInventory {
  __typename?: "DeleteLmsWarehouseInventory";
  message: ScalarsEnums["String"];
  success: ScalarsEnums["Boolean"];
}

export interface DeleteOrgDepartment {
  __typename?: "DeleteOrgDepartment";
  message: ScalarsEnums["String"];
  success: ScalarsEnums["Boolean"];
}

export interface DeleteOrgDepartmentPermission {
  __typename?: "DeleteOrgDepartmentPermission";
  message: ScalarsEnums["String"];
  success: ScalarsEnums["Boolean"];
}

export interface DeleteOrgDepartmentTransportMode {
  __typename?: "DeleteOrgDepartmentTransportMode";
  message: ScalarsEnums["String"];
  success: ScalarsEnums["Boolean"];
}

export interface DeleteOrgDepartmentUser {
  __typename?: "DeleteOrgDepartmentUser";
  message: ScalarsEnums["String"];
  success: ScalarsEnums["Boolean"];
}

export interface DeleteOrgDepartmentUserPermission {
  __typename?: "DeleteOrgDepartmentUserPermission";
  message: ScalarsEnums["String"];
  success: ScalarsEnums["Boolean"];
}

export interface DeleteOrgDriver {
  __typename?: "DeleteOrgDriver";
  message: ScalarsEnums["String"];
  success: ScalarsEnums["Boolean"];
}

export interface DeleteOrgVehicle {
  __typename?: "DeleteOrgVehicle";
  message: ScalarsEnums["String"];
  success: ScalarsEnums["Boolean"];
}

export interface DepartmentPermissions {
  __typename?: "DepartmentPermissions";
  list: (args: {
    limit: ScalarsEnums["Number"];
    page: ScalarsEnums["Number"];
  }) => Array<OrgDepartmentPermissionNode>;
  listByDepartment: (args: {
    departmentId: ScalarsEnums["String"];
  }) => Array<OrgDepartmentPermissionNode>;
  view: (args: { id: ScalarsEnums["String"] }) => OrgDepartmentPermissionNode;
}

export interface DepartmentTransportModes {
  __typename?: "DepartmentTransportModes";
  list: (args: {
    limit: ScalarsEnums["Number"];
    page: ScalarsEnums["Number"];
  }) => Array<OrgDepartmentTransportModeNode>;
  listByDepartment: (args: {
    departmentId: ScalarsEnums["String"];
  }) => Array<OrgDepartmentTransportModeNode>;
  listPrimaryByDepartment: (args: {
    departmentId: ScalarsEnums["String"];
  }) => Array<OrgDepartmentTransportModeNode>;
  view: (args: {
    id: ScalarsEnums["String"];
  }) => OrgDepartmentTransportModeNode;
}

export interface DepartmentUserPermissions {
  __typename?: "DepartmentUserPermissions";
  list: (args: {
    limit: ScalarsEnums["Number"];
    page: ScalarsEnums["Number"];
  }) => Array<OrgDepartmentUserPermissionNode>;
  listByUser: (args: {
    userId: ScalarsEnums["String"];
  }) => Array<OrgDepartmentUserPermissionNode>;
  view: (args: {
    id: ScalarsEnums["String"];
  }) => OrgDepartmentUserPermissionNode;
}

export interface DepartmentUsers {
  __typename?: "DepartmentUsers";
  list: (args: {
    limit: ScalarsEnums["Number"];
    page: ScalarsEnums["Number"];
  }) => Array<OrgDepartmentUserNode>;
  listActiveDepartmentUsers: (args: {
    departmentId: ScalarsEnums["String"];
  }) => Array<OrgDepartmentUserNode>;
  listByDepartment: (args: {
    departmentId: ScalarsEnums["String"];
  }) => Array<OrgDepartmentUserNode>;
  listByUser: (args: {
    userId: ScalarsEnums["String"];
  }) => Array<OrgDepartmentUserNode>;
  view: (args: { id: ScalarsEnums["String"] }) => OrgDepartmentUserNode;
}

export interface Departments {
  __typename?: "Departments";
  list: (args: {
    limit: ScalarsEnums["Number"];
    page: ScalarsEnums["Number"];
  }) => Array<OrgDepartmentNode>;
  listActive: Array<OrgDepartmentNode>;
  view: (args: { id: ScalarsEnums["String"] }) => OrgDepartmentNode;
}

export interface Drivers {
  __typename?: "Drivers";
  list: (args: {
    limit: ScalarsEnums["Number"];
    page: ScalarsEnums["Number"];
  }) => Array<OrgDriverNode>;
  listByStatus: (args: {
    status: ScalarsEnums["String"];
  }) => Array<OrgDriverNode>;
  view: (args: { id: ScalarsEnums["String"] }) => OrgDriverNode;
  viewByEmployeeId: (args: {
    employeeId: ScalarsEnums["String"];
  }) => OrgDriverNode;
  viewByLicenseNumber: (args: {
    licenseNumber: ScalarsEnums["String"];
  }) => OrgDriverNode;
}

export interface Interactions {
  __typename?: "Interactions";
  list: (args: {
    limit: ScalarsEnums["Number"];
    page: ScalarsEnums["Number"];
  }) => Array<CrmInteractionNode>;
  view: (args: { id: ScalarsEnums["String"] }) => CrmInteractionNode;
}

export interface InvoiceLineItems {
  __typename?: "InvoiceLineItems";
  list: (args: {
    limit: ScalarsEnums["Number"];
    page: ScalarsEnums["Number"];
  }) => Array<CrmInvoiceLineItemNode>;
  listByInvoice: (args: {
    invoiceId: ScalarsEnums["String"];
  }) => Array<CrmInvoiceLineItemNode>;
  view: (args: { id: ScalarsEnums["String"] }) => CrmInvoiceLineItemNode;
}

export interface Invoices {
  __typename?: "Invoices";
  list: (args: {
    limit: ScalarsEnums["Number"];
    page: ScalarsEnums["Number"];
  }) => Array<CrmInvoiceNode>;
  view: (args: { id: ScalarsEnums["String"] }) => CrmInvoiceNode;
}

export interface Leads {
  __typename?: "Leads";
  list: (args: {
    limit: ScalarsEnums["Number"];
    page: ScalarsEnums["Number"];
  }) => Array<CrmLeadNode>;
  view: (args: { id: ScalarsEnums["String"] }) => CrmLeadNode;
}

export interface Lms {
  __typename?: "Lms";
  addresses: Addresses;
  packages: Packages;
  pricingRates: PricingRates;
  pricingZoneCountries: PricingZoneCountries;
  pricingZones: PricingZones;
  providerInvoiceLineItems: ProviderInvoiceLineItems;
  providerInvoices: ProviderInvoices;
  providerPerformance: ProviderPerformance;
  providerRates: ProviderRates;
  providerServiceDestinationCountries: ProviderServiceDestinationCountries;
  providerServiceMaxDimensions: ProviderServiceMaxDimensions;
  providerServiceOriginCountries: ProviderServiceOriginCountries;
  providerServices: ProviderServices;
  routeShipments: RouteShipments;
  routes: Routes;
  shipments: Shipments;
  shippingServiceMaxDimensions: ShippingServiceMaxDimensions;
  shippingServices: ShippingServices;
  trackingEvents: TrackingEvents;
  transportLegs: TransportLegs;
  transportationProviders: TransportationProviders;
  warehouseInventories: WarehouseInventories;
  warehouses: Warehouses;
}

export interface LmsAddressNode {
  __typename?: "LmsAddressNode";
  addressLine1: ScalarsEnums["String"];
  addressLine2?: Maybe<ScalarsEnums["String"]>;
  addressType: ScalarsEnums["LmsAddressType"];
  city: ScalarsEnums["String"];
  country: ScalarsEnums["String"];
  created: ScalarsEnums["DateTimeISO"];
  id: ScalarsEnums["String"];
  isValidated: ScalarsEnums["Boolean"];
  latitude?: Maybe<ScalarsEnums["String"]>;
  longitude?: Maybe<ScalarsEnums["String"]>;
  postalCode: ScalarsEnums["String"];
  state: ScalarsEnums["String"];
  updated: ScalarsEnums["DateTimeISO"];
}

export interface LmsPackageNode {
  __typename?: "LmsPackageNode";
  contentsDescription?: Maybe<ScalarsEnums["String"]>;
  created: ScalarsEnums["DateTimeISO"];
  declaredValue?: Maybe<ScalarsEnums["String"]>;
  height?: Maybe<ScalarsEnums["String"]>;
  id: ScalarsEnums["String"];
  length?: Maybe<ScalarsEnums["String"]>;
  packageNumber: ScalarsEnums["String"];
  packageType: ScalarsEnums["LmsPackageType"];
  shipment?: Maybe<LmsShipmentNode>;
  updated: ScalarsEnums["DateTimeISO"];
  weight: ScalarsEnums["String"];
  width?: Maybe<ScalarsEnums["String"]>;
}

export interface LmsPricingRateNode {
  __typename?: "LmsPricingRateNode";
  baseRate: ScalarsEnums["String"];
  created: ScalarsEnums["DateTimeISO"];
  destinationZoneId: ScalarsEnums["String"];
  effectiveDate: ScalarsEnums["DateTimeISO"];
  expiryDate?: Maybe<ScalarsEnums["DateTimeISO"]>;
  fuelSurchargeRate?: Maybe<ScalarsEnums["String"]>;
  id: ScalarsEnums["String"];
  originZoneId: ScalarsEnums["String"];
  perKgRate: ScalarsEnums["String"];
  serviceId: ScalarsEnums["String"];
  updated: ScalarsEnums["DateTimeISO"];
  weightMax: ScalarsEnums["String"];
  weightMin: ScalarsEnums["String"];
}

export interface LmsPricingZoneCountryNode {
  __typename?: "LmsPricingZoneCountryNode";
  countryCode: ScalarsEnums["String"];
  created: ScalarsEnums["DateTimeISO"];
  id: ScalarsEnums["String"];
  pricingZoneId: ScalarsEnums["String"];
}

export interface LmsPricingZoneNode {
  __typename?: "LmsPricingZoneNode";
  created: ScalarsEnums["DateTimeISO"];
  id: ScalarsEnums["String"];
  name: ScalarsEnums["String"];
  updated: ScalarsEnums["DateTimeISO"];
  zoneCode: ScalarsEnums["String"];
}

export interface LmsProviderInvoiceLineItemNode {
  __typename?: "LmsProviderInvoiceLineItemNode";
  created: ScalarsEnums["DateTimeISO"];
  description: ScalarsEnums["String"];
  id: ScalarsEnums["String"];
  lineTotal?: Maybe<ScalarsEnums["String"]>;
  providerInvoiceId: ScalarsEnums["String"];
  quantity: ScalarsEnums["Number"];
  transportLegId: ScalarsEnums["String"];
  unitPrice: ScalarsEnums["String"];
  updated: ScalarsEnums["DateTimeISO"];
}

export interface LmsProviderInvoiceNode {
  __typename?: "LmsProviderInvoiceNode";
  created: ScalarsEnums["DateTimeISO"];
  currency: ScalarsEnums["String"];
  dueDate: ScalarsEnums["DateTimeISO"];
  id: ScalarsEnums["String"];
  invoiceDate: ScalarsEnums["DateTimeISO"];
  invoiceNumber: ScalarsEnums["String"];
  paymentDate?: Maybe<ScalarsEnums["DateTimeISO"]>;
  providerId: ScalarsEnums["String"];
  status: ScalarsEnums["LmsProviderInvoiceStatus"];
  subtotal: ScalarsEnums["String"];
  taxAmount?: Maybe<ScalarsEnums["String"]>;
  totalAmount?: Maybe<ScalarsEnums["String"]>;
  updated: ScalarsEnums["DateTimeISO"];
}

export interface LmsProviderPerformanceNode {
  __typename?: "LmsProviderPerformanceNode";
  created: ScalarsEnums["DateTimeISO"];
  id: ScalarsEnums["String"];
  measurementDate: ScalarsEnums["DateTimeISO"];
  metricType: ScalarsEnums["LmsPerformanceMetricType"];
  metricValue?: Maybe<ScalarsEnums["String"]>;
  notes?: Maybe<ScalarsEnums["String"]>;
  providerId: ScalarsEnums["String"];
  shipmentId: ScalarsEnums["String"];
  transportLegId?: Maybe<ScalarsEnums["String"]>;
  updated: ScalarsEnums["DateTimeISO"];
}

export interface LmsProviderRateNode {
  __typename?: "LmsProviderRateNode";
  baseRate: ScalarsEnums["String"];
  created: ScalarsEnums["DateTimeISO"];
  currency: ScalarsEnums["String"];
  destinationZoneId: ScalarsEnums["String"];
  effectiveDate: ScalarsEnums["DateTimeISO"];
  expiryDate?: Maybe<ScalarsEnums["DateTimeISO"]>;
  fuelSurchargeRate?: Maybe<ScalarsEnums["String"]>;
  id: ScalarsEnums["String"];
  originZoneId: ScalarsEnums["String"];
  perKgRate: ScalarsEnums["String"];
  providerServiceId: ScalarsEnums["String"];
  updated: ScalarsEnums["DateTimeISO"];
  weightMax: ScalarsEnums["String"];
  weightMin: ScalarsEnums["String"];
}

export interface LmsProviderServiceDestinationCountryNode {
  __typename?: "LmsProviderServiceDestinationCountryNode";
  countryCode: ScalarsEnums["String"];
  created: ScalarsEnums["DateTimeISO"];
  id: ScalarsEnums["String"];
  providerServiceId: ScalarsEnums["String"];
}

export interface LmsProviderServiceMaxDimensionNode {
  __typename?: "LmsProviderServiceMaxDimensionNode";
  created: ScalarsEnums["DateTimeISO"];
  height?: Maybe<ScalarsEnums["String"]>;
  id: ScalarsEnums["String"];
  length?: Maybe<ScalarsEnums["String"]>;
  providerServiceId: ScalarsEnums["String"];
  width?: Maybe<ScalarsEnums["String"]>;
}

export interface LmsProviderServiceNode {
  __typename?: "LmsProviderServiceNode";
  created: ScalarsEnums["DateTimeISO"];
  cutoffTime?: Maybe<ScalarsEnums["String"]>;
  id: ScalarsEnums["String"];
  insuranceAvailable: ScalarsEnums["Boolean"];
  isActive: ScalarsEnums["Boolean"];
  maxWeight?: Maybe<ScalarsEnums["String"]>;
  provider?: Maybe<LmsTransportationProviderNode>;
  serviceName: ScalarsEnums["String"];
  serviceType: ScalarsEnums["LmsServiceType"];
  trackingAvailable: ScalarsEnums["Boolean"];
  transitTimeMax?: Maybe<ScalarsEnums["Number"]>;
  transitTimeMin?: Maybe<ScalarsEnums["Number"]>;
  transportMode: ScalarsEnums["LmsTransportMode"];
  updated: ScalarsEnums["DateTimeISO"];
}

export interface LmsProviderServiceOriginCountryNode {
  __typename?: "LmsProviderServiceOriginCountryNode";
  countryCode: ScalarsEnums["String"];
  created: ScalarsEnums["DateTimeISO"];
  id: ScalarsEnums["String"];
  providerServiceId: ScalarsEnums["String"];
}

export interface LmsRouteNode {
  __typename?: "LmsRouteNode";
  actualArrival?: Maybe<ScalarsEnums["DateTimeISO"]>;
  actualDeparture?: Maybe<ScalarsEnums["DateTimeISO"]>;
  created: ScalarsEnums["DateTimeISO"];
  driver?: Maybe<OrgDriverNode>;
  estimatedArrival?: Maybe<ScalarsEnums["DateTimeISO"]>;
  estimatedDeparture?: Maybe<ScalarsEnums["DateTimeISO"]>;
  id: ScalarsEnums["String"];
  routeDate: ScalarsEnums["DateTimeISO"];
  routeName: ScalarsEnums["String"];
  status: ScalarsEnums["LmsRouteStatus"];
  updated: ScalarsEnums["DateTimeISO"];
  vehicle?: Maybe<OrgVehicleNode>;
}

export interface LmsRouteShipmentNode {
  __typename?: "LmsRouteShipmentNode";
  actualDelivery?: Maybe<ScalarsEnums["DateTimeISO"]>;
  created: ScalarsEnums["DateTimeISO"];
  deliveryDate: ScalarsEnums["DateTimeISO"];
  deliveryStatus: ScalarsEnums["LmsDeliveryStatus"];
  estimatedDelivery?: Maybe<ScalarsEnums["DateTimeISO"]>;
  id: ScalarsEnums["String"];
  recipientSignature?: Maybe<ScalarsEnums["String"]>;
  route?: Maybe<LmsRouteNode>;
  sequenceNumber: ScalarsEnums["Number"];
  shipment?: Maybe<LmsShipmentNode>;
  signatureRequired: ScalarsEnums["Boolean"];
  updated: ScalarsEnums["DateTimeISO"];
}

export interface LmsShipmentNode {
  __typename?: "LmsShipmentNode";
  assignedDepartment?: Maybe<OrgDepartmentNode>;
  created: ScalarsEnums["DateTimeISO"];
  createdByUser?: Maybe<AuthUserNode>;
  currency: ScalarsEnums["String"];
  deliveryDate?: Maybe<ScalarsEnums["DateTimeISO"]>;
  estimatedDeliveryDate?: Maybe<ScalarsEnums["DateTimeISO"]>;
  id: ScalarsEnums["String"];
  insuranceAmount?: Maybe<ScalarsEnums["String"]>;
  pickupDate?: Maybe<ScalarsEnums["DateTimeISO"]>;
  primaryTransportMode: ScalarsEnums["LmsTransportMode"];
  receiverAddress?: Maybe<LmsAddressNode>;
  receiverCompany?: Maybe<CrmCompanyNode>;
  receiverContact?: Maybe<CrmContactNode>;
  senderAddress?: Maybe<LmsAddressNode>;
  senderCompany?: Maybe<CrmCompanyNode>;
  senderContact?: Maybe<CrmContactNode>;
  shippingCost?: Maybe<ScalarsEnums["String"]>;
  specialInstructions?: Maybe<ScalarsEnums["String"]>;
  status: ScalarsEnums["LmsShipmentStatus"];
  totalValue?: Maybe<ScalarsEnums["String"]>;
  totalWeight: ScalarsEnums["String"];
  trackingNumber: ScalarsEnums["String"];
  updated: ScalarsEnums["DateTimeISO"];
}

export interface LmsShippingServiceMaxDimensionNode {
  __typename?: "LmsShippingServiceMaxDimensionNode";
  created: ScalarsEnums["DateTimeISO"];
  height?: Maybe<ScalarsEnums["String"]>;
  id: ScalarsEnums["String"];
  length?: Maybe<ScalarsEnums["String"]>;
  shippingServiceId: ScalarsEnums["String"];
  width?: Maybe<ScalarsEnums["String"]>;
}

export interface LmsShippingServiceNode {
  __typename?: "LmsShippingServiceNode";
  created: ScalarsEnums["DateTimeISO"];
  deliveryTimeMax?: Maybe<ScalarsEnums["Number"]>;
  deliveryTimeMin?: Maybe<ScalarsEnums["Number"]>;
  description?: Maybe<ScalarsEnums["String"]>;
  id: ScalarsEnums["String"];
  isActive: ScalarsEnums["Boolean"];
  maxWeight?: Maybe<ScalarsEnums["String"]>;
  name: ScalarsEnums["String"];
  serviceType: ScalarsEnums["LmsServiceType"];
  updated: ScalarsEnums["DateTimeISO"];
}

export interface LmsTrackingEventNode {
  __typename?: "LmsTrackingEventNode";
  created: ScalarsEnums["DateTimeISO"];
  eventDescription: ScalarsEnums["String"];
  eventLocation?: Maybe<ScalarsEnums["String"]>;
  eventTimestamp: ScalarsEnums["DateTimeISO"];
  eventType: ScalarsEnums["LmsTrackingEventType"];
  id: ScalarsEnums["String"];
  shipment?: Maybe<LmsShipmentNode>;
  updated: ScalarsEnums["DateTimeISO"];
}

export interface LmsTransportLegNode {
  __typename?: "LmsTransportLegNode";
  actualDelivery?: Maybe<ScalarsEnums["DateTimeISO"]>;
  actualPickup?: Maybe<ScalarsEnums["DateTimeISO"]>;
  cost?: Maybe<ScalarsEnums["String"]>;
  created: ScalarsEnums["DateTimeISO"];
  currency?: Maybe<ScalarsEnums["String"]>;
  destinationAddress?: Maybe<LmsAddressNode>;
  destinationWarehouse?: Maybe<LmsWarehouseNode>;
  driver?: Maybe<OrgDriverNode>;
  id: ScalarsEnums["String"];
  legSequence: ScalarsEnums["Number"];
  originAddress?: Maybe<LmsAddressNode>;
  originWarehouse?: Maybe<LmsWarehouseNode>;
  provider?: Maybe<LmsTransportationProviderNode>;
  providerTrackingNumber?: Maybe<ScalarsEnums["String"]>;
  scheduledDelivery?: Maybe<ScalarsEnums["DateTimeISO"]>;
  scheduledPickup?: Maybe<ScalarsEnums["DateTimeISO"]>;
  shipment?: Maybe<LmsShipmentNode>;
  specialInstructions?: Maybe<ScalarsEnums["String"]>;
  status: ScalarsEnums["LmsLegStatus"];
  transportType: ScalarsEnums["LmsTransportLegType"];
  updated: ScalarsEnums["DateTimeISO"];
  vehicle?: Maybe<OrgVehicleNode>;
}

export interface LmsTransportationProviderNode {
  __typename?: "LmsTransportationProviderNode";
  address?: Maybe<LmsAddressNode>;
  apiEndpoint?: Maybe<ScalarsEnums["String"]>;
  apiKey?: Maybe<ScalarsEnums["String"]>;
  companyName: ScalarsEnums["String"];
  contactPerson?: Maybe<ScalarsEnums["String"]>;
  contractEndDate?: Maybe<ScalarsEnums["DateTimeISO"]>;
  contractStartDate?: Maybe<ScalarsEnums["DateTimeISO"]>;
  created: ScalarsEnums["DateTimeISO"];
  email?: Maybe<ScalarsEnums["String"]>;
  id: ScalarsEnums["String"];
  insuranceCoverage?: Maybe<ScalarsEnums["String"]>;
  isActive: ScalarsEnums["Boolean"];
  paymentTerms?: Maybe<ScalarsEnums["String"]>;
  performanceRating?: Maybe<ScalarsEnums["String"]>;
  phoneNumber?: Maybe<ScalarsEnums["String"]>;
  preferredByDepartment?: Maybe<OrgDepartmentNode>;
  providerType: ScalarsEnums["LmsProviderType"];
  updated: ScalarsEnums["DateTimeISO"];
}

export interface LmsWarehouseInventoryNode {
  __typename?: "LmsWarehouseInventoryNode";
  arrivedAt?: Maybe<ScalarsEnums["DateTimeISO"]>;
  created: ScalarsEnums["DateTimeISO"];
  departedAt?: Maybe<ScalarsEnums["DateTimeISO"]>;
  id: ScalarsEnums["String"];
  locationCode?: Maybe<ScalarsEnums["String"]>;
  package?: Maybe<LmsPackageNode>;
  shipment?: Maybe<LmsShipmentNode>;
  status: ScalarsEnums["LmsWarehouseInventoryStatus"];
  updated: ScalarsEnums["DateTimeISO"];
  warehouse?: Maybe<LmsWarehouseNode>;
}

export interface LmsWarehouseNode {
  __typename?: "LmsWarehouseNode";
  address?: Maybe<LmsAddressNode>;
  capacity?: Maybe<ScalarsEnums["Number"]>;
  code: ScalarsEnums["String"];
  created: ScalarsEnums["DateTimeISO"];
  department?: Maybe<OrgDepartmentNode>;
  id: ScalarsEnums["String"];
  isActive: ScalarsEnums["Boolean"];
  manager?: Maybe<AuthUserNode>;
  name: ScalarsEnums["String"];
  updated: ScalarsEnums["DateTimeISO"];
  warehouseType: ScalarsEnums["LmsWarehouseType"];
}

export interface Login {
  __typename?: "Login";
  token: ScalarsEnums["String"];
  user: AuthUserNode;
}

export interface Notifications {
  __typename?: "Notifications";
  list: (args: {
    limit: ScalarsEnums["Number"];
    page: ScalarsEnums["Number"];
  }) => Array<CrmNotificationNode>;
  listByContact: (args: {
    contactId: ScalarsEnums["String"];
  }) => Array<CrmNotificationNode>;
  listByShipment: (args: {
    shipmentId: ScalarsEnums["String"];
  }) => Array<CrmNotificationNode>;
  view: (args: { id: ScalarsEnums["String"] }) => CrmNotificationNode;
}

export interface Opportunities {
  __typename?: "Opportunities";
  list: (args: {
    limit: ScalarsEnums["Number"];
    page: ScalarsEnums["Number"];
  }) => Array<CrmOpportunityNode>;
  view: (args: { id: ScalarsEnums["String"] }) => CrmOpportunityNode;
}

export interface OpportunityProducts {
  __typename?: "OpportunityProducts";
  list: (args: {
    limit: ScalarsEnums["Number"];
    page: ScalarsEnums["Number"];
  }) => Array<CrmOpportunityProductNode>;
  listByOpportunity: (args: {
    opportunityId: ScalarsEnums["String"];
  }) => Array<CrmOpportunityProductNode>;
  view: (args: { id: ScalarsEnums["String"] }) => CrmOpportunityProductNode;
}

export interface Org {
  __typename?: "Org";
  departmentPermissions: DepartmentPermissions;
  departmentTransportModes: DepartmentTransportModes;
  departmentUserPermissions: DepartmentUserPermissions;
  departmentUsers: DepartmentUsers;
  departments: Departments;
  drivers: Drivers;
  vehicles: Vehicles;
}

export interface OrgDepartmentNode {
  __typename?: "OrgDepartmentNode";
  budget?: Maybe<ScalarsEnums["String"]>;
  code: ScalarsEnums["String"];
  created: ScalarsEnums["DateTimeISO"];
  departmentType: ScalarsEnums["String"];
  description?: Maybe<ScalarsEnums["String"]>;
  email?: Maybe<ScalarsEnums["String"]>;
  id: ScalarsEnums["String"];
  isActive: ScalarsEnums["Boolean"];
  manager?: Maybe<AuthUserNode>;
  name: ScalarsEnums["String"];
  phoneNumber?: Maybe<ScalarsEnums["String"]>;
  updated: ScalarsEnums["DateTimeISO"];
}

export interface OrgDepartmentPermissionNode {
  __typename?: "OrgDepartmentPermissionNode";
  action: ScalarsEnums["OrgPermissionStatus"];
  created: ScalarsEnums["DateTimeISO"];
  department?: Maybe<OrgDepartmentNode>;
  id: ScalarsEnums["String"];
  resource: ScalarsEnums["String"];
  updated: ScalarsEnums["DateTimeISO"];
}

export interface OrgDepartmentTransportModeNode {
  __typename?: "OrgDepartmentTransportModeNode";
  created: ScalarsEnums["DateTimeISO"];
  department?: Maybe<OrgDepartmentNode>;
  id: ScalarsEnums["String"];
  isPrimary: ScalarsEnums["Boolean"];
  transportMode: ScalarsEnums["String"];
  updated: ScalarsEnums["DateTimeISO"];
}

export interface OrgDepartmentUserNode {
  __typename?: "OrgDepartmentUserNode";
  assignedDate: ScalarsEnums["DateTimeISO"];
  created: ScalarsEnums["DateTimeISO"];
  department?: Maybe<OrgDepartmentNode>;
  id: ScalarsEnums["String"];
  isActive: ScalarsEnums["Boolean"];
  role: ScalarsEnums["String"];
  updated: ScalarsEnums["DateTimeISO"];
  user?: Maybe<AuthUserNode>;
}

export interface OrgDepartmentUserPermissionNode {
  __typename?: "OrgDepartmentUserPermissionNode";
  created: ScalarsEnums["DateTimeISO"];
  id: ScalarsEnums["String"];
  permission?: Maybe<OrgDepartmentPermissionNode>;
  user?: Maybe<AuthUserNode>;
}

export interface OrgDriverNode {
  __typename?: "OrgDriverNode";
  created: ScalarsEnums["DateTimeISO"];
  email: ScalarsEnums["String"];
  employeeId: ScalarsEnums["String"];
  firstName: ScalarsEnums["String"];
  hireDate: ScalarsEnums["DateTimeISO"];
  id: ScalarsEnums["String"];
  lastName: ScalarsEnums["String"];
  licenseNumber: ScalarsEnums["String"];
  phoneNumber: ScalarsEnums["String"];
  status: ScalarsEnums["OrgDriverStatus"];
  updated: ScalarsEnums["DateTimeISO"];
}

export interface OrgVehicleNode {
  __typename?: "OrgVehicleNode";
  capacityVolume?: Maybe<ScalarsEnums["String"]>;
  capacityWeight?: Maybe<ScalarsEnums["String"]>;
  created: ScalarsEnums["DateTimeISO"];
  department?: Maybe<OrgDepartmentNode>;
  id: ScalarsEnums["String"];
  licensePlate: ScalarsEnums["String"];
  make: ScalarsEnums["String"];
  model: ScalarsEnums["String"];
  status: ScalarsEnums["OrgVehicleStatus"];
  updated: ScalarsEnums["DateTimeISO"];
  vehicleNumber: ScalarsEnums["String"];
  vehicleType: ScalarsEnums["OrgVehicleType"];
  warehouse?: Maybe<LmsWarehouseNode>;
  year: ScalarsEnums["Number"];
}

export interface Packages {
  __typename?: "Packages";
  list: (args: {
    limit: ScalarsEnums["Number"];
    page: ScalarsEnums["Number"];
  }) => Array<LmsPackageNode>;
  listByShipment: (args: {
    shipmentId: ScalarsEnums["String"];
  }) => Array<LmsPackageNode>;
  listByType: (args: {
    packageType: ScalarsEnums["String"];
  }) => Array<LmsPackageNode>;
  view: (args: { id: ScalarsEnums["String"] }) => LmsPackageNode;
}

export interface PricingRates {
  __typename?: "PricingRates";
  list: (args: {
    limit: ScalarsEnums["Number"];
    page: ScalarsEnums["Number"];
  }) => Array<LmsPricingRateNode>;
  listActive: Array<LmsPricingRateNode>;
  listByRoute: (args: {
    destinationZoneId: ScalarsEnums["String"];
    originZoneId: ScalarsEnums["String"];
  }) => Array<LmsPricingRateNode>;
  listByService: (args: {
    serviceId: ScalarsEnums["String"];
  }) => Array<LmsPricingRateNode>;
  view: (args: { id: ScalarsEnums["String"] }) => LmsPricingRateNode;
}

export interface PricingZoneCountries {
  __typename?: "PricingZoneCountries";
  list: (args: {
    limit: ScalarsEnums["Number"];
    page: ScalarsEnums["Number"];
  }) => Array<LmsPricingZoneCountryNode>;
  listByCountry: (args: {
    countryCode: ScalarsEnums["String"];
  }) => Array<LmsPricingZoneCountryNode>;
  listByZone: (args: {
    pricingZoneId: ScalarsEnums["String"];
  }) => Array<LmsPricingZoneCountryNode>;
  view: (args: { id: ScalarsEnums["String"] }) => LmsPricingZoneCountryNode;
}

export interface PricingZones {
  __typename?: "PricingZones";
  list: (args: {
    limit: ScalarsEnums["Number"];
    page: ScalarsEnums["Number"];
  }) => Array<LmsPricingZoneNode>;
  view: (args: { id: ScalarsEnums["String"] }) => LmsPricingZoneNode;
  viewByCode: (args: {
    zoneCode: ScalarsEnums["String"];
  }) => LmsPricingZoneNode;
}

export interface Products {
  __typename?: "Products";
  list: (args: {
    limit: ScalarsEnums["Number"];
    page: ScalarsEnums["Number"];
  }) => Array<CrmProductNode>;
  view: (args: { id: ScalarsEnums["String"] }) => CrmProductNode;
}

export interface ProviderInvoiceLineItems {
  __typename?: "ProviderInvoiceLineItems";
  list: (args: {
    limit: ScalarsEnums["Number"];
    page: ScalarsEnums["Number"];
  }) => Array<LmsProviderInvoiceLineItemNode>;
  listByInvoice: (args: {
    providerInvoiceId: ScalarsEnums["String"];
  }) => Array<LmsProviderInvoiceLineItemNode>;
  listByTransportLeg: (args: {
    transportLegId: ScalarsEnums["String"];
  }) => Array<LmsProviderInvoiceLineItemNode>;
  view: (args: {
    id: ScalarsEnums["String"];
  }) => LmsProviderInvoiceLineItemNode;
}

export interface ProviderInvoices {
  __typename?: "ProviderInvoices";
  list: (args: {
    limit: ScalarsEnums["Number"];
    page: ScalarsEnums["Number"];
  }) => Array<LmsProviderInvoiceNode>;
  listByProvider: (args: {
    providerId: ScalarsEnums["String"];
  }) => Array<LmsProviderInvoiceNode>;
  listByStatus: (args: {
    status: ScalarsEnums["String"];
  }) => Array<LmsProviderInvoiceNode>;
  view: (args: { id: ScalarsEnums["String"] }) => LmsProviderInvoiceNode;
  viewByInvoiceNumber: (args: {
    invoiceNumber: ScalarsEnums["String"];
  }) => LmsProviderInvoiceNode;
}

export interface ProviderPerformance {
  __typename?: "ProviderPerformance";
  list: (args: {
    limit: ScalarsEnums["Number"];
    page: ScalarsEnums["Number"];
  }) => Array<LmsProviderPerformanceNode>;
  listByMetricType: (args: {
    metricType: ScalarsEnums["String"];
  }) => Array<LmsProviderPerformanceNode>;
  listByProvider: (args: {
    providerId: ScalarsEnums["String"];
  }) => Array<LmsProviderPerformanceNode>;
  listByShipment: (args: {
    shipmentId: ScalarsEnums["String"];
  }) => Array<LmsProviderPerformanceNode>;
  view: (args: { id: ScalarsEnums["String"] }) => LmsProviderPerformanceNode;
}

export interface ProviderRates {
  __typename?: "ProviderRates";
  list: (args: {
    limit: ScalarsEnums["Number"];
    page: ScalarsEnums["Number"];
  }) => Array<LmsProviderRateNode>;
  listActive: Array<LmsProviderRateNode>;
  listByRoute: (args: {
    destinationZoneId: ScalarsEnums["String"];
    originZoneId: ScalarsEnums["String"];
  }) => Array<LmsProviderRateNode>;
  listByService: (args: {
    providerServiceId: ScalarsEnums["String"];
  }) => Array<LmsProviderRateNode>;
  view: (args: { id: ScalarsEnums["String"] }) => LmsProviderRateNode;
}

export interface ProviderServiceDestinationCountries {
  __typename?: "ProviderServiceDestinationCountries";
  list: (args: {
    limit: ScalarsEnums["Number"];
    page: ScalarsEnums["Number"];
  }) => Array<LmsProviderServiceDestinationCountryNode>;
  listByCountryCode: (args: {
    countryCode: ScalarsEnums["String"];
  }) => Array<LmsProviderServiceDestinationCountryNode>;
  listByProviderService: (args: {
    providerServiceId: ScalarsEnums["String"];
  }) => Array<LmsProviderServiceDestinationCountryNode>;
  view: (args: {
    id: ScalarsEnums["String"];
  }) => LmsProviderServiceDestinationCountryNode;
}

export interface ProviderServiceMaxDimensions {
  __typename?: "ProviderServiceMaxDimensions";
  findByProviderService: (args: {
    providerServiceId: ScalarsEnums["String"];
  }) => Maybe<LmsProviderServiceMaxDimensionNode>;
  list: (args: {
    limit: ScalarsEnums["Number"];
    page: ScalarsEnums["Number"];
  }) => Array<LmsProviderServiceMaxDimensionNode>;
  listByProviderService: (args: {
    providerServiceId: ScalarsEnums["String"];
  }) => Array<LmsProviderServiceMaxDimensionNode>;
  view: (args: {
    id: ScalarsEnums["String"];
  }) => LmsProviderServiceMaxDimensionNode;
}

export interface ProviderServiceOriginCountries {
  __typename?: "ProviderServiceOriginCountries";
  list: (args: {
    limit: ScalarsEnums["Number"];
    page: ScalarsEnums["Number"];
  }) => Array<LmsProviderServiceOriginCountryNode>;
  listByCountryCode: (args: {
    countryCode: ScalarsEnums["String"];
  }) => Array<LmsProviderServiceOriginCountryNode>;
  listByProviderService: (args: {
    providerServiceId: ScalarsEnums["String"];
  }) => Array<LmsProviderServiceOriginCountryNode>;
  view: (args: {
    id: ScalarsEnums["String"];
  }) => LmsProviderServiceOriginCountryNode;
}

export interface ProviderServices {
  __typename?: "ProviderServices";
  list: (args: {
    limit: ScalarsEnums["Number"];
    page: ScalarsEnums["Number"];
  }) => Array<LmsProviderServiceNode>;
  listActive: Array<LmsProviderServiceNode>;
  listByProvider: (args: {
    providerId: ScalarsEnums["String"];
  }) => Array<LmsProviderServiceNode>;
  listByServiceType: (args: {
    serviceType: ScalarsEnums["String"];
  }) => Array<LmsProviderServiceNode>;
  listByTransportMode: (args: {
    transportMode: ScalarsEnums["String"];
  }) => Array<LmsProviderServiceNode>;
  view: (args: { id: ScalarsEnums["String"] }) => LmsProviderServiceNode;
}

export interface Register {
  __typename?: "Register";
  token: ScalarsEnums["String"];
  user: AuthUserNode;
}

export interface RouteShipments {
  __typename?: "RouteShipments";
  list: (args: {
    limit: ScalarsEnums["Number"];
    page: ScalarsEnums["Number"];
  }) => Array<LmsRouteShipmentNode>;
  listByRoute: (args: {
    routeId: ScalarsEnums["String"];
  }) => Array<LmsRouteShipmentNode>;
  listByShipment: (args: {
    shipmentId: ScalarsEnums["String"];
  }) => Array<LmsRouteShipmentNode>;
  listByStatus: (args: {
    deliveryStatus: ScalarsEnums["String"];
  }) => Array<LmsRouteShipmentNode>;
  view: (args: { id: ScalarsEnums["String"] }) => LmsRouteShipmentNode;
}

export interface Routes {
  __typename?: "Routes";
  list: (args: {
    limit: ScalarsEnums["Number"];
    page: ScalarsEnums["Number"];
  }) => Array<LmsRouteNode>;
  listByDriver: (args: {
    driverId: ScalarsEnums["String"];
  }) => Array<LmsRouteNode>;
  listByStatus: (args: {
    status: ScalarsEnums["String"];
  }) => Array<LmsRouteNode>;
  listByVehicle: (args: {
    vehicleId: ScalarsEnums["String"];
  }) => Array<LmsRouteNode>;
  view: (args: { id: ScalarsEnums["String"] }) => LmsRouteNode;
}

export interface Shipments {
  __typename?: "Shipments";
  list: (args: {
    limit: ScalarsEnums["Number"];
    page: ScalarsEnums["Number"];
  }) => Array<LmsShipmentNode>;
  listByDepartment: (args: {
    departmentId: ScalarsEnums["String"];
  }) => Array<LmsShipmentNode>;
  listByService: (args: {
    serviceId: ScalarsEnums["String"];
  }) => Array<LmsShipmentNode>;
  listByStatus: (args: {
    status: ScalarsEnums["String"];
  }) => Array<LmsShipmentNode>;
  view: (args: { id: ScalarsEnums["String"] }) => LmsShipmentNode;
  viewByTrackingNumber: (args: {
    trackingNumber: ScalarsEnums["String"];
  }) => LmsShipmentNode;
}

export interface ShippingServiceMaxDimensions {
  __typename?: "ShippingServiceMaxDimensions";
  findByShippingService: (args: {
    shippingServiceId: ScalarsEnums["String"];
  }) => Maybe<LmsShippingServiceMaxDimensionNode>;
  list: (args: {
    limit: ScalarsEnums["Number"];
    page: ScalarsEnums["Number"];
  }) => Array<LmsShippingServiceMaxDimensionNode>;
  listByShippingService: (args: {
    shippingServiceId: ScalarsEnums["String"];
  }) => Array<LmsShippingServiceMaxDimensionNode>;
  view: (args: {
    id: ScalarsEnums["String"];
  }) => LmsShippingServiceMaxDimensionNode;
}

export interface ShippingServices {
  __typename?: "ShippingServices";
  list: (args: {
    limit: ScalarsEnums["Number"];
    page: ScalarsEnums["Number"];
  }) => Array<LmsShippingServiceNode>;
  listActive: Array<LmsShippingServiceNode>;
  listByType: (args: {
    serviceType: ScalarsEnums["String"];
  }) => Array<LmsShippingServiceNode>;
  view: (args: { id: ScalarsEnums["String"] }) => LmsShippingServiceNode;
}

export interface TrackingEvents {
  __typename?: "TrackingEvents";
  list: (args: {
    limit: ScalarsEnums["Number"];
    page: ScalarsEnums["Number"];
  }) => Array<LmsTrackingEventNode>;
  listByEventType: (args: {
    eventType: ScalarsEnums["String"];
  }) => Array<LmsTrackingEventNode>;
  listByShipment: (args: {
    shipmentId: ScalarsEnums["String"];
  }) => Array<LmsTrackingEventNode>;
  view: (args: { id: ScalarsEnums["String"] }) => LmsTrackingEventNode;
}

export interface TransportLegs {
  __typename?: "TransportLegs";
  list: (args: {
    limit: ScalarsEnums["Number"];
    page: ScalarsEnums["Number"];
  }) => Array<LmsTransportLegNode>;
  listByDriver: (args: {
    driverId: ScalarsEnums["String"];
  }) => Array<LmsTransportLegNode>;
  listByProvider: (args: {
    providerId: ScalarsEnums["String"];
  }) => Array<LmsTransportLegNode>;
  listByShipment: (args: {
    shipmentId: ScalarsEnums["String"];
  }) => Array<LmsTransportLegNode>;
  listByStatus: (args: {
    status: ScalarsEnums["String"];
  }) => Array<LmsTransportLegNode>;
  view: (args: { id: ScalarsEnums["String"] }) => LmsTransportLegNode;
}

export interface TransportationProviders {
  __typename?: "TransportationProviders";
  list: (args: {
    limit: ScalarsEnums["Number"];
    page: ScalarsEnums["Number"];
  }) => Array<LmsTransportationProviderNode>;
  listActive: Array<LmsTransportationProviderNode>;
  listByDepartment: (args: {
    departmentId: ScalarsEnums["String"];
  }) => Array<LmsTransportationProviderNode>;
  listByType: (args: {
    providerType: ScalarsEnums["String"];
  }) => Array<LmsTransportationProviderNode>;
  view: (args: { id: ScalarsEnums["String"] }) => LmsTransportationProviderNode;
}

export interface Vehicles {
  __typename?: "Vehicles";
  list: (args: {
    limit: ScalarsEnums["Number"];
    page: ScalarsEnums["Number"];
  }) => Array<OrgVehicleNode>;
  listByDepartment: (args: {
    departmentId: ScalarsEnums["String"];
  }) => Array<OrgVehicleNode>;
  listByStatus: (args: {
    status: ScalarsEnums["String"];
  }) => Array<OrgVehicleNode>;
  listByWarehouse: (args: {
    warehouseId: ScalarsEnums["String"];
  }) => Array<OrgVehicleNode>;
  view: (args: { id: ScalarsEnums["String"] }) => OrgVehicleNode;
  viewByLicensePlate: (args: {
    licensePlate: ScalarsEnums["String"];
  }) => OrgVehicleNode;
  viewByVehicleNumber: (args: {
    vehicleNumber: ScalarsEnums["String"];
  }) => OrgVehicleNode;
}

export interface WarehouseInventories {
  __typename?: "WarehouseInventories";
  list: (args: {
    limit: ScalarsEnums["Number"];
    page: ScalarsEnums["Number"];
  }) => Array<LmsWarehouseInventoryNode>;
  listByPackage: (args: {
    packageId: ScalarsEnums["String"];
  }) => Array<LmsWarehouseInventoryNode>;
  listByShipment: (args: {
    shipmentId: ScalarsEnums["String"];
  }) => Array<LmsWarehouseInventoryNode>;
  listByStatus: (args: {
    status: ScalarsEnums["String"];
  }) => Array<LmsWarehouseInventoryNode>;
  listByWarehouse: (args: {
    warehouseId: ScalarsEnums["String"];
  }) => Array<LmsWarehouseInventoryNode>;
  view: (args: { id: ScalarsEnums["String"] }) => LmsWarehouseInventoryNode;
}

export interface Warehouses {
  __typename?: "Warehouses";
  list: (args: {
    limit: ScalarsEnums["Number"];
    page: ScalarsEnums["Number"];
  }) => Array<LmsWarehouseNode>;
  listActive: Array<LmsWarehouseNode>;
  listByDepartment: (args: {
    departmentId: ScalarsEnums["String"];
  }) => Array<LmsWarehouseNode>;
  listByType: (args: {
    warehouseType: ScalarsEnums["String"];
  }) => Array<LmsWarehouseNode>;
  view: (args: { id: ScalarsEnums["String"] }) => LmsWarehouseNode;
  viewByCode: (args: { code: ScalarsEnums["String"] }) => LmsWarehouseNode;
}

export interface Mutation {
  __typename?: "Mutation";
  createCrmCampaign: (args: {
    payload: PayloadInput_120AndPayloadInput_121;
  }) => CrmCampaignNode;
  createCrmCampaignContact: (args: {
    payload: PayloadInput_90AndPayloadInput_91;
  }) => CrmCampaignContactNode;
  createCrmCase: (args: {
    payload: PayloadInput_117AndPayloadInput_118;
  }) => CrmCaseNode;
  createCrmCompany: (args: {
    payload: PayloadInput_123AndPayloadInput_124;
  }) => CrmCompanyNode;
  createCrmContact: (args: {
    payload: PayloadInput_126AndPayloadInput_127;
  }) => CrmContactNode;
  createCrmInteraction: (args: {
    payload: PayloadInput_114AndPayloadInput_115;
  }) => CrmInteractionNode;
  createCrmInvoice: (args: {
    payload: PayloadInput_102AndPayloadInput_103;
  }) => CrmInvoiceNode;
  createCrmInvoiceLineItem: (args: {
    payload: PayloadInput_99AndPayloadInput_100;
  }) => CrmInvoiceLineItemNode;
  createCrmLead: (args: {
    payload: PayloadInput_111AndPayloadInput_112;
  }) => CrmLeadNode;
  createCrmNotification: (args: {
    payload: PayloadInput_96AndPayloadInput_97;
  }) => CrmNotificationNode;
  createCrmOpportunity: (args: {
    payload: PayloadInput_108AndPayloadInput_109;
  }) => CrmOpportunityNode;
  createCrmOpportunityProduct: (args: {
    payload: PayloadInput_93AndPayloadInput_94;
  }) => CrmOpportunityProductNode;
  createCrmProduct: (args: {
    payload: PayloadInput_105AndPayloadInput_106;
  }) => CrmProductNode;
  createLmsAddress: (args: {
    payload: PayloadInput_66AndPayloadInput_67;
  }) => LmsAddressNode;
  createLmsPackage: (args: {
    payload: PayloadInput_60AndPayloadInput_61;
  }) => LmsPackageNode;
  createLmsPricingRate: (args: {
    payload: PayloadInput_42AndPayloadInput_43;
  }) => LmsPricingRateNode;
  createLmsPricingZone: (args: {
    payload: PayloadInput_39AndPayloadInput_40;
  }) => LmsPricingZoneNode;
  createLmsPricingZoneCountry: (args: {
    payload: PayloadInput_36AndPayloadInput_37;
  }) => LmsPricingZoneCountryNode;
  createLmsProviderInvoice: (args: {
    payload: PayloadInput_33AndPayloadInput_34;
  }) => LmsProviderInvoiceNode;
  createLmsProviderInvoiceLineItem: (args: {
    payload: PayloadInput_30AndPayloadInput_31;
  }) => LmsProviderInvoiceLineItemNode;
  createLmsProviderPerformance: (args: {
    payload: PayloadInput_27AndPayloadInput_28;
  }) => LmsProviderPerformanceNode;
  createLmsProviderRate: (args: {
    payload: PayloadInput_24AndPayloadInput_25;
  }) => LmsProviderRateNode;
  createLmsProviderService: (args: {
    payload: PayloadInput_21AndPayloadInput_22;
  }) => LmsProviderServiceNode;
  createLmsProviderServiceDestinationCountry: (args: {
    payload: PayloadInput_18AndPayloadInput_19;
  }) => LmsProviderServiceDestinationCountryNode;
  createLmsProviderServiceMaxDimension: (args: {
    payload: PayloadInput_15AndPayloadInput_16;
  }) => LmsProviderServiceMaxDimensionNode;
  createLmsProviderServiceOriginCountry: (args: {
    payload: PayloadInput_12AndPayloadInput_13;
  }) => LmsProviderServiceOriginCountryNode;
  createLmsRoute: (args: {
    payload: PayloadInput_54AndPayloadInput_55;
  }) => LmsRouteNode;
  createLmsRouteShipment: (args: {
    payload: PayloadInput_9AndPayloadInput_10;
  }) => LmsRouteShipmentNode;
  createLmsShipment: (args: {
    payload: PayloadInput_63AndPayloadInput_64;
  }) => LmsShipmentNode;
  createLmsShippingService: (args: {
    payload: PayloadInput_48AndPayloadInput_49;
  }) => LmsShippingServiceNode;
  createLmsShippingServiceMaxDimension: (args: {
    payload: PayloadInput_3AndPayloadInput_4;
  }) => LmsShippingServiceMaxDimensionNode;
  createLmsTrackingEvent: (args: {
    payload: PayloadInput_57AndPayloadInput_58;
  }) => LmsTrackingEventNode;
  createLmsTransportLeg: (args: {
    payload: PayloadInput_6AndPayloadInput_7;
  }) => LmsTransportLegNode;
  createLmsTransportationProvider: (args: {
    payload: PayloadInput_45AndPayloadInput_46;
  }) => LmsTransportationProviderNode;
  createLmsWarehouse: (args: {
    payload: PayloadInput_51AndPayloadInput_52;
  }) => LmsWarehouseNode;
  createLmsWarehouseInventory: (args: {
    payload: PayloadInputAndPayloadInput_1;
  }) => LmsWarehouseInventoryNode;
  createOrgDepartment: (args: {
    payload: PayloadInput_87AndPayloadInput_88;
  }) => OrgDepartmentNode;
  createOrgDepartmentPermission: (args: {
    payload: PayloadInput_84AndPayloadInput_85;
  }) => OrgDepartmentPermissionNode;
  createOrgDepartmentTransportMode: (args: {
    payload: PayloadInput_81AndPayloadInput_82;
  }) => OrgDepartmentTransportModeNode;
  createOrgDepartmentUser: (args: {
    payload: PayloadInput_75AndPayloadInput_76;
  }) => OrgDepartmentUserNode;
  createOrgDepartmentUserPermission: (args: {
    payload: PayloadInput_78AndPayloadInput_79;
  }) => OrgDepartmentUserPermissionNode;
  createOrgDriver: (args: {
    payload: PayloadInput_72AndPayloadInput_73;
  }) => OrgDriverNode;
  createOrgVehicle: (args: {
    payload: PayloadInput_69AndPayloadInput_70;
  }) => OrgVehicleNode;
  deleteCrmCampaign: (args: {
    id: ScalarsEnums["String"];
  }) => DeleteCrmCampaign;
  deleteCrmCampaignContact: (args: {
    id: ScalarsEnums["String"];
  }) => DeleteCrmCampaignContact;
  deleteCrmCase: (args: { id: ScalarsEnums["String"] }) => DeleteCrmCase;
  deleteCrmCompany: (args: { id: ScalarsEnums["String"] }) => DeleteCrmCompany;
  deleteCrmContact: (args: { id: ScalarsEnums["String"] }) => DeleteCrmContact;
  deleteCrmInteraction: (args: {
    id: ScalarsEnums["String"];
  }) => DeleteCrmInteraction;
  deleteCrmInvoice: (args: { id: ScalarsEnums["String"] }) => DeleteCrmInvoice;
  deleteCrmInvoiceLineItem: (args: {
    id: ScalarsEnums["String"];
  }) => DeleteCrmInvoiceLineItem;
  deleteCrmLead: (args: { id: ScalarsEnums["String"] }) => DeleteCrmLead;
  deleteCrmNotification: (args: {
    id: ScalarsEnums["String"];
  }) => DeleteCrmNotification;
  deleteCrmOpportunity: (args: {
    id: ScalarsEnums["String"];
  }) => DeleteCrmOpportunity;
  deleteCrmOpportunityProduct: (args: {
    id: ScalarsEnums["String"];
  }) => DeleteCrmOpportunityProduct;
  deleteCrmProduct: (args: { id: ScalarsEnums["String"] }) => DeleteCrmProduct;
  deleteLmsAddress: (args: { id: ScalarsEnums["String"] }) => DeleteLmsAddress;
  deleteLmsPackage: (args: { id: ScalarsEnums["String"] }) => DeleteLmsPackage;
  deleteLmsPricingRate: (args: {
    id: ScalarsEnums["String"];
  }) => DeleteLmsPricingRate;
  deleteLmsPricingZone: (args: {
    id: ScalarsEnums["String"];
  }) => DeleteLmsPricingZone;
  deleteLmsPricingZoneCountry: (args: {
    id: ScalarsEnums["String"];
  }) => DeleteLmsPricingZoneCountry;
  deleteLmsProviderInvoice: (args: {
    id: ScalarsEnums["String"];
  }) => DeleteLmsProviderInvoice;
  deleteLmsProviderInvoiceLineItem: (args: {
    id: ScalarsEnums["String"];
  }) => DeleteLmsProviderInvoiceLineItem;
  deleteLmsProviderPerformance: (args: {
    id: ScalarsEnums["String"];
  }) => DeleteLmsProviderPerformance;
  deleteLmsProviderRate: (args: {
    id: ScalarsEnums["String"];
  }) => DeleteLmsProviderRate;
  deleteLmsProviderService: (args: {
    id: ScalarsEnums["String"];
  }) => DeleteLmsProviderService;
  deleteLmsProviderServiceDestinationCountry: (args: {
    id: ScalarsEnums["String"];
  }) => DeleteLmsProviderServiceDestinationCountry;
  deleteLmsProviderServiceMaxDimension: (args: {
    id: ScalarsEnums["String"];
  }) => DeleteLmsProviderServiceMaxDimension;
  deleteLmsProviderServiceOriginCountry: (args: {
    id: ScalarsEnums["String"];
  }) => DeleteLmsProviderServiceOriginCountry;
  deleteLmsRoute: (args: { id: ScalarsEnums["String"] }) => DeleteLmsRoute;
  deleteLmsRouteShipment: (args: {
    id: ScalarsEnums["String"];
  }) => DeleteLmsRouteShipment;
  deleteLmsShipment: (args: {
    id: ScalarsEnums["String"];
  }) => DeleteLmsShipment;
  deleteLmsShippingService: (args: {
    id: ScalarsEnums["String"];
  }) => DeleteLmsShippingService;
  deleteLmsShippingServiceMaxDimension: (args: {
    id: ScalarsEnums["String"];
  }) => DeleteLmsShippingServiceMaxDimension;
  deleteLmsTrackingEvent: (args: {
    id: ScalarsEnums["String"];
  }) => DeleteLmsTrackingEvent;
  deleteLmsTransportLeg: (args: {
    id: ScalarsEnums["String"];
  }) => DeleteLmsTransportLeg;
  deleteLmsTransportationProvider: (args: {
    id: ScalarsEnums["String"];
  }) => DeleteLmsTransportationProvider;
  deleteLmsWarehouse: (args: {
    id: ScalarsEnums["String"];
  }) => DeleteLmsWarehouse;
  deleteLmsWarehouseInventory: (args: {
    id: ScalarsEnums["String"];
  }) => DeleteLmsWarehouseInventory;
  deleteOrgDepartment: (args: {
    id: ScalarsEnums["String"];
  }) => DeleteOrgDepartment;
  deleteOrgDepartmentPermission: (args: {
    id: ScalarsEnums["String"];
  }) => DeleteOrgDepartmentPermission;
  deleteOrgDepartmentTransportMode: (args: {
    id: ScalarsEnums["String"];
  }) => DeleteOrgDepartmentTransportMode;
  deleteOrgDepartmentUser: (args: {
    id: ScalarsEnums["String"];
  }) => DeleteOrgDepartmentUser;
  deleteOrgDepartmentUserPermission: (args: {
    id: ScalarsEnums["String"];
  }) => DeleteOrgDepartmentUserPermission;
  deleteOrgDriver: (args: { id: ScalarsEnums["String"] }) => DeleteOrgDriver;
  deleteOrgVehicle: (args: { id: ScalarsEnums["String"] }) => DeleteOrgVehicle;
  login: (args: {
    email: ScalarsEnums["String"];
    password: ScalarsEnums["String"];
  }) => Login;
  register: (args: {
    payload: PayloadInput_129AndPayloadInput_130;
  }) => Register;
  updateCrmCampaign: (args: {
    id: ScalarsEnums["String"];
    payload: PayloadInput_122;
  }) => CrmCampaignNode;
  updateCrmCampaignContact: (args: {
    id: ScalarsEnums["String"];
    payload: PayloadInput_92;
  }) => CrmCampaignContactNode;
  updateCrmCase: (args: {
    id: ScalarsEnums["String"];
    payload: PayloadInput_119;
  }) => CrmCaseNode;
  updateCrmCompany: (args: {
    id: ScalarsEnums["String"];
    payload: PayloadInput_125;
  }) => CrmCompanyNode;
  updateCrmContact: (args: {
    id: ScalarsEnums["String"];
    payload: PayloadInput_128;
  }) => CrmContactNode;
  updateCrmInteraction: (args: {
    id: ScalarsEnums["String"];
    payload: PayloadInput_116;
  }) => CrmInteractionNode;
  updateCrmInvoice: (args: {
    id: ScalarsEnums["String"];
    payload: PayloadInput_104;
  }) => CrmInvoiceNode;
  updateCrmInvoiceLineItem: (args: {
    id: ScalarsEnums["String"];
    payload: PayloadInput_101;
  }) => CrmInvoiceLineItemNode;
  updateCrmLead: (args: {
    id: ScalarsEnums["String"];
    payload: PayloadInput_113;
  }) => CrmLeadNode;
  updateCrmNotification: (args: {
    id: ScalarsEnums["String"];
    payload: PayloadInput_98;
  }) => CrmNotificationNode;
  updateCrmOpportunity: (args: {
    id: ScalarsEnums["String"];
    payload: PayloadInput_110;
  }) => CrmOpportunityNode;
  updateCrmOpportunityProduct: (args: {
    id: ScalarsEnums["String"];
    payload: PayloadInput_95;
  }) => CrmOpportunityProductNode;
  updateCrmProduct: (args: {
    id: ScalarsEnums["String"];
    payload: PayloadInput_107;
  }) => CrmProductNode;
  updateLmsAddress: (args: {
    id: ScalarsEnums["String"];
    payload: PayloadInput_68;
  }) => LmsAddressNode;
  updateLmsPackage: (args: {
    id: ScalarsEnums["String"];
    payload: PayloadInput_62;
  }) => LmsPackageNode;
  updateLmsPricingRate: (args: {
    id: ScalarsEnums["String"];
    payload: PayloadInput_44;
  }) => LmsPricingRateNode;
  updateLmsPricingZone: (args: {
    id: ScalarsEnums["String"];
    payload: PayloadInput_41;
  }) => LmsPricingZoneNode;
  updateLmsPricingZoneCountry: (args: {
    id: ScalarsEnums["String"];
    payload: PayloadInput_38;
  }) => LmsPricingZoneCountryNode;
  updateLmsProviderInvoice: (args: {
    id: ScalarsEnums["String"];
    payload: PayloadInput_35;
  }) => LmsProviderInvoiceNode;
  updateLmsProviderInvoiceLineItem: (args: {
    id: ScalarsEnums["String"];
    payload: PayloadInput_32;
  }) => LmsProviderInvoiceLineItemNode;
  updateLmsProviderPerformance: (args: {
    id: ScalarsEnums["String"];
    payload: PayloadInput_29;
  }) => LmsProviderPerformanceNode;
  updateLmsProviderRate: (args: {
    id: ScalarsEnums["String"];
    payload: PayloadInput_26;
  }) => LmsProviderRateNode;
  updateLmsProviderService: (args: {
    id: ScalarsEnums["String"];
    payload: PayloadInput_23;
  }) => LmsProviderServiceNode;
  updateLmsProviderServiceDestinationCountry: (args: {
    id: ScalarsEnums["String"];
    payload: PayloadInput_20;
  }) => LmsProviderServiceDestinationCountryNode;
  updateLmsProviderServiceMaxDimension: (args: {
    id: ScalarsEnums["String"];
    payload: PayloadInput_17;
  }) => LmsProviderServiceMaxDimensionNode;
  updateLmsProviderServiceOriginCountry: (args: {
    id: ScalarsEnums["String"];
    payload: PayloadInput_14;
  }) => LmsProviderServiceOriginCountryNode;
  updateLmsRoute: (args: {
    id: ScalarsEnums["String"];
    payload: PayloadInput_56;
  }) => LmsRouteNode;
  updateLmsRouteShipment: (args: {
    id: ScalarsEnums["String"];
    payload: PayloadInput_11;
  }) => LmsRouteShipmentNode;
  updateLmsShipment: (args: {
    id: ScalarsEnums["String"];
    payload: PayloadInput_65;
  }) => LmsShipmentNode;
  updateLmsShippingService: (args: {
    id: ScalarsEnums["String"];
    payload: PayloadInput_50;
  }) => LmsShippingServiceNode;
  updateLmsShippingServiceMaxDimension: (args: {
    id: ScalarsEnums["String"];
    payload: PayloadInput_5;
  }) => LmsShippingServiceMaxDimensionNode;
  updateLmsTrackingEvent: (args: {
    id: ScalarsEnums["String"];
    payload: PayloadInput_59;
  }) => LmsTrackingEventNode;
  updateLmsTransportLeg: (args: {
    id: ScalarsEnums["String"];
    payload: PayloadInput_8;
  }) => LmsTransportLegNode;
  updateLmsTransportationProvider: (args: {
    id: ScalarsEnums["String"];
    payload: PayloadInput_47;
  }) => LmsTransportationProviderNode;
  updateLmsWarehouse: (args: {
    id: ScalarsEnums["String"];
    payload: PayloadInput_53;
  }) => LmsWarehouseNode;
  updateLmsWarehouseInventory: (args: {
    id: ScalarsEnums["String"];
    payload: PayloadInput_2;
  }) => LmsWarehouseInventoryNode;
  updateOrgDepartment: (args: {
    id: ScalarsEnums["String"];
    payload: PayloadInput_89;
  }) => OrgDepartmentNode;
  updateOrgDepartmentPermission: (args: {
    id: ScalarsEnums["String"];
    payload: PayloadInput_86;
  }) => OrgDepartmentPermissionNode;
  updateOrgDepartmentTransportMode: (args: {
    id: ScalarsEnums["String"];
    payload: PayloadInput_83;
  }) => OrgDepartmentTransportModeNode;
  updateOrgDepartmentUser: (args: {
    id: ScalarsEnums["String"];
    payload: PayloadInput_77;
  }) => OrgDepartmentUserNode;
  updateOrgDepartmentUserPermission: (args: {
    id: ScalarsEnums["String"];
    payload: PayloadInput_80;
  }) => OrgDepartmentUserPermissionNode;
  updateOrgDriver: (args: {
    id: ScalarsEnums["String"];
    payload: PayloadInput_74;
  }) => OrgDriverNode;
  updateOrgVehicle: (args: {
    id: ScalarsEnums["String"];
    payload: PayloadInput_71;
  }) => OrgVehicleNode;
}

export interface Query {
  __typename?: "Query";
  auth: Auth;
  crm: Crm;
  lms: Lms;
  org: Org;
}

export interface Subscription {
  __typename?: "Subscription";
}

export interface GeneratedSchema {
  query: Query;
  mutation: Mutation;
  subscription: Subscription;
}

export type ScalarsEnums = {
  [Key in keyof Scalars]: Scalars[Key] extends { output: unknown }
    ? Scalars[Key]["output"]
    : never;
} & {
  ASC_DESCInput: ASC_DESCInput;
  CREATED_EMAIL_ID_UPDATED_ADDRESSID_BIRTHDATE_COMPANYID_FIRSTNAME_JOBTITLE_LASTNAME_LEADSOURCE_PHONENUMBER_STATUSInput: CREATED_EMAIL_ID_UPDATED_ADDRESSID_BIRTHDATE_COMPANYID_FIRSTNAME_JOBTITLE_LASTNAME_LEADSOURCE_PHONENUMBER_STATUSInput;
  CrmCampaignContactsStatus: CrmCampaignContactsStatus;
  CrmCampaignContactsStatusInput: CrmCampaignContactsStatusInput;
  CrmCampaignStatus: CrmCampaignStatus;
  CrmCampaignStatusInput: CrmCampaignStatusInput;
  CrmCasePriority: CrmCasePriority;
  CrmCasePriorityInput: CrmCasePriorityInput;
  CrmCaseStatus: CrmCaseStatus;
  CrmCaseStatusInput: CrmCaseStatusInput;
  CrmContactStatus: CrmContactStatus;
  CrmContactStatusInput: CrmContactStatusInput;
  CrmInteractionType: CrmInteractionType;
  CrmInteractionTypeInput: CrmInteractionTypeInput;
  CrmInvoiceStatus: CrmInvoiceStatus;
  CrmInvoiceStatusInput: CrmInvoiceStatusInput;
  CrmLeadStatus: CrmLeadStatus;
  CrmLeadStatusInput: CrmLeadStatusInput;
  CrmNotificationChannel: CrmNotificationChannel;
  CrmNotificationChannelInput: CrmNotificationChannelInput;
  CrmNotificationDeliveryStatus: CrmNotificationDeliveryStatus;
  CrmNotificationDeliveryStatusInput: CrmNotificationDeliveryStatusInput;
  CrmNotificationType: CrmNotificationType;
  CrmNotificationTypeInput: CrmNotificationTypeInput;
  CrmOpportunityStage: CrmOpportunityStage;
  CrmOpportunityStageInput: CrmOpportunityStageInput;
  LmsAddressType: LmsAddressType;
  LmsAddressTypeInput: LmsAddressTypeInput;
  LmsDeliveryStatus: LmsDeliveryStatus;
  LmsDeliveryStatusInput: LmsDeliveryStatusInput;
  LmsLegStatus: LmsLegStatus;
  LmsLegStatusInput: LmsLegStatusInput;
  LmsPackageType: LmsPackageType;
  LmsPackageTypeInput: LmsPackageTypeInput;
  LmsPerformanceMetricType: LmsPerformanceMetricType;
  LmsPerformanceMetricTypeInput: LmsPerformanceMetricTypeInput;
  LmsProviderInvoiceStatus: LmsProviderInvoiceStatus;
  LmsProviderInvoiceStatusInput: LmsProviderInvoiceStatusInput;
  LmsProviderType: LmsProviderType;
  LmsProviderTypeInput: LmsProviderTypeInput;
  LmsRouteStatus: LmsRouteStatus;
  LmsRouteStatusInput: LmsRouteStatusInput;
  LmsServiceType: LmsServiceType;
  LmsServiceTypeInput: LmsServiceTypeInput;
  LmsShipmentStatus: LmsShipmentStatus;
  LmsShipmentStatusInput: LmsShipmentStatusInput;
  LmsTrackingEventType: LmsTrackingEventType;
  LmsTrackingEventTypeInput: LmsTrackingEventTypeInput;
  LmsTransportLegType: LmsTransportLegType;
  LmsTransportLegTypeInput: LmsTransportLegTypeInput;
  LmsTransportMode: LmsTransportMode;
  LmsTransportModeInput: LmsTransportModeInput;
  LmsWarehouseInventoryStatus: LmsWarehouseInventoryStatus;
  LmsWarehouseInventoryStatusInput: LmsWarehouseInventoryStatusInput;
  LmsWarehouseType: LmsWarehouseType;
  LmsWarehouseTypeInput: LmsWarehouseTypeInput;
  OrgDriverStatus: OrgDriverStatus;
  OrgDriverStatusInput: OrgDriverStatusInput;
  OrgPermissionStatus: OrgPermissionStatus;
  OrgPermissionStatusInput: OrgPermissionStatusInput;
  OrgVehicleStatus: OrgVehicleStatus;
  OrgVehicleStatusInput: OrgVehicleStatusInput;
  OrgVehicleType: OrgVehicleType;
  OrgVehicleTypeInput: OrgVehicleTypeInput;
};
