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
L.control.scale({imperial: false}).addTo(map);

var jsonFeatures = []

fetch(URL)
	.then((response) => response.json())
	.then(function(data) {
		// filter data
		var filtered = Object.values(data).filter((sensor) =>
					sensor.location.latitude != null &&
					sensor.location.longitude != null && (
					// (sensor.sensor.sensor_type.name == "PPD42NS" && sensor.sensordatavalues.length >= 6) ||
					(sensor.sensor.sensor_type.name == "HPM" && sensor.sensordatavalues.length >= 2) ||
					(sensor.sensor.sensor_type.name == "PMS1003" && sensor.sensordatavalues.length >= 2) ||
					(sensor.sensor.sensor_type.name == "PMS3003" && sensor.sensordatavalues.length >= 2) ||
					(sensor.sensor.sensor_type.name == "PMS5003" && sensor.sensordatavalues.length >= 2) ||
					(sensor.sensor.sensor_type.name == "PMS6003" && sensor.sensordatavalues.length >= 2) ||
					(sensor.sensor.sensor_type.name == "PMS7003" && sensor.sensordatavalues.length >= 2) ||
					(sensor.sensor.sensor_type.name == "SDS021" && sensor.sensordatavalues.length >= 2) ||
					(sensor.sensor.sensor_type.name == 'SDS011' && sensor.sensordatavalues.length >= 2)))
		// convert data to geoJson
		filtered.forEach((sensor) => {
			var lat = parseFloat(sensor.location.latitude);
			var lon = parseFloat(sensor.location.longitude);
			var properties = {sensor: sensor.sensor,
						timestamp: sensor.timestamp,
						id: sensor.id,
						// sensordatavalues: sensor.sensordatavalues
						};
			sensor.sensordatavalues.forEach((datavalue) => {
				if (datavalue.value_type === 'P1'){ //PM10
					properties.P1 = datavalue.value}
				else if (datavalue.value_type === 'P2'){ //PM2.5
					properties.P2 = datavalue.value}
				else if (datavalue.value_type === 'temperature'){
					properties.temperature = datavalue.value}
				else if (datavalue.value_type === 'humidity'){
					properties.humidity = datavalue.value}
				else if (datavalue.value_type === 'pressure'){
					properties.pressure = datavalue.value}
				})
		 
			var feature = {type: 'Feature',
				properties: properties,
				geometry: {
					type: 'Point',
					coordinates: [lon, lat]}
			};
			jsonFeatures.push(feature);
  })
  var geoJson = {type: "FeatureCollection", features: jsonFeatures};
  var geoJsonLayer = L.geoJson(geoJson, {
    pointToLayer: function (feature, latlng) {
		var geojsonMarkerOptions = {
		radius: 8,
		fillcolor: getColor_pm10(parseFloat(feature.properties.p1)),
		color: getColor_pm10(parseFloat(feature.properties.p1)),
		weight: 1,
		opacity: 1,
		fillOpacity: 0.8};
        return L.circleMarker(latlng, geojsonMarkerOptions);
    }
	}).addTo(map);
	})
  .catch(function(error) {
    console.log(error);
	}); 

function getColor_pm10(d) {
    return d > 100  ? '#DD2C00' :
           d > 50   ? '#E65100' :
           d > 10   ? '#F9A825' :
                      '#00796B';
}

// '#00796B', '#F9A825', '#E65100', '#DD2C00'
	

