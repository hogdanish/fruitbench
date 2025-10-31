/** @type {import("prettier").Config} */
export default {
  experimentalTernaries: true, // prettier's new ternary formatting
  printWidth: 80, // the line length that the printer will wrap on
  tabWidth: 2, // number of spaces per indentation-level
  useTabs: false, // indent lines with spaces instead of tabs
  semi: false, // do not print semicolons at the ends of statements
  singleQuote: true, // use single quotes instead of double quotes
  quoteProps: 'as-needed', // only add quotes around object properties where required
  jsxSingleQuote: true, // use single quotes instead of double quotes in JSX
  trailingComma: 'all', // add trailing commas wherever possible
  bracketSpacing: true, // print spaces between brackets in object literals
  bracketSameLine: true, // put > of multi-line elements at the end of the last line
  arrowParens: 'always', // include parentheses around a sole arrow function parameter
  proseWrap: 'preserve', // do not automatically wrap markdown
  htmlWhitespaceSensitivity: 'css', // handle whitespace inside HTML as CSS does
  vueIndentScriptAndStyle: false, // do not indent script and style tags in Vue files
  endOfLine: 'lf', // use linefeed (LF) as the end of line character
  embeddedLanguageFormatting: 'auto', // format embedded code
  singleAttributePerLine: false, // do not enforce single attribute per line in HTML/JSX/Vue
  insertPragma: false, // do not insert a special comment to let editor know that the file has been formatted
  requirePragma: false, // do not require a special comment to format code
  plugins: ['prettier-plugin-astro'],
  overrides: [
    {
      files: '*.astro',
      options: {
        parser: 'astro',
      },
    },
  ],
}
