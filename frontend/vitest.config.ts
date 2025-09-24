import { defineConfig } from 'vitest/config';
import tsconfigPaths from 'vite-tsconfig-paths';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react(),tsconfigPaths()],
  test: {
    name: "browser",
    include: ["src/**/*.test.tsx"],
    browser: {
        enabled: true,
        name: "chromium",
        provider: "playwright",
        providerOptions: {}
    },
    globals: true,
  },
})
