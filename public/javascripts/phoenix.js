var baseUrl = "";

function getData(map, control, type, date, altitude)
{
	var bounds = map.getBounds()
    var point1 = {lat: parseFloat(bounds._northEast.lat), lon: parseFloat(bounds._northEast.lng)}
    var point2 = {lat: parseFloat(bounds._northEast.lat), lon: parseFloat(bounds._southWest.lng)}
	var point3 = {lat: parseFloat(bounds._southWest.lat), lon: parseFloat(bounds._southWest.lng)}
	var point4 = {lat: parseFloat(bounds._southWest.lat), lon: parseFloat(bounds._northEast.lng)}

	bounds = [point1, point2, point3, point4]
	
	$.ajax({
		type: "GET",
		url: baseUrl+"data/"+temperature+"/"+date+"/"+altitude,
		dataType: "json",
		data: {bounds: bounds},
		success: function(res) {
			/* Verifier contenu */
			//console.log(JSON.stringify(res))

			/* Test ajout d'un layer */
			var heatmapLayer = L.TileLayer.heatMap({
				radius: 7,
				opacity: 0.8,
				gradient: {
					0.0: "rgb(0,0,255)",
					0.35: "rgb(0,255,255)",
					0.5: "rgb(0,255,0)",
					0.6: "yellow",
					1.0: "rgb(255,0,0)"
				}
			})
			var data = res
			heatmapLayer.addData(data)
			control.addOverlay(heatmapLayer, "heatmapPlayer")

			map.addLayer(heatmapLayer)
		}
	});
}

$(function() {

	/* Fit screen height */
	
	$("#frame").css({'height' : $(window).height()})
	$("#map").css({'height' : $(window).height() - $("#header").outerHeight()})

	/* Map */

	var baselayer = L.tileLayer('http://{s}.tile.cloudmade.com/a2c2a163b7bb473e9ee42c9431d3671a/997/256/{z}/{x}/{y}.png',{styleId: 22677, attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://cloudmade.com">CloudMade</a>'})

	var map = new L.Map('map', {
		center: new L.LatLng(47.2738, 0.88855),
		zoom: 6,
		layers: [baselayer]
	})

	var control = L.control.layers()
	control.addTo(map)
	
	/* Listeners */

	$("#temperature").click(function() {
		getData(map, control, "temperature", "null", "null")
	})

	$("#wind").click(function() {
		getData(map, control, "wind", "null", "null")
	})

});
