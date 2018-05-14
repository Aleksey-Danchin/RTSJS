import EventEmitter from 'events'

class SuperProbject extends EventEmitter {
	constructor (image, json, params = {}) {
		super()
		const probject = this

		probject.$image = image
		probject.$json = json

		probject.$width = params.width || probject.$json.frame.width
		probject.$height = params.height || probject.$json.frame.height
		probject.$x = params.x || 0
		probject.$y = params.y || 0

		probject.$anchor = {}
		probject.$anchor.x = 0
		probject.$anchor.y = 0

		probject.$selectable = true
		probject.$selected = false
		probject.$draw = true

		probject.$lyaer = null
		probject.$action = ''
		probject.$frameNumber = null
		probject.$frames = []

		// const rowSize = (image.width - json.padding[1] - json.padding[3]) / 
		// for (let rowIndex = 0; )

		probject.action = 'wait'
	}

	get action () {
		return this.$action
	}

	set action (action) {
		const probject = this

		if (!probject.$json.actions.hasOwnProperty(action)) {
			return false
		}

		probject.$action = action
		probject.$frameNumber = 0

		const actionData = probject.$json.actions[action]
		const timeout = actionData.duration / actionData.frames.length

		if (actionData.frames.length === 1) {
			// TODO: ???
			return true
		}

		probject.$actionInterval = setInterval(() => probject.emit('frameUpdate', this), timeout)
		return true
	}

	setLayer (lyaer) {
		const probject = this

		probject.$lyaer = lyaer
		return true
	}

	drawFrameByNumber (context, frameNumber) {
		const probject = this
		const frameData = probject.$json.frame
		const frameXNumber = frameNumber / probject.$json

		// probject.drawFrame(
		// 	context,

		// 	frameData.padding[1] + 

		// 	frameData.width,
		// 	frameData.height,
		// )
	}

	drawFrame (context, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight) {
		const probject = this
		context.drawImage(probject.$image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)
	}
}

export default Probject
