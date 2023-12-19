module.exports = {
  "env": {
    "browser": true,
    "es2021": true
  },
  "extends": "standard-with-typescript",
  "overrides": [
    {
      "env": {
        "node": true
      },
      "files": [
        ".eslintrc.{js,cjs}"
      ],
      "parserOptions": {
        "sourceType": "script"
      }
    }
  ],
  "parserOptions": {
    "ecmaVersion": "latest",
    "sourceType": "module"
  },
  "plugins": ['eslint-plugin-import-helpers'],
  "rules": {
    'import-helpers/order-imports': [
      'warn',
      {
        "newlinesBetween": 'always',
        "groups": [
          'module',
          '/^@shared/',
          ['parent', 'sibling', 'index'],
        ],
        "alphabetize": {
          "order": 'asc',
          "ignoreCase": true
        },
      },
    ],
  },
  "ignorePatterns": [".eslintrc.js"],
}
