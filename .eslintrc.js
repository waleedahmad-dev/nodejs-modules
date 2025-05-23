module.exports = {
  env: {
    node: true,
    commonjs: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:prettier/recommended', // Enables prettier plugin + disables conflicting rules
  ],
  parserOptions: {
    ecmaVersion: 12,
  },
  ignorePatterns: ['node_modules/', 'dist/'],
  rules: {
    // You can add or override rules here
  },
};
