import path from "node:path";

import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    setupFiles: "./src/vitest.setup.ts",
  },
  resolve: {
    alias: {
      src: path.resolve(__dirname, "./src/"),
    },
  },
});
