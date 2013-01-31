$(function() {

	
	$("#frame").css({'height' : $(window).height()});
	$("#map").css({'height' : $(window).height() - $("#header").outerHeight()});

	/* Map */

	var baseLayer = L.tileLayer(
		'http://{s}.tile.cloudmade.com/a2c2a163b7bb473e9ee42c9431d3671a/997/256/{z}/{x}/{y}.png',{
			attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://cloudmade.com">CloudMade</a>',
			maxZoom: 6
		}
	);

	var map = new L.Map('map', {
		center: new L.LatLng(41.2738, -6.88855),
		zoom: 6,
		layers: [baseLayer]
	});


});
