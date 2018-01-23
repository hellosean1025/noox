const test = require('ava');
const noox = require('../src');
const path = require('path');



test('render', t => {
  let context = {
    title: '--noox--'
  }
  let nx = new noox(path.resolve(__dirname, 'components'), context);

  context.title = '---new title---'
  let r = nx.render('Layout', {
    title: 'layout',
    page: {
      content: 'hello layout....'
    }
  })
  t.is(r, '<html><head><title>--noox--</title><link rel="stylesheet" href="./css/style.css"/></head><body><div><header><div>header</div></header><h1>Customer_Private_Variable</h1><div>hello layout....</div></div></body></html>')
})

test('addComponent', t => {
  let nx2 = new noox();
  nx2.add('PageIndex', `
  <h1>{props.name}</h1>
  <h2>{props.title}</h2>
  hello world.
`)

  let customPage = nx2.render('PageIndex', { name: 'xiaoming', title: '---new title---' })

  t.is(customPage, '<h1>xiaoming</h1><h2>---new title---</h2>hello world.')
})
