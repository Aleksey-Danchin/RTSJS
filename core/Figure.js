const Figure = {}

Figure.getLine = () => ({
	type: 'line',
	x1: 0, y1: 0,
	x2: 50, y2: 50,
	lineWidth: 1,
	strokeStyle: 'black',
	stroking: true
})

Figure.getCircle = () => ({
	type: 'circle',
	x: 26, y: 26, r: 25,
	strokeStyle: 'black',
	lineWidth: 1,
	stroking: true,
	fillStyle: 'green',
	filling: true
})

export default Figure