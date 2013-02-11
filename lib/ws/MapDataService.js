var grib2js = require('../../../grib2js/lib/grib/Grib2Wrapper.js')("","")

function MapDataService(app) {
	
	return function() {

        app.get('/:type/:date/:altitude', function(req, res) {
            var type = req.param("type")
            var date = req.param("date")
			var altitude = req.param("altitude")
			var bounds = req.param("bounds")

			// Ask to DB file path
			// TODO GET FILE FROM DB
			var file = "../grib2js/testCsv.csv"
			grib2js.getDataFromFile(file, bounds, function(err, data){
                if (err) return res.send({error: err})
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
