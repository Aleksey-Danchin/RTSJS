import Probject from './Probject'

class Unit extends Probject {
	constructor (params) { super()
		const unit = this

		unit.$health = 1
		unit.$speed = 1
		unit.$attack = 1
	}
}

export default Unit
