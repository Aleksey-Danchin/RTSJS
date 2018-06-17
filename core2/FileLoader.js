class FileLoader {
	static getJSON (src) {
		return new Promise(async (resolve, reject) => {
			const answer = await fetch(src)
			const json = await answer.json()

			resolve(json)			
		})
	}

	static getImage (src) {
		return new Promise((resolve, reject) => {
			const img = new Image()
			img.onload = () => resolve(img)
			img.src = src
		})
	}
}

export default FileLoader
