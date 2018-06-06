import EventEmitter from 'events'

const PARAMS_DEFAULT = {
	x: 0, y: 0
}

class Probject extends EventEmitter {
	constructor (args) { super()
		const probject = this
		const {x, y} = {
			...PARAMS_DEFAULT,
			...args,
		}

		probject.$x = x
		probject.$y = y
		probject.$width = 0
		probject.$height = 0

		probject.$action = null
		probject.$frameIndex = 0
		probject.$frames = []
		probject.$underCamera = false

		probject.action = probject.actionDefault
	}

	get underCamera () {
		return this.$underCamera
	}

	set underCamera (underCamera) {
		const probject = this

		if (probject.$underCamera != underCamera) {
			probject.emit('underCameraUpdate', probject)
		}

		return probject.$underCamera = underCamera
	}

	get x () {
		return this.x
	}

	set x (x) {
		const probject = this

		probject.$x = x
		probject.emit('coordinatesUpdate', probject)
		return x
	}

	get y () {
		return this.y
	}

	set y (y) {
		const probject = this

		probject.$y = y
		probject.emit('coordinatesUpdate', probject)
		return y
	}

	get frame () {
		return this.$frames[this.$frameIndex]
	}

	get action () {
		return this.$action
	}

	set action (actionName) {
		const probject = this

		if (!Object.keys(probject.actions).includes(actionName)) {
			return actionName
		}

		const action = probject.actions[actionName]

		probject.$action = actionName
		probject.$frames = action.frames
		probject.$frameIndex = 0
		probject.$width = action.width
		probject.$height = action.height

		if (probject.$timeout) {
			clearTimeout(probject.$timeout)
		}

		probject.emit('frameUpdate', probject)
		probject.$timeout = setTimeout(() => frameUpdateTimeout(probject), probject.frame[4])

		return actionName
	}

	draw (context, dx, dy) {
		const probject = this

		const [sx, sy, scalex, scaley] = probject.frame

		context.drawImage(
			probject.image,
			sx, sy, probject.$width, probject.$height,
			probject.$x - dx, probject.$y - dy, probject.$width, probject.$height
		)
	}
}

Probject.prototype.image = null
Probject.prototype.actions = null
Probject.prototype.actionDefault = null

export default Probject

function frameUpdateTimeout (probject) {
	probject.$frameIndex = ++probject.$frameIndex % probject.$frames.length
	probject.emit('frameUpdate', probject)
	probject.$timeout = setTimeout(() => frameUpdateTimeout(probject), probject.frame[4])
}