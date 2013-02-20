var grib2js = require('grib2js')()

function MapDataService(app) {
	
	return function() {

        app.get('/:type/:date/:altitude', function(req, res) {
            var type = req.param("type")
            var date = req.param("date")
			var altitude = req.param("altitude")
			var bounds = req.param("bounds")

			// TODO GET FILE FROM DB
			grib2js.getData(type, date, altitude, bounds, function(err, data){
                if (err) return res.send({error: err})
				console.log(data.values)
				res.send(data.values)	
			})

			//TODO
        })

        app.post('/', function(req, res) {
            
			//TODO 
        })
    }

}

module.exports = MapDataService
