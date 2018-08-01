function babelPluginStyles({ types: t }) {
  const cloneNode = t.cloneNode || t.cloneDeep
  return {
    name: "babel-plugin-styles",
    visitor: {
      Program: {
        enter(path, state) {
          state.stylesIdentifier = path.scope.generateUidIdentifier('style')
        },
        exit(path, state) {
          if (state.hasStyles) {
            const importDeclaration = t.importDeclaration(
              [t.importDefaultSpecifier(state.stylesIdentifier)],
              t.stringLiteral(state.opts.packageName || 'react-dom-styles')
            )

            path.node.body.unshift(importDeclaration)
          }
        }
      },
      JSXAttribute(path, state) {
        if (path.node.name.name !== 'style') {
          return
        }

        const value = path.get('value')
        if (!value.isJSXExpressionContainer()) {
          return
        }

        const expression = value.get('expression')
        if (!expression.isArrayExpression()) {
          return
        }

        expression.replaceWith(
          t.callExpression(
            cloneNode(state.stylesIdentifier),
            expression.get('elements').map(e => cloneNode(e.node)),
          )
        )

        state.hasStyles = true
      }
    }
  }
}

exports = module.exports = babelPluginStyles
exports.default = babelPluginStyles
Object.defineProperty(exports, "__esModule", {
  value: true
})
