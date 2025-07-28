import "@getcronit/pylon";
import { Kysely } from "kysely";
import { DB } from "./src/db/types";

declare module "@getcronit/pylon" {
  interface Bindings {}

  interface Variables {
    db: Kysely<DB>;
    user: { sub: string };
  }
}
