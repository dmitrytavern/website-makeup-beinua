const fs          = require('fs')
const path        = require('path')
const chokidar    = require('chokidar');
const SVGSpriter  = require('svg-sprite')

const config      = {
	dest: '.', // Main output directory
	mode: {
		symbol: {
			inline: true,
		}, // Create a «symbol» sprite
	},
	shape: { // SVG shape related options
		id: { // SVG shape ID related options
			separator: '', // Separator for directory name traversal
			pseudo: '-' // File name separator for shape states (e.g. ':hover')
		},
		dimension: {// Dimension related options
			maxWidth: 2000, // Max. shape width
			maxHeight: 2000, // Max. shape height
			precision: 2, // Floating point precision
			attributes: false, // Width and height attributes on embedded shapes
		},
		spacing: { // Spacing related options
			padding: 0, // Padding around all shapes
			box: 'content' // Padding strategy (similar to CSS `box-sizing`)
		},
		transform: ['svgo'], // List of transformations / optimizations
	},
	svg: { // General options for created SVG files
		xmlDeclaration: false, // Add XML declaration to SVG sprite
		doctypeDeclaration: false, // Add DOCTYPE declaration to SVG sprite
		namespaceIDs: true, // Add namespace token to all IDs in SVG shapes
		namespaceClassnames: true, // Add namespace token to all CSS class names in SVG shapes
		dimensionAttributes: false // Width and height attributes on the sprite
	},
	variables: {}
}

const createDirs  = require('../config/createDirs')

module.exports = function ({ mode, routes, routesRes, spriteName }) {
	var dirCreator, buildPath, srcPath;

	srcPath      = path.join(__dirname, '../..', routesRes.basedir, routesRes.sprite);
	srcLocalPath = path.join(routesRes.basedir, routesRes.sprite);
	buildPath    = path.join(__dirname, '../..', routes.basedir, routes.sprite);
	dirCreator   = createDirs(routes.basedir, routes.sprite)

	switch (mode) {
		case 'production': createSVG(); console.log('[Svg]: Compiled'); break;
		case 'development':
		default: watch()
	}


	function compile(spriter) {
		spriter.compile(function(error, result) {
			for (var mode in result) {
				for (var resource in result[mode]) {
					fs.writeFileSync(path.join(buildPath, spriteName), result[mode][resource].contents);
				}
			}
		});
	}


	function createSVG() {
		const spriter = new SVGSpriter(config)
		const svgs    = fs.readdirSync(srcPath).filter(fileName => fileName.endsWith('.svg'))
		dirCreator()

		for (let svg of svgs) {
			let route       = path.join(srcPath, svg);
			let localRoute  = path.join(srcLocalPath, svg);

			spriter.add(
				route,
				localRoute,
				fs.readFileSync(localRoute, {encoding: 'utf-8'})
			);
		}

		compile(spriter)
	}

	function watch() {
		const watcher = chokidar.watch(srcPath, {persistent: true});

		watcher.on('add', createSVG)
		watcher.on('change', createSVG)
		watcher.on('unlink', createSVG)

		console.log('[Svg]: Watching...')
	}
}


