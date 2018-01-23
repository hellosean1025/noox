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
  toComponents(dir, this.Components, this.context);
}

noox.prototype.get = function(name){
  const Components = this.Components;
  if(!Components[name]) throw new Error(`Can not find the component "${name}"`);
  return {
    component: Components[name].fn,
    data:      Components[name].data
  }
}

noox.prototype.load = function(dir){
  toComponents(dir, this.Components, this.context);
}

noox.prototype.add = function(name, jsx){
  const Components = this.Components;
  if(Components[name]) throw new Error(`The component "${name}" already exists.`);
  Components[name] = addComponent(name, jsx, Components);
  return this.get(name);
}

noox.prototype.render = function(name, props){  
  try{
    const component = this.get(name).component;
    return ReactDOMServer.renderToStaticMarkup(component(props));
  }  catch(err){
    err.message = `In the Component "${name}", ${err.message}`
    throw err;
  }
}

module.exports = noox;

