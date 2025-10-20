import eslintPluginReact from "eslint-plugin-react";
import eslintPluginReactHooks from "eslint-plugin-react-hooks";
import tsEslint from "typescript-eslint";

/** @type {import("eslint").Linter.Config[]} */
export default [
  { files: ["**/*.ts", "**/*.tsx"] },
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
  ...tsEslint.configs.recommended,

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
      "react-hooks/incompatible-library": "warn",
    },
  },

  // Rules for generated API client code
  {
    name: "generated-code-overrides",
    files: ["**/apiClient/**/*.ts", "**/apiClient/**/*.tsx"],
    rules: {
      "react-hooks/immutability": "off",
      "no-useless-catch": "off",
      "@typescript-eslint/no-redeclare": "off",
    },
  },

  // Next.js configuration
];
