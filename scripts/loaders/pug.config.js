const fs          = require('fs')
const path        = require('path');
const pug         = require('pug')
const chokidar    = require('chokidar');

const createDirs  = require('../config/createDirs')

process.env.APP_PUBLIC_PATH = process.env.APP_PUBLIC_PATH ? process.env.APP_PUBLIC_PATH : '/' 

module.exports = function ({ mode, routes, routesRes }) {
	var dirCreator, buildPath, srcPath, variables;

	srcPath     = path.join(__dirname, '../..', routesRes.basedir, routesRes.pages);
	buildPath   = path.join(__dirname, '../..', routes.basedir, routes.pages);
	dirCreator  = createDirs(routes.basedir, routes.pages)
	variables   = {
		devMode: mode == 'development',
		script(str) {
			if (!variables.devMode) return path.join(process.env.APP_PUBLIC_PATH, routes.js, str+'.min.js')
			return path.join(process.env.APP_PUBLIC_PATH, routes.js, str+'.js')
		},
		style(str) {
			if (!variables.devMode) return path.join(process.env.APP_PUBLIC_PATH, routes.style, str+'.min.css')
			return path.join(process.env.APP_PUBLIC_PATH, routes.style, str+'.css')
		},
		image(str) {
			return path.join(process.env.APP_PUBLIC_PATH, routes.img, str)
		},
		sprite(str) {
			return path.join(process.env.APP_PUBLIC_PATH, routes.sprite, 'sprite.svg' + '#' + str)
		},
		favicon(str) {
			return path.join(process.env.APP_PUBLIC_PATH, routes.favicon, str)
		},
		route(str) {
			return path.join(process.env.APP_PUBLIC_PATH, str)
		},
		files: {
			sass: ['style'],
			js: ['script']
		},

		productsHomeWoman: [
			{
				stock: 'in',
				mark: 'new',
				image: 'products/woman-1.png'
			},
			{
				oldPrice: true,
				mark: 'sale',
				stock: 'order',
				image: 'products/woman-2.png'
			},
			{
				oldPrice: true,
				mark: 'sale',
				stock: 'out',
				image: 'products/woman-3.png'
			},
			{
				stock: 'in',
				image: 'products/woman-4.png'
			},
			{
				stock: 'in',
				image: 'products/woman-5.png'
			},
			{
				stock: 'in',
				image: 'products/woman-6.png'
			},
		],
		productsHomeMan: [
			{
				stock: 'in',
				mark: 'new',
				image: 'products/man-1.png'
			},
			{
				oldPrice: true,
				mark: 'sale',
				stock: 'order',
				image: 'products/man-2.png'
			},
			{
				oldPrice: true,
				mark: 'sale',
				stock: 'out',
				image: 'products/man-3.png'
			},
			{
				stock: 'in',
				image: 'products/man-4.png'
			},
			{
				stock: 'in',
				image: 'products/man-5.png'
			},
			{
				stock: 'in',
				image: 'products/man-6.png'
			},
		]
	}

	switch (mode) {
		case 'development': watch(); break;
		case 'production': fullcompile(); break;
		default: watch()
	}

	function addPublicRoute(build, filepath) {
		return path.join(build, path
			.basename(filepath)
			.replace(/\.pug/, '.html')
		)
	}

	function compile(srcPath) {
		let pubPath = addPublicRoute(buildPath, srcPath)
		let fn = pug.compileFile(srcPath, { pretty: true })
		dirCreator()
		fs.writeFileSync(pubPath, fn(variables), function () {});
	}


	function fullcompile() {
		fs.readdirSync(srcPath)
			.filter(fileName => fileName.endsWith('.pug'))
			.map(page => compile(path.join(srcPath, page)))

		console.log('[Pug]: Compiled')
	}

	function watch() {
		chokidar.watch(srcPath+'/**/*.pug', {persistent: true})
			.on('add', fullcompile)
			.on('change', fullcompile)
			.on('unlink', unlink)
			.on('error', () => console.log('[Pug]: Error in watch'));

		function unlink(filepath) {
			let pubPath = addPublicRoute(buildPath, filepath)

			if (fs.existsSync(pubPath)) {
				fs.unlinkSync(pubPath)
			}
		}

		console.log('[Pug]: Watching...')
	}
}
