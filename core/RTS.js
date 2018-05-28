import FileLoader from './FileLoader'
import Layer from './Layer'
import Probject from './Probject'

class RTS {
	constructor (params) {
		const rts = this

		rts.$element = document.createElement('div')

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

export default RTS
