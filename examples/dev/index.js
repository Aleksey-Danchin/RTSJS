// import Grifon from './grifon'
import RTS from '../../core2/RTS'

// window.requestAnimationFrame = 
// 	window.requestAnimationFrame ||
// 	window.webkitRequestAnimationFrame ||
// 	window.mozRequestAnimationFrame	||
// 	window.oRequestAnimationFrame ||
// 	window.msRequestAnimationFrame ||
// 	function (callback) {
// 		setTimeout(callback, 1000 / 60)
// 	}

(async () => {
	const camera = new RTS.Camera(800, 800)
	const world = await new RTS.World('/examples/dev/world', camera)

	document.body.appendChild(world.$element)

	console.log(world)

	let angle = 0
	setInterval(() => {
		angle += 1

		camera.x = world.$canvas.width / 2 + world.$canvas.width / 4 * Math.cos(angle * Math.PI / 180)
		camera.y = world.$canvas.height / 2 + world.$canvas.height / 4 * Math.sin(angle * Math.PI / 180)
	}, 0)


	requestAnimationFrame(frameUpdate)
	function frameUpdate () {
		world.frameUpdate()

		requestAnimationFrame(frameUpdate)
	}

	// setInterval(() => {
	// 	world.frameUpdate()
	// }, 1000/60)
	// const binomImage = await RTS.FileLoader.loadImage('/examples/dev/binom.png')
	// const mapData = await RTS.FileLoader.loadJson('/examples/dev/map.json')

	// const rts = new RTS({
	// 	root: document.body,
	// 	width: 2000,
	// 	height: 2000
	// })

	// const tileset = new RTS.Tileset(
	// 	binomImage,
	// 	mapData.tilesets[mapData.tilesets.map(tileset => tileset.name).indexOf('binom')]
	// )

	// rts.world.init({
	// 	...mapData,
	// 	layerTileset: ['base', 'binom'],
	// 	tilesets: {
	// 		binom: tileset
	// 	}
	// })

	// const grifon1 = new Grifon()
	// const grifon2 = new Grifon({x: 1000, y: 1000})

	// rts.um.addUnit(grifon1)
	// rts.um.addUnit(grifon2)

	// setInterval(() => {
	// 	if (rts.$keyboard.arrowRight) {
	// 		rts.$world.$camera.x += 2
	// 	}

	// 	if (rts.$keyboard.arrowLeft) {
	// 		rts.$world.$camera.x -= 2
	// 	}

	// 	if (rts.$keyboard.arrowUp) {
	// 		rts.$world.$camera.y -= 2
	// 	}

	// 	if (rts.$keyboard.arrowDown) {
	// 		rts.$world.$camera.y += 2
	// 	}
	// })
})()
