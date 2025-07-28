import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';

export default defineConfig({
  environments: {
    web: {
      plugins: [pluginReact()],
      source: {
        entry: {
          index: './src/client.tsx',
        },
      },
      output: {
        target: 'web',
        distPath: {
          root: './dist/server/web',
        },
      },
    },
    bun: {
      source: {
        entry: {
          index: './src/server.ts',
        },
      },
      output: {
        target: 'node',
        distPath: {
          root: './dist/server',
        },
        copy: [
          {
            from: 'migrations',
            to: 'migrations',
          },
        ],
      },
    },
  },
});
