import { defineConfig } from "vitest/config";
import path from "path";

// Reproduit la résolution `baseUrl: ./src` du tsconfig pour les imports « bare »
// (ex. `config/env`, `enum/roleEnum`) utilisés dans le code source.
const srcRoots = ["common", "config", "cron", "database", "enum", "modules", "swagger"];

export default defineConfig({
  resolve: {
    alias: srcRoots.map((root) => ({
      find: new RegExp(`^${root}/`),
      replacement: path.resolve(__dirname, `src/${root}/`),
    })),
  },
  test: {
    environment: "node",
    include: ["src/**/*.{test,spec}.ts"],
    globals: true,
  },
});
