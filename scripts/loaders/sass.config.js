const sass        = require('node-sass');
const fs          = require('fs')
const path        = require('path');
const chokidar    = require('chokidar');

const postcss       = require('postcss');
const autoprefixer  = require('autoprefixer')
const cssnano       = require('cssnano')({
	preset: 'default',
})
const createDirs  = require('../config/createDirs')

module.exports = function ({ mode, routes, routesRes }) {
	var dirCreator, buildPath, srcPath, variables;

	srcPath     = path.join(__dirname, '../..', routesRes.basedir, routesRes.style);
	buildPath   = path.join(__dirname, '../..', routes.basedir, routes.style);
	dirCreator  = createDirs(routes.basedir, routes.style)
	variables   = {
		'fontUrl($name: "")': function(name) {
			return new sass.types.String('../'+routes.fonts+'/'+name.getValue())
		},
		'imageUrl($name: "")': function(name) {
			return new sass.types.String('../'+routes.img+'/'+name.getValue())
		}
	}

	switch (mode) {
		case 'production': compile(); break;
		case 'development':
		default: watch()
	}

	function postcssRender(css, outFile, plugins) {
		postcss(plugins)
			.process(css, { from: undefined })
			.then(result => {
				fs.writeFileSync(outFile+'.css', result.css)
				if ( result.map ) {
					fs.writeFileSync(outFile+'.css.map', result.map)
				}
			})
	}

	function render(srcFile, buildFile) {
		dirCreator()

		sass.render({
			file: srcFile,
			outputStyle: 'expanded',
			functions: variables
		}, function(err, result) {
			if(err) return console.log('[SASS]: Has error', err)

			if (mode === 'development') {
				postcssRender(result.css, buildFile, [
					autoprefixer({
						overrideBrowserslist: [
							"last 1 version"
						]
					})
				])
			} else {
				postcssRender(result.css, buildFile, [
					autoprefixer
				])
				postcssRender(result.css, buildFile+'.min', [
					autoprefixer,
					cssnano
				])
			}
		});
	}


	function watch() {
		let watcher   = chokidar.watch(srcPath, {persistent: true});
		let srcFile   = path.join(srcPath, 'index.sass')
		let buildFile = path.join(buildPath, 'style')

		watcher.on('add', () => render(srcFile, buildFile))
		watcher.on('change', () => render(srcFile, buildFile))
		watcher.on('unlink', () => render(srcFile, buildFile))
		console.log('[Sass]: Watching...')
	}

	function compile() {
		let srcFile = path.join(srcPath, 'index.sass')
		let buildFile = path.join(buildPath, 'style')

		render(srcFile, buildFile)
		console.log('[Sass]: Compiled')
	}
}
