class Probject {
	constructor (image, json, params = {}) {
		const probject = this

		probject.$image = image
		probject.$json = json

		probject.$width = params.width || probject.$json.sprite.width
		probject.$height = params.height || probject.$json.sprite.height
		probject.$x = params.x || 0
		probject.$y = params.y || 0

		probject.$anchor = {}
		probject.$anchor.x = 0
		probject.$anchor.y = 0

		probject.$selectable = true
		probject.$selected = false
		probject.$draw = true

		probject.$context = null
	}

	draw (context, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight) {
		const probject = this

		context.drawImage(probject.$image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)
	}
}

export default Probject
