const routes = require('./config/routes')


const pugLoader = require('./loaders/pug.config')
pugLoader({
	mode: 'development',
	routesRes: routes.resources,
	routes: routes.server
})

const sassLoader = require('./loaders/sass.config')
sassLoader({
	mode: 'development',
	routesRes: routes.resources,
	routes: routes.server
})

const imgLoader = require('./loaders/img.config')
imgLoader({
	mode: 'development',
	routesRes: routes.resources,
	routes: routes.server
})

const spriteLoader = require('./loaders/sprite.config')
spriteLoader({
	mode: 'development',
	routesRes: routes.resources,
	routes: routes.server,
	spriteName: 'sprite.svg'
})

const rollupLoader = require('./loaders/rollup.config')
rollupLoader({
	mode: 'development',
	routesRes: routes.resources,
	routes: routes.server
})

const fontsLoader = require('./loaders/fonts.config')
fontsLoader({
	mode: 'development',
	routesRes: routes.resources,
	routes: routes.server
})

const serverLoader = require('./loaders/serve.config')
serverLoader({
	port: 3400,
	routes: routes.server
})
