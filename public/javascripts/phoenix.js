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
		url: baseUrl+"data/"+type+"/"+date+"/"+altitude,
		dataType: "json",
		data: {bounds: bounds},
		success: function(res) {
			/* Verifier contenu */

			/* Test ajout d'un layer */
			var heatmapLayer = L.TileLayer.heatMap({
				radius: 7,
				opacity: 0.7,
			})
			var data = res
			heatmapLayer.addData(data)
			control.addOverlay(heatmapLayer, "heatmapLayer")
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
	var date = new Date()
	date.setMinutes(0)
	date.setSeconds(0)
	var dateMin = new Date(date)
	dateMin.setHours(0)
	var dateMax = new Date(date)
	dateMax.setHours(23)
	control.addTo(map)
	
	/* Listeners */
	
	$("#slider").slider({
      value: date.valueOf(),
      min: dateMin.valueOf() + 3600000,
      max: dateMax.valueOf() + 3600000,
      step:3600000,
      slide: function(event, ui) {
        $("#date").html((new Date(ui.value)).toUTCString())
        console.log($("#date").html())
        console.log(date.toUTCString())
      }
    })
    $("#date").html(new Date($("#slider").slider("value")).toUTCString())
	$("#temperature").click(function() {
		getData(map, control, "temperature",$("#date").html() , "null")
	})

	$("#wind").click(function() {
		getData(map, control, "wind", date, "null")
	})

});
