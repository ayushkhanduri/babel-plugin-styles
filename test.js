const assert = require("assert");
const transform = require("@babel/core").transform;
const plugin = require("./");
const fs = require('fs');

transform(
  `<span style={[{color: 'white'}, {padding: 10}, false && {fontSize: 10}]} />;`.trim(),
  { plugins: ["@babel/plugin-syntax-jsx", plugin] },
  (err, result) => {
    if (err) {
      return console.log(err);
    }

    assert.equal(
      result.code.trim(),
      `
import _style from "react-dom-styles";
<span style={_style({
  color: 'white'
}, {
  padding: 10
}, false && {
  fontSize: 10
})} />;
      `.trim()
    );
  }
);

transform(
  `<span style={[{color: 'white'}, {padding: 10}, false && {fontSize: 10}]} />;`.trim(),
  { presets: ["@babel/env"], plugins: ["@babel/plugin-syntax-jsx", plugin] },
  (err, result) => {
    if (err) {
      return console.log(err);
    }

    assert.equal(
      result.code.trim(),
      `
"use strict";

var _reactDomStyles = _interopRequireDefault(require("react-dom-styles"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

<span style={(0, _reactDomStyles.default)({
  color: 'white'
}, {
  padding: 10
}, false && {
  fontSize: 10
})} />;
      `.trim()
    );
  }
);
