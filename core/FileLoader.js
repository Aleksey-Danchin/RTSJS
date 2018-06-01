class FileLoader {
	static loadImage (src) {
		return new Promise((resolve, reject) => {
			const image = new Image()

			Object.assign(image, {
				onload: () => resolve(image),
				onerror: err => reject(err),
				src
			})
		})
	}

	static loadJson (src) {
		return getFetchFormat(src, 'json')
	}

	static loadText (src) {
		return getFetchFormat(src, 'text')
	}
}

export default FileLoader

function getFetchFormat (src, format) {
	return new Promise(async (resolve, reject) => {
		const answer = await fetch(src)
		const result = answer[format]()

		resolve(result)
	})
}
