var grib2js = require('../../../grib2js/lib/grib/Grib2Wrapper.js')("","")

function MapDataService(app) {
	
	return function() {

        app.get('/:type/:date/:altitude', function(req, res) {
            var type = req.param("type")
            var date = req.param("date")
			var altitude = req.param("altitude")
			var bounds = req.param("bounds")
			console.log(req.body)

			// Ask to DB file path
			// TODO GET FILE FROM DB
			var file = "./test/data/testFat411.csv"
			grib2js.getDataFromFile(file, bounds, function(err, data){
				//console.log(data)
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
