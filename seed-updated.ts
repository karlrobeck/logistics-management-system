import { faker } from "@faker-js/faker";
import {
  CamelCasePlugin,
  type Insertable,
  Kysely,
  PostgresDialect,
} from "kysely";
import { Pool } from "pg";
import "dotenv/config";

// Import all types and enums from your generated schema file
import type { DB } from "./src/db/types";
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
  OrgPermissionActions,
  TmsDriverStatus,
  TmsVehicleStatus,
  TmsVehicleType,
} from "./src/db/types";

// --- CONFIGURATION ---
const NUM_USERS = 50;
const NUM_ORGANIZATIONS = 5;
const NUM_TEAMS = 15;
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
  console.log("🔄 Seeding addresses...");
  const data: Insertable<DB["lms.addresses"]>[] = Array.from(
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
      country: "USA",
      addressType: faker.helpers.arrayElement(Object.values(LmsAddressType)),
      latitude: faker.location.latitude().toString(),
      longitude: faker.location.longitude().toString(),
    }),
  );

  if (data.length === 0) return [];
  const result = await db
    .insertInto("lms.addresses")
    .values(data)
    .returning("id")
    .execute();
  console.log(`✅ Seeded ${result.length} addresses.`);
  return result.map((r) => r.id);
}

async function seedUsers(db: KyselyDb) {
  console.log("🔄 Seeding users...");
  const data: Insertable<DB["auth.users"]>[] = Array.from(
    { length: NUM_USERS },
    () => ({
      name: faker.person.fullName(),
      email: faker.internet.email().toLowerCase(),
      image: faker.image.avatar(),
    }),
  );

  if (data.length === 0) return [];
  const result = await db
    .insertInto("auth.users")
    .values(data)
    .onConflict((oc) => oc.column("email").doNothing())
    .returning("id")
    .execute();
  console.log(`✅ Seeded ${result.length} users.`);
  return result.map((r) => r.id);
}

