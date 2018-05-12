import RTS from '../../core/RTS'

const rts = new RTS({
	root: document.body,
	width: 300,
	height: 300
})

rts.$fileLoader.addImage('')

const layer = rts.getLayer('base')
const circle = RTS.Figure.getCircle()

layer.draw(circle)