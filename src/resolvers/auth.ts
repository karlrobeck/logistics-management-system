import { Insertable, Selectable, Updateable } from 'kysely';
import { db } from '../db';
import { DB } from '../db/types';

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
  me: () => {
    return 'User data';
  },
};

export const mutations = {
  login: (username: string, password: string) => {
    if (username === 'admin' && password === 'password') {
      return { token: 'fake-jwt-token' };
    }
  },
};

export default {
  queries,
  mutations,
};
