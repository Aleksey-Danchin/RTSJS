import EventEmitter from 'events'

const emitter = new EventEmitter()

class Mouse extends EventEmitter {
	constructor (element, params = {}) { super()
		const mouse = this

		mouse.$x = null
		mouse.$y = null
		mouse.$under = false
		mouse.$contextMenu = params.contextMenu || false

		emitter.on('mousemove', event => {
			const {left, top, width, height} = element.getBoundingClientRect()

			mouse.$x = clientX - left
			mouse.$y = clientY - top

			mouse.$under = 0 <= mouse.$x && mouse.$x <= element.width && 0 <= mouse.$y && mouse.$y <= height

			mouse.emit('mousemove', event)
		})

		emitter.on('contextmenu', event => {
			if (mouse.$under && !mouse.$contextMenu) {
				event.preventDefault()
			}

			mouse.emit('contextmenu', event)
		})
		emitter.on('mousedown', event => mouse.emit('mousedown', event))
		emitter.on('mouseup', event => mouse.emit('mouseup', event))
		emitter.on('click', event => mouse.emit('click', event))
	}

	get x () {return this.$x}
	get y () {return this.$y}
	get under () {return this.$under}
	get clientX () {return clientX}
	get clientY () {return clientY}
	get dx () {return dx}
	get dy () {return dy}
	get left () {return left}
	get middle () {return middle}
	get right () {return right}
	get contextMenu () {return this.$contextMenu}
	set contextMenu (val) {
		this.$contextMenu = val
		return val
	}

	toJSON () {
		return {
			x: this.$x,
			y: this.$y,
			under: this.$under,
			contextMenu: this.$contextMenu,
			clientX: clientX,
			clientY: clientY,
			dx: dx,
			dy: dy,
			left: left,
			middle: middle,
			right: right
		}
	}
}

export default Mouse

let clientX = null
let clientY = null

let dx = null
let dy = null

let left = false
let middle = false
let right = false

document.addEventListener('mousemove', event => {
	dx = event.clientX - clientX
	dy = event.clientY - clientY

	clientX = event.clientX
	clientY = event.clientY

	emitter.emit('mousemove', event)
})

document.addEventListener('click', event => {
	emitter.emit('click', event)
})

document.addEventListener('mousedown', event => {
	buttonsUpdate(event.buttons)

	emitter.emit('mousedown', event)
})

document.addEventListener('mouseup', event => {
	buttonsUpdate(event.buttons)

	emitter.emit('mouseup', event)
})

document.addEventListener('contextmenu', event => {
	emitter.emit('contextmenu', event)
})

function buttonsUpdate (code) {
	middle = Boolean(code & 4)
	right = Boolean(code & 2)
	left = Boolean(code & 1)
}