const Keyboard = {
	arrowUp: false,
	arrowDown: false,
	arrowLeft: false,
	arrowRight: false,
	arrowUpPrev: false,
	arrowDownPrev: false,
	arrowLeftPrev: false,
	arrowRightPrev: false,

	frameUpdate () {
		Keyboard.arrowUpPrev = Keyboard.arrowUp
		Keyboard.arrowDownPrev = Keyboard.arrowDown
		Keyboard.arrowLeftPrev = Keyboard.arrowLeft
		Keyboard.arrowRightPrev = Keyboard.arrowRight
	}
}
export default Keyboard

document.addEventListener('keydown', event => {
	if (event.keyCode === 38) return Keyboard.arrowUp = true
	if (event.keyCode === 40) return Keyboard.arrowDown = true
	if (event.keyCode === 37) return Keyboard.arrowLeft = true
	if (event.keyCode === 39) return Keyboard.arrowRight = true
})

document.addEventListener('keyup', event => {
	if (event.keyCode === 38) return Keyboard.arrowUp = false
	if (event.keyCode === 40) return Keyboard.arrowDown = false
	if (event.keyCode === 37) return Keyboard.arrowLeft = false
	if (event.keyCode === 39) return Keyboard.arrowRight = false
})