import Grifon from './Grifon'
import RTS from '../../core/RTS'

(async () => {
	const binomImage = await RTS.FileLoader.loadImage('/examples/dev/binom.png')
	const image = await RTS.FileLoader.loadImage('/examples/dev/grifon.png')
	const file = await RTS.FileLoader.loadJson('/examples/dev/grifon.json')
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

	rts.world.init({
		...mapData,
		layerTileset: ['base', 'binom'],
		tilesets: {
			binom: tileset
		}
	})

	const grifon = new Grifon()

	// const probject1 = new RTS.Probject({
	// 	image, file,
	// 	action: 'wait'
	// })

	// const probject2 = new RTS.Probject({
	// 	image, file,
	// 	action: 'wait'
	// })

	// probject2.$x = probject2.$y = 50

	// rts.$layer.addProbject(probject1)
	// rts.$layer.addProbject(probject2)

	setInterval(() => {
		if (rts.$keyboard.arrowRight) {
			rts.$world.$camera.x += 1
		}

		if (rts.$keyboard.arrowLeft) {
			rts.$world.$camera.x -= 1
		}

		if (rts.$keyboard.arrowUp) {
			rts.$world.$camera.y -= 1
		}

		if (rts.$keyboard.arrowDown) {
			rts.$world.$camera.y += 1
		}
	})
})()
