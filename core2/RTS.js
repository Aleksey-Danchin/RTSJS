import Camera from './Camera'
import Canvas from './Canvas'
import FileLoader from './FileLoader'
import Keyboard from './Keyboard'
import Unit from './Unit'
import World from './World'

class RTS {
	constructor (params) {
		const rts = this

		rts.$element = document.createElement('div')
		rts.$element.style.position = 'relative'
		rts.$element.style.width = params.camera.width + 'px'
		rts.$element.style.height = params.camera.height + 'px'
		rts.$element.style.overflow = 'hidden'

		rts.$camera = new Camera(
			params.camera.width,
			params.camera.height
		)

		rts.$world = new World(params.world)
		rts.$element.appendChild(rts.$world.$element)

		rts.$unitsLayer = new Canvas()
		rts.$unitsLayer.$element.setAttribute('role', 'units')
		rts.$element.appendChild(rts.$unitsLayer.$element)

		rts.$units = {}
		
		rts.$startMoment = Date.now()
		rts.$prevTickMoment = rts.$startMoment

		rts.$initPromise = new Promise(async (resolve, reject) => {
			const unitPromises = []
			for (const unitName of Object.keys(params.units)) {
				const unitPromise = Unit(params.units[unitName])
				unitPromises.push(unitPromise)
				unitPromise.then(unit => {
					rts.$units[unitName] = unit
				})
			}

			await Promise.all([rts.$world.$initPromise, ...unitPromises])

			rts.$unitsLayer.$element.width = rts.$world.$element.width
			rts.$unitsLayer.$element.height = rts.$world.$element.height
			rts.$camera.$limitX = rts.$world.$element.width - rts.$camera.$width
			rts.$camera.$limitY = rts.$world.$element.height - rts.$camera.$height

			requestAnimationFrame(function callee (timestamp) {
				const timediff = Date.now() - rts.$prevTickMoment

				rts.tickBefore(timediff, timestamp)

				if (rts.$camera.$isChange) {
					rts.$camera.$isChange = false
					rts.$world.$element.style.left = rts.$unitsLayer.$element.style.left = -rts.$camera.$x + 'px'
					rts.$world.$element.style.top = rts.$unitsLayer.$element.style.top = -rts.$camera.$y + 'px'
				}

				rts.$prevTickMoment += timediff
				requestAnimationFrame(callee)
			})

			resolve()
		})

	}

	tickBefore () {}

	tick (timediff) {}
}

RTS.Camera = Camera
RTS.Canvas = Canvas
RTS.FileLoader = FileLoader
RTS.Keyboard = Keyboard
RTS.Unit = Unit
RTS.World = World

export default RTS
