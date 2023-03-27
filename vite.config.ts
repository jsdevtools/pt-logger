/// <reference types="vitest" />

import { resolve } from 'path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'ptlogger',
      fileName: 'pt-logger',
    },
    rollupOptions: {
      external: ['winston', 'winston-papertrail'],
      output: {
        globals: {
          winston: 'winston',
          'winston-papertrail': 'Papertrail'
        },
      },
    }
  },
  plugins: [dts()],
  test: {
    // ...
  },
});