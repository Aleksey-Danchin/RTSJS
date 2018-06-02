import EventEmitter from 'events'

class Camera extends EventEmitter {
	constructor (params) { super()
		const camera = this

		camera.$width = params.width
		camera.$height = params.height
		camera.$x = params.x || 0
		camera.$y = params.y || 0
		camera.$limitX = params.limitX
		camera.$limitY = params.limitY
	}

	get width () {
		return this.$width
	}

	set width (val) {
		this.$width = val
		this.emit('update', this)
		return val
	}

	get height () {
		return this.$height
	}

	set height (val) {
		this.$height = val
		this.emit('update', this)
		return val
	}

	get x () {
		return this.$x
	}

	set x (val) {
		const x = Math.min(Math.max(val, 0), this.$limitX)

		if (x === this.$x) {
			return val
		}

		this.$x = x
		this.emit('update', this)
		return val
	}

	get y () {
		return this.$y
	}

	set y (val) {
		const y = Math.min(Math.max(val, 0), this.$limitY)

		if (y === this.$y) {
			return val
		}

		this.$y = y
		this.emit('update', this)
		return val
	}
}

export default Camera