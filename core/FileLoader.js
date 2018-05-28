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
		return new Promise(async (resolve, reject) => {
			const answer = await fetch(src)
			const json = await answer.json()

			resolve(json)
		})
	}
}

export default FileLoader
