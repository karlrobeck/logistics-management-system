/**
 * This file was generated by kysely-codegen.
 * Please do not edit it manually.
 */

import type { ColumnType } from 'kysely';

export enum CrmCampaignContactsStatus {
  CLICKED = 'clicked',
  OPENED = 'opened',
  RESPONDED = 'responded',
  SENT = 'sent',
  UNSUBSCRIBE = 'unsubscribe',
}

export enum CrmCampaignStatus {
  ACTIVE = 'active',
  COMPLETED = 'completed',
  PAUSED = 'paused',
  PLANNED = 'planned',
}

export enum CrmCasePriority {
  CRITICAL = 'critical',
  HIGH = 'high',
  LOW = 'low',
  MEDIUM = 'medium',
}

export enum CrmCaseStatus {
  CLOSED = 'closed',
  IN_PROGRESS = 'in-progress',
  OPEN = 'open',
  PENDING_CUSTOMER = 'pending-customer',
}

export enum CrmContactStatus {
  CUSTOMER = 'customer',
  INACTIVE = 'inactive',
  LEAD = 'lead',
  PROSPECT = 'prospect',
}

export enum CrmInteractionType {
  CALL = 'call',
  CHAT = 'chat',
  EMAIL = 'email',
  MEETING = 'meeting',
  NOTE = 'note',
}

export enum CrmInvoiceStatus {
  CANCELLED = 'cancelled',
  DRAFT = 'draft',
  OVERDUE = 'overdue',
  PAID = 'paid',
  SENT = 'sent',
}

export enum CrmLeadStatus {
  CONTACTED = 'contacted',
  NEW = 'new',
  QUALIFIED = 'qualified',
  UNQUALIFIED = 'unqualified',
}

export enum CrmNotificationChannel {
  EMAIL = 'email',
  PUSH = 'push',
  SMS = 'sms',
  WEBHOOK = 'webhook',
}

export enum CrmNotificationDeliveryStatus {
  BOUNCED = 'bounced',
  DELIVERED = 'delivered',
  FAILED = 'failed',
  PENDING = 'pending',
  SENT = 'sent',
}

export enum CrmNotificationType {
  DELAYED = 'delayed',
  DELIVERED = 'delivered',
  EXCEPTION = 'exception',
  IN_TRANSIT = 'in_transit',
  OUT_FOR_DELIVERY = 'out_for_delivery',
  PICKUP_SCHEDULED = 'pickup_scheduled',
}

export enum CrmOpportunityStage {
  CLOSED_LOST = 'closed-lost',
  CLOSED_WON = 'closed-won',
  PROPOSAL = 'proposal',
  PROSPECTING = 'prospecting',
  QUALIFICATION = 'qualification',
}

export enum LmsAddressType {
  BILLING = 'billing',
  OFFICE = 'office',
  SHIPPING = 'shipping',
  WAREHOUSE = 'warehouse',
}

export enum LmsDeliveryStatus {
  ATTEMPTED = 'attempted',
  DELIVERED = 'delivered',
  FAILED = 'failed',
  PENDING = 'pending',
  RESCHEDULED = 'rescheduled',
}

export enum LmsLegStatus {
  CANCELLED = 'cancelled',
  COMPLETED = 'completed',
  IN_PROGRESS = 'in_progress',
  PLANNED = 'planned',
}

export enum LmsPackageType {
  BAG = 'bag',
  BOX = 'box',
  CRATE = 'crate',
  ENVELOPE = 'envelope',
  PALLET = 'pallet',
  TUBE = 'tube',
}

export enum LmsPerformanceMetricType {
  COST_EFFICIENCY = 'cost_efficiency',
  CUSTOMER_SATISFACTION = 'customer_satisfaction',
  DAMAGE_RATE = 'damage_rate',
  ON_TIME_DELIVERY = 'on_time_delivery',
}

export enum LmsProviderInvoiceStatus {
  CANCELLED = 'cancelled',
  DRAFT = 'draft',
  OVERDUE = 'overdue',
  PAID = 'paid',
  SENT = 'sent',
}

export enum LmsProviderType {
  COURIER = 'courier',
  EXPRESS = 'express',
  FREIGHT = 'freight',
  FTL = 'ftl',
  LTL = 'ltl',
  POSTAL = 'postal',
}

export enum LmsRouteStatus {
  CANCELLED = 'cancelled',
  COMPLETED = 'completed',
  IN_PROGRESS = 'in_progress',
  PLANNED = 'planned',
}

