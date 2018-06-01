import EventEmitter from 'events'

class Camera extends EventEmitter {
	constructor (params) {
		const camera = this

		camera.$width = params.width
		camera.$height = params.height
		camera.$x = params.x || 0
		camera.$y = params.y || 0
	}

	get width () {
		return this.$width
	}

	set width (val) {
		this.$width = val
		this.emit('update', camera)
		return val
	}

	get height () {
		return this.$height
	}

	set height (val) {
		this.$height = val
		this.emit('update', camera)
		return val
	}

	get x () {
		return this.$x
	}

	set x (val) {
		this.$x = val
		this.emit('update', camera)
		return val
	}

	get y () {
		return this.$y
	}

	set y (val) {
		this.$y = val
		this.emit('update', camera)
		return val
	}
}

export default Camera