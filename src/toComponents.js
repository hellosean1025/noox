let filepath;
const path = require('path');
const fs = require('fs');
const toComponent= require('./jsx').toComponent;
const ComponentRegexp = /<([A-Z][\w]*)\s+[^>]*>/g;
const ComponentNameRegexp = /<([A-Z][\w]*)/;
const clearCommentRegexp = /\/\*[\s\S]*?\*\//;
const tplExt = '.jsx';
let Components;
let context;

function initJsx(componentName, content){
  Components[componentName] = {
    status: 0,
    depends: [],
    content: content
  };
  let replaceContent = content.replace(clearCommentRegexp, '')
  let dependComponents = replaceContent.match(ComponentRegexp);
  if(dependComponents){
    dependComponents.forEach(c=>{
      let name = c.match(ComponentNameRegexp)[1];
      Components[componentName].depends.push(name);
    })
  }
}

function initComponents(){
  let rootFiles = fs.readdirSync(filepath);
  rootFiles.forEach(item=>{
    if(path.extname(item) !== tplExt) return;
    let componentName = path.basename(item, tplExt);
    
    let content = fs.readFileSync(path.resolve(filepath, item), 'utf8');
    initJsx(componentName, content);
  })
}

function parseJsx(name){
  let component = Components[name];
  if(component.depends.length === 0){
    component.status = 1;
    component.fn = toComponent(component.content, context);
  }else{
    let sign = true, scope = Object.assign({}, context);
    component.depends.forEach(d=>{
      if(!Components[d])throw new Error(`Do not exist the component "${d}"`);
      if(Components[d].status === 0){
        sign = false;        
      }
      scope[d] = Components[d].fn;
    })
    if(sign) {
      component.status = 1;
      component.fn = toComponent(component.content, scope)
    }
  }
}

function checkCompents(){
  let sign = true;
  Object.keys(Components).forEach(componentName=>{
    if(Components[componentName].status === 0){
      sign = false;
    }
  })
  return sign;
}

function loadComponents(level){
  if(level > 1000) throw new Error('Recursion is over 1000.');
  level++;
  Object.keys(Components).forEach(componentName=>{
    if(Components[componentName].status === 0) parseJsx(componentName);
  })
  if(checkCompents() === false) loadComponents(level+1);
}

exports.toComponents = function(dir, _components, _context = {}){
  Components = _components;
  context = _context;
  filepath = dir;
  initComponents();
  loadComponents();
}

exports.addComponent = function(name, content, _components){
  Components = _components;
  initJsx(name, content);
  parseJsx(name)
  return Components[name];
}