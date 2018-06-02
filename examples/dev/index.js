import RTS from '../../core/RTS'

(async () => {
	const image = await RTS.FileLoader.loadImage('/examples/dev/grifon.png')
	const file = await RTS.FileLoader.loadJson('/examples/dev/grifon.json')
	const binomImage = await RTS.FileLoader.loadImage('/examples/dev/binom.png')
	const mapData = await RTS.FileLoader.loadJson('/examples/dev/map.json')

	const rts = new RTS({
		root: document.body,

		width: 900,
		height: 900,

		world: {
			width: 900,
			height: 900,
			top: 0,
			left: 0
		},

		sources: {
			images: [
				{ name: 'grifon', src: '/examples/dev/grifon.png' },
				{ name: 'binom', src: '/examples/dev/binom.png' }
			],
			jsons: [
				{ name: 'map', src: '/examples/dev/map.json' },
				{ name: 'grifon', src: '/examples/dev/grifon.json' }
			],
			tilesets: [
				// { name: 'binom', image: 'binom', data: ({ jsons }) => jsons.get('map').tilesets[jsons.get('map').tilesets.map(tileset => tileset.name).indexOf('binom')] }
				{ name: 'binom', image: 'binom', data: ({ jsons }) => jsons.get('map').tilesets.filter(tileset => tileset.name === 'binom')[0] }
			],
			worlds: [
				{ name: 'world', tilesets: { base: 'binom' }, data: ({ jsons }) => jsons.get('map')}
			]
		}
	})

	// const tileset = new RTS.Tileset(
	// 	binomImage,
	// 	mapData.tilesets[mapData.tilesets.map(tileset => tileset.name).indexOf('binom')]
	// )

	// const world = new RTS.World({
	// 	data: Object.assign({}, mapData, {
	// 		tilesets: {
	// 			binom: tileset
	// 		}
	// 	}),
	// 	layerTileset: ['base', 'binom'],
	// 	width: 900,
	// 	height: 900
	// })
	// rts.$element.appendChild(world.$element)

	// const layer = new RTS.Layer({
	// 	width: 900,
	// 	height: 900
	// })
	// rts.$element.appendChild(layer.$element)

	// const selector = new RTS.Selector({
	// 	width: 900,
	// 	height: 900
	// })
	// rts.$element.appendChild(selector.$element)

	// const probject1 = new RTS.Probject({
	// 	image, file,
	// 	action: 'wait'
	// })

	// const probject2 = new RTS.Probject({
	// 	image, file,
	// 	action: 'wait'
	// })

	// probject2.$x = probject2.$y = 50

	// layer.addProbject(probject1)
	// layer.addProbject(probject2)

	// const keyboard = new RTS.Keyboard()
	// setInterval(() => {
	// 	if (keyboard.arrowRight) {
	// 		world.$camera.x += 1
	// 	}

	// 	if (keyboard.arrowLeft) {
	// 		world.$camera.x -= 1
	// 	}

	// 	if (keyboard.arrowUp) {
	// 		world.$camera.y -= 1
	// 	}

	// 	if (keyboard.arrowDown) {
	// 		world.$camera.y += 1
	// 	}
	// })



	
	// keyboard.on('keydown', event => {
	// 	event.preventDefault()
	// 	console.log(JSON.stringify(keyboard))
	// 	if (keyboard.arrowRight) {
	// 		world.$camera.x += 1
	// 	}
	// })
})()
