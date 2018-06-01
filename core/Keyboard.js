import EventEmitter from 'events'

const emitter = new EventEmitter()

class Keyboard extends EventEmitter {
	constructor () { super()
		const keyboard = this

		emitter.on('keydown', event => keyboard.emit('keydown', event))
		emitter.on('keyup', event => keyboard.emit('keyup', event))
	}

	get arrowUp () { return arrowUp }
	get arrowDown () { return arrowDown }
	get arrowLeft () { return arrowLeft }
	get arrowRight () { return arrowRight }

	toJSON () {
		return {
			arrowUp,
			arrowDown,
			arrowLeft,
			arrowRight
		}
	}
}

export default Keyboard

let arrowUp = false
let arrowDown = false
let arrowLeft = false
let arrowRight = false

document.addEventListener('keydown', event => {
	switch (event.keyCode) {
		case 38:
			arrowUp = true
		break
		case 40:
			arrowDown = true
		break
		case 37:
			arrowLeft = true
		break
		case 39:
			arrowRight = true
		break
	}

	emitter.emit('keydown', event)
})

document.addEventListener('keyup', event => {
	switch (event.keyCode) {
		case 38:
			arrowUp = false
		break
		case 40:
			arrowDown = false
		break
		case 37:
			arrowLeft = false
		break
		case 39:
			arrowRight = false
		break
	}

	emitter.emit('keydown', event)
})