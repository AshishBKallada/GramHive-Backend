module.exports = {
    // Specifies the ESLint parser
    parser: '@babel/eslint-parser',
  
    // Specifies the ESLint parser options
    parserOptions: {
      ecmaVersion: 2021, // Allows for the parsing of modern ECMAScript features
      sourceType: 'module', // Allows for the use of imports
      ecmaFeatures: {
        jsx: true, // Allows for the parsing of JSX
      },
    },
  
    // Specifies the ESLint environment
    env: {
      browser: true, // Enables browser globals like window and document
      node: true, // Enables Node.js global variables and Node.js scoping
      es2021: true, // Enables ES2021 global variables
    },
  
    // Extends the configuration
    extends: [
      'eslint:recommended', // Uses the recommended rules from the eslint
      'plugin:react/recommended', // Uses the recommended rules from @eslint-plugin-react
      'plugin:jsx-a11y/recommended', // Uses the recommended rules from @eslint-plugin-jsx-a11y
      'plugin:prettier/recommended', // Enables eslint-plugin-prettier and displays prettier errors as ESLint errors
    ],
  
    // Specifies the ESLint plugins
    plugins: [
      'react', // eslint-plugin-react for React-specific linting rules
      'jsx-a11y', // eslint-plugin-jsx-a11y for accessibility rules on JSX elements
      'prettier', // eslint-plugin-prettier to run prettier as an ESLint rule
    ],
  
    // Specifies the rules
    rules: {
      'prettier/prettier': 'error', // Ensures prettier issues are treated as errors
      'react/prop-types': 'off', // Disables prop-types rule as we're using TypeScript
      'react/react-in-jsx-scope': 'off', // React 17+ does not require React to be in scope
    },
  
    // Settings for specific modules
    settings: {
      react: {
        version: 'detect', // Automatically detects the react version
      },
    },
  };
  