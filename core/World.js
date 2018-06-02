import Canvas from './Canvas'
import Camera from './Camera'

class World extends Canvas {
	constructor (params) { super(params)
		const world = this

		world.$element.setAttribute('role', 'world')

		world.$nextobjectid = params.data.nextobjectid
		world.$tiledversion = params.data.tiledversion
		world.$nextlayerid = params.data.nextlayerid
		world.$orientation = params.data.orientation
		world.$renderorder = params.data.renderorder
		world.$tileheight = params.data.tileheight
		world.$layerTileset = params.layerTileset
		world.$tilewidth = params.data.tilewidth
		world.$infinite = params.data.infinite
		world.$tilesets = params.data.tilesets
		world.$version = params.data.version
		world.$height = params.data.height
		world.$layers = params.data.layers
		world.$type = params.data.type
		world.$width = params.data.width

		world.$baseImage = null
		world.baseImageUpdate().then(() => {
			world.cameraUpdateHandler()
			world.$camera.$limitX = world.$baseImage.width - world.$camera.$width
			world.$camera.$limitY = world.$baseImage.height - world.$camera.$height
		})

		world.$camera = new Camera({
			x: 0, y: 0,
			width: world.$element.width,
			height: world.$element.height
		})

		world.cameraUpdateHandler = world.cameraUpdateHandler.bind(world)

		world.$camera.on('update', world.cameraUpdateHandler)
	}

	get nextobjectid () { return this.$nextobjectid }
	get tiledversion () { return this.$tiledversion }
	get layerTileset () { return this.$layerTileset }
	get nextlayerid () { return this.$nextlayerid }
	get orientation () { return this.$orientation }
	get renderorder () { return this.$renderorder }
	get tileheight () { return this.$tileheight }
	get tilewidth () { return this.$tilewidth }
	get baseImage () { return this.$baseImage }
	get infinite () { return this.$infinite }
	get tilesets () { return this.$tilesets }
	get version () { return this.$version }
	get height () { return this.$height }
	get layers () { return this.$layers }
	get type () { return this.$type }
	get width () { return this.$width }

	cameraUpdateHandler () {
		const world = this
		const camera = world.$camera

		world.$context.drawImage(
			world.$baseImage,
			camera.$x, camera.$y, camera.$width, camera.$height,
			0, 0, world.$element.width, world.$element.height
		)
	}

	baseImageUpdate () {
		const world = this

		world.$baseImage = new Image()

		return new Promise((resolve, reject) => {
			const canvas = document.createElement('canvas')
			const context = canvas.getContext('2d')

			canvas.width = world.$width * world.$tilewidth
			canvas.height = world.$height * world.$tileheight

			for (const layer of world.$layers) {
				const tileset = world.$tilesets[world.$layerTileset[world.$layerTileset.indexOf(layer.name) + 1]]

				for (let rowIndex = 0; rowIndex < layer.height; rowIndex++) {
					for (let columnIndex = 0; columnIndex < layer.width; columnIndex++) {
						const frameIndex = layer.data[rowIndex * layer.width + columnIndex]

						context.drawImage(
							tileset.$image,
							...tileset.byIndex(frameIndex),
							columnIndex * world.$tilewidth,
							rowIndex * world.$tileheight,
							world.$tilewidth,
							world.$tileheight
						)
					}
				}
			}

			world.$baseImage.onload = () => resolve(world.$baseImage)
			world.$baseImage.src = canvas.toDataURL('image/png')
		})
	}
}

export default World