async function seedProducts(db: KyselyDb) {
  console.log("🔄 Seeding products...");
  const data: Insertable<DB["crm.products"]>[] = Array.from(
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
    .insertInto("crm.products")
    .values(data)
    .onConflict((oc) => oc.column("sku").doNothing())
    .onConflict((oc) => oc.column("name").doNothing())
    .returning("id")
    .execute();
  console.log(`✅ Seeded ${result.length} products.`);
  return result.map((r) => r.id);
}

async function seedShippingServices(db: KyselyDb) {
  console.log("🔄 Seeding shipping services...");
  const data: Insertable<DB["lms.shippingServices"]>[] = Array.from(
    {
      length: 10,
    },
    () => ({
      name: `${faker.company.name()} ${
        faker.helpers.arrayElement([
          "Express",
          "Standard",
          "Economy",
        ])
      }`,
      description: faker.lorem.sentence(),
      serviceType: faker.helpers.arrayElement(Object.values(LmsServiceType)),
      isActive: true,
      maxWeight: faker.number.float({ min: 50, max: 5000 }).toString(),
      deliveryTimeMin: faker.number.int({ min: 1, max: 3 }),
      deliveryTimeMax: faker.number.int({ min: 4, max: 10 }),
    }),
  );

  if (data.length === 0) return [];
  const result = await db
    .insertInto("lms.shippingServices")
    .values(data)
    .onConflict((oc) => oc.column("name").doNothing())
    .returning("id")
    .execute();
  console.log(`✅ Seeded ${result.length} shipping services.`);
  return result.map((r) => r.id);
}

async function seedLeads(db: KyselyDb) {
  console.log("🔄 Seeding leads...");
  const data: Insertable<DB["crm.leads"]>[] = Array.from(
    { length: NUM_LEADS },
    () => ({
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email().toLowerCase(),
      companyName: faker.company.name(),
      leadStatus: faker.helpers.arrayElement(Object.values(CrmLeadStatus)),
      leadSource: faker.helpers.arrayElement(["Organic", "Paid", "Referral"]),
      phoneNumber: faker.phone.number({ style: "international" }),
      leadScore: faker.number.int({ min: 0, max: 100 }),
    }),
  );

  if (data.length === 0) return [];
  const result = await db
    .insertInto("crm.leads")
    .values(data)
    .onConflict((oc) => oc.column("email").doNothing())
    .returning("id")
    .execute();
  console.log(`✅ Seeded ${result.length} leads.`);
  return result.map((r) => r.id);
}

async function seedDrivers(db: KyselyDb) {
  console.log("🔄 Seeding drivers...");
  const data: Insertable<DB["tms.drivers"]>[] = Array.from(
    {
      length: NUM_DRIVERS,
    },
    () => ({
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email().toLowerCase(),
      phoneNumber: faker.phone.number({ style: "international" }),
      licenseNumber: faker.string.alphanumeric(8).toUpperCase(),
      employeeId: faker.string.alphanumeric(20).toUpperCase(),
      status: faker.helpers.arrayElement(Object.values(TmsDriverStatus)),
      hireDate: faker.date.past({ years: 5 }),
    }),
  );

  if (data.length === 0) return [];
  const result = await db
    .insertInto("tms.drivers")
    .values(data)
    .onConflict((oc) => oc.column("email").doNothing())
    .onConflict((oc) => oc.column("licenseNumber").doNothing())
    .onConflict((oc) => oc.column("employeeId").doNothing())
    .returning("id")
    .execute();
  console.log(`✅ Seeded ${result.length} drivers.`);
  return result.map((r) => r.id);
}

async function seedOrganizations(db: KyselyDb, userIds: string[]) {
  console.log("🔄 Seeding organizations...");
  const data: Insertable<DB["org.organization"]>[] = Array.from(
    {
      length: NUM_ORGANIZATIONS,
    },
    () => ({
      name: faker.company.name(),
      ownerId: getRandom(userIds) as string,
    }),
  );

  if (data.length === 0) return [];
  const result = await db
    .insertInto("org.organization")
    .values(data)
    .returning("id")
    .execute();
  console.log(`✅ Seeded ${result.length} organizations.`);
  return result.map((r) => r.id);
}

// Level 2 Seeding
async function seedCompanies(db: KyselyDb) {
  console.log("🔄 Seeding companies...");
  const data: Insertable<DB["crm.companies"]>[] = Array.from(
    {
      length: NUM_COMPANIES,
    },
    () => ({
      name: faker.company.name(),
      email: faker.internet.email().toLowerCase(),
      phoneNumber: faker.phone.number({ style: "international" }),
      website: faker.internet.url(),
      industry: faker.company.buzzNoun(),
      description: faker.company.catchPhrase(),
    }),
  );

  if (data.length === 0) return [];
  const result = await db
    .insertInto("crm.companies")
    .values(data)
    .onConflict((oc) => oc.column("name").doNothing())
    .returning("id")
    .execute();
  console.log(`✅ Seeded ${result.length} companies.`);
  return result.map((r) => r.id);
}

async function seedContacts(
  db: KyselyDb,
  companyIds: string[],
) {
  console.log("🔄 Seeding contacts...");
  const data: Insertable<DB["crm.contacts"]>[] = Array.from(
    {
      length: NUM_CONTACTS,
    },
    () => ({
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email().toLowerCase(),
      phoneNumber: faker.phone.number({ style: "international" }),
      jobTitle: faker.person.jobTitle(),
      status: faker.helpers.arrayElement(Object.values(CrmContactStatus)),
      companyId: getRandom(companyIds),
      leadSource: faker.helpers.arrayElement([
        "Website",
        "Referral",
        "Cold Call",
      ]),
      birthDate: faker.helpers.maybe(
        () => faker.date.birthdate({ min: 18, max: 70, mode: "age" }),
        { probability: 0.3 },
      ),
    }),
  );

  if (data.length === 0) return [];
  const result = await db
    .insertInto("crm.contacts")
    .values(data)
    .onConflict((oc) => oc.column("email").doNothing())
    .returning("id")
    .execute();
  console.log(`✅ Seeded ${result.length} contacts.`);
  return result.map((r) => r.id);
}

async function seedTeams(db: KyselyDb, orgIds: string[]) {
  console.log("🔄 Seeding teams...");
  const data: Insertable<DB["org.teams"]>[] = Array.from(
    {
      length: NUM_TEAMS,
    },
    () => ({
      name: faker.helpers.arrayElement([
        "Sales Team",
        "Operations Team",
        "Logistics Team",
        "Customer Service Team",
        "Finance Team",
        "IT Team",
        "HR Team",
      ]) + ` - ${faker.location.city()}`,
      description: faker.lorem.sentence(),
      orgId: getRandom(orgIds) as string,
    }),
  );

  if (data.length === 0) return [];
  const result = await db
    .insertInto("org.teams")
    .values(data)
    .returning("id")
    .execute();
  console.log(`✅ Seeded ${result.length} teams.`);
  return result.map((r) => r.id);
}

async function seedProviders(db: KyselyDb, addressIds: string[]) {
  console.log("🔄 Seeding transportation providers...");
  const data: Insertable<DB["lms.transportationProviders"]>[] = Array.from(
    {
      length: NUM_PROVIDERS,
    },
    () => ({
      companyName: `${faker.company.name()} Logistics`,
      providerType: faker.helpers.arrayElement(Object.values(LmsProviderType)),
      addressId: getRandom(addressIds),
      email: faker.internet.email().toLowerCase(),
      phoneNumber: faker.phone.number({ style: "international" }),
      contactPerson: faker.person.fullName(),
      isActive: true,
      contractStartDate: faker.date.past({ years: 2 }),
      contractEndDate: faker.date.future({ years: 2 }),
      paymentTerms: faker.helpers.arrayElement(["Net-15", "Net-30", "Net-45"]),
      performanceRating: faker.number.float({ min: 3.0, max: 5.0 }).toString(),
    }),
  );

  if (data.length === 0) return [];
  const result = await db
    .insertInto("lms.transportationProviders")
    .values(data)
    .returning("id")
    .execute();
  console.log(`✅ Seeded ${result.length} transportation providers.`);
  return result.map((r) => r.id);
}

async function seedWarehouses(
  db: KyselyDb,
  addressIds: string[],
  userIds: string[],
) {
  console.log("🔄 Seeding warehouses...");
  const data: Insertable<DB["lms.warehouses"]>[] = Array.from(
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
      managerId: getRandom(userIds),
      isActive: true,
      capacity: faker.number.int({ min: 1000, max: 50000 }),
    }),
  );

  if (data.length === 0) return [];
  const result = await db
    .insertInto("lms.warehouses")
    .values(data)
    .onConflict((oc) => oc.column("code").doNothing())
    .returning("id")
    .execute();
  console.log(`✅ Seeded ${result.length} warehouses.`);
  return result.map((r) => r.id);
}

