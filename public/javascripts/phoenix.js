var baseUrl = "";

function getAngle(x, y)
{
    if(x == 0 && y == 0)
        return 360
    return x < 0 ? Math.atan2(x, y) + 2*Math.PI : Math.atan2(x,y)
}

function getWindData(map, control, date, altitude)
{
    /*
     var bounds = map.getBounds()
     var point1 = {lat: parseFloat(bounds._northEast.lat), lon: parseFloat(bounds._northEast.lng)}
     var point2 = {lat: parseFloat(bounds._northEast.lat), lon: parseFloat(bounds._southWest.lng)}
     var point3 = {lat: parseFloat(bounds._southWest.lat), lon: parseFloat(bounds._southWest.lng)}
     var point4 = {lat: parseFloat(bounds._southWest.lat), lon: parseFloat(bounds._northEast.lng)}

     bounds = [point1, point2, point3, point4]

     $.ajax({
     type: "GET",
     url: baseUrl+"data/wind/"+date+"/"+altitude,
     data : "json",
     data: {bounds: bounds},
     success: function(res) {
     for(var lon in res)
     {
     for(var lat in res[lon])
     {
     var u = res[lon][lat].u
     var v = res[lon][lat].v

     var vit = Math.sqrt(u*u+v*v)
     var cap = 360 * getAngle(u, v) / (2 * Math.PI)

     var lon2 = lon + 20 * Math.sin(cap)
     var lat2 = lat + 20 * Math.cos(cap)

     console.log(lon2+" "+lat2+" "+lon+" "+lat)
     var l1 = new L.LatLng(lat, lon)
     var l2 = new L.LatLng(lat2, lon2)
     var polyline = L.polygon([l1,l2], {color: 'red'}).addTo(map);

     }
     }
     }
     })
     */
    var canvasTiles = L.tileLayer.canvas()

    canvasTiles.drawTile = function(canvas, tilePoint, zoom) {

        var context = canvas.getContext('2d')
        var bounds = {}
        //should be computed depending on the zoom
        var radius = 3
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
            url: baseUrl+"data/wind/"+date+"/"+altitude,
            dataType: "json",
            data: {bounds: bounds},
            success: function(res) {

                for(var lon in res)
                {
                    for(var lat in res[lon])
                    {
                        var u = res[lon][lat].u
                        var v = res[lon][lat].v

                        var vit = Math.sqrt(u*u+v*v)
                        var cap = 360 * getAngle(u, v) / (2 * Math.PI)
                        //console.log(vit+" "+cap)
                        if(vit > 0)
                        {
                            var p = map.project(new L.LatLng(lat, lon))
                            var x = Math.round(p.x - start.x)
                            var y = Math.round(p.y - start.y)
                            context.beginPath()

                            radius = vit/5
                            context.arc(x, y, radius, 0, 2 * Math.PI, false)

                            var op = 0.5

                            context.fillStyle = 'rgba(255,255,255,'+op+')'
                            context.fill()
                        }
                    }
                }
            }
        })
    }
    map.addLayer(canvasTiles)
}

function getSnowData(map, control, date, altitude)
{
    var canvasTiles = L.tileLayer.canvas()

    canvasTiles.drawTile = function(canvas, tilePoint, zoom) {

        var context = canvas.getContext('2d')
        var bounds = {}
        //should be computed depending on the zoom
        var radius = 5
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
            url: baseUrl+"data/snow/"+date+"/"+altitude,
            dataType: "json",
            data: {bounds: bounds},
            success: function(res) {

                res.forEach(function(point) {
                    if(point.value > 0)
                    {
                        var p = map.project(new L.LatLng(point.lat, point.lon))
                        var x = Math.round(p.x - start.x)
                        var y = Math.round(p.y - start.y)
                        context.beginPath()
                        context.arc(x, y, radius, 0, 2 * Math.PI, false)

                        var op = point.value * 2

                        context.fillStyle = 'rgba(255,255,255,'+op+')'
                        context.fill()
                    }
                })
            }
        })
    }
    map.addLayer(canvasTiles)
}

