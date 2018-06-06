import RTS from '../../../core/RTS'

import base64 from './grifon.png'
import file from './grifon.json'

const image = new Image()
image.src = base64

const PARAMS_DEFAULT = {
	x: 0, y: 0
}

class Grifon extends RTS.Unit {
	constructor (args = {}) { super(args)
		const grifon = this
		const params = {
			...PARAMS_DEFAULT,
			...args
		}

		grifon.$health = 100
	}
}

Grifon.prototype.image = image
Grifon.prototype.actions = file.actions
Grifon.prototype.actionDefault = file.actionDefault

export default Grifon
