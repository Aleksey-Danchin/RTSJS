class Layer {
	constructor (params = {}) {
		const layer = this

		layer.canvases = new Map()

		layer.name = params.name

		layer.width = params.width
		layer.height = params.height
		layer.top = params.top
		layer.left = params.left

		layer.$element = document.createElement('canvas')
		layer.$element.width = params.width
		layer.$element.height = params.height
		layer.$element.style.position = 'absolute'
		layer.$element.style.top = params.top + 'px'
		layer.$element.style.left = params.left + 'px'

		layer.$context = layer.$element.getContext('2d')

		layer.$element.setAttribute('name', layer.name)
	}

	draw (func) {
		const layer = this

		if (func instanceof Function) {
			return func(layer.$element, layer.$context)
		}

		if (typeof func === 'object' && func.type) {
			switch (func.type) {
				case 'line':
					layer.drawLine(func)
					break
				case 'circle':
					layer.drawCircle(func)
					break
			}
		}
	}

	drawLine (data) {
		const layer = this

		layer.draw((canvas, context) => {
			if (!data.stroking) {
				return
			}

			context.beginPath()
			context.moveTo(data.x1, data.y1)
			context.lineTo(data.x2, data.y2)
			context.strokeStyle = data.strokeStyle
			context.lineWidth = data.lineWidth
			context.stroke()
		})
	}

	drawCircle (data) {
		const layer = this

		layer.draw((canvas, context) => {
			if (!data.stroking && !data.filling) {
				return
			}

			context.beginPath()
			context.arc(data.x, data.y, data.r, 0, Math.PI * 2)

			if (data.filling) {
				context.fillStyle = data.fillStyle
				context.fill()
			}

			if (data.stroking) {
				context.lineWidth = data.lineWidth
				context.strokeStyle = data.strokeStyle
				context.stroke()
			}
		})
	}
}

export default Layer
