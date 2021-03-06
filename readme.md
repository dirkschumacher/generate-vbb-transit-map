# generate-vbb-transit-map

**Generate an SVG transit map for Berlin public transport.** Consumes data in the [JSON Graph Format](http://jsongraphformat.info), e.g. generated by [TransitmapSolver](https://github.com/dirkschumacher/TransitmapSolver.jl), which in turn consumed data from [generate-vbb-graph](https://github.com/derhuerst/generate-vbb-graph).

[![npm version](https://img.shields.io/npm/v/generate-vbb-transit-map.svg)](https://www.npmjs.com/package/generate-vbb-transit-map)
[![build status](https://img.shields.io/travis/derhuerst/generate-vbb-transit-map.svg)](https://travis-ci.org/derhuerst/generate-vbb-transit-map)
![ISC-licensed](https://img.shields.io/github/license/derhuerst/generate-vbb-transit-map.svg)
[![chat on gitter](https://badges.gitter.im/derhuerst.svg)](https://gitter.im/derhuerst)


## Installing

```shell
npm install -g generate-vbb-transit-map
```

or using [npx](https://github.com/zkat/npx#readme):

```shell
cat graph.json | npx generate-vbb-transit-map > map.svg
```


## Usage

From the command line:

```shell
Usage:
    generate-vbb-transit-map
Examples:
    cat graph.json | generate-vbb-transit-map > map.svg
```

---

As a library:

```js
const generateTransitMap = require('generate-vbb-transit-map')

const graph = require('./graph.json') // some data
const map = generate(graph)
```

`map.items` will be an array of [virtual-dom](https://github.com/Matt-Esch/virtual-dom#virtual-dom) SVG elements. `map.bbox` will be an array `[left, top, width, height]`.

Let's add styling and generate an SVG string:

```
const h = require('virtual-hyperscript-svg')
const toString = require('virtual-dom-stringify')

const css = `
	.line {
		stroke: #333;
		stroke-width: 1;
		fill: none;
		stroke-linejoin: round;
	}
	.station {
		stroke: none;
		fill: #333;
	}
`

const svg = h('svg', {
	width: bbox.width * 10,
	height: bbox.height * 10,
	viewBox: map.bbox.join(' ')
}, [
	h('style', {}, css),
	map.items
])

console.log(toString(svg))
```


## Contributing

If you have a question or have difficulties using `generate-vbb-transit-map`, please double-check your code and setup first. If you think you have found a bug or want to propose a feature, refer to [the issues page](https://github.com/derhuerst/generate-vbb-transit-map/issues).
