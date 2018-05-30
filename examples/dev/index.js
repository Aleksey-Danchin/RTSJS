import RTS from '../../core/RTS'

(async () => {
	const rts = new RTS({
		root: document.body,
		width: 900,
		height: 900
	})

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

	const image = await RTS.FileLoader.loadImage('/examples/dev/grifon.png')
	const file = await RTS.FileLoader.loadJson('/examples/dev/grifon.json')

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
})()
