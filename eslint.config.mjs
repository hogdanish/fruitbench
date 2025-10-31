import antfu from '@antfu/eslint-config'

export default antfu({
  astro: {
    overrides: {
      // stylistic rules
      'style/indent': 'off',
      'style/quotes': 'off',
      'style/semi': 'off',
      '@stylistic/indent': 'off',
      '@stylistic/quotes': 'off',
      '@stylistic/semi': 'off',
      'format/*': 'off',
      '*-indent': 'off',
      '*-spacing': 'off',
      '*-spaces': 'off',
      '*-order': 'off',
      '*-dangle': 'off',
      '*-newline': 'off',
      '*quotes': 'off',
      '*semi': 'off',
      // linting rules (false positives)
      'antfu/no-top-level-await': 'off',
    },
  },
  mdx: true,
  rules: {
    'style/arrow-parens': 'off',
    'style/object-curly-spacing': 'off',
    'style/brace-style': 'off',
    'style/indent': 'off',
    'style/operator-linebreak': 'off',
    'style/quote-props': 'off',
    'svelte/indent': 'off',
    'no-undef': 'off',
  },
  formatters: false,
  jsx: true,
  jsonc: true,
  yaml: true,
  javascript: true,
  stylistic: false,
  typescript: {
    tsconfigPath: './tsconfig.json',
  },
  ignores: [
    'node_modules/**',
    '.dev/**',
    '.astro/**',
    'package.json',
    'scripts/*',
  ],
  extends: ['./.astro/.eslintrc-auto-import.json'],
})
