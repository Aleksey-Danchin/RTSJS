const PARAMS_DEFAULT = {
	width: 0,
	height: 0,
	left: 0,
	top: 0
}

class Canvas {
	constructor (params = PARAMS_DEFAULT) {
		const canvas = this

		canvas.$element = document.createElement('canvas')
		canvas.$context = canvas.$element.getContext('2d')

		canvas.$element.width = params.width
		canvas.$element.height = params.height

		canvas.$element.style.position = 'absolute'
		canvas.$element.style.top = (params.top || 0) + 'px'
		canvas.$element.style.left = (params.left || 0) + 'px'
	}

	clear () {
		const canvas = this

		canvas.$element.width = canvas.$element.width
	}
}

export default Canvas