async function seedVehicles(db: KyselyDb) {
  console.log("🔄 Seeding vehicles...");
  const data: Insertable<DB["tms.vehicles"]>[] = Array.from(
    {
      length: NUM_VEHICLES,
    },
    () => ({
      make: faker.vehicle.manufacturer(),
      model: faker.vehicle.model(),
      year: faker.number.int({ min: 2015, max: 2025 }),
      licensePlate: faker.vehicle.vrm(),
      vehicleNumber: `V-${faker.string.alphanumeric(6).toUpperCase()}`,
      vehicleType: faker.helpers.arrayElement(Object.values(TmsVehicleType)),
      status: faker.helpers.arrayElement(Object.values(TmsVehicleStatus)),
      capacityWeight: faker.number.int({ min: 1000, max: 25000 }).toString(),
      capacityVolume: faker.number.int({ min: 10, max: 100 }).toString(),
    }),
  );

  if (data.length === 0) return [];
  const result = await db
    .insertInto("tms.vehicles")
    .values(data)
    .onConflict((oc) => oc.column("licensePlate").doNothing())
    .onConflict((oc) => oc.column("vehicleNumber").doNothing())
    .returning("id")
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
  console.log("🔄 Seeding shipments...");
  const data: Insertable<DB["lms.shipments"]>[] = Array.from(
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
        pickupDate: faker.helpers.maybe(() => faker.date.recent(), {
          probability: 0.7,
        }),
        deliveryDate: faker.helpers.maybe(() => faker.date.recent(), {
          probability: 0.3,
        }),
        shippingCost: faker.finance.amount({ min: 10, max: 500 }),
        insuranceAmount: faker.helpers.maybe(
          () => faker.finance.amount({ min: 100, max: 5000 }),
          { probability: 0.3 },
        ),
        specialInstructions: faker.helpers.maybe(() => faker.lorem.sentence(), {
          probability: 0.2,
        }),
      };
    },
  );

  if (data.length === 0) return [];
  const result = await db
    .insertInto("lms.shipments")
    .values(data)
    .onConflict((oc) => oc.column("trackingNumber").doNothing())
    .returning("id")
    .execute();
  console.log(`✅ Seeded ${result.length} shipments.`);
  return result.map((r) => r.id);
}