export enum LmsServiceType {
  ECONOMY = 'economy',
  EXPRESS = 'express',
  FREIGHT = 'freight',
  OVERNIGHT = 'overnight',
  STANDARD = 'standard',
}

export enum LmsShipmentStatus {
  CANCELLED = 'cancelled',
  CREATED = 'created',
  DELIVERED = 'delivered',
  EXCEPTION = 'exception',
  IN_TRANSIT = 'in_transit',
  OUT_FOR_DELIVERY = 'out_for_delivery',
  PICKED_UP = 'picked_up',
}

export enum LmsTrackingEventType {
  ARRIVED = 'arrived',
  CANCELLED = 'cancelled',
  CREATED = 'created',
  DELIVERED = 'delivered',
  DEPARTED = 'departed',
  EXCEPTION = 'exception',
  OUT_FOR_DELIVERY = 'out_for_delivery',
  PICKED_UP = 'picked_up',
}

export enum LmsTransportLegType {
  DELIVERY = 'delivery',
  LINEHAUL = 'linehaul',
  PICKUP = 'pickup',
  TRANSFER = 'transfer',
}

export enum LmsTransportMode {
  AIR = 'air',
  RAIL = 'rail',
  ROAD = 'road',
  SEA = 'sea',
}

export enum LmsWarehouseInventoryStatus {
  PICKED = 'picked',
  RECEIVED = 'received',
  SHIPPED = 'shipped',
  STORED = 'stored',
}

export enum LmsWarehouseType {
  BONDED = 'bonded',
  COLD_STORAGE = 'cold_storage',
  CROSS_DOCK = 'cross_dock',
  DISTRIBUTION = 'distribution',
  FULFILLMENT = 'fulfillment',
}

export enum OrgDriverStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  ON_LEAVE = 'on_leave',
  TERMINATED = 'terminated',
}

export enum OrgPermissionStatus {
  CREATE = 'create',
  DELETE = 'delete',
  READ = 'read',
  UPDATE = 'update',
}

export enum OrgVehicleStatus {
  ACTIVE = 'active',
  MAINTENANCE = 'maintenance',
  OUT_OF_SERVICE = 'out_of_service',
  RETIRED = 'retired',
}

export enum OrgVehicleType {
  CAR = 'car',
  MOTORCYCLE = 'motorcycle',
  TRAILER = 'trailer',
  TRUCK = 'truck',
  VAN = 'van',
}

export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
  ? ColumnType<S, I | undefined, U>
  : ColumnType<T, T | undefined, T>;

export type Int8 = ColumnType<
  string,
  bigint | number | string,
  bigint | number | string
>;

export type Numeric = ColumnType<string, number | string, number | string>;

export type Timestamp = ColumnType<Date, Date | string, Date | string>;

export interface _SqlxMigrations {
  checksum: Buffer;
  description: string;
  executionTime: Int8;
  installedOn: Generated<Timestamp>;
  success: boolean;
  version: Int8;
}

export interface AuthUsers {
  /**
   * Timestamp when user was created
   */
  created: Generated<Timestamp>;
  /**
   * Unique email address for authentication
   */
  email: string;
  /**
   * Whether the email address has been verified
   */
  emailVerified: Generated<boolean>;
  id: Generated<string>;
  /**
   * User display name
   */
  name: string;
  /**
   * Hashed password using bcrypt or similar - never store plaintext
   */
  password: string;
  /**
   * Timestamp when user was last updated
   */
  updated: Generated<Timestamp>;
}

export interface CrmCampaignContacts {
  /**
   * Reference to the marketing campaign
   */
  campaignId: string;
  /**
   * Reference to the contact person
   */
  contactId: string;
  created: Generated<Timestamp>;
  id: Generated<string>;
  /**
   * When the last interaction occurred
   */
  interactionDate: Timestamp | null;
  /**
   * Current interaction status with campaign
   */
  status: CrmCampaignContactsStatus;
  updated: Generated<Timestamp>;
}

export interface CrmCampaigns {
  /**
   * Allocated budget for the campaign
   */
  budget: Generated<Numeric | null>;
  created: Generated<Timestamp>;
  /**
   * Detailed campaign description
   */
  description: string | null;
  /**
   * Campaign end date
   */
  endDate: Timestamp | null;
  id: Generated<string>;
  /**
   * Campaign name or title
   */
  name: string;
  /**
   * Campaign start date
   */
  startDate: Timestamp;
  /**
   * Current campaign status
   */
  status: CrmCampaignStatus;
  updated: Generated<Timestamp>;
}

