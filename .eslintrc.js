module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true,
  },

  extends: [
    'airbnb-base',
    'plugin:testing-library/dom',
    'plugin:jest/recommended',
    'plugin:jest-dom/recommended',
    'plugin:import/recommended',
  ],

  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },

  plugins: [
    'testing-library',
    'jest',
    'jest-dom',
    'import',
  ],

  rules: {
    'linebreak-style': ['error', 'windows'],
    'import/extensions': ['error', {
      js: 'always',
    }],
  },

  overrides: [{
    files: ['*.test.js'],
    rules: {
      'import/extensions': ['error', {
        js: 'never',
      }],
    },
  }],
};