async function seedCases(db: KyselyDb, contactIds: string[]) {
  console.log("🔄 Seeding cases...");
  const data: Insertable<DB["crm.cases"]>[] = Array.from(
    {
      length: NUM_CONTACTS,
    },
    () => ({
      subject: faker.lorem.sentence(5),
      description: faker.lorem.paragraph(),
      status: faker.helpers.arrayElement(Object.values(CrmCaseStatus)),
      priority: faker.helpers.arrayElement(Object.values(CrmCasePriority)),
      contactId: getRandom(contactIds),
      closedAt: faker.helpers.maybe(() => faker.date.recent(), {
        probability: 0.3,
      }),
    }),
  );

  if (data.length === 0) return [];
  const result = await db
    .insertInto("crm.cases")
    .values(data)
    .returning("id")
    .execute();
  console.log(`✅ Seeded ${result.length} cases.`);
  return result.map((r) => r.id);
}

async function seedProviderServices(db: KyselyDb, providerIds: string[]) {
  console.log("🔄 Seeding provider services...");
  const data: Insertable<DB["lms.providerServices"]>[] = [];
  providerIds.forEach((providerId) => {
    for (let i = 0; i < 3; i++) {
      data.push({
        providerId,
        serviceName: `${
          faker.helpers.arrayElement([
            "Overnight",
            "Ground",
            "Air",
          ])
        } Cargo ${i + 1}`,
        serviceType: faker.helpers.arrayElement(Object.values(LmsServiceType)),
        transportMode: faker.helpers.arrayElement(
          Object.values(LmsTransportMode),
        ),
        isActive: true,
        trackingAvailable: faker.datatype.boolean(),
        insuranceAvailable: faker.datatype.boolean(),
        maxWeight: faker.number.int({ min: 500, max: 50000 }).toString(),
        transitTimeMin: faker.number.int({ min: 1, max: 3 }),
        transitTimeMax: faker.number.int({ min: 4, max: 10 }),
        cutoffTime: faker.helpers.maybe(() => "17:00", { probability: 0.7 }),
      });
    }
  });

  if (data.length === 0) return [];
  const result = await db
    .insertInto("lms.providerServices")
    .values(data)
    .returning("id")
    .execute();
  console.log(`✅ Seeded ${result.length} provider services.`);
  return result.map((r) => r.id);
}

async function seedRoutes(
  db: KyselyDb,
  driverIds: string[],
  vehicleIds: string[],
) {
  console.log("🔄 Seeding routes...");
  const data: Insertable<DB["lms.routes"]>[] = Array.from(
    { length: NUM_ROUTES },
    () => ({
      routeName: `Route ${faker.location.city()} to ${faker.location.city()}`,
      routeDate: faker.date.soon(),
      status: faker.helpers.arrayElement(Object.values(LmsRouteStatus)),
      driverId: getRandom(driverIds),
      vehicleId: getRandom(vehicleIds),
      estimatedDeparture: faker.date.soon(),
      estimatedArrival: faker.date.future(),
    }),
  );

  if (data.length === 0) return [];
  const result = await db
    .insertInto("lms.routes")
    .values(data)
    .returning("id")
    .execute();
  console.log(`✅ Seeded ${result.length} routes.`);
  return result.map((r) => r.id);
}

