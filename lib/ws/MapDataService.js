var grib2js = require('../../../grib2js/lib/grib/Grib2Wrapper.js')("","")

function MapDataService(app) {
	
	return function() {

        app.get('/:type/:date/:altitude', function(req, res) {
            var type = req.param("type")
            var date = req.param("date")
			var altitude = req.param("altitude")
			var bounds = [{lat:44.653024,lon:-1.625977}, {lat:44.933696,lon:3.164063}, {lat:42.55308,lon:3.339844}, {lat:43.325178,lon:-2.285156}]
			// TODO GET BOUNDS DATA
			console.log(req.body)

			// Ask to DB file path
			// TODO GET FILE FROM DB
			var file = "./test/data/test.csv"
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
