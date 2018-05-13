import Layer from './Layer'
import Figure from './Figure'
import FileLoader from './FileLoader'
import Probject from './Probject'
import Unit from './Unit'
import World from './World'
import Selector from './Selector'
import Camera from './Camera'

class RTS {
	constructor (params) {
		const rts = this

		rts.width = params.width
		rts.height = params.height

		rts.$element = document.createElement('div')
		rts.$element.style.position = 'relative'
		rts.$element.style.width = params.width + 'px'
		rts.$element.style.height = params.height + 'px'

		params.root.appendChild(rts.$element)

		rts.layers = new Map()
		const layer = rts.addLayer('base', {
			width: params.width,
			height: params.height,
			top: 0,
			left: 0
		})

		rts.$fileLoader = new FileLoader()
	}

	addLayer (name, params) {
		const rts = this

		if (rts.layers.has(name)) {
			return false
		}

		const layer = new Layer({
			name,
			width: params.width,
			height: params.height,
			top: params.top,
			left: params.left
		})

		rts.layers.set(name, layer)
		rts.$element.appendChild(layer.$element)
		return layer
	}

	getLayer (name) {
		const rts = this

		if (!rts.layers.has(name)) {
			return false
		}

		return rts.layers.get(name)
	}
}

RTS.Layer = Layer
RTS.Figure = Figure
RTS.FileLoader = FileLoader
RTS.Probject = Probject
RTS.Unit = Unit
RTS.World = World
RTS.Selector = Selector
RTS.Camera = Camera

// window.requestAnimationFrame = 
// 	window.requestAnimationFrame ||
// 	window.webkitRequestAnimationFrame ||
// 	window.mozRequestAnimationFrame	||
// 	window.oRequestAnimationFrame ||
// 	window.msRequestAnimationFrame ||
// 	callback => {
// 		setTimeout(callback, 1000 / 60);
// 	}

export default RTS
