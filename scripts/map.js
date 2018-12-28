var URL = 'https://api.luftdaten.info/static/v2/data.json';
var mapcenter = [50.937430, 4.040934]

var map = L.map('results').setView(mapcenter, 13);
L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 15,
    minZoom: 12,
    id: 'mapbox.streets',
    accessToken: 'pk.eyJ1IjoiZGFhcmVuZGUiLCJhIjoiY2pweDZ1aWJnMDEyMDQxbnhjeDE5bnNqbyJ9.lObt90eRQP4teg0CQfzOgA'
}).addTo(map);

var hash = new L.Hash(map)

L.control.scale(options = (imperial = false)).addTo(map);

var jsonFeatures = []

fetch(url)
	.then((response) => response.json())
	.then(function(data) {
		Object.values(data).forEach((sensor) => {
			var lat = point.latitud;
			var lon = point.longitud;
			var feature = {type: 'Feature',
				properties: point,
				geometry: {
					type: 'Point',
					coordinates: [lon,lat]
			}
  };
   jsonFeatures.push(feature);
  })
	})
  .catch(function(error) {
    console.log(error);
  }); 

var geoJson = { type: 'FeatureCollection', features: jsonFeatures };
L.geoJson(geoJson).addTo(map);