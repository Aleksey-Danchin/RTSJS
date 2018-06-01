class Tileset {
	constructor (image, data) {
		const tileset = this

		tileset.$image = image

		tileset.$imageheight = data.imageheight
		tileset.$tileheight = data.tileheight
		tileset.$imagewidth = data.imagewidth
		tileset.$tilecount = data.tilecount
		tileset.$tilewidth = data.tilewidth
		tileset.$firstgid = data.firstgid
		tileset.$imageName = data.image
		tileset.$columns = data.columns
		tileset.$spacing = data.spacing
		tileset.$margin = data.margin
		tileset.$name = data.name

		tileset.$rows = (image.height - data.margin * 2 + data.spacing) / (data.tileheight + data.spacing)
	}

	get imageheight () { return this.$imageheight }
	get tileheight () { return this.$tileheight }
	get imagewidth () { return this.$imagewidth }
	get tilecount () { return this.$tilecount }
	get tilewidth () { return this.$tilewidth }
	get imageName () { return this.$imageName }
	get firstgid () { return this.$firstgid }
	get columns () { return this.$columns }
	get spacing () { return this.$spacing }
	get margin () { return this.$margin }
	get image () { return this.$image }
	get name () { return this.$name }
	get rows () { return this.$rows }

	byIndex (index) {
		index -= 1

		const y = parseInt(index / this.$columns)
		const x = index - y * this.$columns

		return [
			x * (this.$tilewidth + this.$spacing),
			y * (this.$tileheight + this.$spacing),
			this.$tilewidth,
			this.$tileheight
		]
	}
}

export default Tileset
