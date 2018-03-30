const React = require('react')
const babel = require('babel-standalone')
const color = require('bash-color')

const transformJSX = require('babel-plugin-transform-react-jsx')
const error = (msg)=> color.red(msg)

const parse = raw => babel.transform(raw, {
  plugins: [
    transformJSX
  ]
}).code

const wrap = jsx => `<React.Fragment>${jsx}</React.Fragment>`

const toComponent = (name, jsx, scope = {}) => {
  const el = parse(wrap(jsx))
  scope._componentSource = function(msg){
    jsx = jsx.replace(/\t/g, '  ')
    return 'Component: "' + error(name) + '"\n' + error(msg) + '\n' + jsx + '\n'
  };
  scope._componentName = name;
  const scopeKeys = Object.keys(scope)
  const scopeValues = scopeKeys.map(key => scope[key])
  const create = new Function('React', ...scopeKeys, `return (props) =>  {
    try{
      return ${el}
    }catch(err){
      err.message =  _componentSource(err.message); 
      throw err;
    }
  } `)
  const Comp = create(React, ...scopeValues)

  return Comp
}

exports.parse = parse;
exports.toComponent = toComponent;
exports.wrap = wrap;