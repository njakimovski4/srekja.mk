import js from "@eslint/js";
import globals from "globals";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";

export default [
  { ignores: ["dist"] },
  {
    files: ["**/*.{js,jsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: "latest",
        ecmaFeatures: { jsx: true },
        sourceType: "module",
      },
    },
    settings: { react: { version: "18.3" } },
    plugins: {
      react,
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      // Convert errors to warnings where reasonable
      ...Object.fromEntries(
        Object.entries(js.configs.recommended.rules).map(([key, value]) => [
          key,
          value === "error" ? "warn" : value,
        ])
      ),
      ...Object.fromEntries(
        Object.entries(react.configs.recommended.rules).map(([key, value]) => [
          key,
          value === "error" ? "warn" : value,
        ])
      ),
      ...Object.fromEntries(
        Object.entries(react.configs["jsx-runtime"].rules).map(
          ([key, value]) => [key, value === "error" ? "warn" : value]
        )
      ),
      ...Object.fromEntries(
        Object.entries(reactHooks.configs.recommended.rules).map(
          ([key, value]) => [key, value === "error" ? "warn" : value]
        )
      ),

      // Specific rule overrides
      "react/jsx-no-target-blank": "off",
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
    },
  },
];
