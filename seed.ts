import { faker } from '@faker-js/faker';
import {
  CamelCasePlugin,
  type Insertable,
  Kysely,
  PostgresDialect,
} from 'kysely';
import { Pool } from 'pg';
import 'dotenv/config';

// Import all types and enums from your generated schema file
import type { DB } from './src/db/types';
import {
  CrmCampaignContactsStatus,
  CrmCampaignStatus,
  CrmCasePriority,
  CrmCaseStatus,
  CrmContactStatus,
  CrmInteractionType,
  CrmInvoiceStatus,
  CrmLeadStatus,
  CrmNotificationChannel,
  CrmNotificationDeliveryStatus,
  CrmNotificationType,
  CrmOpportunityStage,
  LmsAddressType,
  LmsDeliveryStatus,
  LmsLegStatus,
  LmsPackageType,
  LmsPerformanceMetricType,
  LmsProviderInvoiceStatus,
  LmsProviderType,
  LmsRouteStatus,
  LmsServiceType,
  LmsShipmentStatus,
  LmsTrackingEventType,
  LmsTransportLegType,
  LmsTransportMode,
  LmsWarehouseInventoryStatus,
  LmsWarehouseType,
  OrgDriverStatus,
  OrgPermissionStatus,
  OrgVehicleStatus,
  OrgVehicleType,
} from './src/db/types';

// --- CONFIGURATION ---
const NUM_USERS = 50;
const NUM_DEPARTMENTS = 10;
const NUM_ADDRESSES = 200;
const NUM_COMPANIES = 75;
const NUM_CONTACTS = 150;
const NUM_PRODUCTS = 40;
const NUM_LEADS = 100;
const NUM_PROVIDERS = 15;
const NUM_WAREHOUSES = 8;
const NUM_VEHICLES = 30;
const NUM_DRIVERS = 30;
const NUM_SHIPMENTS = 300;
const NUM_CAMPAIGNS = 10;
const NUM_OPPORTUNITIES = 50;
const NUM_PACKAGES_PER_SHIPMENT = 2;
const NUM_ROUTES = 25;

type KyselyDb = Kysely<DB>;

/**
 * Helper function to get a random item from an array.
 * @param arr The array to pick from.
 * @returns A random item from the array, or undefined if the array is empty.
 */
const getRandom = <T>(arr: T[]): T | undefined => {
  if (arr.length === 0) return undefined;
  return arr[Math.floor(Math.random() * arr.length)];
};

// --- SEEDING FUNCTIONS ---

// Level 1 Seeding (No Dependencies)
async function seedAddresses(db: KyselyDb) {
  console.log('🔄 Seeding addresses...');
  const data: Insertable<DB['lmsAddresses']>[] = Array.from(
    {
      length: NUM_ADDRESSES,
    },
    () => ({
      addressLine1: faker.location.streetAddress(),
      addressLine2: faker.helpers.maybe(
        () => faker.location.secondaryAddress(),
        {
          probability: 0.3,
        },
      ),
      city: faker.location.city(),
      state: faker.location.state({ abbreviated: true }),
      postalCode: faker.location.zipCode(),
      country: 'USA',
      addressType: faker.helpers.arrayElement(Object.values(LmsAddressType)),
      latitude: faker.location.latitude().toString(),
      longitude: faker.location.longitude().toString(),
    }),
  );

  if (data.length === 0) return [];
  const result = await db
    .insertInto('lmsAddresses')
    .values(data)
    .returning('id')
    .execute();
  console.log(`✅ Seeded ${result.length} addresses.`);
  return result.map((r) => r.id);
}

async function seedUsers(db: KyselyDb) {
  console.log('🔄 Seeding users...');
  const data: Insertable<DB['authUsers']>[] = Array.from(
    { length: NUM_USERS },
    () => ({
      name: faker.person.fullName(),
      email: faker.internet.email().toLowerCase(),
      password: faker.internet.password(), // Mapped via CamelCasePlugin
    }),
  );

  if (data.length === 0) return [];
  const result = await db
    .insertInto('authUsers')
    .values(data)
    .onConflict((oc) => oc.column('email').doNothing())
    .returning('id')
    .execute();
  console.log(`✅ Seeded ${result.length} users.`);
  return result.map((r) => r.id);
}

