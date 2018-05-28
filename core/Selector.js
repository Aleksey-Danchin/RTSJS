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
			console.log(JSON.stringify(selector.$mouse))
		})
	}

	get x () {
		return Math.min(this.$x, this.$x - this.$width)
	}

	get y () {
		return Math.min(this.$y, this.$y - this.$height)
	}

	get width () {
		return this.$width
	}

	get height () {
		return this.$height
	}
}

export default Selector
