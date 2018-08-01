# babel-plugin-styles for JSX

[![Build Status](https://travis-ci.org/giuseppeg/babel-plugin-classnames.svg?branch=master)](https://travis-ci.org/giuseppeg/babel-plugin-classnames)

Support react-native styles array writting in react-dom

```js
<span style={[{color: 'white'}, {padding: 10}, false && {fontSize: 10}]} />;
```

💫

```js
import _style from "styles";
<span style={_style({
  color: 'white'
}, {
  padding: 10
}, false && {
  fontSize: 10
})} />;
```

By default imports from `styles`. However the package name is configurable.

## styles package code

```js
function styles() {
  const obj = Object.create(null);
  [].slice.call(arguments).forEach(item => {
    item && Object.keys(item).forEach(k => {
      obj[k] = item[k]
    })
  })
  return obj;
}

module.exports = styles
```

## installation

```
npm i --save-dev babel-plugin-styles
```

Then add the plugin to your `.babelrc` file:

```JSON
{
  "plugins": [
    "@babel/plugin-syntax-jsx",
    "babel-plugin-styles"
  ]
}
```

## Configuring the package name

You can set the package name by defining the `packageName` options:

```JSON
{
  "plugins": [
    ["babel-plugin-styles", { "packageName": "other-styles-packagename" }]
  ]
}
```