async function seedProducts(db: KyselyDb) {
  console.log('🔄 Seeding products...');
  const data: Insertable<DB['crmProducts']>[] = Array.from(
    {
      length: NUM_PRODUCTS,
    },
    () => ({
      name: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
      price: faker.commerce.price({ min: 10, max: 2000 }),
      sku: faker.string.alphanumeric(10).toUpperCase(),
    }),
  );

  if (data.length === 0) return [];
  const result = await db
    .insertInto('crmProducts')
    .values(data)
    .onConflict((oc) => oc.column('sku').doNothing())
    .onConflict((oc) => oc.column('name').doNothing())
    .returning('id')
    .execute();
  console.log(`✅ Seeded ${result.length} products.`);
  return result.map((r) => r.id);
}

async function seedShippingServices(db: KyselyDb) {
  console.log('🔄 Seeding shipping services...');
  const data: Insertable<DB['lmsShippingServices']>[] = Array.from(
    {
      length: 10,
    },
    () => ({
      name: `${faker.company.name()} ${faker.helpers.arrayElement([
        'Express',
        'Standard',
        'Economy',
      ])}`,
      description: faker.lorem.sentence(),
      serviceType: faker.helpers.arrayElement(Object.values(LmsServiceType)),
      isActive: true,
    }),
  );

  if (data.length === 0) return [];
  const result = await db
    .insertInto('lmsShippingServices')
    .values(data)
    .onConflict((oc) => oc.column('name').doNothing())
    .returning('id')
    .execute();
  console.log(`✅ Seeded ${result.length} shipping services.`);
  return result.map((r) => r.id);
}

async function seedLeads(db: KyselyDb) {
  console.log('🔄 Seeding leads...');
  const data: Insertable<DB['crmLeads']>[] = Array.from(
    { length: NUM_LEADS },
    () => ({
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email().toLowerCase(),
      companyName: faker.company.name(),
      leadStatus: faker.helpers.arrayElement(Object.values(CrmLeadStatus)),
      leadSource: faker.helpers.arrayElement(['Organic', 'Paid', 'Referral']),
    }),
  );

  if (data.length === 0) return [];
  const result = await db
    .insertInto('crmLeads')
    .values(data)
    .onConflict((oc) => oc.column('email').doNothing())
    .returning('id')
    .execute();
  console.log(`✅ Seeded ${result.length} leads.`);
  return result.map((r) => r.id);
}

async function seedDrivers(db: KyselyDb) {
  console.log('🔄 Seeding drivers...');
  const data: Insertable<DB['orgDrivers']>[] = Array.from(
    {
      length: NUM_DRIVERS,
    },
    () => ({
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email().toLowerCase(),
      phoneNumber: faker.phone.number({ style: 'international' }),
      licenseNumber: faker.string.alphanumeric(8).toUpperCase(),
      employeeId: faker.string.alphanumeric(20).toUpperCase(),
      status: faker.helpers.arrayElement(Object.values(OrgDriverStatus)),
      hireDate: faker.date.past({ years: 5 }),
    }),
  );

  if (data.length === 0) return [];
  const result = await db
    .insertInto('orgDrivers')
    .values(data)
    .onConflict((oc) => oc.column('email').doNothing())
    .returning('id')
    .execute();
  console.log(`✅ Seeded ${result.length} drivers.`);
  return result.map((r) => r.id);
}

// Level 2 Seeding
async function seedCompanies(db: KyselyDb, addressIds: string[]) {
  console.log('🔄 Seeding companies...');
  const data: Insertable<DB['crmCompanies']>[] = Array.from(
    {
      length: NUM_COMPANIES,
    },
    () => ({
      name: faker.company.name(),
      email: faker.internet.email().toLowerCase(),
      phoneNumber: faker.phone.number({ style: 'international' }),
      website: faker.internet.url(),
      industry: faker.company.buzzNoun(),
      description: faker.company.catchPhrase(),
      addressId: getRandom(addressIds),
    }),
  );

  if (data.length === 0) return [];
  const result = await db
    .insertInto('crmCompanies')
    .values(data)
    .onConflict((oc) => oc.column('name').doNothing())
    .returning('id')
    .execute();
  console.log(`✅ Seeded ${result.length} companies.`);
  return result.map((r) => r.id);
}

