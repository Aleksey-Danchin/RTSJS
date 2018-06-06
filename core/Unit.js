import Probject from './Probject'

class Unit extends Probject {
	constructor (args) { super(args)
		const unit = this

		unit.$health = 1
		unit.$speed = 1
		unit.$attack = 0

		// unit.action = 'default'
	}
}

// Unit.prototype.image = null
// Unit.prototype.file = null

export default Unit
