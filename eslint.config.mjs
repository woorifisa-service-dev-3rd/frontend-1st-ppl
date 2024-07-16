import globals from "globals";
import pluginJs from "@eslint/js";

export default [
  pluginJs.configs.recommended,
  {
    languageOptions: { globals: globals.browser },
    rules: {
      semi: "error",
      'no-unused-vars': ['warn', { vars: 'all', args: 'after-used', ignoreRestSiblings: false }], // 사용되지 않는 변수 경고
      "prefer-const": ["error", {
          "destructuring": "any",
          "ignoreReadBeforeAssign": false
      }]
    }
  },
];