export interface CrmCases {
  /**
   * When the case was closed
   */
  closedAt: Timestamp | null;
  /**
   * Associated contact who reported the case
   */
  contactId: string | null;
  created: Generated<Timestamp>;
  /**
   * Detailed case description
   */
  description: string;
  id: Generated<string>;
  /**
   * Case priority level
   */
  priority: CrmCasePriority;
  /**
   * Current case status
   */
  status: CrmCaseStatus;
  /**
   * Brief summary of the case
   */
  subject: string;
  updated: Generated<Timestamp>;
}

export interface CrmCompanies {
  addressId: string | null;
  created: Generated<Timestamp>;
  /**
   * Detailed company description
   */
  description: string | null;
  /**
   * Primary contact email address
   */
  email: string | null;
  id: Generated<string>;
  /**
   * Business industry classification
   */
  industry: string | null;
  /**
   * Company display name
   */
  name: string;
  /**
   * Primary contact phone number
   */
  phoneNumber: string | null;
  updated: Generated<Timestamp>;
  /**
   * Company website URL
   */
  website: string | null;
}

export interface CrmContacts {
  addressId: string | null;
  /**
   * Contact birth date for relationship building
   */
  birthDate: Timestamp | null;
  /**
   * Reference to associated company
   */
  companyId: string | null;
  created: Generated<Timestamp>;
  /**
   * Unique contact email address
   */
  email: string;
  /**
   * Contact first name
   */
  firstName: string;
  id: Generated<string>;
  /**
   * Professional role or position
   */
  jobTitle: string | null;
  /**
   * Contact last name
   */
  lastName: string;
  /**
   * Origin of lead acquisition
   */
  leadSource: string | null;
  /**
   * Contact phone number
   */
  phoneNumber: string | null;
  /**
   * Current relationship status with contact
   */
  status: CrmContactStatus;
  updated: Generated<Timestamp>;
}

export interface CrmInteractions {
  /**
   * Associated contact person
   */
  contactId: string | null;
  created: Generated<Timestamp>;
  /**
   * Detailed notes about the interaction
   */
  description: string | null;
  id: Generated<string>;
  /**
   * When the interaction occurred
   */
  interactionDate: Timestamp;
  /**
   * Associated sales opportunity
   */
  opportunityId: string | null;
  /**
   * Brief summary or subject of the interaction
   */
  subject: string | null;
  /**
   * Type of interaction (call, email, meeting, etc.)
   */
  type: CrmInteractionType;
  updated: Generated<Timestamp>;
}

export interface CrmInvoiceLineItems {
  created: Generated<Timestamp>;
  /**
   * Description of service or charge
   */
  description: string;
  id: Generated<string>;
  invoiceId: string;
  /**
   * Calculated total for this line item
   */
  lineTotal: Generated<Numeric | null>;
  /**
   * Quantity of service units
   */
  quantity: Generated<Numeric>;
  shipmentId: string | null;
  /**
   * Price per unit
   */
  unitPrice: Numeric;
  updated: Generated<Timestamp>;
}

export interface CrmInvoices {
  companyId: string | null;
  contactId: string | null;
  created: Generated<Timestamp>;
  currency: Generated<string>;
  dueDate: Timestamp;
  id: Generated<string>;
  invoiceDate: Timestamp;
  /**
   * Unique invoice identifier
   */
  invoiceNumber: string;
  /**
   * Payment terms and conditions
   */
  paymentTerms: string | null;
  /**
   * Current payment status
   */
  status: CrmInvoiceStatus;
  /**
   * Invoice subtotal before taxes
   */
  subtotal: Numeric;
  /**
   * Total tax amount
   */
  taxAmount: Generated<Numeric>;
  /**
   * Final invoice total
   */
  totalAmount: Numeric;
  updated: Generated<Timestamp>;
}

export interface CrmLeads {
  /**
   * Associated company name
   */
  companyName: string | null;
  /**
   * Reference to contact if lead was converted
   */
  convertedToContactId: string | null;
  created: Generated<Timestamp>;
  /**
   * Unique lead email address
   */
  email: string;
  /**
   * Lead first name
   */
  firstName: string;
  id: Generated<string>;
  /**
   * Lead last name
   */
  lastName: string;
  /**
   * Numerical score indicating lead quality (0-100)
   */
  leadScore: Generated<number>;
  /**
   * Channel or method of lead acquisition
   */
  leadSource: string | null;
  /**
   * Current stage in lead qualification process
   */
  leadStatus: CrmLeadStatus;
  /**
   * Lead contact phone number
   */
  phoneNumber: string | null;
  updated: Generated<Timestamp>;
}

