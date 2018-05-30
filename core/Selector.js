import Canvas from './Canvas'
import Mouse from './Mouse'

class Selector extends Canvas {
	constructor (params) { super(params)
		const selector = this

		selector.$element.setAttribute('role', 'selector')

		selector.$x = 0
		selector.$y = 0
		selector.$width = 0
		selector.$height = 0
		selector.$is = false

		selector.$mouse = new Mouse(selector.$element)
		
		selector.$mouse.on('mousemove', () => {
			if (!selector.$is) {
				return false
			}
			selector.$width = selector.$x - selector.$mouse.x
			selector.$height = selector.$y - selector.$mouse.y

			selector.update()
		})

		selector.$mouse.on('mousedown', () => {
			const {left} = selector.$mouse

			if (!selector.$is && left && selector.$mouse.$under) {
				selector.$x = selector.$mouse.x
				selector.$y = selector.$mouse.y
				selector.$width = selector.$height = 0
				selector.$is = left
				selector.update()
			}
		})

		selector.$mouse.on('mouseup', () => {
			const {left} = selector.$mouse

			if (selector.$is && !left) {
				selector.$is = left
				selector.update()
			}

		})
	}

	get x () {
		return Math.min(this.$x, this.$x - this.$width)
	}

	get y () {
		return Math.min(this.$y, this.$y - this.$height)
	}

	get width () {
		return Math.abs(this.$width)
	}

	get height () {
		return Math.abs(this.$height)
	}

	update () {
		const selector = this
		selector.clear()

		if (!selector.$is) {
			return false
		}

		const context = selector.$context

		context.fillStyle = 'rgba(120, 120, 120, 0.5)'
		context.fillRect(selector.x, selector.y, selector.width, selector.height)

		context.stroke = 'rgba(120, 120, 120, 1)'
		context.strokeRect(selector.x, selector.y, selector.width, selector.height)
	}
}

export default Selector
