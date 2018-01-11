const test = require('ava');
const noox = require('../src');
const path = require('path');

let context = {
  title: '--noox--'
}
let nx = new noox(path.resolve(__dirname, 'components'), context);

context.title = '---new title---'

test('render', t=>{
  let r = nx.render('Layout', {
    title: 'layout',
    page: {
      content: 'hello layout....'
    }
  })
  t.is(r, '<html><head><title>--noox--</title><link rel="stylesheet" href="./css/style.css"/></head><body><div><header><div>header</div></header><h1>Customer_Private_Variable</h1><div>hello layout....</div></div></body></html>')
})

test('addComponent', t=>{
  nx.add('PageIndex', `
  <h1>{props.name}</h1>
  <h2>{title}</h2>
  <Body content="<h1>hello world.</h1>" />
`)

let customPage = nx.render('PageIndex', {name: 'xiaoming'})

t.is(customPage, '<h1>xiaoming</h1><h2>---new title---</h2><div><h1>hello world.</h1></div>')
})
