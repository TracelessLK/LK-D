// strict
module.exports = {
  "env": {
    "es6": true,
    "jest/globals": true,
    "browser":true,
    "node":true
  },
  "parser": "babel-eslint",
  "plugins": [
    "flowtype",
    "jest",
],
  "extends": [
    "eslint:recommended",
    "standard",
    "airbnb",
    "react-app"
],
  "parserOptions": {
    "ecmaVersion": 2018,
    "sourceType": "module",
    "ecmaFeatures": {
      "impliedStrict": true
    }
  },
  "rules": {
    'arrow-parens': 0,
    'no-shadow':0,
    'func-names':0,
    'no-undef':0,
    'new-cap':0,//要求构造函数首字母大写
    'camelcase':0,//强制使用骆驼拼写法命名约定
    'spaced-comment':0,
    'no-empty':0,
    'no-useless-escape':0,
    'import/no-unresolved':0,
    'standard/no-callback-literal':0,//没有回调文本
    'global-require':0,//要求 require() 出现在顶层模块作用域中
    'import/no-dynamic-require':0,
    'import/no-extraneous-dependencies':0,
    'no-useless-constructor':0,//禁用不必要的构造函数
    'no-param-reassign':0,//禁止对 function 的参数进行重新赋值
    'prefer-destructuring':0,//优先使用数组和对象解构
    'no-tabs':0,//禁用 tab
    'no-use-before-define':0,//禁止在变量定义之前使用它们
    'import/order':0,
    'require-await':0,//禁止使用不带 await 表达式的 async 函数
    'prefer-const':0,//要求使用 const 声明那些声明后不再被修改的变量
    'consistent-return': 0,//要求 return 语句要么总是指定返回的值，要么不指定
    'class-methods-use-this': 0,//强制类方法使用 this
    'prefer-template': 0,//要求使用模板字面量而非字符串连接
    'quotes': 0,//强制使用一致的反勾号、双引号或单引号
    'no-throw-literal': 0,//禁止抛出异常字面量
    "space-before-function-paren": 0,
    "no-inner-declarations": 0,
    "no-proto": 2,
    "no-undef-init": 2,
    "no-new-func": 2,
    "no-console": 0,//禁用 console
    "no-debugger": 2,
    "no-eval": 2,
    "no-implied-eval": 2,
    "no-extend-native": 2,
    "no-extra-parens": 2,
    "no-iterator": 2,
    "no-labels": 2,
    "sort-vars": 2,
    "object-shorthand": 2,
    "valid-jsdoc": 0,//强制使用有效的 JSDoc 注释
    "dot-notation": 2,
    "no-loop-func": 2,
    "no-script-url": 2,
    "no-process-exit": 0,
    "accessor-pairs": 2,
    "array-callback-return": 2,
    "curly": ["error", "all"],
    "default-case": 2,
    "for-direction": 2,
    "getter-return": 2,
    "no-await-in-loop": 0,//禁止在循环中出现 await
    "no-caller": 2,
    "no-empty-function": 2,
    "no-extra-bind": 2,
    "no-extra-label": 2,
    "no-floating-decimal": 2,
    "no-template-curly-in-string": 2,
    "eqeqeq": 0,
    "no-lone-blocks": 2,
    "no-new": 0,
    "no-new-wrappers": 2,
    "no-return-assign": 2,
    "no-return-await": 2,
    "no-self-compare": 2,
    "no-sequences": 2,
    "no-unmodified-loop-condition": 2,
    "no-unused-expressions": 2,
    "no-useless-call": 2,
    "no-useless-return": 2,
    "no-void": 2,
    "no-with": 2,
    "prefer-promise-reject-errors": 2,
    "no-shadow-restricted-names": 2,
    "no-label-var": 2,
    "no-useless-rename": 2,
    "callback-return": 0,//强制数组方法的回调函数中有 return 语句
    "handle-callback-err": 0,
    "no-buffer-constructor": 2,
    "no-new-require": 2,
    "no-path-concat": 2,
    "no-confusing-arrow": 2,
    "no-useless-computed-key": 2,
    "no-duplicate-imports": 2,
    "radix": [2, "as-needed"],
    'no-unused-vars': ["error", {"args": "after-used"}],
    "no-var": 2,
    "semi": [0, "never"],
    "comma-dangle": ["error", "never"],
    "react/jsx-filename-extension": 0,
    "no-plusplus": 0,
    "no-restricted-syntax": 0,
    "no-loop-func": 0,
    "no-underscore-dangle": 0,
    "react/forbid-prop-types": 0,
    "react/require-default-props": 0,
    "max-len": 0,
  },
  globals: {
    'WebSocket': true
  }
}
