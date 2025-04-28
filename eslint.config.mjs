import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";



export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs}"],
    plugins: { js },
    extends: [js.configs.recommended],
    languageOptions: {
      sourceType: "module",
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    rules: {
      semi: ["error", "always"],
      quotes: ["error", "double", { allowTemplateLiterals: true }],
      indent: ["error", 4],
      "no-mixed-spaces-and-tabs": "error",
      "no-tabs": "off",
      "no-trailing-spaces": "error",
    },
  },
]);