export interface CrmNotifications {
  /**
   * Communication channel used
   */
  channel: CrmNotificationChannel;
  contactId: string;
  created: Generated<Timestamp>;
  /**
   * Status of notification delivery
   */
  deliveryStatus: CrmNotificationDeliveryStatus;
  id: Generated<string>;
  message: string;
  /**
   * Type of notification sent
   */
  notificationType: CrmNotificationType;
  /**
   * Recipient contact information
   */
  recipient: string;
  sentAt: Timestamp | null;
  shipmentId: string;
  subject: string | null;
  updated: Generated<Timestamp>;
}

export interface CrmOpportunities {
  /**
   * Expected revenue amount in base currency
   */
  amount: Generated<Numeric>;
  /**
   * Expected or actual closing date
   */
  closeDate: Timestamp | null;
  /**
   * Reference to the company for this opportunity
   */
  companyId: string | null;
  created: Generated<Timestamp>;
  id: Generated<string>;
  /**
   * Descriptive name for the opportunity
   */
  name: string;
  /**
   * Main contact person for this opportunity
   */
  primaryContactId: string | null;
  /**
   * Percentage probability of closing (0-100)
   */
  probability: Generated<Numeric>;
  /**
   * Current stage in the sales process
   */
  stage: CrmOpportunityStage;
  updated: Generated<Timestamp>;
}

export interface CrmOpportunityProducts {
  created: Generated<Timestamp>;
  id: Generated<string>;
  /**
   * Reference to the sales opportunity
   */
  opportunityId: string;
  /**
   * Reference to the product
   */
  productId: string;
  /**
   * Number of units for this product in the opportunity
   */
  quantity: Generated<Numeric>;
  /**
   * Calculated total price (quantity × unit_price)
   */
  totalPrice: Generated<Numeric | null>;
  /**
   * Price per unit for this product in this opportunity
   */
  unitPrice: Numeric;
  updated: Generated<Timestamp>;
}

export interface CrmProducts {
  created: Generated<Timestamp>;
  /**
   * Detailed product description
   */
  description: string | null;
  id: Generated<string>;
  /**
   * Product name or title
   */
  name: string;
  /**
   * Base price for the product
   */
  price: Numeric;
  /**
   * Stock Keeping Unit identifier
   */
  sku: string | null;
  updated: Generated<Timestamp>;
}

export interface LmsAddresses {
  /**
   * Primary address line (street number and name)
   */
  addressLine1: string;
  /**
   * Secondary address line (apartment, suite, etc.)
   */
  addressLine2: string | null;
  /**
   * Type of address usage
   */
  addressType: LmsAddressType;
  /**
   * City name
   */
  city: string;
  /**
   * ISO 3166-1 alpha-3 country code
   */
  country: string;
  created: Generated<Timestamp>;
  id: Generated<string>;
  /**
   * Whether address has been verified against postal service
   */
  isValidated: Generated<boolean>;
  /**
   * Latitude coordinate for mapping
   */
  latitude: Numeric | null;
  /**
   * Longitude coordinate for mapping
   */
  longitude: Numeric | null;
  /**
   * Postal or ZIP code
   */
  postalCode: string;
  /**
   * State or province
   */
  state: string;
  updated: Generated<Timestamp>;
}

export interface LmsPackages {
  /**
   * Description of package contents
   */
  contentsDescription: string | null;
  created: Generated<Timestamp>;
  /**
   * Declared value for customs and insurance
   */
  declaredValue: Numeric | null;
  /**
   * Package height in cm
   */
  height: Numeric | null;
  id: Generated<string>;
  /**
   * Package length in cm
   */
  length: Numeric | null;
  /**
   * Package identifier within shipment
   */
  packageNumber: string;
  /**
   * Physical package type
   */
  packageType: LmsPackageType;
  shipmentId: string;
  updated: Generated<Timestamp>;
  /**
   * Package weight in kg
   */
  weight: Numeric;
  /**
   * Package width in cm
   */
  width: Numeric | null;
}