async function seedCampaignsAndContacts(db: KyselyDb, contactIds: string[]) {
  console.log("🔄 Seeding campaigns...");
  const campaignData: Insertable<DB["crm.campaigns"]>[] = Array.from(
    {
      length: NUM_CAMPAIGNS,
    },
    () => ({
      name:
        `${faker.commerce.productAdjective()} Marketing Blitz ${faker.date.future().getFullYear()}`,
      description: faker.lorem.sentence(),
      status: faker.helpers.arrayElement(Object.values(CrmCampaignStatus)),
      startDate: faker.date.past(),
      endDate: faker.date.future(),
      budget: faker.finance.amount({ min: 5000, max: 50000 }),
    }),
  );

  if (campaignData.length === 0) return;
  const campaignResults = await db
    .insertInto("crm.campaigns")
    .values(campaignData)
    .returning("id")
    .execute();
  const campaignIds = campaignResults.map((c) => c.id);
  console.log(`✅ Seeded ${campaignIds.length} campaigns.`);

  console.log("🔄 Seeding campaign contacts...");
  const campaignContactsData: Insertable<DB["crm.campaignContacts"]>[] = [];
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
          interactionDate: faker.helpers.maybe(() => faker.date.recent(), {
            probability: 0.6,
          }),
        });
      });
  });

  if (campaignContactsData.length > 0) {
    await db
      .insertInto("crm.campaignContacts")
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
  console.log("🔄 Seeding opportunities...");
  const opportunityData: Insertable<DB["crm.opportunities"]>[] = Array.from(
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
    .insertInto("crm.opportunities")
    .values(opportunityData)
    .returning("id")
    .execute();
  const opportunityIds = opportunityResults.map((o) => o.id);
  console.log(`✅ Seeded ${opportunityIds.length} opportunities.`);

  console.log("🔄 Seeding opportunity products...");
  const oppProductsData: Insertable<DB["crm.opportunityProducts"]>[] = [];
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
      .insertInto("crm.opportunityProducts")
      .values(oppProductsData)
      .execute();
    console.log(`✅ Seeded opportunity products.`);
  }
  return opportunityIds;
}

// Level 4 Seeding
async function seedPackages(db: KyselyDb, shipmentIds: string[]) {
  console.log("🔄 Seeding packages...");
  const data: Insertable<DB["lms.packages"]>[] = [];
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
        declaredValue: faker.helpers.maybe(
          () => faker.finance.amount({ min: 50, max: 1000 }),
          { probability: 0.5 },
        ),
        contentsDescription: faker.helpers.maybe(
          () => faker.commerce.productDescription(),
          { probability: 0.7 },
        ),
      });
    }
  });

  if (data.length === 0) return [];
  const result = await db
    .insertInto("lms.packages")
    .values(data)
    .returning("id")
    .execute();
  console.log(`✅ Seeded ${result.length} packages.`);
  return result.map((r) => r.id);
}

async function seedTrackingEvents(db: KyselyDb, shipmentIds: string[]) {
  console.log("🔄 Seeding tracking events...");
  const data: Insertable<DB["lms.trackingEvents"]>[] = [];
  shipmentIds.forEach((shipmentId) => {
    const numEvents = faker.number.int({ min: 3, max: 8 });
    for (let i = 0; i < numEvents; i++) {
      data.push({
        shipmentId,
        eventType: faker.helpers.arrayElement(
          Object.values(LmsTrackingEventType),
        ),
        eventDescription: faker.lorem.sentence(),
        eventTimestamp: faker.date.past(),
        eventLocation: faker.helpers.maybe(() => faker.location.city(), {
          probability: 0.8,
        }),
      });
    }
  });

  if (data.length > 0) {
    await db.insertInto("lms.trackingEvents").values(data).execute();
    console.log(`✅ Seeded tracking events.`);
  }
}

