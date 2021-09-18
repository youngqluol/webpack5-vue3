module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:vue/essential',
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 12,
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
  },
  plugins: [
    'vue',
    '@typescript-eslint',
  ],
  rules: {
    'import/no-extraneous-dependencies': 0,
    'vue/no-multiple-template-root': 0,
    'vue/mustache-interpolation-spacing': ['error', 'always'], // {{ num }} 括号空格
    'vue/object-curly-spacing': ['error', 'always'], // :style="{ height:2rem }" 括号空格
    'vue/max-attributes-per-line': [ // 属性换行
      'error',
      {
        singleline: 1,
        multiline: {
          max: 1,
          allowFirstLine: true
        }
      }
    ],
    'vue/html-indent': [ // vue template
      'error',
      2,
      {
        attribute: 1,
        baseIndent: 1,
        closeBracket: 0,
        alignAttributesVertically: true,
        ignores: []
      }
    ],
    'no-undef': 1,
    'no-console': 0,
    'no-unused-vars': 1,
    'arrow-parens': 0,
    'comma-dangle': 0,
    'import/no-unresolved': 0, // eslint识别不了webpack路径别名，如：@、@src
    'import/extensions': 0, // 文件后缀
    'global-require': 0, // require('path')
    'no-plusplus': 0, // ++、--
    // 'no-param-reassign': 0 // 直接修改函数参数
  },
};
