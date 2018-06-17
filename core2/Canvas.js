class Canvas {
	constructor (params) {
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
