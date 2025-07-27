import { app } from '@getcronit/pylon';
import authResolver from './resolvers/auth';
import crmResolver from './resolvers/crm';
import lmsResolver from './resolvers/lms';
import orgResolver from './resolvers/org';

export const graphql = {
  Query: {
    auth: authResolver.queries,
    crm: crmResolver.queries,
    org: orgResolver.queries,
    lms: lmsResolver.queries,
  },
  Mutation: {
    ...authResolver.mutations,
    ...crmResolver.mutations,
    ...orgResolver.mutations,
    ...lmsResolver.mutations,
  },
};

if (import.meta.env.PROD) {
  console.log('Running in production mode');
}

export default app;
