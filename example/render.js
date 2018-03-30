const noox = require('../src');
const path = require('path');

let context = {
  title: '--noox--'
}
let nx = new noox(path.resolve(__dirname, 'components'), context);

context.title = '---new title---'

let layout = nx.render('Layout', {
  title: 'layout',
  page: {
    content: 'hello layout....'
  }
})

console.log(layout, null,2)

console.log('--------------')

nx.add('PageIndex', `
  <h1>{props.name}</h1>
  <h2>{title}</h2>
  <Body content="<h1>hello world.</h1>" />
`)

let customPage = nx.render('PageIndex', {name: 'xiaoming'})


console.log(customPage)