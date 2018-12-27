var mymap = L.map('results').setView([50.937430, 4.040934], 13);
L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 16,
    minZoom: 12,
    id: 'mapbox.streets',
    accessToken: 'pk.eyJ1IjoiZGFhcmVuZGUiLCJhIjoiY2pweDZ1aWJnMDEyMDQxbnhjeDE5bnNqbyJ9.lObt90eRQP4teg0CQfzOgA'
}).addTo(mymap);

// let hexLayer = new leaflet.HexbinLayer(options).addTo(map)

//api.getAllSensors().then((cells) => {
//	hexLayer.data(cells)
//})

var hash = new L.Hash(mymap)

URL = 'http://api.luftdaten.info/static/v2/data.json';
let api = {
	fetchNow() {
		return fetch(URL).then((response) => response.json())
}}
	