async function seedContacts(
  db: KyselyDb,
  companyIds: string[],
  addressIds: string[],
) {
  console.log('🔄 Seeding contacts...');
  const data: Insertable<DB['crmContacts']>[] = Array.from(
    {
      length: NUM_CONTACTS,
    },
    () => ({
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email().toLowerCase(),
      phoneNumber: faker.phone.number({ style: 'international' }),
      jobTitle: faker.person.jobTitle(),
      status: faker.helpers.arrayElement(Object.values(CrmContactStatus)),
      companyId: getRandom(companyIds),
      addressId: getRandom(addressIds),
      leadSource: faker.helpers.arrayElement([
        'Website',
        'Referral',
        'Cold Call',
      ]),
    }),
  );

  if (data.length === 0) return [];
  const result = await db
    .insertInto('crmContacts')
    .values(data)
    .onConflict((oc) => oc.column('email').doNothing())
    .returning('id')
    .execute();
  console.log(`✅ Seeded ${result.length} contacts.`);
  return result.map((r) => r.id);
}

async function seedDepartments(db: KyselyDb, userIds: string[]) {
  console.log('🔄 Seeding departments...');
  const data: Insertable<DB['orgDepartments']>[] = Array.from(
    {
      length: NUM_DEPARTMENTS,
    },
    () => ({
      name: faker.commerce.department(),
      code: faker.string.alphanumeric(5).toUpperCase(),
      departmentType: faker.helpers.arrayElement([
        'Logistics',
        'Finance',
        'Operations',
        'Sales',
      ]),
      managerId: getRandom(userIds),
    }),
  );

  if (data.length === 0) return [];
  const result = await db
    .insertInto('orgDepartments')
    .values(data)
    .onConflict((oc) => oc.column('code').doNothing())
    .onConflict((oc) => oc.column('name').doNothing())
    .returning('id')
    .execute();
  console.log(`✅ Seeded ${result.length} departments.`);
  return result.map((r) => r.id);
}

async function seedProviders(db: KyselyDb, addressIds: string[]) {
  console.log('🔄 Seeding transportation providers...');
  const data: Insertable<DB['lmsTransportationProviders']>[] = Array.from(
    {
      length: NUM_PROVIDERS,
    },
    () => ({
      companyName: `${faker.company.name()} Logistics`,
      providerType: faker.helpers.arrayElement(Object.values(LmsProviderType)),
      addressId: getRandom(addressIds),
      email: faker.internet.email().toLowerCase(),
      phoneNumber: faker.phone.number({ style: 'international' }),
    }),
  );

  if (data.length === 0) return [];
  const result = await db
    .insertInto('lmsTransportationProviders')
    .values(data)
    .returning('id')
    .execute();
  console.log(`✅ Seeded ${result.length} transportation providers.`);
  return result.map((r) => r.id);
}

async function seedWarehouses(
  db: KyselyDb,
  addressIds: string[],
  departmentIds: string[],
  userIds: string[],
) {
  console.log('🔄 Seeding warehouses...');
  const data: Insertable<DB['lmsWarehouses']>[] = Array.from(
    {
      length: NUM_WAREHOUSES,
    },
    () => ({
      name: `${faker.location.city()} Distribution Center`,
      code: `WH-${faker.string.alphanumeric(6).toUpperCase()}`,
      addressId: getRandom(addressIds) as string,
      warehouseType: faker.helpers.arrayElement(
        Object.values(LmsWarehouseType),
      ),
      departmentId: getRandom(departmentIds),
      managerId: getRandom(userIds),
    }),
  );

  if (data.length === 0) return [];
  const result = await db
    .insertInto('lmsWarehouses')
    .values(data)
    .onConflict((oc) => oc.column('code').doNothing())
    .returning('id')
    .execute();
  console.log(`✅ Seeded ${result.length} warehouses.`);
  return result.map((r) => r.id);
}

async function seedVehicles(
  db: KyselyDb,
  departmentIds: string[],
  warehouseIds: string[],
) {
  console.log('🔄 Seeding vehicles...');
  const data: Insertable<DB['orgVehicles']>[] = Array.from(
    {
      length: NUM_VEHICLES,
    },
    () => ({
      make: faker.vehicle.manufacturer(),
      model: faker.vehicle.model(),
      year: faker.number.int({ min: 2015, max: 2025 }),
      licensePlate: faker.vehicle.vrm(),
      vehicleNumber: `V-${faker.string.alphanumeric(6).toUpperCase()}`,
      vehicleType: faker.helpers.arrayElement(Object.values(OrgVehicleType)),
      status: faker.helpers.arrayElement(Object.values(OrgVehicleStatus)),
      departmentId: getRandom(departmentIds),
      warehouseId: getRandom(warehouseIds),
      capacityWeight: faker.number.int({ min: 1000, max: 25000 }).toString(),
    }),
  );

  if (data.length === 0) return [];
  const result = await db
    .insertInto('orgVehicles')
    .values(data)
    .onConflict((oc) => oc.column('licensePlate').doNothing())
    .returning('id')
    .execute();
  console.log(`✅ Seeded ${result.length} vehicles.`);
  return result.map((r) => r.id);
}

