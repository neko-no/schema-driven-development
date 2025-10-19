import eslint from "@eslint/js";
import { defineConfig } from "eslint/config";
import eslintPluginReact from "eslint-plugin-react";
import eslintPluginReactHooks from "eslint-plugin-react-hooks";
import tsEslint from "typescript-eslint";

/** @type {import("eslint").Linter.Config[]} */
export default defineConfig(
  { files: ["*.ts", "*.tsx"] },
  {
    ignores: [
      "**/build/",
      "**/bin/",
      "**/dist/",
      "**/obj/",
      "**/out/",
      "**/.next/",
      "**/node_modules/",
      "**/storybook-static/",
    ],
  },
  // TypeScript configuration
  {
    name: "eslint/recommended",
    rules: eslint.configs.recommended.rules,
  },
  tsEslint.configs.recommended,

  // React configuration
  {
    name: "react/jsx-runtime",
    plugins: {
      react: eslintPluginReact,
    },
    rules: eslintPluginReact.configs["jsx-runtime"].rules,
    settings: {
      react: {
        version: "detect",
      },
    },
  },
  {
    name: "react-hooks/recommended",
    plugins: {
      "react-hooks": eslintPluginReactHooks,
    },
    rules: {
      ...eslintPluginReactHooks.configs.recommended.rules,
      "react/prop-types": "off",
    },
  }

  // Next,js configuratio
);
