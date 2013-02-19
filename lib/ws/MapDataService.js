var grib2js = require('../../../grib2js/lib/grib/Grib2Wrapper.js')("/home/bof/workspace/PE/work/wgrib2/bin/wgrib2")

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
