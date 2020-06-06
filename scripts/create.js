const fs = require('fs')
const path = require('path');
const routes = require('./config/routes')
var ncp = require('ncp').ncp;


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


function createFolders() {
	let res = routes.resources

	createDir(res.basedir)
	for (let [key, value] of Object.entries(res)) {
		if (key !== 'basedir') createDirsPath(res.basedir, value)
	}
}

function createFiles(template) {
	ncp('./scripts/template/', './src', function (err) {
		if (err) {
			return console.error(err);
		}
		console.log('[Accelerator]: Project created!');
	});
}


createFolders()
createFiles()
