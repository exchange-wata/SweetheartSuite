import tsPlugin from '@typescript-eslint/parser';
import reactPlugin from 'eslint-plugin-react';

export default [
  {
    files: ['*/**/*.{ts,tsx}'],
    ignores: ['node_modules/**/*', '.next/**/*', 'types/**/*'],
    languageOptions: {
      parser: tsPlugin,
    },
    plugins: {
      react: reactPlugin,
    },
    rules: {
      'no-unused-vars': 'error',
      'react/jsx-uses-react': 'off',
      'react/react-in-jsx-scope': 'off',
    },
  },
];
