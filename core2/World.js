import FileLoader from './FileLoader'

class World {
	constructor (src, camera) {
		const world = this

		const promise =  new Promise(async (resolve, reject) => {
			const file = await FileLoader.getJSON(`${src}/world.json`)
			initWorld(world, file)

			await Promise.all(file.tilesets.map((tilesetData, index) => 
				new Promise(async resolve => {
					const image = await FileLoader.getImage(`${src}/${tilesetData.image}`)
					world.$tilesets[index].image = image
					resolve()
				})
			))

			let counter = 0
			for (const tileset of world.$tilesets) {
				tileset.minTileId = counter + 1
				tileset.maxTileId = counter = counter + tileset.tilecount
			}

			await world.mapUpdate()

			resolve(world)
		})

		world.$camera = camera

		world.$element = document.createElement('div')
		world.$element.style.position = 'relative'
		world.$element.style.width = `${camera.$width}px`
		world.$element.style.height = `${camera.$height}px`
		world.$element.style.overflow = 'hidden'

		world.$canvas = document.createElement('canvas')
		world.$canvas.context = world.$canvas.getContext('2d')
		world.$canvas.style.position = 'absolute'
		world.$canvas.style.top = -world.$camera.$x + 'px'
		world.$canvas.style.left = -world.$camera.$y + 'px'
		
		world.$element.appendChild(world.$canvas)

		return promise
	}

	frameUpdate () {
		const world = this

		if (world.$camera.$isChange) {
			world.$camera.$isChange = false

			world.$canvas.style.top = parseInt(-world.$camera.$x) + 'px'
			world.$canvas.style.left = parseInt(-world.$camera.$y) + 'px'
		}
	}

	async mapUpdate () {
		const world = this

		return new Promise((resolve, reject) => {
			world.$canvas.width = world.$width * world.$tilewidth
			world.$canvas.height = world.$height * world.$tileheight
			world.$camera.$limitX = world.$canvas.width - world.$camera.$width
			world.$camera.$limitY = world.$canvas.height - world.$camera.$height

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

						world.$canvas.context.drawImage(
							tileset.image,

							tileset.margin + (tileset.spacing + tileset.tilewidth) * columnIndex,
							tileset.margin + (tileset.spacing + tileset.tileheight) * rowIndex,
							tileset.tilewidth,
							tileset.tilewidth,

							x * world.tilewidth,
							y * world.tileheight,
							world.tilewidth,
							world.tileheight
						)
					}
				}
			}

			resolve()
		})
	}
}

export default World

function initWorld (world, file) {
	Object.keys(file).forEach(key => {
		const field = `\$${key}`

		world[field] = file[key]
		Object.defineProperty(world, key, {
			get: () => world[field]
		})
	})
}