const fs        = require('fs')
const path      = require('path');
const rimraf    = require("rimraf");
const chokidar  = require('chokidar');
const glob      = require("glob")

const createDirs  = require('../config/createDirs')

const imagemin = require('imagemin');
const imageminJpegtran = require('imagemin-jpegtran');
const imageminPngquant = require('imagemin-pngquant');

module.exports = function ({ mode, routes, routesRes }) {
	var dirCreator, buildPath, srcPath;

	srcPath     = path.join(routesRes.basedir, routesRes.img);
	buildPath   = path.join(routes.basedir, routes.img);
	dirCreator  = createDirs(routes.basedir, routes.img)

	switch (mode) {
		case 'production': compile(); break;
		case 'development':
		default: watch()
	}

	function replaceRoute(filepath) {
		return path.dirname(filepath)
			.replace('src/img/', '')
			.replace('src/img', '')
	}

	function createPublicRoute(filepath) {
		let folders = replaceRoute(filepath).split("/")
		let route   = buildPath
		dirCreator()
		for (let folder of folders) {
			route = path.join(route, folder)
			if (!fs.existsSync(route)) {
				fs.mkdirSync(route);
			}
		}
	}

	function removeDir(dir) {
		rimraf.sync(dir)
	}

	function removeEmptyDir(dir) {
		fs.readdir(dir, ((err, files) => {
			let remove = false
			if (files === undefined) {
				remove = true
			} else if (files[0] === undefined) {
				remove = true
			} else if (!fs.existsSync(dir + '/' + files[0])) {
				remove = true
			}

			if (remove) removeDir(dir)
		}))
	}

	function removePublicRoute(filepath) {
		let dirs = replaceRoute(filepath).split('/').reverse()
		let mainPath = path.join(buildPath, replaceRoute(filepath))

		for (let dir of dirs) {
			if (mainPath === buildPath) break

			removeEmptyDir(mainPath)

			mainPath = mainPath.slice(0, -dir.length - 1)
		}
	}

	function removePublicFile(filepath) {
		let filePath = replaceRoute(filepath)
		let fileName = path.basename(filepath)
		let fullPath = path.join(buildPath, filePath, fileName)

		if (fs.existsSync(fullPath)) rimraf.sync(fullPath)
	}

	function moveImage(filepath) {
		let imgPath   = replaceRoute(filepath)
		let imgName   = path.basename(filepath)

		if (mode === 'development') {
			let fullPath  = path.join(buildPath, imgPath, imgName)

			fs.copyFile(filepath, fullPath, (err) => {
				if (err) throw err;
			});
		} else {
			let fullPath  = path.join(buildPath, imgPath)

			imagemin([filepath], {
				destination: fullPath,
				plugins: [
					imageminJpegtran(),
					imageminPngquant({
						quality: [0.7, 0.8]
					})
				]
			})
		}
	}


	function watch() {
		var watcher = chokidar.watch(srcPath, {
			ignored: /(sprite|favicon)/,
			persistent: true
		});

		watcher.on('add', function (filepath) {
			dirCreator()
			createPublicRoute(filepath)
			moveImage(filepath)
		})

		watcher.on('unlink', function (filepath) {
			dirCreator()
			removePublicFile(filepath)
			removePublicRoute(filepath)
		})

		watcher.on('error', function (error) {
			console.error('Error happened', error);
		})

		console.log('[Img]: Watching...')
	}

	function compile() {
		const filesPath = path.join(srcPath, '/**/*.*')
		const files = glob.globSync(filesPath)

		for (let file of files) {
			createPublicRoute(file)
			moveImage(file)
		}

		console.log('[Img]: Compiled')
	}
}
