import RTS from '../../core/RTS'

(async () => {
	const image = await RTS.FileLoader.loadImage('/examples/dev/grifon.png')
	const file = await RTS.FileLoader.loadJson('/examples/dev/grifon.json')
	const binomImage = await RTS.FileLoader.loadImage('/examples/dev/binom.png')
	const mapData = await RTS.FileLoader.loadJson('/examples/dev/map.json')

	const rts = new RTS({
		root: document.body,
		width: 900,
		height: 900
	})

	const tileset = new RTS.Tileset(
		binomImage,
		mapData.tilesets[mapData.tilesets.map(tileset => tileset.name).indexOf('binom')]
	)

	const world = new RTS.World({
		data: Object.assign({}, mapData, {
			tilesets: {
				binom: tileset
			}
		}),
		layerTileset: ['base', 'binom'],
		width: 900,
		height: 900
	})
	rts.$element.appendChild(world.$element)

	const layer = new RTS.Layer({
		width: 900,
		height: 900
	})
	rts.$element.appendChild(layer.$element)

	const selector = new RTS.Selector({
		width: 900,
		height: 900
	})
	rts.$element.appendChild(selector.$element)

	const probject1 = new RTS.Probject({
		image, file,
		action: 'wait'
	})

	const probject2 = new RTS.Probject({
		image, file,
		action: 'wait'
	})

	probject2.$x = probject2.$y = 50

	layer.addProbject(probject1)
	layer.addProbject(probject2)

	const keyboard = new RTS.Keyboard()
	setInterval(() => {
		if (keyboard.arrowRight) {
			world.$camera.x += 1
		}

		if (keyboard.arrowLeft) {
			world.$camera.x -= 1
		}

		if (keyboard.arrowUp) {
			world.$camera.y -= 1
		}

		if (keyboard.arrowDown) {
			world.$camera.y += 1
		}
	})
	// keyboard.on('keydown', event => {
	// 	event.preventDefault()
	// 	console.log(JSON.stringify(keyboard))
	// 	if (keyboard.arrowRight) {
	// 		world.$camera.x += 1
	// 	}
	// })
})()
