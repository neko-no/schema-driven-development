import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    name: "browser",
    include: ["src/**/*.test.tsx"],
    browser: {
        enabled: true,
        name: "chromium",
        provider: "playwright",
        providerOptions: {}
    }
  },
})