async function seedInvoicesAndItems(
  db: KyselyDb,
  companyIds: string[],
  contactIds: string[],
  shipmentIds: string[],
) {
  console.log("🔄 Seeding invoices...");
  const invoiceData: Insertable<DB["crm.invoices"]>[] = Array.from(
    {
      length: Math.min(NUM_SHIPMENTS / 3, 100), // Reduced number
    },
    () => ({
      invoiceNumber: `INV-${faker.string.alphanumeric(8).toUpperCase()}`,
      invoiceDate: faker.date.past(),
      dueDate: faker.date.future(),
      status: faker.helpers.arrayElement(Object.values(CrmInvoiceStatus)),
      companyId: getRandom(companyIds),
      contactId: getRandom(contactIds),
      subtotal: faker.finance.amount({ min: 100, max: 5000 }),
      taxAmount: faker.finance.amount({ min: 10, max: 500 }),
      totalAmount: faker.finance.amount({ min: 110, max: 5500 }),
      currency: "USD",
      paymentTerms: faker.helpers.arrayElement(["Net-15", "Net-30", "Net-45"]),
    }),
  );

  if (invoiceData.length === 0) return;
  const invoiceResults = await db
    .insertInto("crm.invoices")
    .values(invoiceData)
    .returning("id")
    .execute();
  const invoiceIds = invoiceResults.map((i) => i.id);
  console.log(`✅ Seeded ${invoiceIds.length} invoices.`);

  console.log("🔄 Seeding invoice line items...");
  const lineItemData: Insertable<DB["crm.invoiceLineItems"]>[] = [];
  invoiceIds.forEach((invoiceId) => {
    const numItems = faker.number.int({ min: 1, max: 5 });
    for (let i = 0; i < numItems; i++) {
      const quantity = faker.number.int({ min: 1, max: 10 });
      const unitPrice = faker.commerce.price({ min: 10, max: 500 });
      lineItemData.push({
        invoiceId,
        description: faker.commerce.productDescription(),
        quantity: quantity.toString(),
        unitPrice,
        shipmentId: faker.helpers.maybe(() => getRandom(shipmentIds), {
          probability: 0.8,
        }),
      });
    }
  });

  if (lineItemData.length > 0) {
    await db.insertInto("crm.invoiceLineItems").values(lineItemData).execute();
    console.log(`✅ Seeded invoice line items.`);
  }
}

async function seedRouteShipments(
  db: KyselyDb,
  routeIds: string[],
  shipmentIds: string[],
) {
  console.log("🔄 Seeding route shipments...");
  const data: Insertable<DB["lms.routeShipments"]>[] = [];

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
        estimatedDelivery: faker.date.future(),
        signatureRequired: faker.datatype.boolean(),
        recipientSignature: faker.helpers.maybe(() => faker.person.fullName(), {
          probability: 0.3,
        }),
        actualDelivery: faker.helpers.maybe(() => faker.date.recent(), {
          probability: 0.4,
        }),
      });
    });
  });

  if (data.length > 0) {
    await db.insertInto("lms.routeShipments").values(data).execute();
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
  console.log("🔄 Seeding transport legs...");
  const data: Insertable<DB["lms.transportLegs"]>[] = [];
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
      scheduledPickup: faker.date.soon(),
      scheduledDelivery: faker.date.future(),
      actualPickup: faker.helpers.maybe(() => faker.date.recent(), {
        probability: 0.6,
      }),
      actualDelivery: faker.helpers.maybe(() => faker.date.recent(), {
        probability: 0.4,
      }),
      cost: faker.finance.amount({ min: 50, max: 500 }),
      currency: "USD",
      specialInstructions: faker.helpers.maybe(() => faker.lorem.sentence(), {
        probability: 0.3,
      }),
    });
  });

  if (data.length === 0) return;
  const result = await db
    .insertInto("lms.transportLegs")
    .values(data)
    .returning("id")
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

  console.log("🚀 Starting database seeding process...");

  try {
    // Level 1: No dependencies
    console.log("\n--- Seeding Level 1: Core Independent Tables ---");
    const addressIds = await seedAddresses(db);
    const userIds = await seedUsers(db);
    const productIds = await seedProducts(db);
    const shippingServiceIds = await seedShippingServices(db);
    await seedLeads(db);
    const driverIds = await seedDrivers(db);
    const orgIds = await seedOrganizations(db, userIds);

    // Level 2: Depend on Level 1
    console.log("\n--- Seeding Level 2: Basic Dependent Tables ---");
    const companyIds = await seedCompanies(db);
    const contactIds = await seedContacts(db, companyIds);
    const teamIds = await seedTeams(db, orgIds);
    const providerIds = await seedProviders(db, addressIds);
    const warehouseIds = await seedWarehouses(
      db,
      addressIds,
      userIds,
    );
    const vehicleIds = await seedVehicles(db);

    // Level 3: Depend on Levels 1 & 2
    console.log("\n--- Seeding Level 3: Core Business Entities ---");
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
    console.log("\n--- Seeding Level 4: Final Detail & Junction Tables ---");
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

    console.log("\n🏁 Seeding completed successfully!");
  } catch (error) {
    console.error("\n❌ Seeding failed:", error);
    process.exit(1);
  } finally {
    await db.destroy();
    console.log("Database connection closed.");
  }
}

main();
