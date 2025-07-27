// Core logistics entities
import Addresses from './addresses';
import Packages from './packages';
// Pricing and rate management
import PricingRates from './pricing-rates';
import PricingZoneCountries from './pricing-zone-countries';
import PricingZones from './pricing-zones';
import ProviderInvoiceLineItems from './provider-invoice-line-items';
// Provider management
import ProviderInvoices from './provider-invoices';
import ProviderPerformance from './provider-performance';
import ProviderRates from './provider-rates';
import ProviderServiceDestinationCountries from './provider-service-destination-countries';
import ProviderServiceMaxDimensions from './provider-service-max-dimensions';
import ProviderServiceOriginCountries from './provider-service-origin-countries';
import ProviderServices from './provider-services';
// Route and transport management
import RouteShipments from './route-shipments';
import Routes from './routes';
import Shipments from './shipments';
// Service dimensions and warehouse
import ShippingServiceMaxDimensions from './shipping-service-max-dimensions';
import ShippingServices from './shipping-services';
import TrackingEvents from './tracking-events';
import TransportLegs from './transport-legs';
import TransportationProviders from './transportation-providers';
import WarehouseInventories from './warehouse-inventories';
import Warehouses from './warehouses';

export const queries = {
  // Core logistics entities
  addresses: Addresses.queries,
  shipments: Shipments.queries,
  packages: Packages.queries,
  trackingEvents: TrackingEvents.queries,
  routes: Routes.queries,
  warehouses: Warehouses.queries,
  shippingServices: ShippingServices.queries,
  transportationProviders: TransportationProviders.queries,

  // Pricing and rate management
  pricingRates: PricingRates.queries,
  pricingZones: PricingZones.queries,
  pricingZoneCountries: PricingZoneCountries.queries,

  // Provider management
  providerInvoices: ProviderInvoices.queries,
  providerInvoiceLineItems: ProviderInvoiceLineItems.queries,
  providerPerformance: ProviderPerformance.queries,
  providerRates: ProviderRates.queries,
  providerServices: ProviderServices.queries,
  providerServiceDestinationCountries:
    ProviderServiceDestinationCountries.queries,
  providerServiceMaxDimensions: ProviderServiceMaxDimensions.queries,
  providerServiceOriginCountries: ProviderServiceOriginCountries.queries,

  // Route and transport management
  routeShipments: RouteShipments.queries,
  transportLegs: TransportLegs.queries,

  // Service dimensions and warehouse
  shippingServiceMaxDimensions: ShippingServiceMaxDimensions.queries,
  warehouseInventories: WarehouseInventories.queries,
};

export const mutations = {
  // Core logistics entities
  ...Addresses.mutations,
  ...Shipments.mutations,
  ...Packages.mutations,
  ...TrackingEvents.mutations,
  ...Routes.mutations,
  ...Warehouses.mutations,
  ...ShippingServices.mutations,
  ...TransportationProviders.mutations,

  // Pricing and rate management
  ...PricingRates.mutations,
  ...PricingZones.mutations,
  ...PricingZoneCountries.mutations,

  // Provider management
  ...ProviderInvoices.mutations,
  ...ProviderInvoiceLineItems.mutations,
  ...ProviderPerformance.mutations,
  ...ProviderRates.mutations,
  ...ProviderServices.mutations,
  ...ProviderServiceDestinationCountries.mutations,
  ...ProviderServiceMaxDimensions.mutations,
  ...ProviderServiceOriginCountries.mutations,

  // Route and transport management
  ...RouteShipments.mutations,
  ...TransportLegs.mutations,

  // Service dimensions and warehouse
  ...ShippingServiceMaxDimensions.mutations,
  ...WarehouseInventories.mutations,
};

export default {
  queries,
  mutations,
};
