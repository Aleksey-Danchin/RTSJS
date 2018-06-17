class Camera {
	constructor (width, height) {
		const camera = this

		camera.$width = width
		camera.$height = height
		camera.$x = 0
		camera.$y = 0
		camera.$limitX = width
		camera.$limitY = height
		camera.$isChange = false
	}

	get x () {
		return this.$x
	}

	set x (val) {
		const camera = this
		const x = Math.min(Math.max(val, 0), this.$limitX)

		camera.$isChange = camera.$isChange || camera.$x !== x
		camera.$x = x
		return val
	}

	get y () {
		return this.$y
	}

	set y (val) {
		const camera = this
		const y = Math.min(Math.max(val, 0), this.$limitY)

		camera.$isChange = camera.$isChange || camera.$y !== y
		camera.$y = y
		return val
	}
}

export default Camera
