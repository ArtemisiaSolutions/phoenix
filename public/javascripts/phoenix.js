var baseUrl = "";

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

		var type = $("#map").attr("data-type")

        $.ajax({
            type: "GET",
            url: baseUrl+"data/"+type+"/toto/tata",
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
					
					/* Snow */
                    
					if(point.value <= 0) {						
                        context.fillStyle = "rgba(192, 232, 243, 0.0)"
                    } else if (point.value < 5) {
                        context.fillStyle = "rgba(192, 232, 243, 0.1)"
                    } else {
                        context.fillStyle = "rgba(192, 232, 243, 0.5)"
                    }

					/* Temperature */
					/*
					if(point.value < 0) {
                        context.fillStyle = "rgba(15, 173, 236, 0.1)"
                    } else if (point.value < 5) {
                        context.fillStyle = "rgba(235, 125, 25, 0.1)"
                    } else {
                        context.fillStyle = "rgba(236, 12, 0, 0.1)"
                    }
					*/
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
		if($("#map").attr("data-type") != "temperature") {
			$("#map").attr("data-type", "temperature")
			canvasTiles.redraw()
		}	
	})

	$("#wind").click(function() {
		if($("#map").attr("data-type") != "wind") {
			$("#map").attr("data-type", "wind")
			canvasTiles.redraw()	
		}	
	})

	$("#snow").click(function() {
		if($("#map").attr("data-type") != "snow") {
			$("#map").attr("data-type", "snow")
			canvasTiles.redraw()
		}
	})
	
	$("#slider").slider({
      value: date.valueOf(),
      min: dateMin.valueOf() + 3600000,
      max: dateMax.valueOf() + 3600000,
      step:3600000,
      slide: function(event, ui) {
		date = new Date(ui.value)
        $("#date").html((new Date(ui.value)).toUTCString())
      }
    })
    $("#date").html(new Date($("#slider").slider("value")).toUTCString())
	console.log(date)
	console.log(dateMin)
	console.log(dateMax)

});