// Level 3 Seeding
async function seedShipments(
  db: KyselyDb,
  userIds: string[],
  addressIds: string[],
  contactIds: string[],
  companyIds: string[],
  serviceIds: string[],
) {
  console.log('🔄 Seeding shipments...');
  const data: Insertable<DB['lmsShipments']>[] = Array.from(
    {
      length: NUM_SHIPMENTS,
    },
    () => {
      const senderContactId = getRandom(contactIds);
      const receiverContactId = getRandom(
        contactIds.filter((id) => id !== senderContactId),
      );
      return {
        trackingNumber: faker.string.alphanumeric(12).toUpperCase(),
        status: faker.helpers.arrayElement(Object.values(LmsShipmentStatus)),
        senderAddressId: getRandom(addressIds) as string,
        receiverAddressId: getRandom(addressIds) as string,
        senderContactId,
        receiverContactId,
        senderCompanyId: getRandom(companyIds),
        receiverCompanyId: getRandom(companyIds),
        serviceId: getRandom(serviceIds) as string,
        totalWeight: faker.number.float({ min: 0.5, max: 500 }).toString(),
        totalValue: faker.finance.amount({ min: 50, max: 10000 }),
        createdBy: getRandom(userIds),
        primaryTransportMode: faker.helpers.arrayElement(
          Object.values(LmsTransportMode),
        ),
        estimatedDeliveryDate: faker.date.future(),
      };
    },
  );

  if (data.length === 0) return [];
  const result = await db
    .insertInto('lmsShipments')
    .values(data)
    .onConflict((oc) => oc.column('trackingNumber').doNothing())
    .returning('id')
    .execute();
  console.log(`✅ Seeded ${result.length} shipments.`);
  return result.map((r) => r.id);
}

async function seedCases(db: KyselyDb, contactIds: string[]) {
  console.log('🔄 Seeding cases...');
  const data: Insertable<DB['crmCases']>[] = Array.from(
    {
      length: NUM_CONTACTS,
    },
    () => ({
      subject: faker.lorem.sentence(5),
      description: faker.lorem.paragraph(),
      status: faker.helpers.arrayElement(Object.values(CrmCaseStatus)),
      priority: faker.helpers.arrayElement(Object.values(CrmCasePriority)),
      contactId: getRandom(contactIds),
    }),
  );

  if (data.length === 0) return [];
  const result = await db
    .insertInto('crmCases')
    .values(data)
    .returning('id')
    .execute();
  console.log(`✅ Seeded ${result.length} cases.`);
  return result.map((r) => r.id);
}

async function seedProviderServices(db: KyselyDb, providerIds: string[]) {
  console.log('🔄 Seeding provider services...');
  const data: Insertable<DB['lmsProviderServices']>[] = [];
  providerIds.forEach((providerId) => {
    for (let i = 0; i < 3; i++) {
      data.push({
        providerId,
        serviceName: `${faker.helpers.arrayElement([
          'Overnight',
          'Ground',
          'Air',
        ])} Cargo ${i + 1}`,
        serviceType: faker.helpers.arrayElement(Object.values(LmsServiceType)),
        transportMode: faker.helpers.arrayElement(
          Object.values(LmsTransportMode),
        ),
      });
    }
  });

  if (data.length === 0) return [];
  const result = await db
    .insertInto('lmsProviderServices')
    .values(data)
    .returning('id')
    .execute();
  console.log(`✅ Seeded ${result.length} provider services.`);
  return result.map((r) => r.id);
}

