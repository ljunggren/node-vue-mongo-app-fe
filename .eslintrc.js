module.exports = {
  parserOptions: {
    parser: '@babel/eslint-parser', // Use the new parser
    requireConfigFile: false, // Optional: disables the need for a separate Babel config file
    ecmaVersion: 2020, // Adjust according to your project's needs
    sourceType: 'module', // Allows the use of import/export statements
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-recommended', // For Vue 3 projects
  ],
  rules: {
    // Define your custom rules here
    'vue/multi-word-component-names': 'off',
  },
};
