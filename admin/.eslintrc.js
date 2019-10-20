module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  parserOptions: {
    parser: 'babel-eslint',
    sourceType: 'module'
  },
  extends: ['plugin:vue/recommended'],
  plugins: [
    'vue'
  ],
  rules: {
    'vue/component-name-in-template-casing': ["error", "kebab-case"],
    "vue/singleline-html-element-content-newline": "off",
    'vue/no-unused-vars' : 'off',
    "vue/max-attributes-per-line": "off",
    "vue/multiline-html-element-content-newline": "off"
  }
}
