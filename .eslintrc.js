module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: 'airbnb-base',
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'react/prop-types': 0,
    indent: ['error', 2],
    'linebreak-style': 1,
    'no-unused-vars': ['off'],
    'import/extensions': ['off'],
    'no-undef': 'off',
  },
};
