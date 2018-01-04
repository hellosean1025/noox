const ReactDOMServer = require('react-dom/server');

const toComponents = require('./toComponents.js');

function noox(dir){
  this.Components = {};
  this.Layout = {};
  toComponents(dir, this.Components);
}

noox.prototype.get = function(name){
  const Components = this.Components;
  if(!Components[name]) throw new Error(`Can not find the component "${name}"`);
  return Components[name].fn;
}

noox.prototype.load = function(dir){
  toComponents(dir, this.Components);
}

noox.prototype.render = function(name, props){
  let component = this.get(name);
  return ReactDOMServer.renderToStaticMarkup(component(props));
}

module.exports = noox;

