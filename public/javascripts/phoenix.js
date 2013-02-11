var baseUrl = "";

function getData(map, control, type, date, altitude)
{
	var bounds = map.getBounds()
    var point1 = {lat: parseFloat(bounds._northEast.lat), lon: parseFloat(bounds._northEast.lng)}
    var point2 = {lat: parseFloat(bounds._northEast.lat), lon: parseFloat(bounds._southWest.lng)}
	var point3 = {lat: parseFloat(bounds._southWest.lat), lon: parseFloat(bounds._southWest.lng)}
	var point4 = {lat: parseFloat(bounds._southWest.lat), lon: parseFloat(bounds._northEast.lng)}
	bounds = [point1, point2, point3, point4]
	console.log(JSON.stringify(bounds))
	$.ajax({
		type: "GET",
		url: baseUrl+"data/temperature/toto/tata",
		dataType: "json",
		data: {bounds: bounds},
		success: function(res) {
			/* Verifier contenu */
			//console.log(JSON.stringify(res))

			/* Test ajout d'un layer */
			var heatmapLayer3 = L.TileLayer.heatMap({
				radius: 5,
				opacity: 0.9,
				gradient: {
					0.0: "rgb(0,0,255)",
					0.35: "rgb(0,255,255)",
					0.5: "rgb(0,255,0)",
					0.6: "yellow",
					1.0: "rgb(255,0,0)"
				}
			})
			var data = res
			heatmapLayer3.addData(data)
			control.addOverlay(heatmapLayer3, "heatmapPlayer3")


			map.addLayer(heatmapLayer3)
		}
	})
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

    var canvasTiles = L.tileLayer.canvas()

    canvasTiles.drawTile = function(canvas, tilePoint, zoom) {

        var context = canvas.getContext('2d')
        var bounds = {}
        var tileSize = this.options.tileSize
        var start = tilePoint.multiplyBy(tileSize)

        bounds._southWest = map.unproject(start.add(new L.Point(0, 256)))
        bounds._northEast = map.unproject(start.add(new L.Point(256,0)))

        var point1 = {lat: parseFloat(bounds._northEast.lat), lon: parseFloat(bounds._northEast.lng)}
        var point2 = {lat: parseFloat(bounds._northEast.lat), lon: parseFloat(bounds._southWest.lng)}
        var point3 = {lat: parseFloat(bounds._southWest.lat), lon: parseFloat(bounds._southWest.lng)}
        var point4 = {lat: parseFloat(bounds._southWest.lat), lon: parseFloat(bounds._northEast.lng)}
        bounds = [point1, point2, point3, point4]

        $.ajax({
            type: "GET",
            url: baseUrl+"data/temperature/toto/tata",
            dataType: "json",
            data: {bounds: bounds},
            success: function(res) {
                res.forEach(function(point) {
                    var p = map.project(new L.LatLng(point.lat, point.lon))
                    var x = Math.round(p.x - start.x)
                    var y = Math.round(p.y - start.y)

                    context.beginPath()
                    context.arc(x, y, 5, 0, 2 * Math.PI, false)
                    // Fill (Gradient)
                    /*
                    var grd = context.createRadialGradient(x, y, 5, x, y, 12)
                    grd.addColorStop(0, "#8ED6FF")
                    grd.addColorStop(1, "#004CB3")
                    context.fillStyle = grd
                    */
                    if(point.value < 0) {
                        context.fillStyle = "rgba(15, 173, 236, 0.1)"
                    } else if (point.value < 5) {
                        context.fillStyle = "rgba(235, 125, 25, 0.1)"
                    } else {
                        context.fillStyle = "rgba(236, 12, 0, 0.1)"
                    }
                    context.fill()

                })

            }
        })


        /*
        context.beginPath()
        context.arc(tilePoint.x, tilePoint.y, 12, 0, 2 * Math.PI, false)
        // Fill (Gradient)
        var grd = context.createRadialGradient(tilePoint.x, tilePoint.y, 5, tilePoint.x, tilePoint.y, 12)
        grd.addColorStop(0, "#8ED6FF")
        grd.addColorStop(1, "#004CB3")
        context.fillStyle = grd
        // Shadow
        context.shadowColor = "#666666";
        context.shadowBlur = 5;
        context.shadowOffsetX = 7;
        context.shadowOffsetY = 7;
        context.fill()

        context.lineWidth = 2;
        context.strokeStyle = "black";
        context.stroke();
        // draw something on the tile canvas
        */
    }
    map.addLayer(canvasTiles)

	/* Listeners */

	$("#temperature").click(function() {
		getData(map, control, "temperature", "null", "null")
	})

	$("#wind").click(function() {
		getData(map, control, "wind", "null", "null")
	})

});
