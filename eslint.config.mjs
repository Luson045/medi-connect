import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReact from "eslint-plugin-react";
import react from "eslint-plugin-react";

export default [
  {
    files: ["**/*.{js,mjs,cjs,jsx}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        // React is globally available, no need to import for JSX
        React: "writable",
      },
    },
    plugins: {
      react,
    },
    rules: {
      // Disable the rule for requiring 'import React' in scope for JSX
      "react/react-in-jsx-scope": "off",

      // Allow JSX in .js and .jsx files (and optionally .ts/.tsx for TypeScript)
      "react/jsx-filename-extension": [1, { extensions: [".js", ".jsx"] }],

      // You can add TypeScript support by including `.ts` and `.tsx` if needed:
      // 'react/jsx-filename-extension': [1, { 'extensions': ['.js', '.jsx', '.ts', '.tsx'] }],
    },
    ignores: ["node_modules", ".git/", "public", "build"],
  },
  { languageOptions: { globals: { ...globals.browser, ...globals.node } } },
  pluginJs.configs.recommended,
  pluginReact.configs.flat.recommended,
];
