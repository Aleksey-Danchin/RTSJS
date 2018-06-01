import FileLoader from './FileLoader'
import Layer from './Layer'
import Probject from './Probject'
import Selector from './Selector'
import Mouse from './Mouse'
import World from './World'
import Tileset from './Tileset'
import Camera from './Camera'
import Keyboard from './Keyboard'

class RTS {
	constructor (params) {
		const rts = this

		rts.$element = document.createElement('div')
		rts.$element.style.position = 'relative'
		rts.$element.setAttribute('role', 'root')

		params.root.appendChild(rts.$element)
	}
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

export default RTS
