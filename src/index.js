const ReactDOMServer = require('react-dom/server');

const toComponents = require('./toComponents.js').toComponents;
const addComponent = require('./toComponents.js').addComponent;

function noox(dir){
  this.Components = {};
  this.Layout = {};
  if(dir) toComponents(dir, this.Components);
}

noox.prototype.get = function(name){
  const Components = this.Components;
  if(!Components[name]) throw new Error(`Can not find the component "${name}"`);
  return Components[name].fn;
}

noox.prototype.load = function(dir){
  toComponents(dir, this.Components);
}

noox.prototype.add = function(name, jsx){
  const Components = this.Components;
  if(Components[name]) throw new Error(`The component "${name}" already exists.`);
  Components[name] = addComponent(name, jsx, Components);
  return Components[name].fn;
}

noox.prototype.render = function(name, props){
  let component = this.get(name);
  return ReactDOMServer.renderToStaticMarkup(component(props));
}

module.exports = noox;

