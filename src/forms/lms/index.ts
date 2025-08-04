// Shipments - Core entity

// Addresses - Core entity
export { CreateLmsAddressForm, UpdateLmsAddressForm } from './addresses';
// Packages - Core entity
export { CreateLmsPackageForm, UpdateLmsPackageForm } from './packages';
export {
  CreateLmsPricingRateForm,
  UpdateLmsPricingRateForm,
} from './pricing-rates';
// Pricing & Zone Management
export {
  CreateLmsPricingZoneForm,
  UpdateLmsPricingZoneForm,
} from './pricing-zones';
export {
  CreateLmsProviderInvoiceLineItemForm,
  UpdateLmsProviderInvoiceLineItemForm,
} from './provider-invoice-line-items';
export {
  CreateLmsProviderInvoiceForm,
  UpdateLmsProviderInvoiceForm,
} from './provider-invoices';
export {
  CreateLmsProviderPerformanceForm,
  UpdateLmsProviderPerformanceForm,
} from './provider-performance';
export {
  CreateLmsProviderServiceForm,
  UpdateLmsProviderServiceForm,
} from './provider-services';
// Provider Management
export { CreateLmsProviderForm, UpdateLmsProviderForm } from './providers';
// Routes - Core entity
export { CreateLmsRouteForm, UpdateLmsRouteForm } from './routes';
export { CreateLmsShipmentForm, UpdateLmsShipmentForm } from './shipments';
// Services
export {
  CreateLmsShippingServiceForm,
  UpdateLmsShippingServiceForm,
} from './shipping-services';
// Tracking Events - Core entity
export {
  CreateLmsTrackingEventForm,
  UpdateLmsTrackingEventForm,
} from './tracking-events';
export {
  CreateLmsTransportLegForm,
  UpdateLmsTransportLegForm,
} from './transport-legs';
// Transportation Providers - Core entity
export {
  CreateLmsTransportationProviderForm,
  UpdateLmsTransportationProviderForm,
} from './transportation-providers';
// Inventory Management
export {
  CreateLmsWarehouseInventoryForm,
  UpdateLmsWarehouseInventoryForm,
} from './warehouse-inventories';
// Warehouses - Core entity
export { CreateLmsWarehouseForm, UpdateLmsWarehouseForm } from './warehouses';

// Note: Additional LMS forms for other entities can be added as needed:
// - Pricing rates, zones, and related entities
// - Provider services and configurations
// - Warehouse inventories
// - Transport legs
// - Route shipments
// - Provider invoices and line items
// - Provider performance tracking
