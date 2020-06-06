const routes    = require('./config/routes')


const pugLoader = require('./loaders/pug.config')
pugLoader({
	mode: 'production',
	routesRes: routes.resources,
	routes: routes.build
})

const sassLoader = require('./loaders/sass.config')
sassLoader({
	mode: 'production',
	routesRes: routes.resources,
	routes: routes.build
})

const imgLoader = require('./loaders/img.config')
imgLoader({
	mode: 'production',
	routesRes: routes.resources,
	routes: routes.build
})

const spriteLoader = require('./loaders/sprite.config')
spriteLoader({
	mode: 'production',
	routesRes: routes.resources,
	routes: routes.build,
	spriteName: 'sprite.svg'
})

const rollupLoader = require('./loaders/rollup.config')
rollupLoader({
	mode: 'production',
	routesRes: routes.resources,
	routes: routes.build
})

const fontsLoader = require('./loaders/fonts.config')
fontsLoader({
	mode: 'production',
	routesRes: routes.resources,
	routes: routes.build
})
