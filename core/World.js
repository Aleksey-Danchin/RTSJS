import Canvas from './Canvas'
import Camera from './Camera'

class World extends Canvas {
	constructor (params) { super(params)
		const world = this

		world.cameraUpdateHandler = world.cameraUpdateHandler.bind(world)

		world.$element.setAttribute('role', 'world')

		world.$nextobjectid = null
		world.$tiledversion = null
		world.$nextlayerid = null
		world.$orientation = null
		world.$renderorder = null
		world.$tileheight = null
		world.$layerTileset = null
		world.$tilewidth = null
		world.$infinite = null
		world.$tilesets = null
		world.$version = null
		world.$height = null
		world.$layers = null
		world.$type = null
		world.$width = null

		world.$baseImage = null
		world.$camera = new Camera({
			x: 0, y: 0,
			width: world.$element.width,
			height: world.$element.height
		})

		world.$camera.on('update', world.cameraUpdateHandler)
	}

	init (data) {
		const world = this

		world.$nextobjectid = data.nextobjectid
		world.$tiledversion = data.tiledversion
		world.$nextlayerid = data.nextlayerid
		world.$orientation = data.orientation
		world.$renderorder = data.renderorder
		world.$tileheight = data.tileheight
		world.$layerTileset = data.layerTileset
		world.$tilewidth = data.tilewidth
		world.$infinite = data.infinite
		world.$tilesets = data.tilesets
		world.$version = data.version
		world.$height = data.height
		world.$layers = data.layers
		world.$type = data.type
		world.$width = data.width

		world.baseImageUpdate()
	}

	get camera () { return this.$camera }

	get nextobjectid () { return this.$nextobjectid }
	set nextobjectid (val) { return this.$nextobjectid = val }

	get tiledversion () { return this.$tiledversion }
	set tiledversion (val) { return this.$tiledversion = val }

	get layerTileset () { return this.$layerTileset }
	set layerTileset (val) { return this.$layerTileset = val }

	get nextlayerid () { return this.$nextlayerid }
	set nextlayerid (val) { return this.$nextlayerid = val }

	get orientation () { return this.$orientation }
	set orientation (val) { return this.$orientation = val }

	get renderorder () { return this.$renderorder }
	set renderorder (val) { return this.$renderorder = val }

	get tileheight () { return this.$tileheight }
	set tileheight (val) { return this.$tileheight = val }

	get tilewidth () { return this.$tilewidth }
	set tilewidth (val) { return this.$tilewidth = val }

	get baseImage () { return this.$baseImage }
	set baseImage (val) { return this.$baseImage = val }

	get infinite () { return this.$infinite }
	set infinite (val) { return this.$infinite = val }

	get tilesets () { return this.$tilesets }
	set tilesets (val) { return this.$tilesets = val }

	get version () { return this.$version }
	set version (val) { return this.$version = val }

	get height () { return this.$height }
	set height (val) { return this.$height = val }

	get layers () { return this.$layers }
	set layers (val) { return this.$layers = val }

	get type () { return this.$type }
	set type (val) { return this.$type = val }

	get width () { return this.$width }
	set width (val) { return this.$width = val }

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

			world.$baseImage.onload = () => {
				world.cameraUpdateHandler()
				world.$camera.$limitX = world.$baseImage.width - world.$camera.$width
				world.$camera.$limitY = world.$baseImage.height - world.$camera.$height
				resolve(world.$baseImage)
			}
			world.$baseImage.src = canvas.toDataURL('image/png')
		})
	}
}

export default World
