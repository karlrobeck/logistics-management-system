import { defineConfig } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";
import tailwindcss from "@tailwindcss/postcss";
import { tanstackRouter } from "@tanstack/router-plugin/rspack";

export default defineConfig({
  environments: {
    web: {
      plugins: [
        pluginReact(),
      ],
      tools: {
        postcss: {
          postcssOptions: {
            plugins: [tailwindcss],
          },
        },
        rspack: {
          plugins: [
            tanstackRouter({ target: "react", autoCodeSplitting: true }),
          ],
        },
      },
      source: {
        entry: {
          index: "./src/client.tsx",
        },
      },
      output: {
        target: "web",
        distPath: {
          root: "./dist/server/web",
        },
      },
    },
    bun: {
      source: {
        entry: {
          index: "./src/server.ts",
        },
      },
      output: {
        target: "node",
        distPath: {
          root: "./dist/server",
        },
        copy: [
          {
            from: "migrations",
            to: "migrations",
          },
        ],
      },
    },
  },
});
