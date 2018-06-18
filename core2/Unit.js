import FileLoader from './FileLoader'

function Unit (src) {
	return new Promise(async (resolve, reject) => {
		const characteristicsPromise = FileLoader.getJSON(`${src}/characteristics.json`)
		const layout = await FileLoader.getJSON(`${src}/layout.json`)
		const imagePromise = FileLoader.getImage(`${src}/${layout.image}`)
		const [characteristics, image] = await Promise.all([characteristicsPromise, imagePromise])

		for (const tile of layout.tiles) {
			for (const frame of tile.animation) {
				const rowIndex = parseInt(frame.tileid / layout.columns)
				const columnIndex = frame.tileid - rowIndex * layout.columns

				frame.x = layout.margin + columnIndex * (layout.tilewidth + layout.spacing)
				frame.y = layout.margin + rowIndex * (layout.tileheight + layout.spacing)

				for (const propertie of tile.properties) {
					tile[propertie.name] = propertie.value
				}
			}
		}

		class Unit {
			constructor (context, camera) {
				const unit = this

				unit.$hitpoints = characteristics.hitpoints
				unit.$attack = characteristics.attack
				unit.$speed = characteristics.speed
				unit.$action = characteristics.action
				unit.$direct = characteristics.direct
				unit.$tiles = []
				unit.$frameTimer = 0
				unit.$frameIndex = 0
				unit.$isChange = false
				unit.$x = 0
				unit.$y = 0
				unit.$context = context
				unit.camera = camera

				unit.animationActivation({
					action: unit.$action,
					direct: unit.$direct
				})
			}

			animationActivation (props) {
				const unit = this

				const keys = Object.keys(props)

				for (const tile of unit.layout.tiles) {
					if (keys.every(key => tile[key])) {
						unit.$tiles = tile.animation
						break
					}
				}
			}

			frameUpdate (diffTimestamp) {
				const unit = this

				unit.$frameTimer += diffTimestamp
				if (unit.$tiles[unit.$frameIndex].duration <= unit.$frameTimer) {
					unit.$frameTimer = 0
					unit.$frameIndex = ++unit.$frameIndex % unit.$tiles.length

					unit.$isChange = true
				}
			}

			draw (context) {
				const unit = this

				context.drawImage(
					image,

					unit.$tiles[unit.$frameIndex].x,
					unit.$tiles[unit.$frameIndex].y,
					layout.tilewidth,
					layout.tileheight,

					unit.$x,
					unit.$y,
					layout.tilewidth,
					layout.tileheight
				)
			}
		}

		Unit.prototype.image = image
		Unit.prototype.layout = layout
		Unit.prototype.characteristics = characteristics

		resolve(Unit)
	})
}

export default Unit
