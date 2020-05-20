module.exports = {
  extends: 'airbnb',
  rules: {
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
  },
  /* overrides: [{
    // for files matching this pattern
    files: ["*.ts", "*.tsx"],
    // following config will override "normal" config
    parser: "@typescript-eslint/parser", // Specifies the ESLint parser
    parserOptions: {
      ecmaVersion: 2020, // Allows for the parsing of modern ECMAScript features
      sourceType: "module", // Allows for the use of imports
      ecmaFeatures: {
        jsx: true // Allows for the parsing of JSX
      }
    },
    settings: {
      react: {
        // Tells eslint-plugin-react to automatically detect the version of React to use
        version: "detect"
      }
    },
    extends: [
      // Uses the recommended rules from @eslint-plugin-react
      "plugin:react/recommended",
      // Uses the recommended rules from the @typescript-eslint/eslint-plugin
      "plugin:@typescript-eslint/recommended",
      // Uses eslint-config-prettier to disable ESLint rules from
      // @typescript-eslint/eslint-plugin that would conflict with prettier
      "prettier/@typescript-eslint",
      // Enables eslint-plugin-prettier and eslint-config-prettier.
      // This will display prettier errors as ESLint errors.
      // Make sure this is always the last configuration in the extends array.
      "plugin:prettier/recommended"
    ]
  }] */
};