export interface LmsPricingRates {
  /**
   * Base shipping cost in PHP
   */
  baseRate: Numeric;
  created: Generated<Timestamp>;
  destinationZoneId: string;
  effectiveDate: Timestamp;
  expiryDate: Timestamp | null;
  /**
   * Fuel surcharge percentage
   */
  fuelSurchargeRate: Generated<Numeric | null>;
  id: Generated<string>;
  originZoneId: string;
  /**
   * Additional cost per kg in PHP
   */
  perKgRate: Numeric;
  serviceId: string;
  updated: Generated<Timestamp>;
  /**
   * Maximum weight for this rate in kg
   */
  weightMax: Numeric;
  /**
   * Minimum weight for this rate in kg
   */
  weightMin: Numeric;
}

export interface LmsPricingZoneCountries {
  /**
   * ISO 3166-1 alpha-3 country code
   */
  countryCode: string;
  created: Generated<Timestamp>;
  id: Generated<string>;
  pricingZoneId: string;
}

export interface LmsPricingZones {
  created: Generated<Timestamp>;
  id: Generated<string>;
  /**
   * Zone display name
   */
  name: string;
  updated: Generated<Timestamp>;
  /**
   * Short code for zone identification
   */
  zoneCode: string;
}

export interface LmsProviderInvoiceLineItems {
  created: Generated<Timestamp>;
  /**
   * Description of service or charge
   */
  description: string;
  id: Generated<string>;
  /**
   * Total for this line item
   */
  lineTotal: Generated<Numeric | null>;
  providerInvoiceId: string;
  /**
   * Quantity of service units
   */
  quantity: Generated<number>;
  transportLegId: string;
  /**
   * Price per unit
   */
  unitPrice: Numeric;
  updated: Generated<Timestamp>;
}

export interface LmsProviderInvoices {
  created: Generated<Timestamp>;
  currency: Generated<string>;
  dueDate: Timestamp;
  id: Generated<string>;
  invoiceDate: Timestamp;
  /**
   * Provider invoice number
   */
  invoiceNumber: string;
  paymentDate: Timestamp | null;
  providerId: string;
  /**
   * Current payment status
   */
  status: LmsProviderInvoiceStatus;
  /**
   * Invoice subtotal before taxes
   */
  subtotal: Numeric;
  /**
   * Total tax amount
   */
  taxAmount: Generated<Numeric | null>;
  /**
   * Final invoice total
   */
  totalAmount: Generated<Numeric | null>;
  updated: Generated<Timestamp>;
}

export interface LmsProviderPerformance {
  created: Generated<Timestamp>;
  id: Generated<string>;
  /**
   * Date when metric was measured
   */
  measurementDate: Timestamp;
  /**
   * Type of performance metric being measured
   */
  metricType: LmsPerformanceMetricType;
  /**
   * Numeric value of the metric
   */
  metricValue: Numeric | null;
  notes: string | null;
  providerId: string;
  shipmentId: string;
  transportLegId: string | null;
  updated: Generated<Timestamp>;
}

export interface LmsProviderRates {
  baseRate: Numeric;
  created: Generated<Timestamp>;
  currency: Generated<string>;
  destinationZoneId: string;
  effectiveDate: Timestamp;
  expiryDate: Timestamp | null;
  fuelSurchargeRate: Generated<Numeric | null>;
  id: Generated<string>;
  originZoneId: string;
  perKgRate: Numeric;
  providerServiceId: string;
  updated: Generated<Timestamp>;
  weightMax: Numeric;
  weightMin: Numeric;
}

export interface LmsProviderServiceDestinationCountries {
  /**
   * ISO 3166-1 alpha-3 country code
   */
  countryCode: string;
  created: Generated<Timestamp>;
  id: Generated<string>;
  providerServiceId: string;
}

export interface LmsProviderServiceMaxDimensions {
  created: Generated<Timestamp>;
  /**
   * Height in cm
   */
  height: Numeric | null;
  id: Generated<string>;
  /**
   * Length in cm
   */
  length: Numeric | null;
  providerServiceId: string;
  /**
   * Width in cm
   */
  width: Numeric | null;
}

export interface LmsProviderServiceOriginCountries {
  /**
   * ISO 3166-1 alpha-3 country code
   */
  countryCode: string;
  created: Generated<Timestamp>;
  id: Generated<string>;
  providerServiceId: string;
}

