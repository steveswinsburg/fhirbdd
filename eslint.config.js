import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";


export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs}"],
    plugins: { js },
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
      globals: globals.node, // ✅ use Node globals (includes process, __dirname, etc)
    },
    rules: {
      "no-undef": "error",
      "no-unused-vars": "warn"
    }
  }
]);