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
      target: "./frontend/src/apiClient/client",
      schemas: "./frontend/src/apiClient/schema",
      mode: "split",
      client: "react-query",
      httpClient: "fetch",
      clean: true,
      override: {
        mutator: {
          path: "./frontend/src/apiClient/customFetch.ts",
          name: "customFetch",
        },
        fetch: {
          includeHttpResponseReturnType: false, // false: fetch の返却値をResponseのデータの型にする
        },
        mock: {
          required: true, // 自動生成で返却される mock データを必須にする
          baseUrl: "http://localhost:3000"
        },
      },
      mock: {
        type: "msw",
        useExamples: true, // openapi.yaml の example を mock データとして使用するか(無い場合は faker.js で mock データが生成される)
      },
    },
  },
});
