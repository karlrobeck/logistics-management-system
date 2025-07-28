import { Insertable, Selectable, Updateable } from "kysely";
import { db } from "../../db";
import { DB } from "../../db/types";
import {
  LmsAddressesInsert,
  lmsAddressesInsertSchema,
  LmsAddressesUpdate,
  lmsAddressesUpdateSchema,
} from "../../db/schemas";

export class LmsAddressNode {
  constructor(private model: Selectable<DB["lmsAddresses"]>) {}

  id() {
    return this.model.id;
  }

  addressLine1() {
    return this.model.addressLine1;
  }

  addressLine2() {
    return this.model.addressLine2;
  }

  addressType() {
    return this.model.addressType;
  }

  city() {
    return this.model.city;
  }

  state() {
    return this.model.state;
  }

  postalCode() {
    return this.model.postalCode;
  }

  country() {
    return this.model.country;
  }

  latitude() {
    return this.model.latitude;
  }

  longitude() {
    return this.model.longitude;
  }

  isValidated() {
    return this.model.isValidated;
  }

  created() {
    return this.model.created;
  }

  updated() {
    return this.model.updated;
  }
}

export const queries = {
  list: async (page: number, limit: number) => {
    const addresses = await db
      .selectFrom("lmsAddresses")
      .selectAll()
      .offset((page - 1) * limit)
      .limit(limit)
      .execute();

    return addresses.map((address) => new LmsAddressNode(address));
  },
  view: async (id: string) => {
    const address = await db
      .selectFrom("lmsAddresses")
      .selectAll()
      .where("id", "=", id)
      .executeTakeFirstOrThrow();

    return new LmsAddressNode(address);
  },
  listByType: async (addressType: string) => {
    const addresses = await db
      .selectFrom("lmsAddresses")
      .selectAll()
      .where("addressType", "=", addressType as any)
      .execute();

    return addresses.map((address) => new LmsAddressNode(address));
  },
  listByCountry: async (country: string) => {
    const addresses = await db
      .selectFrom("lmsAddresses")
      .selectAll()
      .where("country", "=", country)
      .execute();

    return addresses.map((address) => new LmsAddressNode(address));
  },
  listValidated: async () => {
    const addresses = await db
      .selectFrom("lmsAddresses")
      .selectAll()
      .where("isValidated", "=", true)
      .execute();

    return addresses.map((address) => new LmsAddressNode(address));
  },
};

export const mutations = {
  createLmsAddress: async (payload: LmsAddressesInsert) => {
    const parsedPayload = lmsAddressesInsertSchema.parse(payload);

    const newAddress = await db
      .insertInto("lmsAddresses")
      .values(parsedPayload)
      .returningAll()
      .executeTakeFirstOrThrow();

    return new LmsAddressNode(newAddress);
  },
  updateLmsAddress: async (
    id: string,
    payload: LmsAddressesUpdate,
  ) => {
    const parsedPayload = lmsAddressesUpdateSchema.parse(payload);

    const updatedAddress = await db
      .updateTable("lmsAddresses")
      .set(parsedPayload)
      .where("id", "=", id)
      .returningAll()
      .executeTakeFirstOrThrow();

    return new LmsAddressNode(updatedAddress);
  },
  deleteLmsAddress: async (id: string) => {
    await db.deleteFrom("lmsAddresses").where("id", "=", id).execute();

    return { success: true, message: "Address deleted successfully." };
  },
};

export default {
  queries,
  mutations,
};
