/// <reference types="vitest" />

import { resolve } from 'path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'pt-logger',
      fileName: 'pt-logger',
    },
    rollupOptions: {
      external: ['winston', 'winston-papertrail'],
      output: {
        globals: {
          // ...
        },
      },
    }
  },
  plugins: [dts()],
  test: {
    // ...
  },
});