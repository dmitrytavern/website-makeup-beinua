const bs = require('browser-sync').create();

module.exports = function ({ routes, port }) {
	bs.init({
		port,
		server: routes.basedir,
		files: routes.basedir
	});
}

