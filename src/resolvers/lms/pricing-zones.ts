import { Insertable, Selectable, Updateable } from 'kysely';
import { db } from '../../db';
import { DB } from '../../db/types';

class LmsPricingZoneNode {
  constructor(private model: Selectable<DB['lmsPricingZones']>) {}

  id() {
    return this.model.id;
  }

  name() {
    return this.model.name;
  }

  zoneCode() {
    return this.model.zoneCode;
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
    const pricingZones = await db
      .selectFrom('lmsPricingZones')
      .selectAll()
      .offset((page - 1) * limit)
      .limit(limit)
      .execute();

    return pricingZones.map((zone) => new LmsPricingZoneNode(zone));
  },
  view: async (id: string) => {
    const pricingZone = await db
      .selectFrom('lmsPricingZones')
      .selectAll()
      .where('id', '=', id)
      .executeTakeFirstOrThrow();

    return new LmsPricingZoneNode(pricingZone);
  },
  viewByCode: async (zoneCode: string) => {
    const pricingZone = await db
      .selectFrom('lmsPricingZones')
      .selectAll()
      .where('zoneCode', '=', zoneCode)
      .executeTakeFirstOrThrow();

    return new LmsPricingZoneNode(pricingZone);
  },
};

export const mutations = {
  createLmsPricingZone: async (payload: Insertable<DB['lmsPricingZones']>) => {
    const newPricingZone = await db
      .insertInto('lmsPricingZones')
      .values(payload)
      .returningAll()
      .executeTakeFirstOrThrow();

    return new LmsPricingZoneNode(newPricingZone);
  },
  updateLmsPricingZone: async (
    id: string,
    payload: Updateable<DB['lmsPricingZones']>,
  ) => {
    const updatedPricingZone = await db
      .updateTable('lmsPricingZones')
      .set(payload)
      .where('id', '=', id)
      .returningAll()
      .executeTakeFirstOrThrow();

    return new LmsPricingZoneNode(updatedPricingZone);
  },
  deleteLmsPricingZone: async (id: string) => {
    await db.deleteFrom('lmsPricingZones').where('id', '=', id).execute();

    return { success: true, message: 'Pricing zone deleted successfully.' };
  },
};

export default {
  queries,
  mutations,
};
