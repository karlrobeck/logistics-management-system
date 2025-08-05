import { getContext } from '@getcronit/pylon';
import { sign } from 'hono/jwt';
import { Insertable, Selectable, Updateable } from 'kysely';
import {
  AuthUsersInsert,
  authUsersInsertSchema,
  authUsersSchema,
} from '@/db/schemas';
import { db } from '../db';
import { DB } from '../db/types';
import { requireAuth } from '../utils';

export class AuthUserNode {
  constructor(private model: Selectable<DB['authUsers']>) {}

  id() {
    return this.model.id;
  }

  name() {
    return this.model.name;
  }

  email() {
    return this.model.email;
  }

  emailVerified() {
    return this.model.emailVerified;
  }

  created() {
    return this.model.created;
  }

  updated() {
    return this.model.updated;
  }
}

export const queries = {
  me: requireAuth(async () => {
    const ctx = getContext();

    const user = ctx.get('user');

    if (!user) {
      throw new Error('User not authenticated');
    }

    const authUser = await db
      .selectFrom('authUsers')
      .selectAll()
      .where('id', '=', user.sub)
      .executeTakeFirst();

    if (!authUser) {
      throw new Error('User not found');
    }

    return new AuthUserNode(authUser);
  }),
};

export const mutations = {
  login: async (email: string, password: string) => {
    const ctx = getContext();

    const parsedPayload = authUsersSchema
      .pick({ email: true, password: true })
      .parse({ email, password });

    if (!ctx.env.AUTH_KEY) {
      throw new Error('AUTH_KEY environment variable is not set');
    }

    const authUser = await db
      .selectFrom('authUsers')
      .selectAll()
      .where('email', '=', parsedPayload.email)
      .where('password', '=', parsedPayload.password)
      .executeTakeFirst();

    if (!authUser) {
      throw new Error('Invalid email or password');
    }

    const token = await sign({ sub: authUser.id }, ctx.env.AUTH_KEY);

    return {
      token,
      user: new AuthUserNode(authUser),
    };
  },

  register: async (payload: AuthUsersInsert) => {
    if (import.meta.env.PROD) {
      throw new Error('User registration is not allowed in production');
    }

    const parsedPayload = authUsersInsertSchema.parse(payload);

    const ctx = getContext();

    if (!ctx.env.AUTH_KEY) {
      throw new Error('AUTH_KEY environment variable is not set');
    }

    const newUser = await db
      .insertInto('authUsers')
      .values(parsedPayload)
      .returningAll()
      .executeTakeFirst();

    if (!newUser) {
      throw new Error('User registration failed');
    }

    const token = await sign({ sub: newUser.id }, ctx.env.AUTH_KEY);

    return {
      token,
      user: new AuthUserNode(newUser),
    };
  },
};

export default {
  queries,
  mutations,
};
