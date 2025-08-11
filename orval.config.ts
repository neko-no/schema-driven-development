import { defineConfig } from "orval";

/**
 * Orval Configuration
 * @see https://orval.dev/reference/configuration/overview
 */
export default defineConfig({
  notice: {
    input: {
      target: "./schema/tsp-output/schema/openapi.yaml",
    },
    output: {
      target: "./frontend/src/schema",
      mode: "single",
      client: "zod",
      override: {
        zod: {
          generateEachHttpStatus: true,
        }
      },
    },
  },
});
