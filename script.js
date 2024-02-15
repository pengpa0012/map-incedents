const map = L.map('map').setView([14.639270610701264, 120.97380513145693], 13)
const loader = document.querySelector("#loader")
let markerLists = []

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map)

map.on('click', function(e) {        
	const loc = e.latlng

	// Loader
	loader.classList.remove("pointer-none", "invisible")

	const url = `https://trueway-places.p.rapidapi.com/FindPlacesNearby?location=${loc.lat}%2C%20${loc.lng}&radius=500&language=en`
	const options = {
		method: 'GET',
		headers: {
			'X-RapidAPI-Key': 'API-KEY',
			'X-RapidAPI-Host': 'API-HOST'
		}
	}

	fetch(url, options)
	.then(res => res.json())
	.then(data => {
		console.log(data.results)
		data.results.forEach((el, i) => {
			// Set pin
			const marker = L.marker([el.location.lat, el.location.lng]).addTo(map)
			// add name of store
			marker.bindPopup(el.name).openPopup()

			const markerExists = markerLists.some(coord => (
					coord.lat === el.location.lat && coord.lng === el.location.lng
			));

			// check if coordinate is not added
			if (!markerExists) {
					const marker = L.marker([el.location.lat, el.location.lng]).addTo(map)
					marker.bindPopup(el.name).openPopup()
					markerLists.push({
							lat: el.location.lat,
							lng: el.location.lng
					})
			}
		})
		loader.classList.add("pointer-none", "invisible")
	})
})