export interface LmsProviderServices {
  created: Generated<Timestamp>;
  /**
   * Daily cutoff time for pickups
   */
  cutoffTime: string | null;
  id: Generated<string>;
  insuranceAvailable: Generated<boolean>;
  isActive: Generated<boolean>;
  maxWeight: Numeric | null;
  providerId: string;
  /**
   * Provider-specific service name
   */
  serviceName: string;
  /**
   * Type of service offered
   */
  serviceType: LmsServiceType;
  trackingAvailable: Generated<boolean>;
  transitTimeMax: number | null;
  transitTimeMin: number | null;
  /**
   * Mode of transportation
   */
  transportMode: LmsTransportMode;
  updated: Generated<Timestamp>;
}

export interface LmsRoutes {
  actualArrival: Timestamp | null;
  actualDeparture: Timestamp | null;
  created: Generated<Timestamp>;
  driverId: string | null;
  estimatedArrival: Timestamp | null;
  estimatedDeparture: Timestamp | null;
  id: Generated<string>;
  /**
   * Date the route is scheduled
   */
  routeDate: Timestamp;
  /**
   * Descriptive name for the route
   */
  routeName: string;
  /**
   * Current status of the route
   */
  status: LmsRouteStatus;
  updated: Generated<Timestamp>;
  vehicleId: string | null;
}

export interface LmsRouteShipments {
  actualDelivery: Timestamp | null;
  created: Generated<Timestamp>;
  deliveryDate: Timestamp;
  /**
   * Status of delivery attempt
   */
  deliveryStatus: LmsDeliveryStatus;
  estimatedDelivery: Timestamp | null;
  id: Generated<string>;
  /**
   * Name of person who signed for delivery
   */
  recipientSignature: string | null;
  routeId: string;
  /**
   * Delivery order on the route
   */
  sequenceNumber: number;
  shipmentId: string;
  signatureRequired: Generated<boolean>;
  updated: Generated<Timestamp>;
}

export interface LmsShipments {
  assignedDepartmentId: string | null;
  created: Generated<Timestamp>;
  /**
   * User who created the shipment
   */
  createdBy: string | null;
  /**
   * ISO 4217 currency code
   */
  currency: Generated<string>;
  deliveryDate: Timestamp | null;
  estimatedDeliveryDate: Timestamp | null;
  id: Generated<string>;
  /**
   * Insurance coverage amount
   */
  insuranceAmount: Numeric | null;
  pickupDate: Timestamp | null;
  /**
   * Primary method of transportation
   */
  primaryTransportMode: LmsTransportMode;
  receiverAddressId: string;
  receiverCompanyId: string | null;
  receiverContactId: string | null;
  senderAddressId: string;
  senderCompanyId: string | null;
  senderContactId: string | null;
  serviceId: string;
  shippingCost: Numeric | null;
  specialInstructions: string | null;
  /**
   * Current shipment status in delivery lifecycle
   */
  status: LmsShipmentStatus;
  /**
   * Declared value of shipment contents
   */
  totalValue: Numeric | null;
  /**
   * Combined weight of all packages in kg
   */
  totalWeight: Numeric;
  /**
   * Unique tracking identifier for customer reference
   */
  trackingNumber: string;
  updated: Generated<Timestamp>;
}

export interface LmsShippingServiceMaxDimensions {
  created: Generated<Timestamp>;
  /**
   * Height in cm
   */
  height: Numeric | null;
  id: Generated<string>;
  /**
   * Length in cm
   */
  length: Numeric | null;
  shippingServiceId: string;
  /**
   * Width in cm
   */
  width: Numeric | null;
}

export interface LmsShippingServices {
  created: Generated<Timestamp>;
  /**
   * Maximum delivery time in hours
   */
  deliveryTimeMax: number | null;
  /**
   * Minimum delivery time in hours
   */
  deliveryTimeMin: number | null;
  /**
   * Detailed service description
   */
  description: string | null;
  id: Generated<string>;
  isActive: Generated<boolean>;
  /**
   * Maximum package weight in kg
   */
  maxWeight: Numeric | null;
  /**
   * Service display name
   */
  name: string;
  /**
   * Service category classification
   */
  serviceType: LmsServiceType;
  updated: Generated<Timestamp>;
}

export interface LmsTrackingEvents {
  created: Generated<Timestamp>;
  /**
   * Human-readable event description
   */
  eventDescription: string;
  /**
   * Location where event occurred
   */
  eventLocation: string | null;
  /**
   * When the event occurred
   */
  eventTimestamp: Timestamp;
  /**
   * Type of tracking event
   */
  eventType: LmsTrackingEventType;
  id: Generated<string>;
  shipmentId: string;
  updated: Generated<Timestamp>;
}

