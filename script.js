const map = L.map('map').setView([14.639270610701264, 120.97380513145693], 13)
const loader = document.querySelector("#loader")

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

map.on('click', function(e) {        
	const popLocation= e.latlng;
	console.log(popLocation)
	loader.classList.remove("pointer-none", "invisible")
	setTimeout(() => {
		loader.classList.add("pointer-none", "invisible")
	}, 1000)
	const marker = L.marker([14.639270610701264, 120.97380513145693]).addTo(map)
	marker.bindPopup("<b>Hello world!</b><br>I am a popup.").openPopup()

})
