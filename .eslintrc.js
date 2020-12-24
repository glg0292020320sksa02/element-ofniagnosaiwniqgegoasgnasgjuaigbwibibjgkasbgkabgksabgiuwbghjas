module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
  extends: [
    '@nuxtjs',
    'prettier',
    'prettier/vue',
    'plugin:prettier/recommended',
    'plugin:nuxt/recommended',
  ],
  plugins: ['prettier'],
  // add your custom rules here
  rules: {
    'no-undef': 'off',
    'no-unused-vars': 'off',
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
    'no-empty-pattern': 'off',
    'nuxt/no-this-in-fetch-data': 'off',
    camelcase: 'off',

    'array-callback-return': 'error',
    'dot-notation': 'error',
    eqeqeq: ['error', 'smart'],
    'no-confusing-arrow': [
      'error',
      {
        allowParens: false,
      },
    ],
    'no-else-return': [
      'error',
      {
        allowElseIf: false,
      },
    ],
    'no-implicit-coercion': 'error',
    'no-lonely-if': 'error',
    'no-unneeded-ternary': 'error',
    'no-use-before-define': ['error', 'nofunc'],
    'padding-line-between-statements': [
      'error',
      // Require blank lines after all directive prologues (e. g. 'use strict')
      {
        blankLine: 'always',
        prev: 'directive',
        next: '*',
      },
      // Disallow blank lines between all directive prologues (e. g. 'use strict')
      {
        blankLine: 'never',
        prev: 'directive',
        next: 'directive',
      },
      // Require blank lines after every sequence of variable declarations
      {
        blankLine: 'always',
        prev: ['const', 'let', 'var'],
        next: '*',
      },
      // Blank lines could be between variable declarations
      {
        blankLine: 'any',
        prev: ['const', 'let', 'var'],
        next: ['const', 'let', 'var'],
      },
      // Require blank lines before all return statements
      {
        blankLine: 'always',
        prev: '*',
        next: 'return',
      },
      // Require blank lines before and after all following statements
      {
        blankLine: 'always',
        prev: '*',
        next: ['for', 'function', 'if', 'switch', 'try'],
      },
      {
        blankLine: 'always',
        prev: ['for', 'function', 'if', 'switch', 'try'],
        next: '*',
      },
    ],
    'prefer-arrow-callback': 'error',
    'prefer-object-spread': 'error',
    'prefer-regex-literals': 'error',
    'prefer-rest-params': 'error',
    'prefer-spread': 'error',
    'prefer-template': 'error',
  },
}
