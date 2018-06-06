import FileLoader from './FileLoader'
import Layer from './Layer'
import Probject from './Probject'
import Selector from './Selector'
import Mouse from './Mouse'
import World from './World'
import Tileset from './Tileset'
import Camera from './Camera'
import Keyboard from './Keyboard'
import Manager from './Manager'
import Unit from './Unit'
import UnitsManager from './UnitsManager'

class RTS {
	constructor (params) {
		const rts = this

		rts.$element = document.createElement('div')
		rts.$element.style.position = 'relative'
		rts.$element.setAttribute('role', 'root')

		params.root.appendChild(rts.$element)

		const size = {
			width: params.width,
			height: params.height
		}

		rts.$world = new World(size)
		rts.$world.$camera.on('update', () => rts.$unitsManager.underCameraUpdate())
		rts.$element.appendChild(rts.$world.$element)

		rts.$layer = new Layer(size)
		rts.$element.appendChild(rts.$layer.$element)

		rts.$selector = new Selector(size)
		rts.$element.appendChild(rts.$selector.$element)

		rts.$mouse = new Mouse(rts.$element)
		rts.$keyboard = new Keyboard()

		rts.$unitsManager = new UnitsManager()
		rts.$unitsManager.underCamera = (x, y, width, height) => {
			return x >= rts.$world.$camera.$x - width &&
				x < rts.$world.$camera.$x + rts.$world.$camera.$width &&
				y >= rts.$world.$camera.$y - height &&
				y < rts.$world.$camera.$y + rts.$world.$camera.$height
		}

		rts.$unitsManager.drawUnit = unit => {
			unit.draw(rts.$layer.$context, rts.$world.$camera.$x, rts.$world.$camera.$y)
		}

		rts.$unitsManager.drawUnits = units => {
			rts.$layer.clear()
			let n = 0
			units.forEach(unit => {
				if (unit.$underCamera) {
					rts.$unitsManager.drawUnit(unit)
					n++
				}
			})
			// console.log(n)
		}
	}

	get um () { return this.$unitsManager }
	get world () { return this.$world }
	get layer () { return this.$layer }
	get selector () { return this.$selector }
}

// window.requestAnimationFrame = 
// 	window.requestAnimationFrame ||
// 	window.webkitRequestAnimationFrame ||
// 	window.mozRequestAnimationFrame	||
// 	window.oRequestAnimationFrame ||
// 	window.msRequestAnimationFrame ||
// 	callback => {
// 		setTimeout(callback, 1000 / 60);
// 	}

RTS.FileLoader = FileLoader
RTS.Layer = Layer
RTS.Probject = Probject
RTS.Selector = Selector
RTS.Mouse = Mouse
RTS.World = World
RTS.Tileset = Tileset
RTS.Camera = Camera
RTS.Keyboard = Keyboard
RTS.Manager = Manager
RTS.Unit = Unit
RTS.UnitsManager = UnitsManager

export default RTS
