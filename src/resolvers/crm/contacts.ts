import { ComparisonOperatorExpression, Selectable } from "kysely";
import { db } from "../../db";
import { DB } from "../../db/types";
import { LmsAddressNode } from "../lms/addresses";
import { CrmCompanyNode } from "./companies";
import {
  CrmContactsInsert,
  crmContactsInsertSchema,
  CrmContactsUpdate,
  crmContactsUpdateSchema,
} from "../../db/schemas";

export class CrmContactNode {
  constructor(private model: Selectable<DB["crmContacts"]>) {}

  id() {
    return this.model.id;
  }

  firstName() {
    return this.model.firstName;
  }

  lastName() {
    return this.model.lastName;
  }

  email() {
    return this.model.email;
  }

  phoneNumber() {
    return this.model.phoneNumber;
  }

  jobTitle() {
    return this.model.jobTitle;
  }

  birthDate() {
    return this.model.birthDate;
  }

  leadSource() {
    return this.model.leadSource;
  }

  status() {
    return this.model.status;
  }

  async address() {
    if (!this.model.addressId) return null;

    const address = await db
      .selectFrom("lmsAddresses")
      .selectAll()
      .where("id", "=", this.model.addressId)
      .executeTakeFirst();

    return address ? new LmsAddressNode(address) : null;
  }

  async company() {
    if (!this.model.companyId) return null;

    const company = await db
      .selectFrom("crmCompanies")
      .selectAll()
      .where("id", "=", this.model.companyId)
      .executeTakeFirst();

    return company ? new CrmCompanyNode(company) : null;
  }

  created() {
    return this.model.created;
  }

  updated() {
    return this.model.updated;
  }
}

export const queries = {
  list: async (
    page: number,
    limit: number,
    sort?: { key: keyof DB["crmContacts"]; order: "asc" | "desc" }[],
    filter?: {
      key: keyof DB["crmContacts"];
      operator: ComparisonOperatorExpression;
      value: string;
    }[],
  ) => {
    let query = db
      .selectFrom("crmContacts")
      .selectAll()
      .offset((page - 1) * limit)
      .limit(limit);

    if (sort && sort.length > 0) {
      sort.forEach(({ key, order }) => {
        query = query.orderBy(key, order);
      });
    }

    if (filter && filter.length > 0) {
      filter.forEach(({ key, operator, value }) => {
        query = query.where(key, operator, value);
      });
    }

    const contacts = await query.execute();

    return contacts.map((contact) => new CrmContactNode(contact));
  },
  view: async (id: string) => {
    const contact = await db
      .selectFrom("crmContacts")
      .selectAll()
      .where("id", "=", id)
      .executeTakeFirstOrThrow();

    return new CrmContactNode(contact);
  },
};

export const mutations = {
  createCrmContact: async (payload: CrmContactsInsert) => {
    const parsedPayload = crmContactsInsertSchema.parse(payload);

    const newContact = await db
      .insertInto("crmContacts")
      .values(parsedPayload)
      .returningAll()
      .executeTakeFirstOrThrow();

    return new CrmContactNode(newContact);
  },
  updateCrmContact: async (
    id: string,
    payload: CrmContactsUpdate,
  ) => {
    const parsedPayload = crmContactsUpdateSchema.parse(payload);

    const updatedContact = await db
      .updateTable("crmContacts")
      .set(parsedPayload)
      .where("id", "=", id)
      .returningAll()
      .executeTakeFirstOrThrow();

    return new CrmContactNode(updatedContact);
  },
  deleteCrmContact: async (id: string) => {
    await db.deleteFrom("crmContacts").where("id", "=", id).execute();

    return { success: true, message: "Contact deleted successfully." };
  },
};

export default {
  queries,
  mutations,
};
