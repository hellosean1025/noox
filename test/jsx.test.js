const test = require('ava');
const jsx = require('../src/jsx');
const ReactDOMServer = require('react-dom/server');
const React = require('react');

test('wrap', t => {
  t.is(jsx.wrap('<h1>hello</h1>'), `<React.Fragment><h1>hello</h1></React.Fragment>`);
})

test('parse', t => {
  let code = `<head>
    <title>{title}</title>
    <link rel="stylesheet" href="./css/style.css" />
  </head>`

  t.is(jsx.parse(code), `React.createElement(
    "head",
    null,
    React.createElement(
        "title",
        null,
        title
    ),
    React.createElement("link", { rel: "stylesheet", href: "./css/style.css" })
);`);
})


test('toComponent', t=>{
  let code = `<head>
    <title id={props.id}>{title}</title>
    <link rel="stylesheet" href="./css/style.css" />
  </head>`;

  let Component = jsx.toComponent('head', code, {title: 'noox'});
  let result = ReactDOMServer.renderToStaticMarkup(React.createElement(Component, {id: 'title'}))
  t.is(result, '<head><title id="title">noox</title><link rel="stylesheet" href="./css/style.css"/></head>');

})