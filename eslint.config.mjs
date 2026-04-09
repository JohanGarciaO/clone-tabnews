import { defineConfig } from "eslint/config";
import js from "@eslint/js";

export default defineConfig([
  {
    // files: ["**/*.js"],
    // languageOptions: { globals: globals.node },
    // rules: {
    //   semi: "error",
    //   "no-unused-vars": "warn",
    //   "no-undef": "off",
    // },
    // languageOptions: {
    //   parserOptions: {
    //     ecmaFeatures: {
    //       jsx: true,
    //     },
    //   },
    // },
  },
  {
    files: ["**/*.js"],
    ignores: ["**/infra/migrations/**"],
    plugins: { js },
    extends: ["js/recommended"],
    rules: {
      "no-unused-vars": "warn",
      "no-undef": "off",
    },
  },
]);
