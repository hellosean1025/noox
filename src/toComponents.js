let filepath;
const path = require('path');
const fs = require('fs');
const toComponent= require('./jsx').toComponent;
const ComponentRegexp = /<([A-Z][\w]*)\s+[^>]*>/g;
const ComponentNameRegexp = /<([A-Z][\w]*)/;
const clearCommentRegexp = /\/\*[\s\S]*?\*\//;
const tplExt = '.jsx';
let Components;

function initComponents(){
  let rootFiles = fs.readdirSync(filepath);
  rootFiles.forEach(item=>{
    if(path.extname(item) !== tplExt) return;
    let componentName = path.basename(item, tplExt);
    
    let content = fs.readFileSync(path.resolve(filepath, item), 'utf8');
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
  })
}

function checkDepends(){
  Object.keys(Components).forEach(componentName=>{
    if(Components[componentName].depends.length > 0){
      Components[componentName].depends.map(d=>{
        if(!Components[d]){
          let componentPath = path.resolve(filepath, d)
          throw new Error(`Cannot find the Component "${d}" in the "${componentPath}"`)
        }
      })
    }
  })
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
    let component = Components[componentName];
    if(component.status === 0){
      if( component.depends.length === 0){
        component.status = 1;
        component.fn = toComponent(component.content, {});
      }else{
        let sign = true, scope = {};
        component.depends.forEach(d=>{
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
  })
  if(checkCompents() === false) loadComponents(level+1);
}

module.exports = function(dir, context){
  Components = context;
  filepath = dir;
  initComponents();
  loadComponents();
}