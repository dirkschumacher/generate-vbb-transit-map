#!/usr/bin/env node
'use strict'

const minimist = require('minimist')
const h = require('virtual-hyperscript-svg')
const toString = require('virtual-dom-stringify')

const pkg = require('./package.json')
const generate = require('.')

const argv = minimist(process.argv.slice(2))

if (argv.help || argv.h) {
	process.stdout.write(`
Usage:
    generate-vbb-transit-map
Examples:
    cat graph.json | generate-vbb-transit-map > map.svg
\n`)
	process.exit(0)
}

if (argv.version || argv.v) {
	process.stdout.write(`generate-vbb-transit-map v${pkg.version}\n`)
	process.exit(0)
}

const showError = (err) => {
	console.error(err)
	process.exit(1)
}

const styles = h('style', {}, `
	.line {
		stroke: #333;
		stroke-width: .09;
		fill: none;
		stroke-linejoin: round;
		stroke-linecap: round;
	}
	.station {
		stroke: none;
	}
	.transit {
		stroke: #555;
		stroke-width: .05;
		fill: #fff;
	}
`)

let input = ''
process.stdin
.on('error', showError)
.on('data', (d) => {
	input += d.toString('utf8')
})
.once('end', () => {
	try {
		const graph = JSON.parse(input)

		const {items, bbox} = generate(graph)

		// padding
		const l = bbox.left - .5
		const t = bbox.top - .5
		const w = bbox.width + 1
		const ht = bbox.height + 1

		const svg = h('svg', {
			width: w * 20,
			height: ht * 20,
			viewBox: [l, t, w, ht].join(' ')
		}, [
			styles,
			h('g', {transform: `translate(0,${bbox.height}) scale(1,-1)`}, items)
		])

		process.stdout.write(toString(svg))
	} catch (err) {
		return showError(err)
	}
})
