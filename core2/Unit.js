import FileLoader from './FileLoader'

function Unit (src) {
	return new Promise(async (resolve, reject) => {
		const characteristicsPromise = FileLoader.getJSON(`${src}/characteristics.json`)
		const layout = await FileLoader.getJSON(`${src}/layout.json`)
		const imagePromise = FileLoader.getImage(`${src}/${layout.image}`)
		const [characteristics, image] = await Promise.all([characteristicsPromise, imagePromise])

		for (const tile of layout.tiles) {
			for (const frame of tile.animation) {
				const columnIndex = parseInt(frame.tileid / layout.columns)
				const rowIndex = frame.tileid - columnIndex * layout.columns

				frame.x = layout.margin + columnIndex * (layout.tilewidth + layout.spacing)
				frame.y = layout.margin + rowIndex * (layout.tileheight + layout.spacing)
			}
		}

		console.log(layout)

		class Unit {
			constructor () {
				const unit = this
			}
		}
		Unit.prototype.image = image
		Unit.prototype.layout = layout
		Unit.prototype.characteristics = characteristics

		resolve(Unit)
	})
}

export default Unit
