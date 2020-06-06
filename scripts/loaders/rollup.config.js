const path = require('path');

const rollup      = require('rollup');
const sourcemaps  = require('rollup-plugin-sourcemaps')
const babel       = require('rollup-plugin-babel')
const terser      = require('rollup-plugin-terser').terser


module.exports = function ({ mode, routes, routesRes }) {
	var scripts = [
		{
			path: path.join(routesRes.basedir, routesRes.js, 'index.js'),
			name: 'script'
		}
	]

	switch (mode) {
		case 'production': compile(); break;
		case 'development':
		default: watch()
	}

	function outputRollupConfig(filename, name, plugins = [], format = 'iife', map = true) {
		return {
			file: path.join(routes.basedir, routes.js, filename),
			sourcemap: map,
			format,
			name,
			plugins
		}
	}


	function watch() {
		for (let scriptName of scripts) {
			rollup.watch({
				input: scriptName.path,
				output: outputRollupConfig(scriptName.name+'.js', scriptName.name),
				plugins: [
					sourcemaps()
				]
			});
		}
		console.log('[Rollup]: Watching...')
	}

	async function compile() {
		for (let scriptName of scripts) {
			const bundle = await rollup.rollup({
				input: scriptName.path,
				plugins: [
					babel({
						exclude: 'node_modules/**',
						babelrc: false,
						configFile: './scripts/config/babel.config.js',
						sourceMaps: true,
						presets: [['@babel/preset-env']]
					}),
					sourcemaps()
				]
			});

			await bundle.write(outputRollupConfig(scriptName.name+'.js', scriptName.name));
			await bundle.write(outputRollupConfig(scriptName.name+'.min.js', scriptName.name, [terser()]));
			await console.log('[Rollup]: Compiled')
		}
	}
}
