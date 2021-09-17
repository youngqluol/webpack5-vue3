module.exports = {
  root: true,
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: 'babel-eslint',
    sourceType: 'module'
  },
  env: {
    browser: true
  },
  extends: ['standard', 'plugin:vue/recommended'],
  plugins: ['vue'],
  rules: {
    'arrow-parens': 0, // allow paren-less arrow functions
    'generator-star-spacing': 0, // 允许 async-await
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0, // 非线上环境允许 debugger
    quotes: 0, // 引号
    semi: ['error', 'always'], // 需要使用分号
    'comma-dangle': ['error', 'never'],
    // 'vue/no-unused-components': [
    //   'error',
    //   {
    //     ignoreWhenBindingPresent: true
    //   }
    // ], // 取消禁止使用未注册组件 #tag：1 / 'off'
    'vue/no-v-html': 'off', // 不 禁用v-html
    'vue/singleline-html-element-content-newline': 'off', // html中单行内容，不做限制
    'vue/multiline-html-element-content-newline': 'off', // html中多行内容，不做限制
    'vue/html-closing-bracket-newline': 'off',
    'vue/component-definition-name-casing': 'off', // 组件名必须使用驼峰
    'vue/attribute-hyphenation': 'off', // 关闭 属性必须用中划线
    'vue/html-self-closing': 'off', // 关闭 自封闭
    'vue/mustache-interpolation-spacing': ['error', 'always'], // 花括号两边加空格
    // 'vue/no-useless-v-bind': 'error', // 静态属性不需要绑定 #tag: 'error' / 'off
    // 'vue/object-curly-spacing': ['error', 'always'], // :style="{ height:2rem }"这种花括号里面加空格 #tag: ['error', 'always'] / 'off'
    'vue/max-attributes-per-line': [
      // 属性换行
      'error',
      {
        singleline: 1,
        multiline: {
          max: 1,
          allowFirstLine: true
        }
      }
    ],
    indent: [
      // 强制缩进4个空格
      'error',
      2,
      {
        SwitchCase: 1,
        VariableDeclarator: 1,
        flatTernaryExpressions: true
      }
    ], // vue template
    'vue/html-indent': [
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
    'vue/script-indent': [
      'error',
      2,
      {
        baseIndent: 0,
        switchCase: 1,
        ignores: []
      }
    ],
    'space-infix-ops': 2, // 中缀操作符周围一定有空格
    eqeqeq: 1, // 不强制使用 ===
    'prefer-const': 0, // 不需要优先使用const
    'brace-style': 0, // 大括号风格
    'space-before-function-paren': 0, // 函数参数前的空格
    'no-undef': 1, // 未定义变量
    'eol-last': 0, // 文件尾新行
    'no-unused-vars': 1, // 未使用变量
    'spaced-comment': 0, // 注释的空格
    'keyword-spacing': 0,
    yoda: 0,
    'no-trailing-spaces': 0,
    'no-callback-literal': 0,
    'prefer-promise-reject-errors': 0,
    'no-multi-spaces': 0,
    'no-extend-native': 0 // 允许扩展native对象
  }
};