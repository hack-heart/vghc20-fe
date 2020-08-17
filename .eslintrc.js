module.exports = {
  parser: '@typescript-eslint/parser', // Specifies the ESLint parser
  extends: [
    'airbnb',
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  settings: {
    react: {
      version: 'detect',
    },
    "import/resolver": {
      "node": {
        "extensions": [".js", ".jsx", ".ts", ".tsx"]
      }
    }
  },
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  plugins: ['@typescript-eslint', 'react', 'react-hooks'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
    sourceType: 'module', // Allows for the use of imports
  },
  rules: {
    quotes: [2, 'single'],
    '@typescript-eslint/explicit-function-return-type': 0,
    strict: 0,
    'import/no-unresolved': [2, { caseSensitive: false }],
    'import/extensions': 0,
    'jsx-a11y/click-events-have-key-events': 2,
    'jsx-a11y/label-has-associated-control': 0,
    'max-len': [2, 120],
    'new-cap': [0, { capIsNewExceptions: ['Router'] }],
    'no-console': 0,
    'no-debugger': 2,
    'no-param-reassign': 0,
    'no-restricted-syntax': [0, 'DebuggerStatement'],
    'no-underscore-dangle': 0,
    'no-unused-expressions': 2,
    'no-unused-vars': [2, { vars: 'all', args: 'none' }],
    'one-var': [2, { uninitialized: 'always', initialized: 'never' }],
    'one-var-declaration-per-line': [2, 'initializations'],
    'react/jsx-filename-extension': 0,
    'react/jsx-first-prop-new-line': 0,
    'react/jsx-props-no-spreading': 0,
    'react/jsx-uses-react': 2,
    'react/jsx-uses-vars': 2,
    'react/prop-types': 0,
    'react/react-in-jsx-scope': 2,
    'react-hooks/rules-of-hooks': 2, // Checks rules of Hooks
    'react-hooks/exhaustive-deps': 2, // Checks effect dependencies
  },
  overrides: [
    // Override some TypeScript rules just for .js files
    {
      files: ['*.js'],
      rules: {
        '@typescript-eslint/no-var-requires': 0,
        '@typescript-eslint/explicit-module-boundary-types': 0,
      },
    },
  ],
};
