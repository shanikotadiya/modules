module.exports = {
  extends: ["next/core-web-vitals"],
  parser: "@babel/eslint-parser", // Ensures proper parsing
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: "module",
    requireConfigFile: false, // Needed for @babel/eslint-parser
  },
};
