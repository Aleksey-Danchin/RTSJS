import Grifon from './grifon'
import RTS from '../../core/RTS'

(async () => {
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

	rts.world.init({
		...mapData,
		layerTileset: ['base', 'binom'],
		tilesets: {
			binom: tileset
		}
	})

	const grifon1 = new Grifon()
	const grifon2 = new Grifon({x: 1000, y: 1000})

	rts.um.addUnit(grifon1)
	rts.um.addUnit(grifon2)

	setInterval(() => {
		if (rts.$keyboard.arrowRight) {
			rts.$world.$camera.x += 2
		}

		if (rts.$keyboard.arrowLeft) {
			rts.$world.$camera.x -= 2
		}

		if (rts.$keyboard.arrowUp) {
			rts.$world.$camera.y -= 2
		}

		if (rts.$keyboard.arrowDown) {
			rts.$world.$camera.y += 2
		}
	})
})()
