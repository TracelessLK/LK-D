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
    "react-app",
      "lk"
],
  "parserOptions": {
    "ecmaVersion": 2018,
    "sourceType": "module",
    "ecmaFeatures": {
      "impliedStrict": true,
      "jsx": true,
    }
  },
  "rules": {
    'react/jsx-filename-extension':0
  },
  globals: {
    'WebSocket': true
  }
}
