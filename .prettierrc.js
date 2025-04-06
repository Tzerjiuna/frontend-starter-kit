module.exports = {
  printWidth: 120,
  trailingComma: 'none',
  tabWidth: 2,
  semi: false,
  singleQuote: true,
  bracketSpacing: true,
  bracketSameLine: false,
  arrowParens: 'avoid',
  endOfLine: 'lf',
  proseWrap: 'preserve',
  quoteProps: 'as-needed',
  useTabs: false,
  htmlWhitespaceSensitivity: 'css',
  plugins: ["@trivago/prettier-plugin-sort-imports", "prettier-plugin-sort-json"],
  jsonRecursiveSort: true,
  importOrder: [
    '^@core/(.*)$',
    '(^[./])|^@/(components|config|constants|helpers|hooks|i18n|lib|services|tests|types|utils)/(.*)$',
    '.(json)$',
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true
}
