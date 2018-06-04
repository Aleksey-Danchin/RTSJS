import RTS from '../../core/RTS'
import base64 from './grifon.png'
import atlas from './grifon.json'

const image = new Image()
image.src = base64

class Grifon extends RTS.Unit {
	constructor (params) { super(params)
		const grifon = this

		grifon.$health = 100
	}
}

Grifon.prototype.image = image
Grifon.prototype.atlas = atlas

export default Grifon
