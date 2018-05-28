import EventEmitter from 'events'

class Probject extends EventEmitter {
	constructor (params) { super()
		const probject = this

		probject.$x = 0
		probject.$y = 0

		probject.$image = params.image
		probject.$file = params.file

		probject.$action = null
		probject.$index = 0
		probject.$order = []
		probject.action = params.action

		probject.$interval = setInterval(() => {
			probject.$index = ++probject.$index % probject.$order.length
			probject.emit('frameUpdate', probject)
		}, probject.action.duration / probject.$order.length)
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
		return Object.keys(this.$file.actions)
	}

	get frame () {
		return this.$file.frames[this.$order[this.$index]]
	}

	get action () {
		return this.$action
	}

	set action (actionName) {
		const probject = this

		for (const action of probject.$file.actions) {
			if (action.name === actionName) {
				probject.$action = action
				probject.$order = action.order
				probject.$index = probject.$order[0]

				probject.emit('actionUpdate', probject)
				
				return actionName
			}
		}

		return actionName
	}
}

export default Probject
