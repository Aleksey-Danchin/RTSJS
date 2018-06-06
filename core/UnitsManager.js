import EventEmitter from 'events'

class UnitsManager extends EventEmitter {
	constructor () { super()
		const um = this

		um.$units = new Set()

		um.unitCoordinatesUpdateHandler = um.unitCoordinatesUpdateHandler.bind(um)
		um.unitActionUpdateHandler = um.unitActionUpdateHandler.bind(um)
		um.unitFrameUpdateHandler = um.unitFrameUpdateHandler.bind(um)
	}

	underCamera () {
		return false
	}

	drawUnit () {}
	drawUnits () {}

	underCameraUpdate () {
		const um = this

		for (const unit of um.$units) {
			unit.underCamera = um.underCamera(unit.$x, unit.$y, unit.$width, unit.$height)

			if (unit.underCamera) {
				um.drawUnits(um.units)
			}
		}
	}

	get units () {
		return Array.from(this.$units)
	}

	addUnit (unit) {
		const um = this

		if (um.$units.has(unit)) {
			return false
		}

		um.$units.add(unit)
		unit.underCamera = um.underCamera(unit.$x, unit.$y, unit.$width, unit.$height)
		if (unit.underCamera) {
			um.drawUnits(um.units)
		}

		unit.on('coordinatesUpdate', um.unitCoordinatesUpdateHandler)
		unit.on('actionUpdate', um.unitActionUpdateHandler)
		unit.on('frameUpdate', um.unitFrameUpdateHandler)

		um.emit('update')

		return true
	}

	removeUnit (unit) {
		const um = this

		if (!um.$units.has(unit)) {
			return false
		}

		um.$units.delete(unit)
		um.emit('update')

		return true
	}

	unitCoordinatesUpdateHandler (unit) {
		const um = this

		um.emit('coordinatesUpdate', unit)
		unit.underCamera = um.underCamera(unit.$x, unit.$y, unit.$width, unit.$height)
	}

	unitActionUpdateHandler (unit) {
		const um = this

		um.emit('actionUpdate', unit)
	}

	unitFrameUpdateHandler (unit) {
		const um = this

		if (unit.underCamera) {
			um.drawUnits(um.units)
		}

		um.emit('frameUpdate', unit)
	}
}

export default UnitsManager
