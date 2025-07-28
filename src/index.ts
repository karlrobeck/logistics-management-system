import { app, PylonConfig } from "@getcronit/pylon";
import { serveStatic } from "hono/bun";
import authResolver from "./resolvers/auth";
import crmResolver from "./resolvers/crm";
import lmsResolver from "./resolvers/lms";
import orgResolver from "./resolvers/org";

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

export default app;
