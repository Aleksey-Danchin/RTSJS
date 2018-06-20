import RTS from '../../core2/RTS'

(async () => {
	const party = new RTS({
		camera: {
			width: 500,
			height: 500
		},

		world: '/examples/dev/world',
		units: {
			Grifon: '/examples/dev/grifon'
		}
	})

	party.$initPromise.then(() => {
		const unit = new party.$units.Grifon()
	})

	party.tickBefore = () => {
		if (RTS.Keyboard.arrowRight) party.$camera.x += 5
		if (RTS.Keyboard.arrowLeft) party.$camera.x -= 5
		if (RTS.Keyboard.arrowUp) party.$camera.y -= 5
		if (RTS.Keyboard.arrowDown) party.$camera.y += 5
	}

	document.body.appendChild(party.$element)

	// const camera = new RTS.Camera(800, 800)
	// const world = await new RTS.World('/examples/dev/world', camera)

	// const Grifon = await RTS.Unit('/examples/dev/grifon')

	// const unitCanvas = new RTS.Canvas({
	// 	width: world.$canvas.width,
	// 	height: world.$canvas.height
	// })

	// const grifon = new Grifon(unitCanvas.$context, camera)
	// grifon.$x = 500
	// grifon.$y = 500

	// document.body.appendChild(world.$element)
	// world.$element.appendChild(unitCanvas.$element)

	// let prevTimestamp = 0
	// requestAnimationFrame(frameUpdate)
	// function frameUpdate (timestamp) {
	// 	const diffTimestamp = timestamp - prevTimestamp
	// 	prevTimestamp = timestamp

	// 	unitCanvas.$element.style.left = parseInt(-camera.$x) + 'px'
	// 	unitCanvas.$element.style.top = parseInt(-camera.$y) + 'px'

	// 	world.frameUpdate(diffTimestamp)
	// 	grifon.frameUpdate(diffTimestamp)
	// 	RTS.Keyboard.frameUpdate(diffTimestamp)

	// 	if (camera.$isChange) {
	// 		grifon.$isChange = true
	// 	}

	// 	if (RTS.Keyboard.arrowRight) camera.x += 5
	// 	if (RTS.Keyboard.arrowLeft) camera.x -= 5
	// 	if (RTS.Keyboard.arrowUp) camera.y -= 5
	// 	if (RTS.Keyboard.arrowDown) camera.y += 5

	// 	if (grifon.$isChange) {
	// 		unitCanvas.clear()
	// 		grifon.draw(unitCanvas.$context, camera.$x, camera.$y)
	// 		grifon.$isChange = false
	// 	}

	// 	requestAnimationFrame(frameUpdate)
	// }
})()
