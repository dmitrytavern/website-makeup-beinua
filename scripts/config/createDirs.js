const fs        = require('fs')
const path = require('path');

function createDir(dir) {
	if (!fs.existsSync(dir)) {
		fs.mkdirSync(dir);
	}
}

function createDirsPath(basedir, dirs) {
	let folders = dirs.split("/")
	let route   = basedir

	for (let folder of folders) {
		route = path.join(route, folder)
		createDir(route)
	}
}

module.exports = function (basedir, dirs = []) {
	return function create() {
		createDir(basedir)

		if (typeof dirs === "string") {

			createDirsPath(basedir, dirs)
			createDir(path.join(basedir, dirs))

		} else if (typeof dirs === "object") {
			for (let dir of dirs) {

				createDirsPath(basedir, dir)
				createDir(path.join(basedir, dir))

			}
		} else {
			console.log('Don`t support extension')
		}
	}
}
