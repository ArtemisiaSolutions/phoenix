var baseUrl = "";

function getData(map, control, type, date, altitude)
{
	$.ajax({
		type: "POST",
		url: baseUrl+"data/temperature/toto/tata",
		dataType: "json",
		success: function(res) {
			/* Verifier contenu */
			console.log(res);

			/* Test ajout d'un layer */
			var heatmapLayer3 = L.TileLayer.heatMap({
				radius: 7,
				opacity: 0.8,
				gradient: {
					0.0: "rgb(0,0,255)",
					0.35: "rgb(0,255,255)",
					0.5: "rgb(0,255,0)",
					0.6: "yellow",
					1.0: "rgb(255,0,0)"
				}
			});
			var data = res.data;
			heatmapLayer3.addData(data);
			control.addOverlay(heatmapLayer3, "heatmapPlayer3");

			map.addLayer(heatmapLayer3);
		}
	});
}

$(function() {

	/* Fit screen height */
	
	$("#frame").css({'height' : $(window).height()});
	$("#map").css({'height' : $(window).height() - $("#header").outerHeight()});

	/* Map */

	var baselayer = L.tileLayer('http://{s}.tile.cloudmade.com/a2c2a163b7bb473e9ee42c9431d3671a/997/256/{z}/{x}/{y}.png',{styleId: 22677, attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://cloudmade.com">CloudMade</a>'});

	var map = new L.Map('map', {
		center: new L.LatLng(47.2738, 0.88855),
		zoom: 6,
		layers: [baselayer]
	});

	var control = L.control.layers();
	control.addTo(map);
	
	/* Listeners */

	$("#temperature").click(function() {
		getData(map, control, "temperature", "null", "null");
	});

	$("#wind").click(function() {
		getData(map, control, "wind", "null", "null");
	});

});