async function seedRoutes(
  db: KyselyDb,
  driverIds: string[],
  vehicleIds: string[],
) {
  console.log('🔄 Seeding routes...');
  const data: Insertable<DB['lmsRoutes']>[] = Array.from(
    { length: NUM_ROUTES },
    () => ({
      routeName: `Route ${faker.location.city()} to ${faker.location.city()}`,
      routeDate: faker.date.soon(),
      status: faker.helpers.arrayElement(Object.values(LmsRouteStatus)),
      driverId: getRandom(driverIds),
      vehicleId: getRandom(vehicleIds),
    }),
  );

  if (data.length === 0) return [];
  const result = await db
    .insertInto('lmsRoutes')
    .values(data)
    .returning('id')
    .execute();
  console.log(`✅ Seeded ${result.length} routes.`);
  return result.map((r) => r.id);
}

async function seedCampaignsAndContacts(db: KyselyDb, contactIds: string[]) {
  console.log('🔄 Seeding campaigns...');
  const campaignData: Insertable<DB['crmCampaigns']>[] = Array.from(
    {
      length: NUM_CAMPAIGNS,
    },
    () => ({
      name: `${faker.commerce.productAdjective()} Marketing Blitz ${faker.date.future().getFullYear()}`,
      description: faker.lorem.sentence(),
      status: faker.helpers.arrayElement(Object.values(CrmCampaignStatus)),
      startDate: faker.date.past(),
      endDate: faker.date.future(),
      budget: faker.finance.amount({ min: 5000, max: 50000 }),
    }),
  );

  if (campaignData.length === 0) return;
  const campaignResults = await db
    .insertInto('crmCampaigns')
    .values(campaignData)
    .returning('id')
    .execute();
  const campaignIds = campaignResults.map((c) => c.id);
  console.log(`✅ Seeded ${campaignIds.length} campaigns.`);

  console.log('🔄 Seeding campaign contacts...');
  const campaignContactsData: Insertable<DB['crmCampaignContacts']>[] = [];
  campaignIds.forEach((campaignId) => {
    faker.helpers
      .arrayElements(contactIds, { min: 20, max: 50 })
      .forEach((contactId) => {
        campaignContactsData.push({
          campaignId,
          contactId,
          status: faker.helpers.arrayElement(
            Object.values(CrmCampaignContactsStatus),
          ),
        });
      });
  });

  if (campaignContactsData.length > 0) {
    const result = await db
      .insertInto('crmCampaignContacts')
      .values(campaignContactsData)
      .execute();
    console.log(`✅ Seeded campaign contacts.`);
  }
}

async function seedOpportunitiesAndProducts(
  db: KyselyDb,
  companyIds: string[],
  contactIds: string[],
  productIds: string[],
) {
  console.log('🔄 Seeding opportunities...');
  const opportunityData: Insertable<DB['crmOpportunities']>[] = Array.from(
    {
      length: NUM_OPPORTUNITIES,
    },
    () => ({
      name: `Deal for ${faker.company.name()}`,
      stage: faker.helpers.arrayElement(Object.values(CrmOpportunityStage)),
      amount: faker.finance.amount({ min: 1000, max: 250000 }),
      probability: faker.number.int({ min: 10, max: 90 }).toString(),
      closeDate: faker.date.future(),
      companyId: getRandom(companyIds),
      primaryContactId: getRandom(contactIds),
    }),
  );

  if (opportunityData.length === 0) return [];
  const opportunityResults = await db
    .insertInto('crmOpportunities')
    .values(opportunityData)
    .returning('id')
    .execute();
  const opportunityIds = opportunityResults.map((o) => o.id);
  console.log(`✅ Seeded ${opportunityIds.length} opportunities.`);

  console.log('🔄 Seeding opportunity products...');
  const oppProductsData: Insertable<DB['crmOpportunityProducts']>[] = [];
  opportunityIds.forEach((opportunityId) => {
    faker.helpers
      .arrayElements(productIds, { min: 1, max: 5 })
      .forEach((productId) => {
        const quantity = faker.number.int({ min: 1, max: 10 });
        const unitPrice = faker.commerce.price({ min: 50, max: 1000 });
        oppProductsData.push({
          opportunityId,
          productId,
          quantity: quantity.toString(),
          unitPrice,
        });
      });
  });

  if (oppProductsData.length > 0) {
    await db
      .insertInto('crmOpportunityProducts')
      .values(oppProductsData)
      .execute();
    console.log(`✅ Seeded opportunity products.`);
  }
  return opportunityIds;
}

