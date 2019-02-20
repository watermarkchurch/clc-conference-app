module.exports = {
  extends: [
    'airbnb',
    'plugin:react/recommended',
    'plugin:prettier/recommended',
    'prettier/react',
  ],
  parser: 'babel-eslint',
  plugins: [
    'import',
    'jsx-a11y',
    'babel',
    'prettier',
    'jest',
    'react',
    'react-native',
  ],
  parserOptions: {
    ecmaVersion: 7,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.android.js', '.ios.js'],
      },
      'babel-module': {},
    },
  },
  env: {
    browser: true,
    node: true,
    'jest/globals': true,
  },
};