function getColor(d) {
    var color = ""
    if (d <= -10) color = 'rgb(0, 0, 255)'
    else if (d > -10 && d <= 0) color = 'rgb(0, 255, 255)'
    else if (d > 0 && d <= 10) color = 'rgb(0, 255, 0)'
    else if (d > 10 && d <= 20) color = 'yellow'
    else if (d > 20 && d <= 30) color = 'rgb(255, 0, 0)'
    return color
}


function getTempData(map, control, date, altitude)
{
    var bounds = map.getBounds()
    var point1 = {lat: parseFloat(bounds._northEast.lat), lon: parseFloat(bounds._northEast.lng)}
    var point2 = {lat: parseFloat(bounds._northEast.lat), lon: parseFloat(bounds._southWest.lng)}
    var point3 = {lat: parseFloat(bounds._southWest.lat), lon: parseFloat(bounds._southWest.lng)}
    var point4 = {lat: parseFloat(bounds._southWest.lat), lon: parseFloat(bounds._northEast.lng)}

    bounds = [point1, point2, point3, point4]

    $.ajax({
        type: "GET",
        url: baseUrl+"data/temperature/"+date+"/"+altitude,
        dataType: "json",
        data: {bounds: bounds},
        success: function(res) {
            /* Test ajout d'un layer */
            var heatmapLayer = L.TileLayer.heatMap({
                radius: 7,
                opacity: 0.7
            })

            heatmapLayer.addData(res)
            control.addOverlay(heatmapLayer, "heatmapLayer")
            map.addLayer(heatmapLayer)

            var legend = L.control({position: 'bottomright'})

            legend.onAdd = function (map) {

                var div = L.DomUtil.create('div', 'info legend'),
                    grades = [-10, 0, 10, 20, 30],
                    labels = [];

                // loop through our density intervals and generate a label with a colored square for each interval
                for (var i = 0; i < grades.length; i++) {
                    div.innerHTML +=
                        '<i style="background:' + getColor(grades[i]) + '"></i> '
                    if(i == 0) div.innerHTML += '<' + grades[i] + '<br>'
                    else if(i == grades.length - 1) div.innerHTML += '>' + grades[i]
                    if(i > 0 && i < grades.length - 1) div.innerHTML += grades[i] + '&ndash;' + grades[i + 1] + '<br>'
                }

                return div;
            };

            legend.addTo(map);

        }
    });
}


function getCloudsData(map, control, date, altitude) {

    var canvasTiles = L.tileLayer.canvas()

    canvasTiles.drawTile = function(canvas, tilePoint, zoom) {

        var context = canvas.getContext('2d')
        var bounds = {}
        //should be computed depending on the zoom
        var radius = 5
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
            url: baseUrl+"data/clouds/"+date+"/"+altitude,
            dataType: "json",
            data: {bounds: bounds},
            success: function(res) {
                res.forEach(function(point) {
                    if(point.value > 0)
                    {
                        var p = map.project(new L.LatLng(point.lat, point.lon))
                        var x = Math.round(p.x - start.x)
                        var y = Math.round(p.y - start.y)
                        context.beginPath()
                        context.arc(x, y, radius, 0, 2 * Math.PI, false)

                        var op = point.value / 200

                        var grad = new CanvasGradient()

                        context.fillStyle = 'rgba(255,255,255,'+op+')'
                        context.fill()
                    }
                })
            }
        })
    }
    map.addLayer(canvasTiles)
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
        legend:
        {
            position: 'br',
            title: 'Example Distribution'
        },
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
        }
    })
    $("#date").html(new Date($("#slider").slider("value")).toUTCString())

    $("#temperature").click(function() {
        getTempData(map, control,$("#date").html() , "surface")
    })

    $("#wind").click(function() {
        getWindData(map, control, $("#date").html(), "10 mb")
    })

    $("#snow").click(function() {
        getSnowData(map, control, $("#date").html(), "surface")
    })

    $("#clouds").click(function() {
        getCloudsData(map, control, $("#date").html(), "atmosphere")
    })

});