// Level 4 Seeding
async function seedPackages(db: KyselyDb, shipmentIds: string[]) {
  console.log('🔄 Seeding packages...');
  const data: Insertable<DB['lmsPackages']>[] = [];
  shipmentIds.forEach((shipmentId) => {
    for (let i = 1; i <= NUM_PACKAGES_PER_SHIPMENT; i++) {
      data.push({
        shipmentId,
        packageNumber: `${i}`,
        packageType: faker.helpers.arrayElement(Object.values(LmsPackageType)),
        weight: faker.number.float({ min: 1, max: 50 }).toString(),
        length: faker.number.float({ min: 10, max: 100 }).toString(),
        width: faker.number.float({ min: 10, max: 100 }).toString(),
        height: faker.number.float({ min: 10, max: 100 }).toString(),
      });
    }
  });

  if (data.length === 0) return [];
  const result = await db
    .insertInto('lmsPackages')
    .values(data)
    .returning('id')
    .execute();
  console.log(`✅ Seeded ${result.length} packages.`);
  return result.map((r) => r.id);
}

async function seedTrackingEvents(db: KyselyDb, shipmentIds: string[]) {
  console.log('🔄 Seeding tracking events...');
  const data: Insertable<DB['lmsTrackingEvents']>[] = [];
  shipmentIds.forEach((shipmentId) => {
    for (let i = 0; i < 5; i++) {
      // 5 events per shipment
      data.push({
        shipmentId,
        eventType: faker.helpers.arrayElement(
          Object.values(LmsTrackingEventType),
        ),
        eventTimestamp: faker.date.past(),
        eventLocation: faker.location.city(),
        eventDescription: faker.lorem.sentence(),
      });
    }
  });

  if (data.length > 0) {
    await db.insertInto('lmsTrackingEvents').values(data).execute();
    console.log(`✅ Seeded tracking events.`);
  }
}

async function seedInvoicesAndItems(
  db: KyselyDb,
  companyIds: string[],
  contactIds: string[],
  shipmentIds: string[],
) {
  console.log('🔄 Seeding invoices...');
  const invoiceData: Insertable<DB['crmInvoices']>[] = Array.from(
    {
      length: 150,
    },
    () => {
      const subtotal = parseFloat(
        faker.finance.amount({ min: 100, max: 5000 }),
      );
      const tax = subtotal * 0.1;
      return {
        invoiceNumber: `INV-${faker.string.numeric(6)}`,
        status: faker.helpers.arrayElement(Object.values(CrmInvoiceStatus)),
        invoiceDate: faker.date.past(),
        dueDate: faker.date.soon(),
        subtotal: subtotal.toString(),
        taxAmount: tax.toString(),
        totalAmount: (subtotal + tax).toString(),
        companyId: getRandom(companyIds),
        contactId: getRandom(contactIds),
      };
    },
  );

  if (invoiceData.length === 0) return;
  const invoiceResults = await db
    .insertInto('crmInvoices')
    .values(invoiceData)
    .onConflict((oc) => oc.column('invoiceNumber').doNothing())
    .returning('id')
    .execute();
  const invoiceIds = invoiceResults.map((i) => i.id);
  console.log(`✅ Seeded ${invoiceIds.length} invoices.`);

  console.log('🔄 Seeding invoice line items...');
  const lineItemData: Insertable<DB['crmInvoiceLineItems']>[] = [];
  invoiceIds.forEach((invoiceId) => {
    for (let i = 0; i < 3; i++) {
      const quantity = faker.number.int({ min: 1, max: 5 });
      const unitPrice = parseFloat(faker.commerce.price({ min: 20, max: 500 }));
      lineItemData.push({
        invoiceId,
        description: `Service Charge - ${faker.lorem.words(3)}`,
        quantity: quantity.toString(),
        unitPrice: unitPrice.toString(),
        shipmentId: getRandom(shipmentIds),
      });
    }
  });

  if (lineItemData.length > 0) {
    await db.insertInto('crmInvoiceLineItems').values(lineItemData).execute();
    console.log(`✅ Seeded invoice line items.`);
  }
}

