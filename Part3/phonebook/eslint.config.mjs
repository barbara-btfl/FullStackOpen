import globals from "globals";
import js from "@eslint/js";
import stylisticJs from "@stylistic/eslint-plugin";

export default [
  js.configs.recommended,
  {
    files: ["**/*.js"],
    languageOptions: {
      sourceType: "commonjs",
      globals: { ...globals.node },
      ecmaVersion: "latest",
    },
    plugins: {
      "@stylistic/js": stylisticJs,
    },
    rules: {
      // More relaxed stylistic rules
      "@stylistic/js/indent": ["warn", 2],
      "@stylistic/js/quotes": ["warn", "double"], // Allow double quotes
      "@stylistic/js/semi": ["warn", "always"], // Require semicolons

      // Important logic rules (keep as errors)
      eqeqeq: "error",
      "no-console": "off",

      // Less strict spacing rules (warnings instead of errors)
      "object-curly-spacing": ["warn", "always"],
      "arrow-spacing": ["warn", { before: true, after: true }],
      "no-trailing-spaces": "warn",
    },
  },
  {
    ignores: ["dist/**", "node_modules/**"],
  },
];
