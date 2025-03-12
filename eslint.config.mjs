import pluginJs from "@eslint/js";
import jsxA11y from "eslint-plugin-jsx-a11y";
import pluginReact from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import tseslint from "typescript-eslint";

/** @type {import('eslint').Linter.Config[]} */
export default [
  { ignores: ["dist", "public", ".next"] },

  { files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"] },
  {
    languageOptions: {
      globals: {
        AudioWorkletGlobalScope: "readonly",
      },
    },
  },

  {
    plugins: {
      ...pluginJs.configs.recommended,
      ...pluginReact.configs.flat.recommended,
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,

      "simple-import-sort": simpleImportSort,
      "jsx-a11y": jsxA11y,
    },
  },

  ...tseslint.configs.recommended,
  {
    rules: {
      ...reactHooks.configs.recommended.rules,

      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-unused-vars": "off",
      "@typescript-eslint/no-require-imports": "off",

      "@typescript-eslint/ban-ts-comment": "warn",
      "@typescript-eslint/no-unsafe-function-type": "warn",
      "@typescript-eslint/no-empty-object-type": "warn",

      "simple-import-sort/imports": "error",
      "simple-import-sort/exports": "error",
    },
  },
];
