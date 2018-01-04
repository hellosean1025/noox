# noox
The best template engine for JavaScript, base on React Jsx. It can be used instead of ejs, swig, jade, art-template template engine.

一个基于 react jsx 的模板引擎，她可以用来替代传统的 ejs, swig, jade, art 等模板引擎。

## Installation
```
npm install noox
```

## Basic Example

### Template code

Add template file
```
mkdir components && cd components
vi Head.jsx
```

Head.jsx:

```
<head>
	<title>{props.title}</title>
	<link rel="stylesheet" href="./css/style.css" />
</head>

```

### Node.js Code
```
const noox = require('noox');
const nx = new noox(path.resolve(__dirname, './components'));
let output = nx.render('Head', {title: 'hello, noox.'})
```
### Output
```
<head>
	<title>hello, noox.</title>
	<link rel="stylesheet" href="./css/style.css" />
</head>
```

## How it works
Given a folder structure like the following:
```
components/
  Header.jsx
  Body.jsx
  Layout.jsx
```

Running nodejs code: 
```
nx = new noox(path.resolve(__dirname, './components'))
```

It will create three component:

* Header
* Body
* Layout

## noox api 

### get(name)

Get a component by name

| args | Description |
| ---- | ----------- |
| name | The component name | 

### load(dir)

Get a component by name

| args | Description |
| ---- | ----------- |
| dir | The component directory path | 

### add(name, jsx)

Add a component 

| args | Description
| ---- | ----------- |
| name | The component name |
| jsx | The component content |

example: 

```
let jsx = fs.readFileSync('./page.jsx');
add('MyPage', jsx);

```

### render(name, props)

render a component 

| args | Description |
| ---- | ----------- |
| name | The component name |
| props | The component props |