export interface LmsTransportationProviders {
  addressId: string | null;
  /**
   * API URL for integration
   */
  apiEndpoint: string | null;
  /**
   * API authentication key
   */
  apiKey: string | null;
  /**
   * Provider company name
   */
  companyName: string;
  /**
   * Primary contact name
   */
  contactPerson: string | null;
  contractEndDate: Timestamp | null;
  contractStartDate: Timestamp | null;
  created: Generated<Timestamp>;
  /**
   * Primary contact email
   */
  email: string | null;
  id: Generated<string>;
  insuranceCoverage: Numeric | null;
  isActive: Generated<boolean>;
  paymentTerms: string | null;
  /**
   * Provider performance rating (0-5 scale)
   */
  performanceRating: Numeric | null;
  /**
   * Primary contact phone
   */
  phoneNumber: string | null;
  preferredByDepartmentId: string | null;
  /**
   * Type of transportation service
   */
  providerType: LmsProviderType;
  updated: Generated<Timestamp>;
}

export interface LmsTransportLegs {
  actualDelivery: Timestamp | null;
  actualPickup: Timestamp | null;
  cost: Numeric | null;
  created: Generated<Timestamp>;
  currency: Generated<string | null>;
  destinationAddressId: string | null;
  destinationWarehouseId: string | null;
  driverId: string | null;
  id: Generated<string>;
  /**
   * Sequence order of this leg in the shipment journey
   */
  legSequence: number;
  originAddressId: string | null;
  originWarehouseId: string | null;
  providerId: string | null;
  providerServiceId: string | null;
  /**
   * External provider tracking number
   */
  providerTrackingNumber: string | null;
  scheduledDelivery: Timestamp | null;
  scheduledPickup: Timestamp | null;
  shipmentId: string;
  specialInstructions: string | null;
  /**
   * Current status of this transport leg
   */
  status: LmsLegStatus;
  /**
   * Type of transportation leg
   */
  transportType: LmsTransportLegType;
  updated: Generated<Timestamp>;
  vehicleId: string | null;
}

export interface LmsWarehouseInventories {
  /**
   * When package arrived at warehouse
   */
  arrivedAt: Timestamp | null;
  created: Generated<Timestamp>;
  /**
   * When package left warehouse
   */
  departedAt: Timestamp | null;
  id: Generated<string>;
  /**
   * Specific location within warehouse (aisle, shelf, etc.)
   */
  locationCode: string | null;
  packageId: string;
  shipmentId: string;
  /**
   * Current status of package in warehouse
   */
  status: LmsWarehouseInventoryStatus;
  updated: Generated<Timestamp>;
  warehouseId: string;
}

export interface LmsWarehouses {
  addressId: string;
  /**
   * Storage capacity in cubic meters
   */
  capacity: number | null;
  /**
   * Short code for warehouse identification
   */
  code: string;
  created: Generated<Timestamp>;
  departmentId: string | null;
  id: Generated<string>;
  isActive: Generated<boolean>;
  /**
   * Warehouse manager user reference
   */
  managerId: string | null;
  /**
   * Warehouse display name
   */
  name: string;
  updated: Generated<Timestamp>;
  /**
   * Type of warehouse operation
   */
  warehouseType: LmsWarehouseType;
}

export interface OrgDepartmentPermissions {
  action: OrgPermissionStatus;
  created: Generated<Timestamp>;
  departmentId: string;
  id: Generated<string>;
  resource: string;
  updated: Generated<Timestamp>;
}

export interface OrgDepartments {
  /**
   * Department budget allocation
   */
  budget: Numeric | null;
  /**
   * Unique department code for identification
   */
  code: string;
  created: Generated<Timestamp>;
  /**
   * Type of department (e.g., logistics, finance, operations)
   */
  departmentType: string;
  description: string | null;
  email: string | null;
  id: Generated<string>;
  isActive: Generated<boolean>;
  /**
   * Department manager user reference
   */
  managerId: string | null;
  /**
   * Department display name
   */
  name: string;
  phoneNumber: string | null;
  updated: Generated<Timestamp>;
}

