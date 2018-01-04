const noox = require('../src');
const path = require('path');
let nx = new noox(path.resolve(__dirname, 'components'));

let layout = nx.render('Layout', {
  title: 'layout',
  page: {
    content: 'hello layout....'
  }
})

console.log(layout)

console.log('--------------')

nx.add('PageIndex', `
  <Body content="<h1>hello world.</h1>" />
`)

let customPage = nx.render('PageIndex')
console.log(customPage)