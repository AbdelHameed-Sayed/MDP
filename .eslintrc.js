module.exports = {
  root: true,
  extends: '@react-native',
  plugins: ['import', 'react-native'],
  rules: {
    'no-console': 'error',
    'no-empty': ['error', {allowEmptyCatch: true}],
    'import/no-unresolved': 'error',
    'import/export': 'error',
    'import/no-deprecated': 'error',
    'import/named': 'error',
    'import/no-duplicates': 'error',
    'import/order': [
      'error',
      {
        groups: [
          ['external', 'builtin'],
          'internal',
          ['sibling', 'parent'],
          'index',
        ],
        pathGroups: [
          {
            pattern: '@(react|react-native)',
            group: 'external',
            position: 'before',
          },
          {
            pattern: '@(atoms|molecules|organisms|screens)/**',
            group: 'internal',
          },
        ],
        pathGroupsExcludedImportTypes: ['internal', 'react'],
        'newlines-between': 'always',
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
      },
    ],
    'no-return-await': 'error',
    'no-unused-vars': [
      'error',
      {
        args: 'after-used',
      },
    ],
    'no-duplicate-imports': 'error',
    'array-callback-return': 'error',
  },
  parserOptions: {
    project: './tsconfig.json',
  },
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/ignore': ['node_modules'],
    'import/resolver': {
      typescript: {},
    },
  },
  ignorePatterns: [
    '*.test.js',
    '*.test.ts',
    '*.test.tsx',
    '**/__tests__/**',
    '**/tests/**',
  ],
};
