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

class RTS {
	constructor (params) {
		const rts = this

		rts.$element = document.createElement('div')
		rts.$element.style.position = 'relative'
		rts.$element.setAttribute('role', 'root')

		params.root.appendChild(rts.$element)

		rts.$fileLoader = new FileLoader()
		rts.$mouse = null
		rts.$keyboard = new Keyboard()

		rts.$world = null
		rts.$units = null
		rts.$selector = null

		initRts(rts, params)
	}
}

async function initRts (rts, params) {
	const sources = params.sources || {}
	const images = sources.images || {}
	const jsons = sources.jsons || {}

	await Promise.all([
		...params.sources.images.map(({name, src}) => new Promise(async (resolve, reject) => {
			const image = await FileLoader.loadImage(src)
			rts.$fileLoader.$images.set(name, image)
			resolve()
		})),
		...params.sources.jsons.map(({name, src}) => new Promise(async (resolve, reject) => {
			const json = await FileLoader.loadJson(src)
			rts.$fileLoader.$jsons.set(name, json)
			resolve()
		}))
	])
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

export default RTS
