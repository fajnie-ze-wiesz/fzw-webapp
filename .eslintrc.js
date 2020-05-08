// http://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module',
  },
  env: {
    browser: true,
  },

  // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
  extends: 'standard',

  // required to lint *.vue files
  plugins: [
    'html',
  ],

  // add your custom rules here

  'rules': {
    /*
     * set rules not breaking the JS code (i.e. formatting ones) to
     * warning level instead of error level to avoid the
     * annoying dev server "error screen" in browser (the warnings will still
     * appear in dev server CLI output).
     */

    // set max number of chars in a line to 100; ignore lines with urls
    'max-len': ['warn', {
      'code': 100,
      'ignoreComments': false,
      'ignoreTrailingComments': false,
      'ignoreUrls': true,
      'ignoreStrings': false,
      'ignoreTemplateLiterals': false,
      'ignoreRegExpLiterals': false,
    }],

    // force semicolons
    'semi': ['warn', 'always', {
      'omitLastInOneLineBlock': false,
    }],

    // spaces before/after if/for/while
    'keyword-spacing': ['warn', {
      'before': true,
      'after': true,
    }],

    // force dangling commas in multiline dicts/arrays/function calls
    'comma-dangle': ['warn', 'always-multiline'],

    // do not allow paren-less arrow functions
    'arrow-parens': ['warn', 'always'],

    // allow async-await
    'generator-star-spacing': ['warn', {
      'before': true,
      'after': false,
    }],

    // force spaces before argument list except of named functions
    'space-before-function-paren': ['warn', {
      'anonymous': 'always',
      // named functions should not have separating space
      // e.g. `function someFun() {}`
      'named': 'never',
      'asyncArrow': 'always',
    }],

    // operators like '+' should be spaced appropriately
    'space-infix-ops': ['warn', { 'int32Hint': false }],

    /*
     * remaining rules
     */

    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
  },
};
