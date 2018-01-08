const ReactDOMServer = require('react-dom/server');
const toComponents = require('./toComponents.js').toComponents;
const addComponent = require('./toComponents.js').addComponent;

function noox(dir, context = {}){
  if(dir && typeof dir === 'object'){
    dir = null;
    context = dir;
  }
  this.Components = {};
  this.context = context;
  this.Layout = {};
  if(dir) toComponents(dir, this.Components, this.context);
}

noox.prototype.get = function(name){
  const Components = this.Components;
  if(!Components[name]) throw new Error(`Can not find the component "${name}"`);
  return Components[name].fn;
}

noox.prototype.load = function(dir){
  toComponents(dir, this.Components, this.context);
}

noox.prototype.add = function(name, jsx){
  const Components = this.Components;
  if(Components[name]) throw new Error(`The component "${name}" already exists.`);
  Components[name] = addComponent(name, jsx, Components, this.context);
  return Components[name].fn;
}

noox.prototype.render = function(name, props){  
  const component = this.get(name);
  return ReactDOMServer.renderToStaticMarkup(component(props));
}

module.exports = noox;

