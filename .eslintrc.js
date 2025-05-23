module.exports = {
  extends: ['next/core-web-vitals', 'eslint:recommended'],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module'
  },
  rules: {
    semi: ['error', 'always'],
    quotes: ['error', 'single']
  }
};