export interface OrgDepartmentTransportModes {
  created: Generated<Timestamp>;
  departmentId: string;
  id: Generated<string>;
  /**
   * Whether this is the primary transport mode for the department
   */
  isPrimary: Generated<boolean>;
  /**
   * Transport method (e.g., truck, rail, air, sea)
   */
  transportMode: string;
  updated: Generated<Timestamp>;
}

export interface OrgDepartmentUserPermissions {
  created: Generated<Timestamp>;
  id: Generated<string>;
  permissionId: string;
  userId: string;
}

export interface OrgDepartmentUsers {
  assignedDate: Generated<Timestamp>;
  created: Generated<Timestamp>;
  departmentId: string;
  id: Generated<string>;
  isActive: Generated<boolean>;
  role: string;
  updated: Generated<Timestamp>;
  userId: string;
}

export interface OrgDrivers {
  created: Generated<Timestamp>;
  email: string;
  /**
   * Company employee identification number
   */
  employeeId: string;
  firstName: string;
  hireDate: Timestamp;
  id: Generated<string>;
  lastName: string;
  /**
   * Driver license number
   */
  licenseNumber: string;
  phoneNumber: string;
  /**
   * Current employment status
   */
  status: OrgDriverStatus;
  updated: Generated<Timestamp>;
}

export interface OrgVehicles {
  /**
   * Maximum volume capacity in cubic meters
   */
  capacityVolume: Numeric | null;
  /**
   * Maximum weight capacity in kg
   */
  capacityWeight: Numeric | null;
  created: Generated<Timestamp>;
  departmentId: string | null;
  id: Generated<string>;
  /**
   * Government license plate number
   */
  licensePlate: string;
  make: string;
  model: string;
  /**
   * Current operational status
   */
  status: OrgVehicleStatus;
  updated: Generated<Timestamp>;
  /**
   * Company vehicle identification number
   */
  vehicleNumber: string;
  /**
   * Type of vehicle
   */
  vehicleType: OrgVehicleType;
  warehouseId: string | null;
  year: number;
}

export interface DB {
  _SqlxMigrations: _SqlxMigrations;
  authUsers: AuthUsers;
  crmCampaignContacts: CrmCampaignContacts;
  crmCampaigns: CrmCampaigns;
  crmCases: CrmCases;
  crmCompanies: CrmCompanies;
  crmContacts: CrmContacts;
  crmInteractions: CrmInteractions;
  crmInvoiceLineItems: CrmInvoiceLineItems;
  crmInvoices: CrmInvoices;
  crmLeads: CrmLeads;
  crmNotifications: CrmNotifications;
  crmOpportunities: CrmOpportunities;
  crmOpportunityProducts: CrmOpportunityProducts;
  crmProducts: CrmProducts;
  lmsAddresses: LmsAddresses;
  lmsPackages: LmsPackages;
  lmsPricingRates: LmsPricingRates;
  lmsPricingZoneCountries: LmsPricingZoneCountries;
  lmsPricingZones: LmsPricingZones;
  lmsProviderInvoiceLineItems: LmsProviderInvoiceLineItems;
  lmsProviderInvoices: LmsProviderInvoices;
  lmsProviderPerformance: LmsProviderPerformance;
  lmsProviderRates: LmsProviderRates;
  lmsProviderServiceDestinationCountries: LmsProviderServiceDestinationCountries;
  lmsProviderServiceMaxDimensions: LmsProviderServiceMaxDimensions;
  lmsProviderServiceOriginCountries: LmsProviderServiceOriginCountries;
  lmsProviderServices: LmsProviderServices;
  lmsRoutes: LmsRoutes;
  lmsRouteShipments: LmsRouteShipments;
  lmsShipments: LmsShipments;
  lmsShippingServiceMaxDimensions: LmsShippingServiceMaxDimensions;
  lmsShippingServices: LmsShippingServices;
  lmsTrackingEvents: LmsTrackingEvents;
  lmsTransportationProviders: LmsTransportationProviders;
  lmsTransportLegs: LmsTransportLegs;
  lmsWarehouseInventories: LmsWarehouseInventories;
  lmsWarehouses: LmsWarehouses;
  orgDepartmentPermissions: OrgDepartmentPermissions;
  orgDepartments: OrgDepartments;
  orgDepartmentTransportModes: OrgDepartmentTransportModes;
  orgDepartmentUserPermissions: OrgDepartmentUserPermissions;
  orgDepartmentUsers: OrgDepartmentUsers;
  orgDrivers: OrgDrivers;
  orgVehicles: OrgVehicles;
}
