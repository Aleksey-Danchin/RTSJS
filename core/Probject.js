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
		probject.$index = 0
		probject.$order = []
		probject.$underCamera = false
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

	get actions () {
		return Object.keys(this.file.actions)
	}

	get frame () {
		return this.file.frames[this.$order[this.$index]]
	}

	get action () {
		return this.$action
	}

	set action (actionName) {
		const probject = this

		for (const action of probject.file.actions) {
			if (action.name === actionName) {
				probject.$action = action
				probject.$order = action.order
				probject.$index = probject.$order[0]
				probject.$width = probject.frame[2]
				probject.$height = probject.frame[3]

				probject.emit('actionUpdate', probject)

				if (probject.$interval) {
					clearInterval(probject.$interval)
				}

				probject.$interval = setInterval(() => {
					probject.$index = ++probject.$index % probject.$order.length
					probject.emit('frameUpdate', probject)
				}, probject.action.duration / probject.$order.length)
				
				return actionName
			}
		}

		return actionName
	}

	draw (context, dx, dy) {
		const probject = this

		context.drawImage(
			probject.image,
			probject.frame[0], probject.frame[1], probject.frame[2], probject.frame[3],
			probject.$x - dx, probject.$y - dy, probject.frame[2], probject.frame[3]
		)
	}
}

Probject.prototype.image = null
Probject.prototype.file = null

export default Probject
