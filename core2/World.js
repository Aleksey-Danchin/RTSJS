import Canvas from './Canvas'
import FileLoader from './FileLoader'

class World extends Canvas {
	constructor (src, camera) { super()
		const world = this

		world.$element.setAttribute('role', 'world')

		world.$initPromise = new Promise(async (resolve, reject) => {
			const file = await FileLoader.getJSON(`${src}/world.json`)

			Object.keys(file).forEach(key => {
				const field = '$' + key

				world[field] = file[key]
			})

			world.$element.width = world.$width * world.$tilewidth
			world.$element.height = world.$height * world.$tileheight
			world.clear()

			setTimeout(async () => {
				await Promise.all(file.tilesets.map((tilesetData, index) => 
					new Promise(async resolve => {
						const image = await FileLoader.getImage(`${src}/${tilesetData.image}`)
						world.$tilesets[index].$image = image
						resolve()
					})
				))

				let counter = 0
				for (const tileset of world.$tilesets) {
					tileset.minTileId = counter + 1
					tileset.maxTileId = counter = counter + tileset.tilecount
				}

				await world.mapUpdate()
			})


			resolve(world)
		})
	}

	// frameUpdate () {
	// 	const world = this

	// 	if (world.$camera.$isChange) {
	// 		world.$camera.$isChange = false

	// 		world.$element.style.top = parseInt(-world.$camera.$y) + 'px'
	// 		world.$element.style.left = parseInt(-world.$camera.$x) + 'px'
	// 	}
	// }

	mapUpdate () {
		const world = this

		return new Promise((resolve, reject) => {
			for (const layer of world.$layers) {
				for (let y = 0; y < layer.height; y++) {
					for (let x = 0; x < layer.width; x++) {
						const originalTileId = layer.data[x + y * layer.width]

						if (!originalTileId) {
							continue
						}

						const tileset = world.$tilesets.find(tileset => tileset.minTileId <= originalTileId && originalTileId <= tileset.maxTileId)
						const tileId = originalTileId - tileset.minTileId
						const rowIndex = parseInt(tileId / tileset.columns)
						const columnIndex = tileId - rowIndex * tileset.columns

						world.$context.drawImage(
							tileset.$image,

							tileset.margin + (tileset.spacing + tileset.tilewidth) * columnIndex,
							tileset.margin + (tileset.spacing + tileset.tileheight) * rowIndex,
							tileset.tilewidth,
							tileset.tilewidth,

							x * world.$tilewidth,
							y * world.$tileheight,
							world.$tilewidth,
							world.$tileheight
						)

					}
				}
			}

			resolve()
		})
	}
}

export default World
