const noox = require('../src');
const path = require('path');
let nx = new noox(path.resolve(__dirname, 'components'));

let a = nx.render('Layout', {
  title: 'hello world',
  page: {
    content: '---- content ----'
  }
})

console.log(a)