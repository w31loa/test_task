module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'airbnb-base',
    'airbnb-typescript/base'
  ],
  overrides: [
  ],
  parserOptions: {
    project: ['./tsconfig.json'], // Specify it only for TypeScript files
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  rules: {
    'camelcase': 'off',
    'import/prefer-default-export': 'off',
    'class-methods-use-this': 'off',
    'max-len': 'off',
    'linebreak-style': 'off'
  }
}
