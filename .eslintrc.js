/** @type {import('@types/eslint').Linter.BaseConfig} */
module.exports = {
  root: true,
  extends: [
    "@remix-run/eslint-config",
    "@remix-run/eslint-config/node",
    "@remix-run/eslint-config/jest-testing-library",
  ],
  env: {
    "cypress/globals": true,
  },
  plugins: ["cypress"],
  // We're using vitest which has a very similar API to jest
  // (so the linting plugins work nicely), but we have to
  // set the jest version explicitly.
  rules: {
    "default-param-last": "off",
    "@typescript-eslint/default-param-last": "error",
    "dot-notation": "off",
    "@typescript-eslint/dot-notation": "error",
    "no-array-constructor": "off",
    "@typescript-eslint/no-array-constructor": "error",
    "no-dupe-class-members": "off",
    "@typescript-eslint/no-dupe-class-members": "error",
    "no-empty-function": "off",
    "@typescript-eslint/no-empty-function": "error",
    "no-shadow": "off",
    "@typescript-eslint/no-shadow": "error",
    "no-throw-literal": "off",
    "@typescript-eslint/no-throw-literal": "error",
    "no-unused-expressions": "off",
    "@typescript-eslint/no-unused-expressions": "error",
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": "error",
    "no-use-before-define": "off",
    "@typescript-eslint/no-use-before-define": "error",
    "require-await": "off",
    "@typescript-eslint/require-await": "error",
    "no-return-await": "off",
    "@typescript-eslint/return-await": "error",
  },
  settings: {
    jest: {
      version: 28,
    },
  },
};
