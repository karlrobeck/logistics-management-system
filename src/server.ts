import { Hono } from "hono";
import { serveStatic } from "hono/bun";
import pylonApp from "../.pylon/index";
import { db } from "./db";

const app = new Hono();

app.route("/api", pylonApp);

if (import.meta.env.PROD) {
  app.use("/static/*", serveStatic({ root: "./web" }));
  app.get("*", serveStatic({ path: "./web/index.html" }));
}

export default app;