async function seedRouteShipments(
  db: KyselyDb,
  routeIds: string[],
  shipmentIds: string[],
) {
  console.log('🔄 Seeding route shipments...');
  const data: Insertable<DB['lmsRouteShipments']>[] = [];
  routeIds.forEach((routeId) => {
    const shipmentsForRoute = faker.helpers.arrayElements(shipmentIds, {
      min: 5,
      max: 15,
    });
    shipmentsForRoute.forEach((shipmentId, index) => {
      data.push({
        routeId,
        shipmentId,
        sequenceNumber: index + 1,
        deliveryStatus: faker.helpers.arrayElement(
          Object.values(LmsDeliveryStatus),
        ),
        deliveryDate: faker.date.soon(),
      });
    });
  });

  if (data.length > 0) {
    await db.insertInto('lmsRouteShipments').values(data).execute();
    console.log(`✅ Seeded route shipments.`);
  }
}

async function seedTransportLegs(
  db: KyselyDb,
  shipmentIds: string[],
  addressIds: string[],
  warehouseIds: string[],
  driverIds: string[],
  vehicleIds: string[],
  providerIds: string[],
) {
  console.log('🔄 Seeding transport legs...');
  const data: Insertable<DB['lmsTransportLegs']>[] = [];
  shipmentIds.forEach((shipmentId) => {
    const originWarehouseId = getRandom(warehouseIds);
    const destinationAddressId = getRandom(addressIds);
    data.push({
      shipmentId,
      legSequence: 1,
      status: faker.helpers.arrayElement(Object.values(LmsLegStatus)),
      transportType: faker.helpers.arrayElement(
        Object.values(LmsTransportLegType),
      ),
      originWarehouseId,
      destinationAddressId,
      driverId: getRandom(driverIds),
      vehicleId: getRandom(vehicleIds),
      providerId: getRandom(providerIds),
    });
  });

  if (data.length === 0) return;
  const result = await db
    .insertInto('lmsTransportLegs')
    .values(data)
    .returning('id')
    .execute();
  console.log(`✅ Seeded ${result.length} transport legs.`);
}

// --- MAIN SEEDER ---
async function main() {
  const db = new Kysely<DB>({
    dialect: new PostgresDialect({
      pool: new Pool({
        connectionString: process.env.DATABASE_URL,
        max: 20,
      }),
    }),
    plugins: [new CamelCasePlugin()],
  });

  console.log('🚀 Starting database seeding process...');

  try {
    // Level 1: No dependencies
    console.log('\n--- Seeding Level 1: Core Independent Tables ---');
    const addressIds = await seedAddresses(db);
    const userIds = await seedUsers(db);
    const productIds = await seedProducts(db);
    const shippingServiceIds = await seedShippingServices(db);
    await seedLeads(db);
    const driverIds = await seedDrivers(db);

    // Level 2: Depend on Level 1
    console.log('\n--- Seeding Level 2: Basic Dependent Tables ---');
    const companyIds = await seedCompanies(db, addressIds);
    const contactIds = await seedContacts(db, companyIds, addressIds);
    const departmentIds = await seedDepartments(db, userIds);
    const providerIds = await seedProviders(db, addressIds);
    const warehouseIds = await seedWarehouses(
      db,
      addressIds,
      departmentIds,
      userIds,
    );
    const vehicleIds = await seedVehicles(db, departmentIds, warehouseIds);

    // Level 3: Depend on Levels 1 & 2
    console.log('\n--- Seeding Level 3: Core Business Entities ---');
    const shipmentIds = await seedShipments(
      db,
      userIds,
      addressIds,
      contactIds,
      companyIds,
      shippingServiceIds,
    );
    await seedCases(db, contactIds);
    await seedProviderServices(db, providerIds);
    const routeIds = await seedRoutes(db, driverIds, vehicleIds);
    await seedCampaignsAndContacts(db, contactIds);
    await seedOpportunitiesAndProducts(db, companyIds, contactIds, productIds);

    // Level 4: Depend on Level 3
    console.log('\n--- Seeding Level 4: Final Detail & Junction Tables ---');
    await seedPackages(db, shipmentIds);
    await seedTrackingEvents(db, shipmentIds);
    await seedInvoicesAndItems(db, companyIds, contactIds, shipmentIds);
    await seedRouteShipments(db, routeIds, shipmentIds);
    await seedTransportLegs(
      db,
      shipmentIds,
      addressIds,
      warehouseIds,
      driverIds,
      vehicleIds,
      providerIds,
    );

    console.log('\n🏁 Seeding completed successfully!');
  } catch (error) {
    console.error('\n❌ Seeding failed:', error);
    process.exit(1);
  } finally {
    await db.destroy();
    console.log('Database connection closed.');
  }
}

main();
