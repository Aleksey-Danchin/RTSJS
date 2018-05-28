class Layer {
	constructor (params) {
		const layer = this

		layer.$element = document.createElement('canvas')
		layer.$context = layer.$element.getContext('2d')

		layer.$element.width = params.width
		layer.$element.height = params.height

		layer.$probjects = new Set()

		layer.coordinatesUpdateHandler = layer.coordinatesUpdateHandler.bind(this)
		layer.actionUpdateHandler = layer.actionUpdateHandler.bind(this)
		layer.frameUpdateHandler = layer.frameUpdateHandler.bind(this)
	}

	get probjects () {
		return Array.from(this.$probjects)
	}

	clear () {
		const layer = this

		layer.$element.width = layer.$element.width
	}

	addProbject (probject) {
		const layer = this

		layer.$probjects.add(probject)
		probject.on('coordinatesUpdate', layer.coordinatesUpdateHandler)
		probject.on('actionUpdate', layer.actionUpdateHandler)
		probject.on('frameUpdate', layer.frameUpdateHandler)
	}

	removeProbject (probject) {
		const layer = this

		if (!layer.$probjects.has(probject)) {
			return false
		}

		layer.$probjects.delete(probject)

		probject.removeListener('coordinatesUpdateHandler', layer.coordinatesUpdateHandler)
		probject.removeListener('actionUpdate', layer.actionUpdateHandler)
		probject.removeListener('frameUpdate', layer.frameUpdateHandler)

		return true
	}

	frameUpdateHandler (probject) {
		const layer = this

		layer.clear()

		for (const probject of layer.probjects) {
			const [x, y, width, height] = probject.frame

			layer.$context.drawImage(
				probject.$image,
				x, y, width, height,
				probject.$x, probject.$y, width, height
			)
		}

		return true
	}

	coordinatesUpdateHandler (probject) {
		const layer = this
	}

	actionUpdateHandler (probject) {
		const layer = this
	}
}

export default Layer
