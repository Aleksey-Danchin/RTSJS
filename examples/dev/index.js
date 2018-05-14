import RTS from '../../core/RTS'

(async () => {
	const rts = new RTS({
		root: document.body,
		width: 300,
		height: 300
	})

	rts.$fileLoader.addImage('grifon', '/examples/dev/grifon.png')
	rts.$fileLoader.addJson('grifon', '/examples/dev/grifon.json')
	await rts.$fileLoader.load()

	const layer = rts.getLayer('base')
	
	// const circle = RTS.Figure.getCircle()
	// layer.draw(circle)

	const probject = new RTS.Probject(rts.$fileLoader.getImage('grifon'), rts.$fileLoader.getJson('grifon'))
	layer.addProbject(probject)
	// probject.draw(layer.$context, 0, 0, 84, 84, 0, 0, 84, 84)
})()
