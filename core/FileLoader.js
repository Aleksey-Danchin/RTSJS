class FileLoader {
	constructor () {
		const fl = this

		fl.$expect = new Set()
		fl.$loaded = new Set()
		fl.$loading = new Set()
	}

	addImage (name, path) {
		const fl = this

		const offer = {
			name, path,
			type: 'image'
		}

		fl.$expect.add(offer)
		return true
	}

	getImage (name) {
		const fl = this

		const loaded = Array.from(fl.$loaded)
		for (const offer of loaded) {
			if (offer.type === 'image' && offer.name === name) {
				return offer.image
			}
		}

		return false
	}

	addJson (name, path) {
		const fl = this

		const offer = {
			name, path,
			type: 'json'
		}

		fl.$expect.add(offer)
		return true
	}

	getJson (name) {
		const fl = this

		const loaded = Array.from(fl.$loaded)
		for (const offer of loaded) {
			if (offer.type === 'json' && offer.name === name) {
				return offer.json
			}
		}

		return false
	}

	load () {
		const fl = this
		const promisesCollection = []

		const offers = Array.from(fl.$expect)
		const imageOffers = offers.filter(offer => offer.type === 'image')
		const jsonOffers = offers.filter(offer => offer.type === 'json')

		for (const imageOffer of imageOffers) {
			fl.$expect.delete(imageOffer)
			fl.$loading.add(imageOffer)

			const imagePromise = new Promise((resolve, reject) => {
				const image = new Image()

				image.onload = () => {
					fl.$loading.delete(imageOffer)
					fl.$loaded.add(imageOffer)
					imageOffer.image = image
					resolve(image)
				}

				image.src = imageOffer.path
			})

			promisesCollection.push(imagePromise)
		}

		for (const jsonOffer of jsonOffers) {
			fl.$expect.delete(jsonOffer)
			fl.$loading.add(jsonOffer)

			const jsonPromise = new Promise(async (resolve, reject) => {
				const answer = await fetch(jsonOffer.path)
				const jsonAnswer = await answer.json()

				fl.$loading.delete(jsonOffer)
				fl.$loaded.add(jsonOffer)
				jsonOffer.json = jsonAnswer

				resolve(jsonAnswer)
			})

			promisesCollection.push(jsonPromise)
		}

		return Promise.all(promisesCollection)
	}
}

export default FileLoader
