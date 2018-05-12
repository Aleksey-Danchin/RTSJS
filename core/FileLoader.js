class FileLoader {
	constructor () {
		const fl = this

		fl.$expect = new Set()
		fl.$loaded = new Set()
		fl.$loading = new Set()
	}

	addImage (name, path) {
		const fl = this

		const ofer = {
			name, path,
			type: 'image',
			status: 'expect'
		}

		fl.$expect.add(ofer)
		return true
	}
}

export default FileLoader
